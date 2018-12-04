using AutoServiceBook.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Identity;
using AutoServiceBook.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AutoServiceBook.Swagger;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using AutoServiceBook.MappingProfiles;
using AutoServiceBook.Repositories;

namespace AutoServiceBook
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Auto Service Book", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new ApiKeyScheme()
                {
                    Description = "Authorization header using the Bearer scheme",
                    Name = "Authorization",
                    In = "header"
                });

                c.DocumentFilter<SwaggerSecurityRequirementsDocumentFilter>();
            });

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IRepository<Vehicle>, VehiclesRepository>();
            services.AddScoped<IRepository<Expense>, ExpensesRepository>();

            services.AddIdentity<AppUser, IdentityRole>(options =>
            {
                options.ClaimsIdentity.UserNameClaimType = JwtRegisteredClaimNames.Sub;
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddCookie()
            .AddJwtBearer(jwtOptions =>
            {
                jwtOptions.TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:Key"])),
                    ValidAudience = Configuration["Token:Audience"],
                    ValidIssuer = Configuration["Token:Issuer"],
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidateAudience = false,
                    ValidateActor = false
                };
            });

            services.AddAutoMapper(x => x.AddProfile(new ModelMappingsProfile()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Auto Service Book API v1"));

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            app.UseAuthentication();
        }
    }
}

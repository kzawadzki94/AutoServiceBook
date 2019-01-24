using AutoMapper;
using AutoServiceBook.Models;
using AutoServiceBook.Models.Requests;
using AutoServiceBook.Models.Responses;

namespace AutoServiceBook.MappingProfiles
{
    public class ModelMappingsProfile : Profile
    {
        public ModelMappingsProfile()
        {
            // AppUser
            CreateMap<AppUser, UserInfoResponse>();

            CreateMap<RegisterAccountRequest, AppUser>()
            .ForMember(x => x.Email, o => o.MapFrom(x => x.Email))
            .ForMember(x => x.UserName, o => o.MapFrom(x => x.Email))
            .ForMember(x => x.FirstName, o => o.MapFrom(x => x.FirstName))
            .ForMember(x => x.LastName, o => o.MapFrom(x => x.LastName))
            .ForAllOtherMembers(x => x.Ignore());

            // Vehicle
            CreateMap<VehicleAddOrChangeRequest, Vehicle>();

            // Expense
            CreateMap<ExpenseAddOrChangeRequest, Expense>();
            CreateMap<Expense, ExpenseResponse>();
        }
    }
}
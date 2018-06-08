using AutoMapper;
using AutoServiceBook.Models;
using AutoServiceBook.Models.Requests;
using AutoServiceBook.Models.Responses;

namespace AutoServiceBook.MappingProfiles
{
    public class AppUserMappingsProfile : Profile
    {
        public AppUserMappingsProfile()
        {
            CreateMap<AppUser, UserInfoResponse>();

            CreateMap<RegisterAccountRequest, AppUser>()
            .ForMember(x => x.Email, o => o.MapFrom(x => x.Email))
            .ForMember(x => x.UserName, o => o.MapFrom(x => x.Email))
            .ForMember(x => x.FirstName, o => o.MapFrom(x => x.FirstName))
            .ForMember(x => x.LastName, o => o.MapFrom(x => x.LastName))
            .ForAllOtherMembers(x => x.Ignore());
        }
    }
}
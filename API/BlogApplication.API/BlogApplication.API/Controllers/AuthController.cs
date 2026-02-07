using BlogApplication.API.DTO;
using BlogApplication.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BlogApplication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenRepository _tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            _userManager = userManager;
            _tokenRepository = tokenRepository;
        }


        // POST: api/Auth/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
        {
            // Icreate the identity user object
            var user = new IdentityUser
            {
                UserName = request.Email.Trim(),
                Email = request.Email
            };

            var identityResult = await _userManager.CreateAsync(user, request.Password.Trim());

            if (identityResult.Succeeded)
            {
                //add role to user
                identityResult = await _userManager.AddToRoleAsync(user, "Reader");
                if (identityResult.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    if (identityResult.Errors.Any())
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            ModelState.AddModelError(error.Code, error.Description);
                        }
                    }
                }
            }
            else
            {
                if(identityResult.Errors.Any())
                {
                    foreach (var error in identityResult.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                }
            }
            return ValidationProblem(ModelState);

        }

        // POST: api/Auth/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request) 
        {     
            var identityUser = await _userManager.FindByEmailAsync(request.Email.Trim());
            if (identityUser is not null)
            {
                //check password
                var isPasswordValid = await _userManager.CheckPasswordAsync(identityUser, request.Password.Trim());

                if (isPasswordValid)
                {
                    var roles = await _userManager.GetRolesAsync(identityUser);

                    //create token resonse
                    var jwtToken = _tokenRepository.CreateJwtToken(identityUser, roles.ToList());

                    var response = new LoginResponseDto
                    {
                        Email = identityUser.Email,
                        Roles = roles.ToList(),
                    };

                    Response.Cookies.Append("access_token", jwtToken, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,                 // REQUIRED
                        SameSite = SameSiteMode.Lax,  // REQUIRED
                        Expires = DateTime.UtcNow.AddHours(2)
                        //HttpOnly = true,
                        //Secure = true,
                        //SameSite = SameSiteMode.Lax,
                        //Expires = DateTime.UtcNow.AddHours(2)
                    });

                    return Ok(response);

                }
            }

            ModelState.AddModelError("InvalidCredentials", "Invalid email or password.");

            return ValidationProblem(ModelState);
        }

        //get : api/Auth/me
        [Authorize]
        [HttpGet]
        [Route("me")]
        public IActionResult UserDetails()
        {
            if(User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized();
            }

            var response = new LoginResponseDto
            {
                Email = User.FindFirst(ClaimTypes.Email)?.Value,
                Roles = User.FindAll(ClaimTypes.Role).Select(x => x.Value).ToList(),
            };

            return Ok(response);

        }

        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
            //override the previous cookie
            Response.Cookies.Append("access_token", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(-1)
            });
            return Ok();
        }
    }
}

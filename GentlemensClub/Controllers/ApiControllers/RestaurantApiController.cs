using System.Text.Json;
using System.Text.Json.Serialization;
using GentlemensClub.Models.Restaurant;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace GentlemensClub.Controllers.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantApiController : ControllerBase
    {

        /// <summary>
        /// Returns in a JSON Serialized Dictionary all the available menu categories with the amount of available items in them.
        /// </summary>
        /// <returns>JSON Serialized Dictionary</returns>
        [HttpGet]
        [Route("get-all-categories")]
        public string GetAllCategories()
        {
            var categories = new Dictionary<string, int>
            {
                { "Food", 12 },
                { "Drinks", 4 },
                { "Desserts", 2 }
            };

            return JsonSerializer.Serialize(categories);
        }
    }
}

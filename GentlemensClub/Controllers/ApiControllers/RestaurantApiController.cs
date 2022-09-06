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

        /// <summary>
        /// Returns in a JSON Serialized Dictionary all the menu items in a given search category. Can filter by specialty.
        /// </summary>
        /// <param name="category"></param>
        /// <returns>JSON Serialized List</returns>
        [HttpPost]
        [Route("get-items-of-category")]
        public string GetItemsInCategory([FromBody] SearchCategoryModel category)
        {

            var items = new List<MenuItemModel>
            {
                new MenuItemModel
                {
                    Id = 1,
                    Ingredients = new List<string> { "Tomato", "Bread" },
                    Name = category.Name,
                    SpecialCategories = category.Filter,
                    isChefFavorite = false
                },
                new MenuItemModel
                {
                    Id = 2,
                    Ingredients = new List<string> { "Steak", "Bread" },
                    Name = "Bread with a huge steak",
                    isChefFavorite = true
                }
            };

            return JsonSerializer.Serialize(items);
        }

    }
}

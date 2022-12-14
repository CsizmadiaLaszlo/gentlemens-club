using System.Text.Json;
using GentlemensClub.Models.Restaurant.Menu;
using GentlemensClub.Models.Restaurant.Table;
using GentlemensClub.Services.Interfaces.Restaurant;
using Microsoft.AspNetCore.Mvc;

namespace GentlemensClub.Controllers.ApiControllers
{
    [Route("api/restaurant")]
    [ApiController]
    public class RestaurantApiController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;

        public RestaurantApiController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        [HttpGet]
        [Route("get-filters")]
        public string GetAllFoodFilters()
        {
            var filters = new Dictionary<string, int>();

            foreach (var category in Enum.GetValues(typeof(SpecialFoodCategory)))
            {
                var categoryName = System.Text.RegularExpressions.Regex.Replace(
                    category.ToString(), "[A-Z]", " $0").TrimStart();

                filters.Add(categoryName, (int)category);
            }

            return JsonSerializer.Serialize(filters);
        }

        /// <summary>
        /// Returns in a JSON Serialized Dictionary all the available menu categories with the amount of available items in them.
        /// </summary>
        /// <returns>JSON Serialized string,int Dictionary</returns>
        [HttpGet]
        [Route("get-all-categories")]
        public string GetAllCategories([FromQuery] SpecialFoodCategory? category)
        {
            if (!category.Equals(null))
            {
                MenuSearchCategory cat = new MenuSearchCategory { SpecialFoodCategory = category };
                return JsonSerializer.Serialize(_restaurantService.GetMenuItemsInCategory(cat));
            }
            else
            {
                return JsonSerializer.Serialize(_restaurantService.GetAllCategories());
            }
        }

        /// <summary>
        /// Returns in an IEnumerable of MenuItem of all the menu items in all, or in a given search category. Can filter by providing MenuSearchCategory.
        /// </summary>
        /// <param name="category"></param>
        /// <returns>IEnumerable of MenuItems</returns>
        [HttpPost]
        [Route("get-items-of-category")]
        public async Task<IEnumerable<MenuItem>> GetItemsInCategory([FromBody] MenuSearchCategory category)
        {
            return await _restaurantService.GetMenuItemsInCategory(category);
        }

        /// <summary>
        /// Return a list of tables and their data. Can filter by minimum amount of seats.
        /// </summary>
        /// <returns>JSON Serialized RestaurantTable List</returns>
        [HttpGet]
        [Route("get-all-tables")]
        // TODO implement minimumSeats functionality
        public async Task<IEnumerable<RestaurantTable>> GetAllTables([FromQuery] int minimumSeats)
        {
            return await _restaurantService.GetAllTables();
        }

        /// <summary>
        /// Return table data in JSON format by tableId.
        /// </summary>
        /// <param name="tableId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("get-table-data")]
        public async Task<RestaurantTable?> GetTableData([FromQuery] int tableId)
        {
            return await _restaurantService.GetTableData(tableId);
        }

        [HttpGet]
        [Route("get-table-reservations")]
        public async Task<Dictionary<int, Reservation?>> GetTableReservations()
        {
            return await _restaurantService.GetTableReservations();
        }

        [HttpGet]
        [Route("get-all-menu-items")]
        public async Task<IEnumerable<MenuItem>> GetAllMenuItems()
        {
            return await _restaurantService.GetAllMenuItems();
        }

        [HttpPost]
        [Route("get-all-menu-items-in-category")]
        public async Task<IEnumerable<MenuItem>> GetAllMenuItemsInCategory([FromBody] MenuSearchCategory category)
        {
            return await _restaurantService.GetMenuItemsInCategory(category);
        }

        [HttpPost]
        [Route("get-all-menu-items-in-subcategory")]
        public async Task<IEnumerable<MenuItem>> GetAllMenuItemsInSubCategory([FromBody] MenuSearchCategory category)
        {
            return await _restaurantService.GetMenuItemsInSubCategory(category);
        }
    }
}
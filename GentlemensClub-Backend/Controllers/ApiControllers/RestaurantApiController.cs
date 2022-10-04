﻿using System.Text.Json;
using GentlemensClub.Models.Restaurant.Menu;
using GentlemensClub.Models.Restaurant.Table;
using GentlemensClub.Services.Interfaces.Restaurant.Table;
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

            foreach (var category in Enum.GetValues(typeof(SpecialFoodCategories)))
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
        public string GetAllCategories([FromQuery] SpecialFoodCategories[] filter)
        {
            var categories = new Dictionary<string, int>();

            if (filter.Length is 0)
            {
                categories = new Dictionary<string, int>
                {
                    { "Food", 12 },
                    { "Drinks", 4 },
                    { "Desserts", 2 }
                };
            }
            else
            {
                categories = new Dictionary<string, int>
                {
                    { filter.Length.ToString(), 69 },
                    { "Drinks", 55 },
                    { "Desserts", 69 }
                };
            }

            return JsonSerializer.Serialize(categories);
        }

        /// <summary>
        /// Returns in a JSON Serialized Dictionary all the menu items in a given search category. Can filter by specialty.
        /// </summary>
        /// <param name="category"></param>
        /// <returns>JSON Serialized MenuItemModel List</returns>
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
                    SpecialCategories = category.Categories,
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

    }
}
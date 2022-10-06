namespace GentlemensClub.Models.Restaurant.Menu;

public class SearchCategoryModel
{
    public string Name { get; set; }
    public List<SpecialFoodCategories> Categories { get; set; } = new List<SpecialFoodCategories>();
}
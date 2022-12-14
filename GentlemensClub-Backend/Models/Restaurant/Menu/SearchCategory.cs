namespace GentlemensClub.Models.Restaurant.Menu;

public class SearchCategoryModel
{
    public string Name { get; set; }
    public List<SpecialFoodCategory> Categories { get; set; } = new List<SpecialFoodCategory>();
}
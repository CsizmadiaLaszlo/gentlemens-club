namespace GentlemensClub.Models.Restaurant;

public class SearchCategoryModel
{
    public string Name { get; set; }
    public List<SpecialFoodCategories>? Filter { get; set; }
}
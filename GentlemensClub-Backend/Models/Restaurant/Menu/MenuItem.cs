namespace GentlemensClub.Models.Restaurant.Menu;

public class MenuItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Image { get; set; }
    public List<string> Ingredients { get; set; }
    public List<SpecialFoodCategories>? SpecialCategories { get; set; }
    public MenuItemCategory Category { get; set; }
    public MenuItemSubCategory SubCategory { get; set; }
    public bool isChefFavorite { get; set; }
}
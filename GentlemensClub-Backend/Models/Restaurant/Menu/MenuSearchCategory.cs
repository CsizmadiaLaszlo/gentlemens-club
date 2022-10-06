using System.Reflection.PortableExecutable;

namespace GentlemensClub.Models.Restaurant.Menu;

public class MenuSearchCategory
{
    public SpecialFoodCategories? SpecialFoodCategory { get; set; }
    public MenuItemCategory? MenuItemCategory { get; set; }
    public MenuItemSubCategory? MenuItemSubCategory { get; set; }
}
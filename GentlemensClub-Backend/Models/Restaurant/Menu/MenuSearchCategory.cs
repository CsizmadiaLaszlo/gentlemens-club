using System.Reflection.PortableExecutable;

namespace GentlemensClub.Models.Restaurant.Menu;

public class MenuSearchCategory
{
    public SpecialFoodCategory? SpecialFoodCategory { get; set; }
    public MenuItemCategory? MenuItemCategory { get; set; }
    public MenuItemSubCategory? MenuItemSubCategory { get; set; }
}
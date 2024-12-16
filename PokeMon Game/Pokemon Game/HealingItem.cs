namespace Pokemon_Game
{
    internal class HealingItem : Item
    {
        public HealingItem(string name, int strength, int price)
        {
            Name = name;
            Strength = strength;
            Price = price;
        }
    }

    internal class Potion : HealingItem
    {
        public Potion() : base("Potion", 25, 50)
        {

        }
    }
    internal class SuperPotion : HealingItem
    {
        public SuperPotion() : base("Super Potion", 50, 200)
        {

        }
    }

    internal class MaxPotion : HealingItem
    {
        public MaxPotion() : base("Max Potion", 100, 400)
        {

        }
    }

    internal class MegaPotion : HealingItem
    {
        public MegaPotion() : base("Mega Potion", 200, 800)
        {

        }
    }


}

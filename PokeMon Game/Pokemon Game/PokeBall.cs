namespace Pokemon_Game
{
    internal class PokeBall : Item
    {
        public string Name { get; private set; }
        public int Price { get; private set; }
        public int Strength { get; private set; }


        public PokeBall(string name, int strength, int price)
        {
            Name = name;
            Price = price;
            Strength = strength;
        }
    }

    internal class TrainingBall : Item
    {
        public TrainingBall()
        {
            Name = "Training ball";
            Strength = 10;
            Price = 100;
        }
    }
    internal class GreatBall : Item
    {
        public GreatBall()
        {
            Name = "Great ball";
            Strength = 20;
            Price = 200;
        }
    }
    internal class UltraBall : Item
    {
        public UltraBall()
        {
            Name = "Ultra ball";
            Strength = 40;
            Price = 600;
        }
 
    }
    internal class MasterBall : Item
    {
        public MasterBall()
        {
            Name = "Master ball";
            Strength = 100;
            Price = 0;
        }
    }

}

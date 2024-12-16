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

        public int GetPrice()
        {
            return Price;
        }

    }

    internal class TrainingBall : PokeBall
    {
        public TrainingBall() : base("Training Ball", 10, 100)
        {

        }

    }
    internal class GreatBall : PokeBall
    {
        public GreatBall() : base("Great ball", 20, 200)
        {
        }

        public List<GreatBall> PrintTwentyGreatBalls()
        {
            List<GreatBall> greatBalls = new List<GreatBall>();
            for (int i = 0; i < 20; i++)
            {
                greatBalls.Add(new GreatBall());
            }

            return greatBalls;
        }
    }
    internal class UltraBall : PokeBall
    {
        public UltraBall() : base("Ultra ball", 40, 600)
        {
        }
 
    }
    internal class MasterBall : PokeBall
    {
        public MasterBall() : base("Master ball", 100, 0)
        {
        }
    }

}

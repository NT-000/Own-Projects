namespace Pokemon_Game
{
    internal class Shop
    {
        private Random rand = new Random();
        List<Item> _shopStockList = new List<Item>();
        private GreatBall _greatBall = new GreatBall();
        private UltraBall _ultraBall = new UltraBall();
        private TrainingBall _trainingBall = new TrainingBall();


        public Shop()
        {
            _shopStockList.AddRange(GenerateRandomItem<TrainingBall>(10, 20));
            _shopStockList.AddRange(GenerateRandomItem<GreatBall>(10, 20));
            _shopStockList.AddRange(GenerateRandomItem<UltraBall>(10, 20));
            _shopStockList.AddRange(GenerateRandomItem<Potion>(7, 20));
            _shopStockList.AddRange(GenerateRandomItem<SuperPotion>(10, 20));
            _shopStockList.AddRange(GenerateRandomItem<MegaPotion>(3, 10));
            _shopStockList.AddRange(GenerateRandomItem<MaxPotion>(3, 8));

        }

        public List<T> GenerateRandomItem<T>(int min, int max) where T : new()
        {
            List<T> item = new List<T>();
            int num = rand.Next(min, max);
            for (int i = 0; i < num; i++)
            {
                item.Add(new T());
            }
            return item;
        }

        public void ShowShopInventory(Trainer _trainer)
        {
            Console.WriteLine("PokeShop Inventory");
            int c = 1;
            foreach (var item in _shopStockList)
            {
                Console.WriteLine($"{c++}.Name:{item.Name} Strength:{item.Strength} Price:{item.Price}\n");
            }
        }


    }
}

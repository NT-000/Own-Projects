namespace Pokemon_Game
{
    internal class Shop
    {
        private Random _rand = new Random();
        List<Item> _shopStockList = new List<Item>();
        public string Line = new string('_', 60);

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
            int num = _rand.Next(min, max);
            for (int i = 0; i < num; i++)
            {
                item.Add(new T());
            }
            return item;
        }

        public void ShowShopInventory(Trainer trainer, int switchInput)
        {
            Console.WriteLine("PokeShop Inventory");
            Console.WriteLine($"{MoneyLeft(trainer)}");
            Console.WriteLine($"{Line}");
            var itemNameGroup = _shopStockList.GroupBy(item => item.Name).ToList();
            int c = 1;
            foreach (var item in itemNameGroup)
            {
                var itemSample = item.First();
                Console.WriteLine($"{c++}.{itemSample.Name} - Strength:{itemSample.Strength} - Price:{itemSample.Price} - Quantity:{item.Count()}\n");
            }

            Console.WriteLine($"{Line}");
            if (switchInput == 1)
            {
                BuyItem(trainer, switchInput, itemNameGroup);
            }
            else
            {
                SellItem(trainer, switchInput, itemNameGroup);
            }
        }

        public void BuyItem(Trainer trainer, int switchInput, List<IGrouping<string, Item>> list)
        {
            var selectedItem = SelectedItem(switchInput, list);
            Console.WriteLine($"How many of {selectedItem.Name} would you like to buy?");
            var inputCount = Convert.ToInt32(Console.ReadLine());
            var trainerMoney = trainer.GetMoney();
            var totalCost = selectedItem.Price * inputCount;
            for (int i = 0; i < inputCount; i++)
            {
                trainer.GetItemsList().Add(selectedItem);
            }
            trainer.SetDecreaseMoney(totalCost);

            Console.WriteLine(selectedItem.Price * inputCount <= trainerMoney
                ? $"You just bought {inputCount} x {selectedItem.Name} for {totalCost}!"
                : "You don't have enough money...");
        }

        private Item SelectedItem(int switchInput, List<IGrouping<string, Item>> list)
        {
            if (switchInput != 1 && switchInput != 2)
            {
                Console.WriteLine("Invalid input");
            }
            var choice = switchInput == 1
               ? "buy"
               : "sell";
            Console.WriteLine($"Type in the number of the item you would like to {choice}");
            var input = Convert.ToInt32(Console.ReadLine());
            var selectedGroup = list[input - 1];
            return selectedGroup.First();
        }

        public int MoneyLeft(Trainer trainer)
        {
            return trainer.GetMoney();
        }

        public void SellItem(Trainer trainer, int switchInput, List<IGrouping<string, Item>> list)
        {
            var selectedItem = SelectedItem(switchInput,list);

        }


    }
}

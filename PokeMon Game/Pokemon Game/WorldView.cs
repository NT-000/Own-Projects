namespace Pokemon_Game
{
    internal class WorldView
    {
        private string Grass { get; set; }
        private string Mud { get; set; }
        private string Water { get; set; }
        private string Lava { get; set; }
        private string Rock { get; set; }

        private string Gym { get; set; }

        public static List<Pokemon> WorldPokemonList { get; set; }

        public WorldView()
        {
            MenuWorld();
        }

        public void MenuWorld()
        {
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("Hi, what's your name?");
            string Input = Console.ReadLine();
            var _myTrainer = new Trainer($"{Input}", "From C-Town");
            var _pikachu = new ElectricPokemon.Pikachu();
            FirstEncounter(_myTrainer, _pikachu);
            bool isRunning = true;
            while (isRunning)
            {
                Console.WriteLine("1.Go to the wilderness");
                Console.WriteLine("2.Go the the gym");
                Console.WriteLine("3.Visit the Pokemon SHop");
                Console.WriteLine("4.Pokemon Healing Center");
                Console.WriteLine("5.Show Pokemon\n");
                var input = Convert.ToInt32(Console.ReadLine());
                switch (input)
                {
                    case 1:
                        WildernessMenu(_myTrainer);
                        break;
                    case 2:
                        GymMenu(_myTrainer);
                        _myTrainer.Environment = "gym";
                        break;
                    case 3:
                        ShopMenu(_myTrainer);
                        break;
                    case 4:
                        Console.WriteLine("Pokemon Healing Center");
                        break;
                    case 5:
                        _myTrainer.ShowTrainerPokemon();
                        break;
                    default:
                        Console.WriteLine("Invalid input.");
                        break;
                }
            }
        }

        public void WildernessMenu(Trainer _trainer)
        {
            bool isRunning = true;
            Console.WriteLine("1.Explore the forrest");
            Console.WriteLine("2.Explore the beach");
            Console.WriteLine("3.Head to the mountains");
            Console.WriteLine("4.Explore nearby cave");
            while (isRunning)
            {
                switch (Console.ReadLine())
                {
                    case "1":
                        break;
                    case "2":
                        break;
                    case "3":
                        break;
                    case "4":
                        break;
                    default:
                        Console.WriteLine("Heading back");
                        isRunning = false;
                        break;
                }
            }
        }
        public void GymMenu(Trainer _trainer)
        {
            var gymTrainerRock = new Trainer("Joe", "gym", "Joe is the first Gym Leader, he has rock pokemon", new List<Pokemon>() { new RockPokemon.Geodude(), new RockPokemon.Onix(), new RockPokemon.Rhyhorn() });
            var battle = new BattleManager();
            bool isRunning = true;
            Console.WriteLine("1.Fight the first Gym leader");
            Console.WriteLine("2.Fight the second Gym leader");
            Console.WriteLine("3.Fight the third Gym leader");
            Console.WriteLine("4.Fight the fourth Gym leader");
            while (isRunning)
            {
                switch (Console.ReadLine())
                {
                    case "1":
                        battle.BattleMenu(_trainer, gymTrainerRock);
                        break;
                    case "2":
                        break;
                    case "3":
                        break;
                    case "4":
                        break;
                    default:
                        Console.WriteLine("Heading back");
                        isRunning = false;
                        break;
                }
            }
        }
        public void FirstEncounter(Trainer _trainer, Pokemon pikachu)
        {
            Console.WriteLine($"{_trainer.Name}, you have encountered a wild Pokemon that has taken a likening to you!");
            Console.WriteLine($"Do you want to adopt this wild {pikachu.Name}?");
            string input = Console.ReadLine();
            Console.WriteLine($"Input received: '{input}'");
            if (input == "yes")
            {
                Console.WriteLine($"{pikachu.Name} in level {pikachu.Level} added to your pokemons!");
                _trainer.GetTrainerList().Add(pikachu);
            }
            else
            {
                Console.WriteLine($"{pikachu.Name} ran into the forrest, lost forever...");
            }
        }

        public void ShopMenu(Trainer _trainer)
        {
            bool isRunning = true;
            while (isRunning)
            {
                Console.WriteLine("Welcome to the PokeShop");
                Console.WriteLine("1.To buy");
                Console.WriteLine("2.To sell");
                Console.WriteLine("3.Leave");
                switch (Console.ReadLine())
                {
                    case "1":
                        break;
                    case "2":
                        break;
                    case "3":
                        new Shop().ShowShopInventory(_trainer);
                        break;
                    default:
                        isRunning = false;
                        break;
                }
            }
        }

        void PokeCenterMenu()
        {
            bool isRunning = true;
            while (isRunning)
            {
                Console.WriteLine("Welcome to the PokeCenter");
                Console.WriteLine("1.Heal your Pokemon");
                Console.WriteLine("2.Deposit Pokemon");
                Console.WriteLine("3.Withdraw Pokemon");
                Console.WriteLine("4.Leave");
                switch (Console.ReadLine())
                {
                    case "1":
                        break;
                    case "2":
                        break;
                    case "3":
                        break;
                    default:
                        isRunning = false;
                        break;
                }
            }
        }

    }

}

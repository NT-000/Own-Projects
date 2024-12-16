namespace Pokemon_Game
{
    internal class Trainer
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public List<Pokemon> TrainerPokemon { get; private set; }

        private List<Pokemon> DeadTrainerpokemon { get; set; }

        private List<Pokemon> DepositedPokemons { get; set; }
        private List<Item> Items { get; set; }

        private List<string> GymBadges { get; set; }
        private List<PokeBall> PokeBallsList { get; set; }

        private int Level { get; set; }
        public string Environment { get; set; }

        public Pokemon SelectedPokemon { get; private set; }

        private int Money { get; set; }

        public Trainer(string name, string description)
        {
            var trainingBall = new TrainingBall();
            Name = name;
            Description = description;
            TrainerPokemon = new List<Pokemon>(6);
            DeadTrainerpokemon = new List<Pokemon>();
            List<Pokemon> DepositedPokemons = new List<Pokemon>();
            Items = new List<Item>();
            PokeBallsList = new List<PokeBall>();
            GymBadges = new List<string>();
            SelectedPokemon = null;
            Environment = "none";
            Money = 1000;

        }
        public Trainer(string name, string environment, string description, List<Pokemon> pokemons)
        {
            TrainerPokemon = pokemons;
            DeadTrainerpokemon = new List<Pokemon>();
            Items = new List<Item>();
            GymBadges = new List<string>();
            PokeBallsList = new List<PokeBall>();
            Environment = environment;
            Level = 5;
            SelectedPokemon = TrainerPokemon[0];
            Money = Level * 100;
        }

        public void ShowTrainerPokemon()
        {
            Console.WriteLine($"{Name}'s Pokemon");
            foreach (Pokemon pokemon in TrainerPokemon)
            {
                Console.WriteLine($"\nName: {pokemon.Name}\n{pokemon.Description}");
            }
        }
        public void ChooseTrainerPokemon(Trainer trainer)
        {
            int counter = 1;
            Console.WriteLine($"{Name}'s Pokemon");
            foreach (Pokemon pokemon in TrainerPokemon)
            {
                if (pokemon.Hp > 0)
                {
                    Console.WriteLine($"\nName:{counter++}.{pokemon.Name}\n{pokemon.Description}");
                }
            }

            var index = Convert.ToInt32(Console.ReadLine());
            trainer.SelectedPokemon = TrainerPokemon[index - 1];
            Console.WriteLine($"You chose {TrainerPokemon[index - 1].Name}!");
        }

        public List<Pokemon> GetTrainerList()
        {
            return TrainerPokemon;
        }

        public List<Pokemon> GetDeadPokemonsList()
        {
            return DeadTrainerpokemon;
        }

    }
}

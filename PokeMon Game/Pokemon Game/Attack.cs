namespace Pokemon_Game
{
    public class Attack
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int Damage { get; set; }
        public string Type { get; set; }

        public Attack(string name, string description, int damage, string type)
        {
            Name = name;
            Description = description;
            Damage = damage;
            Type = type;
        }

        public void ExecuteAttack(string pokemonName, Pokemon opponentPokemon, Attack attack)
        {
            Console.WriteLine($"{pokemonName} used {Name} and inflicted {Damage} damage!");
            opponentPokemon.DamageTaken(attack.Damage, Type);
        }
    }
}

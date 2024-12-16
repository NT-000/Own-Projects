namespace Pokemon_Game
{
    public class Pokemon : IPokemon
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public int Level { get; private set; }

        public int Hp { get; private set; }

        public int Attack { get; private set; }

        public int Defence { get; private set; }

        public string Type { get; private set; }

        public int MaxHp { get; set; }

        public int MaxStamina { get; set; }

        public int Exp { get; set; }

        public List<Attack> Attacks = new List<Attack>();

        public Pokemon(string name, string description, int level, int hp, int attack, int defence, string type,
            int maxHp, int maxStamina, int exp)
        {
            Name = name;
            Description = description;
            Level = level;
            Hp = hp;
            Attack = attack;
            Defence = defence;
            Type = type;
            MaxHp = maxHp;
            MaxStamina = maxStamina;
            Exp = exp;
            Attacks = new List<Attack>();
        }

        public void GenerateRandomPokemonLvlBeginner(Random random)
        {
            var _grassPokemon = new List<Pokemon>();
            List<Pokemon> _randomListPokemons =
            [
                new RockPokemon.Geodude(), new RockPokemon.Onix(), new ElectricPokemon.Pikachu(),
                new WaterPokemon.Sqirtle(), new WaterPokemon.Sqirtle()
            ];
            var num = random.Next(_randomListPokemons.Count);
            for (var i = 0; i < 15; i++)
            {
                var blueprintPokemon = _randomListPokemons[num];
                var randomPokemon = new Pokemon(
                    blueprintPokemon.Name,
                    blueprintPokemon.Description,
                    random.Next(15, 25),
                    random.Next(75, 120),
                    random.Next(25, 60),
                    random.Next(25, 50),
                    blueprintPokemon.Type,
                    random.Next(75, 120),
                    100,
                    0
                );
                _grassPokemon.Add(randomPokemon);
            }
        }
        public string HpBar()
        {
            string hpBar = "";
            int hpBlocks = Hp * 10 / MaxHp;

            for (var i = 0; i < hpBlocks; i++)
            {
                if (i < hpBlocks)
                {
                    hpBar += "\u258c";
                }
                else
                {
                    hpBar += "";
                }
            }
            if (Hp < 0.1 * MaxHp)
            {
                Console.ForegroundColor = ConsoleColor.Red;
            }
            else if (Hp < 0.5 * MaxHp)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Green;
            }

            return hpBar;
        }
        public int GetHp()
        {
            return Hp;
        }

        public int GetMaxHp()
        {
            return MaxHp;
        }

        public void DamageTaken(int damage, string attackType)
        {
            double effectiveness = GetEffectiveness(attackType, Type);
            int calculatedDmg = (int)(damage * effectiveness);
            Hp -= calculatedDmg;
            Hp = Math.Max(Hp, 0);
            Console.WriteLine($"{Name} took {calculatedDmg} damage! Remaining HP: {Hp}/{MaxHp}");
        }
        private double GetEffectiveness(string attackerType, string tp)
        {
            if (attackerType == "Electric" && tp == "Water") return 2.0;
            if (attackerType == "Electric" && tp == "Rock") return 0.5;
            if (attackerType == "Electric" && tp == "Grass") return 0.5;
            if (attackerType == "Electric" && tp == "Electric") return 0.5;

            if (attackerType == "Fire" && tp == "Grass") return 2.0;
            if (attackerType == "Fire" && tp == "Rock") return 0.5;
            if (attackerType == "Fire" && tp == "Water") return 0.5;
            if (attackerType == "Fire" && tp == "Fire") return 0.5;


            if (attackerType == "Water" && tp == "Rock") return 2.0;
            if (attackerType == "Water" && tp == "Water") return 0.5;
            if (attackerType == "Water" && tp == "Fire") return 0.5;
            if (attackerType == "Water" && tp == "Grass") return 0.5;

            if (attackerType == "Grass" && tp == "Water") return 2.0;
            if (attackerType == "Grass" && tp == "Rock") return 2.0;
            if (attackerType == "Grass" && tp == "Fire") return 0.5;
            if (attackerType == "Grass" && tp == "Grass") return 0.5;

            return 1.0;
        }
    }





}

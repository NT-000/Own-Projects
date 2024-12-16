namespace Pokemon_Game
{
    internal class WaterPokemon : Pokemon
    {
        public WaterPokemon(string name, string description, int level, int hp, int attack, int defence, int maxHp, int maxStamina, int exp) :
            base(name, description, level, hp, attack, defence, "Water", maxHp, maxStamina, exp)
        {

        }

        internal class Sqirtle : WaterPokemon, IPokemon
        {
            public Sqirtle() : base("Squirtle", "A small turtle-like Water Pokémon.", 15, 100, 48, 65, 100, 100, 0)
            {
                Attacks = new List<Attack>(4)
                {
                    new Attack("Tackle", "Physical attack", 30, "Phychial"),
                    new Attack("Bubble", "A water based attack.", 35,"Water"),
                    new Attack("Water gun", "Shoots a powerful waterburst", 40, "Water")
                };



            }
        }

        internal class Psyduck : WaterPokemon
        {
            public Psyduck()
                : base("Psyduck", "A confused duck Pokémon with psychic powers.", 6, 50, 52, 48, 105, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Scratch", "Scratches the opponent with claws.", 30, "Normal"),
                new Attack("Water Gun", "Shoots a burst of water.", 40, "Water"),
                new Attack("Confusion", "Confuses the opponent.", 50, "Psychic"),
                new Attack("Disable", "Disables the opponent's move.", 0, "Status")
            };
            }
        }

        internal class Poliwag : WaterPokemon
        {
            public Poliwag()
                : base("Poliwag", "A tadpole Pokémon that can swim fast.", 5, 40, 50, 40, 95, 90, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Bubble", "A weak water-based attack.", 35, "Water"),
                new Attack("Hypnosis", "Puts the opponent to sleep.", 0, "Status"),
                new Attack("Water Gun", "Shoots a burst of water.", 40, "Water"),
                new Attack("Body Slam", "A powerful body attack.", 50, "Normal")
            };
            }
        }

        internal class Tentacool : WaterPokemon
        {
            public Tentacool()
                : base("Tentacool", "A jellyfish Pokémon that stings its enemies.", 7, 40, 40, 35, 90, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Poison Sting", "May poison the opponent.", 15, "Poison"),
                new Attack("Bubble Beam", "A stronger water-based attack.", 45, "Water"),
                new Attack("Acid", "Sprays acid on the opponent.", 40, "Poison"),
                new Attack("Wrap", "Wraps the opponent, dealing damage.", 30, "Normal")
            };
            }
        }

        internal class Staryu : WaterPokemon
        {
            public Staryu()
                : base("Staryu", "A starfish Pokémon that regenerates.", 8, 45, 55, 45, 100, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Tackle", "A basic physical attack.", 30, "Normal"),
                new Attack("Water Gun", "Shoots a burst of water.", 40, "Water"),
                new Attack("Swift", "Always hits the opponent.", 50, "Normal"),
                new Attack("Recover", "Heals some HP.", 0, "Status")
            };
            }
        }

    }
}

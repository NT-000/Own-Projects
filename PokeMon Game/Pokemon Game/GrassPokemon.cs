using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pokemon_Game
{
    internal class GrassPokemon : Pokemon
    {
        public GrassPokemon(string name, string description, int level, int hp, int attack, int defence, int maxHp, int maxStamina, int exp)
            : base(name, description, level, hp, attack, defence, "Grass", maxHp, maxStamina, exp)
        {
        }

        internal class Bulbasaur : GrassPokemon
        {
            public Bulbasaur()
                : base("Bulbasaur", "A seed Pokémon that uses vines and leaves.", 5, 45, 49, 49, 100, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Tackle", "A basic physical attack.", 30, "Normal"),
                new Attack("Vine Whip", "Whips the opponent with vines.", 45, "Grass"),
                new Attack("Growl", "Lowers the opponent's attack.", 0, "Status"),
                new Attack("Leech Seed", "Drains HP over time.", 0, "Grass")
            };
            }
        }

        internal class Oddish : GrassPokemon
        {
            public Oddish()
                : base("Oddish", "A small weed Pokémon that blooms at night.", 5, 40, 50, 55, 95, 90, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Absorb", "Drains HP from the opponent.", 20, "Grass"),
                new Attack("Poison Powder", "Poisons the opponent.", 0, "Poison"),
                new Attack("Stun Spore", "Paralyzes the opponent.", 0, "Status"),
                new Attack("Mega Drain", "Strong HP-draining attack.", 40, "Grass")
            };
            }
        }

        internal class Bellsprout : GrassPokemon
        {
            public Bellsprout()
                : base("Bellsprout", "A plant Pokémon that uses its vines to fight.", 6, 45, 55, 35, 90, 90, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Vine Whip", "Whips the opponent with vines.", 45, "Grass"),
                new Attack("Wrap", "Wraps the opponent to deal damage.", 30, "Normal"),
                new Attack("Sleep Powder", "Puts the opponent to sleep.", 0, "Status"),
                new Attack("Acid", "Sprays acid to lower defence.", 40, "Poison")
            };
            }
        }

        internal class Chikorita : GrassPokemon
        {
            public Chikorita()
                : base("Chikorita", "A leaf Pokémon with a calming aura.", 5, 49, 45, 50, 100, 95, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Tackle", "A basic physical attack.", 30, "Normal"),
                new Attack("Razor Leaf", "Shoots sharp leaves at the opponent.", 55, "Grass"),
                new Attack("Growl", "Lowers the opponent's attack.", 0, "Status"),
                new Attack("Synthesis", "Restores some HP.", 0, "Grass")
            };
            }
        }

        internal class Exeggcute : GrassPokemon
        {
            public Exeggcute()
                : base("Exeggcute", "A group of eggs with psychic abilities.", 7, 50, 60, 45, 100, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Confusion", "A psychic attack that may confuse.", 50, "Psychic"),
                new Attack("Stun Spore", "Paralyzes the opponent.", 0, "Status"),
                new Attack("Leech Seed", "Drains HP over time.", 0, "Grass"),
                new Attack("Barrage", "Throws seeds at the opponent.", 15, "Normal")
            };
            }
        }

        internal class Tangela : GrassPokemon
        {
            public Tangela()
                : base("Tangela", "A vine-covered Pokémon that is hard to hit.", 8, 55, 65, 55, 110, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Bind", "Wraps the opponent to deal damage.", 30, "Normal"),
                new Attack("Vine Whip", "Whips the opponent with vines.", 45, "Grass"),
                new Attack("Sleep Powder", "Puts the opponent to sleep.", 0, "Status"),
                new Attack("Giga Drain", "Drains a large amount of HP.", 75, "Grass")
            };
            }
        }
    }

}

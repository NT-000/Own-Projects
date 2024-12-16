using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pokemon_Game
{
    internal class ElectricPokemon : Pokemon
    {
        public ElectricPokemon(string name, string description, int level, int hp, int attack, int defence, int maxHp, int maxStamina, int exp)
            : base(name, description, level, hp, attack, defence, "Electric", maxHp, maxStamina, exp)
        {
        }

        internal class Pikachu : ElectricPokemon
        {
            public Pikachu()
                : base("Pikachu", "A small electric Pokémon with a lightning tail.", 5, 35, 55, 40, 100, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Thunder Shock", "A weak electric shock attack.", 40, "Electric"),
                new Attack("Quick Attack", "A fast physical attack.", 30, "Normal"),
                new Attack("Tail Whip", "Lowers the opponent's defense.", 0, "Status"),
                new Attack("Thunderbolt", "A strong electric attack.", 90, "Electric")
            };
            }
        }

        internal class Magnemite : ElectricPokemon
        {
            public Magnemite()
                : base("Magnemite", "A steel and electric Pokémon that floats in the air.", 6, 45, 50, 70, 100, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Tackle", "A basic physical attack.", 30, "Normal"),
                new Attack("Thunder Wave", "Paralyzes the opponent.", 0, "Status"),
                new Attack("Spark", "A jolt of electricity hits the opponent.", 50, "Electric"),
                new Attack("Magnet Bomb", "A steel attack that never misses.", 60, "Steel")
            };
            }
        }

        internal class Voltorb : ElectricPokemon
        {
            public Voltorb()
                : base("Voltorb", "A ball-shaped Pokémon that can explode.", 7, 40, 55, 50, 100, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Tackle", "A basic physical attack.", 30, "Normal"),
                new Attack("Charge", "Boosts electric attacks.", 0, "Status"),
                new Attack("Spark", "A jolt of electricity hits the opponent.", 50, "Electric"),
                new Attack("Self-Destruct", "A devastating explosion, but faints the user.", 120, "Normal")
            };
            }
        }

        internal class Electabuzz : ElectricPokemon
        {
            public Electabuzz()
                : base("Electabuzz", "A humanoid electric Pokémon with immense power.", 8, 60, 80, 55, 120, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Thunder Punch", "A punch charged with electricity.", 75, "Electric"),
                new Attack("Low Kick", "A physical attack that may cause flinching.", 50, "Fighting"),
                new Attack("Shock Wave", "An electric attack that never misses.", 60, "Electric"),
                new Attack("Thunder", "A powerful electric attack with high damage.", 110, "Electric")
            };
            }
        }

        internal class Jolteon : ElectricPokemon
        {
            public Jolteon()
                : base("Jolteon", "An electric Eevee evolution that moves lightning-fast.", 10, 65, 110, 60, 120, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Thunder Shock", "A weak electric shock attack.", 40, "Electric"),
                new Attack("Quick Attack", "A fast physical attack.", 30, "Normal"),
                new Attack("Pin Missile", "Launches sharp pins at the opponent.", 50, "Bug"),
                new Attack("Thunder Fang", "Bites the opponent with electrified fangs.", 65, "Electric")
            };
            }
        }
    }

}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pokemon_Game
{
    internal class FirePokemon : Pokemon
    {
        public FirePokemon(string name, string description, int level, int hp, int attack, int defence, int maxHp, int maxStamina, int exp)
            : base(name, description, level, hp, attack, defence, "Fire", maxHp, maxStamina, exp)
        {
        }

        internal class Charmander : FirePokemon
        {
            public Charmander()
                : base("Charmander", "A small flame-tailed Fire Pokémon.", 5, 39, 52, 43, 100, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Scratch", "Scratches the opponent with sharp claws.", 30, "Normal"),
                new Attack("Ember", "Shoots a small flame at the opponent.", 40, "Fire"),
                new Attack("Growl", "Lowers the opponent's attack.", 0, "Status"),
                new Attack("Flame Burst", "A small burst of fire.", 50, "Fire")
            };
            }
        }

        internal class Vulpix : FirePokemon
        {
            public Vulpix()
                : base("Vulpix", "A fox-like Pokémon with six tails.", 6, 38, 41, 40, 95, 95, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Quick Attack", "A fast physical attack.", 30, "Normal"),
                new Attack("Ember", "Shoots a small flame at the opponent.", 40, "Fire"),
                new Attack("Tail Whip", "Lowers the opponent's defence.", 0, "Status"),
                new Attack("Fire Spin", "Traps the opponent in a ring of fire.", 45, "Fire")
            };
            }
        }
        internal class Growlithe : FirePokemon
        {
            public Growlithe()
                : base("Growlithe", "A loyal dog-like Fire Pokémon.", 7, 55, 60, 45, 105, 100, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Bite", "Bites the opponent with sharp teeth.", 35, "Dark"),
                new Attack("Flame Wheel", "A spinning fiery attack.", 50, "Fire"),
                new Attack("Roar", "Forces the opponent to retreat.", 0, "Status"),
                new Attack("Ember", "Shoots a small flame at the opponent.", 40, "Fire")
            };
            }
        }

        internal class Ponyta : FirePokemon
        {
            public Ponyta()
                : base("Ponyta", "A horse-like Pokémon with fiery mane.", 8, 50, 65, 55, 110, 105, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Tackle", "A strong physical attack.", 30, "Normal"),
                new Attack("Flame Charge", "Charges at the opponent with fire.", 50, "Fire"),
                new Attack("Stomp", "Stomps the opponent with great force.", 45, "Normal"),
                new Attack("Fire Blast", "A powerful burst of fire.", 85, "Fire")
            };
            }
        }
        internal class Magmar : FirePokemon
        {
            public Magmar()
                : base("Magmar", "A fiery Pokémon with a burning body.", 10, 65, 95, 57, 120, 110, 0)
            {
                Attacks = new List<Attack>
            {
                new Attack("Smog", "Releases a cloud of poison gas.", 30, "Poison"),
                new Attack("Fire Punch", "Punches the opponent with a fiery fist.", 75, "Fire"),
                new Attack("Confuse Ray", "Confuses the opponent.", 0, "Status"),
                new Attack("Flamethrower", "Shoots a powerful stream of fire.", 90, "Fire")
            };
            }
        }
    }
}

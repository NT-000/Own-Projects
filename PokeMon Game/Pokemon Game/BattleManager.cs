using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;

namespace Pokemon_Game
{
    internal class BattleManager
    {
        private string _text = new string('_', 60);
        public BattleManager()
        {

        }
        public void DisplayStats(Trainer trainer, Trainer gymTrainerRock)
        {
            var opponent = gymTrainerRock.SelectedPokemon;
            var myPoke = trainer.SelectedPokemon;
            Console.WriteLine($"{opponent.Name} Lvl:{opponent.Level} HP:{opponent.HpBar()}{opponent.Hp}/{opponent.MaxHp}");
            Console.WriteLine($"{_text}");
            Console.WriteLine($"{myPoke.Name} Lvl:{myPoke.Level} HP:{myPoke.HpBar()} {myPoke.Hp}/{myPoke.MaxHp}");
        }

        public void BattleMenu(Trainer trainer, Trainer gymTrainerRock)
        {
            trainer.ChooseTrainerPokemon(trainer);
            var tPokemon = trainer.SelectedPokemon;
            var gPokemon = gymTrainerRock.SelectedPokemon;
            Console.WriteLine($"Selectedpokemon gymLeader:{gPokemon.Name}");
            Console.WriteLine("The battle begins");
            while (tPokemon.Hp > 0 || gPokemon.Hp > 0)
                DisplayAttackMenu(tPokemon, gPokemon);
                DisplayStats(trainer, gymTrainerRock);
                UseAttackOpponent(tPokemon, gPokemon);
            {   
            }

            if (gPokemon.Hp <= 0)
            {
                Console.WriteLine($"Opponents {gPokemon.Name} was defeated.");
                gymTrainerRock.GetDeadPokemonList().Add(gPokemon);
            }
            else if (tPokemon.Hp <= 0)
            {
                Console.WriteLine($"{tPokemon.Name} was defeated.");
                trainer.GetDeadPokemonList().Add(tPokemon);
            }
        }

        public void DisplayAttackMenu(Pokemon selectedPokemon, Pokemon gymPokemon)
        {   
            Console.WriteLine("Choose an attack");
            for (int i = 0; i < selectedPokemon.Attacks.Count; i++)
            {
                Console.WriteLine($"{i + 1}.{selectedPokemon.Attacks[i].Name}");
            }

            var attackIndex = Convert.ToInt32(Console.ReadLine());
            var attack = selectedPokemon.Attacks[attackIndex - 1];
            if (attackIndex >= 0 && attackIndex <= selectedPokemon.Attacks.Count)
            {
                gymPokemon.DamageTaken(attack.Damage, attack.Type);
                
            }
            else
            {
                Console.WriteLine("Invalid choice, choose again.");
            }
        }

        public void UseAttackOpponent(Pokemon selectedPokemon, Pokemon gymPokemon)
        {
            Random rand = new Random();
            int num = rand.Next(0, gymPokemon.Attacks.Count);
            var attack = gymPokemon.Attacks[num];
            selectedPokemon.DamageTaken(attack.Damage, attack.Type);
        }


    }
}

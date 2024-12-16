using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;

namespace Pokemon_Game
{
    internal class BattleManager
    {
        private string text = new string('_', 60);
        public BattleManager()
        {

        }
        public void DisplayStats(Trainer _trainer, Trainer gymTrainerRock)
        {
            var opponent = gymTrainerRock.SelectedPokemon;
            var myPoke = _trainer.SelectedPokemon;
            Console.WriteLine($"{opponent.Name} Lvl:{opponent.Level} HP:{opponent.HpBar()}{opponent.Hp}/{opponent.MaxHp}");
            Console.WriteLine($"{text}");
            Console.WriteLine($"{myPoke.Name} Lvl:{myPoke.Level} HP:{myPoke.HpBar()} {myPoke.Hp}/{myPoke.MaxHp}");
        }

        public void BattleMenu(Trainer _trainer, Trainer gymTrainerRock)
        {
            _trainer.ChooseTrainerPokemon(_trainer);
            var tPokemon = _trainer.SelectedPokemon;
            var gPokemon = gymTrainerRock.SelectedPokemon;
            Console.WriteLine($"Selectedpokemon gymLeader:{gPokemon.Name}");
            Console.WriteLine("The battle begins");
            while (tPokemon.Hp > 0 || gPokemon.Hp > 0)
                DisplayAttackMenu(tPokemon, gPokemon);
                DisplayStats(_trainer, gymTrainerRock);
                UseAttackOpponent(tPokemon, gPokemon);
            {   
            }

            if (gPokemon.Hp <= 0)
            {
                Console.WriteLine($"Opponents {gPokemon.Name} was defeated.");
                gymTrainerRock.GetDeadPokemonsList().Add(gPokemon);
            }
            else if (tPokemon.Hp <= 0)
            {
                Console.WriteLine($"{tPokemon.Name} was defeated.");
                _trainer.GetDeadPokemonsList().Add(tPokemon);
            }
        }

        public void DisplayAttackMenu(Pokemon _SelectedPokemon, Pokemon gymPokemon)
        {
            Console.WriteLine("Choose an attack");
            for (int i = 0; i < _SelectedPokemon.Attacks.Count; i++)
            {
                Console.WriteLine($"{i + 1}.{_SelectedPokemon.Attacks[i].Name}");
            }

            var attackIndex = Convert.ToInt32(Console.ReadLine());
            var attack = _SelectedPokemon.Attacks[attackIndex - 1];
            if (attackIndex >= 0 && attackIndex <= _SelectedPokemon.Attacks.Count)
            {
                gymPokemon.DamageTaken(attack.Damage, attack.Type);
                
            }
            else
            {
                Console.WriteLine("Invalid choice, choose again.");
            }
            Console.Clear();
        }

        public void UseAttackOpponent(Pokemon _selectedPokemon, Pokemon _gymPokemon)
        {
            Random rand = new Random();
            int num = rand.Next(0, _gymPokemon.Attacks.Count);
            var attack = _gymPokemon.Attacks[num];
            _selectedPokemon.DamageTaken(attack.Damage, attack.Type);
        }


    }
}

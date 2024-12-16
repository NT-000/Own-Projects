namespace Pokemon_Game
{
    internal class RockPokemon : Pokemon
    {
        public RockPokemon(string name, string description, int level, int hp, int attack, int defence, int maxHp,
            int maxStamina, int exp)
            : base(name, description, level, hp, attack, defence, "Rock", maxHp, maxStamina, exp)
        {
        }

        internal class Geodude : RockPokemon, IPokemon
        {


            public Geodude()
                : base("Geodude", "A rock-like Pokémon with strong defense.", 5, 120, 60, 100, 120, 80, 0)
            {
                Attacks = new List<Attack>
                {
                    new Attack("Tackle", "Physical attack.", 30, "Physical"),
                    new Attack("Rock Throw", "Throws small rocks at the opponent.", 40, "Rock"),
                    new Attack("Defense Curl", "Increases defense sharply.", 0, "Status")
                };
            }
        }


        internal class Onix : RockPokemon, IPokemon
        {


            public Onix() : base("Onix", "A giant rock snake Pokémon.", 7, 180, 45, 160, 180, 90, 0)
            {
                Attacks = new List<Attack>
                {
                    new Attack("Bind", "Wraps around the opponent.", 20, "Physical"),
                    new Attack("Rock Slide", "Hurls large rocks to deal damage.", 50, "Rock"),
                    new Attack("Screech", "Lowers opponent's defense sharply.", 0, "Status")
                };
            }
        }

        internal class Rhyhorn : RockPokemon, IPokemon
        {

            public Rhyhorn() : base("Rhyhorn", "A rock and ground type with immense strength.", 30, 170, 125, 95, 170, 100, 0)
            {
                Attacks = new List<Attack>
                {
                    new Attack("Horn Attack", "Charges with its horn.", 35, "Physical"),
                    new Attack("Stomp", "Stomps the opponent with massive weight.", 45, "Physical"),
                    new Attack("Rock Blast", "Fires small rocks repeatedly.", 50, "Rock")
                };
            }
        }
    }


}

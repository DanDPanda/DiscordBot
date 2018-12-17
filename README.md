# README WILL BE UPDATED!

Current features:

- Fortnite Tracker (API)
  - Purpose: I enjoy playing with my friends and youth from church, and I would like for them to easily be able to access their stats.
  - Tracks a user's solo, duo, squad, and lifetime stats using the Fortnite Tracker API.
  - Compare two user's stats using the Fortnite Tracker API.
  - Get weekly stats to track progress.

- Role Playing Game (JSON) *SCRAPPED*
  - Purpose: Create a minature game that users can play on discord. Rewards players for staying active on the discord.
  - Generate a boss that users can "attack" on a daily basis.
  - Players recharge "attacks" every night (manual reset).
  - Player and Boss information is stored in a JSON file.
  - Level up your character for attacking the boss.
  - Scrapped: Making a small game in a voice chat FOR playing games is kind of couter productive.
    - Also it required users to spam a lot.

- Pokemon Catching (mySQL)
  - Purpose: Give users a reason to stay active in the server without forcing them to commit a lot of time.
  - The pokemon number (id), name, time (rarity), image link, and evolved form id are stored in a mySQL table called pokemon.
  - Users become trainers when they attempt to catch their first pokemon and are stored in a mySQL table called trainer.
    - The user's id, equipped pokemon, and exp are stored in the table.
  - Pokemon randomly spawns on messages and is stored in a mySQL table called current_pokemon until a certain time passes.
  - Users can catch pokemon when they spawn, and that pokemon is added into a mySQL table called trainer_pokemon.
    - This table contained everybody's caught pokemons in the format (trainer_id, pokemon_number).
  - Users can view/present to others their current caught:total ratio, their current equipped pokemon, and their exp.
    - Users can see the full list of the pokemon that they caught in private.
  - Equipped pokemon are used to either show off or to evolve.
  - Equipped pokemon can be evolved when the user obtains enough EXP.
    - EXP can be gained by chatting in the discord.
  - Evolving a pokemon will add the evolved pokemon to the roster. Both pokemon will stay.

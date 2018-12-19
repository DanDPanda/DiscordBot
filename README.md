# README update is in progress!
## Last update: 12/18/2018

### Introduction:
This DiscordBot utilizes DiscordJS and MySQL to host itself. Please note that this was previously a private bot so there are a lot of hard-coded values. I will try my best to clear up those values so everyone can use it effectively! Before trying to use this bot, I highly recommend you understand these topics:
- DiscordJS
- MySQL
- RaspberryPi
- .env Files

### How to Get Started:
This section will be explored in the future.

### General Commands:
- !url
  - This command works in conjunction with the other projects DiscordWebsite and DiscordHost. It gets the URL of the DiscordWebsite.
- !ssh
  - This command works in conjunction with the other projects DiscordWebsite and DiscordHost. It gets the ssh url to the hosting computer.
- !activate
  - This command works in conjunction with the other projects DiscordWebsite and DiscordHost. It activates ssh to the hosting computer.

### Fortnite Commands:
- !fortwin <username> <platform>
  - This command presents the selected user's total wins on Fortnite.
- !fortsolo <username> <platform>
  - This command presents the selected user's current and lifetime solo statstics.
- !fortduo <username> <platform>
  - This command presents the selected user's current and lifetime duo statstics.
- !fortsquad <username> <platform>
  - This command presents the selected user's current and lifetime squad statstics.
- !fortlife <username> <platform>
  - This command presents the selected user's lifetime statstics.
- !forttracker
  - This command trackers a group of user's wins throughout the week. Requires database intervention to be used.
  
### Pokemon Commands:
- !catch
  - If a pokemon exists, this command catches the pokemon.
- !pokestats
  - Presents the current user's pokemon statistics (Pokemon Caught, Current Pokemon, etc.).
- !pokelist
  - Sends to the current user their full list of pokemon.
- !pokeset <pokemon number>
  - Equips a pokemon to the current user. Can be used to show off in the pokestats and is used to evolve pokemon.
- !pokevolve
  - Evolves the currently equipped pokemon to unlock a new pokemon.
  
### Rainbow 6 Commands (Work in Progress):
- !r6casual <username> <platform (uplay, xone, ps4)>
- !r6ranked <username> <platform (uplay, xone, ps4)>
- !r6stats <username> <platform (uplay, xone, ps4)>
- !r6operators <username> <operator name> <platform (uplay, xone, ps4)>

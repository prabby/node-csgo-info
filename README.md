******************************************
*                                        *
*          SRIHARI HUMBARWADI            *
*                                        *
*                                        *
******************************************

# node-csgo-info

## - This tool logs into your steam account with node-steam,fetches data from the CSGO game coordinator.
## - Works with bulk useraccounts

## Dependencies
- nodejs
- node-steam
- node-csgo
- fast-csv
- steam-community
- steam-user-inventory

## Usage
- To run the bot, just pass the steamuserid and password as command line parameters to the bot.js script.

  ```node bot.js <username> <password>```
- To run the bot in batch mode, a text file 'usernames.txt' should contain the usernames and passwords(space separated).Run the getinfo.sh to get the results written to 'output.csv', for windows use the provided powershell scriptl.


## NOTE
URL = `http://steamcommunity.com/inventory/${user}/${game}?l=english&count=5000`;
Use this endpoint instead the one provided in steam-user-inventory

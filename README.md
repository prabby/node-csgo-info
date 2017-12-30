#### node-csgo-info

# - This tool logs into your steam account with node-steam,fetches data from the CSGO game coordinator.
# - You can use this tool fetch matchmaking data for bulk accounts.

## Dependencies
- nodejs
- node-steam
- node-csgo

##
- To run the bot, just pass the steamuserid and password as command line parameters to the bot.js script.

  ```node bot.js <username> <password>```
- To run the bot in batch mode, a text file 'usernames.txt' should contain the usernames and passwords(space separated).Run the getinfo.sh to get the results written to 'output.txt'



Changes:

Concept included a timer unique to the local game session or MAC-Address, disabling their ability to start a new game.
Due to time crunch, I've been unable to get this function working. However, it isn't a crucial function.

Installation can be a bit of trial & error.
At current stage, I've been using the Command Prompt together with Visual Studio Code, using the Live Server extension developed by Ritwick Dey.

Next step will be to open up Visual Studio Code, and download the Live Server extension. Note that the author of it is Ritwick Dey!
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

When you've unzipped the project file, open up the folder in Visual Studio Code, and open up a Terminal view.
Inside the terminal, enter the command "node index.js".
This will simulate the server needed to prepare the game; the player score and questions will be fetched and stored.
Keep the server running while you play the game!

Open up the index html file in the program's explorer, and hit "Go Live" in the lower right corner of the VSC window.

The game will then open up in your browser, and you should be ready to play. Alternatively, you can type in the localhost port that'll be shown on that button.

If the Command Prompt states that you need specific packages, you can find them listed under package.json

NOTE:
At current time, in order to see your saved player score, you're gonna need to hit ctrl+c in the command prompt and re-enter "node index" to fetch the updated player score list.

If you play the game while the command prompt server isn't running, then your player score will not be saved, as it's pushed directly to the playerscore json file, which in turn is fetched once every time the server is booted up. This will eventually be polished.
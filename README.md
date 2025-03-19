Changes:

Concept included a timer unique to the local game session or MAC-Address, disabling their ability to start a new game.
Due to time crunch, I've been unable to get this function working. However, it isn't a crucial function.

Installation can be a bit of trial & error.
At current stage, I've been using the Command Prompt together with Visual Studio Code, using the Live Server extension developed by Ritwick Dey.

When you've unzipped the project file, open up Command Prompt and change the directory to the path up to IdiotKnowledge.
Then, enter the command "node index".
This will simulate the server needed for the game. THe player score and questions will then be fetched.
Keep the server running while you play the game!

Next step will be to open up Visual Studio Code, and download the Live Server extension.

Open up the index html file, and hit "Go Live" in the lower right corner of the VSC window.

The game will then open up in your browser, and you should be ready to play the game. Alternatively, you can type in the localhost port that'll be shown on that button.

If the Command Prompt states that you need specific packages, you can find them listed under Package.json

NOTE:
At current time, in order to see your saved player score, you're gonna need to hit ctrl+c in the command prompt and re-enter "node index" to fetch the updated player score list.
# AdaShip
A reimagined take on the classic game of Battleships.

![image](https://github.com/asherddesouza/AdaShip/assets/77273625/50901eb5-54d1-40b6-a966-fd5fd27ba96f)


## Challenge Outline & Proposed Solution
AdaShip is a two-player, turn-based game of sea warfare, where you and an opponent first place ships on your respective boards then take it in turns to destroy each other's ships by firing torpedoes at a space on the board every turn. 

A winner is crowned when they have destroyed all their opponent's ships.

My implementation of this has been developed using Next.js, which is a React framework that is widely used in industry. The main React-specific features that I used were:
- Components to compartmentalise the code into distinct sections and 'props' used to pass data between them
- The useState hook to manage global variables
- The useEffect hook to perform asynchronous updates

I chose to develop AdaShip in a JavaScript framework because I enjoy developing more visually engaging projects, and my career goal is to become a Frontend Developer.

---

### Fig. 1 - A UML-style diagram detailing different components and how they interact at a high-level
![image](https://github.com/asherddesouza/AdaShip/assets/77273625/2c618538-cc54-420a-9130-74bcf839a29f)

- Each box represents a file or Component, and the contents of the file detail the variables or States that are initialised
- The contents of each box are the States or variables that are defined by that specific Component.
- An arrow with a direction represents the flow of data being used, and an arrow without a direction indicates that the Components are defined within the same file.

## Working Plan
I used Git in the command line to make changes to my project, and had two branches, (`main` and `development`). The `main` branch contained the most 'stable' version of the codebase, and the `development` branch contained my proposed changes/additions.

My approach towards development was to work on the project every day that I was able to, and commit my changes to `development` once a sub-feature had been implemented. I also chose to split up my commits into multiple Pull Requests, which meant that commits of a similar nature were grouped together. After a PR had been completed, it was merged into the `main` branch where changes would once again be tested.

To ensure the quality of the project, I conducted manual regression tests before and after a major commit to ensure that the changes I had made didn't break the game. These regression tests involved:
- testing all previously implemented behaviour
- testing the newly added features to see how they interact with previous code

Although I never needed to, because I was committing my changes every day I could have reverted to a previous commit if I ran into an error that couldn't be fixed easily and wasn't present in a previous commit.

## Task Breakdown

The tasks needed to complete the project were split up into multiple ticketed Pull Requests, below is a brief summary of each:

### AS-001: Initialising Next.js workspace
- Used `create-next-app` to bootstrap a demo website with all the dependencies required to get started with Next.js

### AS-002: Setting up routing & other prerequisites
- Removed unnecessary boilerplate code and added the `adaship_config.ini` file

### AS-003: Parsing configuration file
- Created a function to parse the config file so that the board and ship sizes could be exported as an object

### AS-004: Add game board
- Added the player's game board by reading from the configuration file and creating a dynamically sized grid
- Added default handleClick behaviour to test
- Created preliminary buttons for Continue, Restart and Help

### AS-005: Adding help modal
- Added a modal that can be clicked at any time which displays some information on how to play the game

### AS-006: Implement functionality for buttons
- Started working on adding functionality to buttons, which are now Continue, RestartButton, ResetBoard, AutoPlace, AutoPlaceAll & HelpButton
- Created ErrorModal and MessageLog Components
- Created enemy TargetGrid Component
- Refactored codebase to have a `page.client.js` file which seperates Client and Server components within Next.js

### AS-007: user can add their own ships
- Continued work on Button implementations
- Refactored MessageLog component
- Developed ship placement checks for the Player, currently hardcoding autoPlace placements

### AS-008: User should be able to attack opponent ships
- Refactored MessageLog useState to be global instead of just linked to its Component
- Randomised autoPlace placements using a template grid (more detail below)
- Added functionality for the enemy grid to detect ship hits and misses, and change the icon (💣 or ❌) based on if the user successfully hit a ship or not.

### AS-009: Finalising gameplay logic
- Added randomised attacks & hit detection functionality to the PlayerGrid
- Added a turn-based system
- Added win or loss messages
- cleaned up unnecessary code

### AS-010: Final Cleanup
- removing unneeded parts of code

---

## Development
### Key Features:
### Parser
The parser function was one of the first to be implemented, but it was soon refactored for usability with config files with slightly different formats.

![ParserComparison](https://github.com/asherddesouza/AdaShip/assets/77273625/8657bf0a-ff05-44b9-a251-bf8579124b1c)
As shown above, the initial version relied on taking very specific characters from each line of the config file. Although this worked, it resulted in erratic behaviour if the config file provided was anything other than the standard provided one.

To refactor the function, I used RegEx to filter out non-numerical characters on each line rather than just reading the last characters to get the number. For calculating grid height and width, The line was filtered, halved and then split into grid_width and grid_height variables.

### Player & Target Grids:
Both the Player and Target Grids share some functionality, as detailed below.

Both grids are generated by reading the **width** and **height** props that are generated in the `page.js` file using the parser function. Each cell is also given a unique 'key' so that it can be identified during gameplay.

They also both share 'AutoPlace' functionality, which does not work in a truly random fashion, but rather by constraining ships to only certain positions which ships could possibly inhabit. The AutoPlace function was developed in this way so that ships would not have the risk of being placed too closely together. It also helps with another PlayerGrid-specific feature mentioned below. However, a flaw in this approach is that a user who only uses AutoPlace for a few ship placements runs the risk of being overriden by an automatic ship placement.

![image](https://github.com/asherddesouza/AdaShip/assets/77273625/efe23e3b-cd86-4114-b617-d94b29dd1b99)




Both Grids have a **checkShipMessage** method which runs every time the status of a **boatsRemaining** array changes. The variables in the array are set by the ship sizes found in the config file, and they are decremented whenever a hit is recorded by either Grid. Each time the function runs, it checks **boatsRemaining** to see if any boats have dropped to a count of 0 and if they have, another array that holds the destroyed status of different ships is updated (**boatsDestroyed**) and a message is displayed to the user which said `All opponent [specificShip]s destroyed`. 

When first building this, I ran into a bug where once that message was displayed, it would persist until all ships on a board had been destroyed, which wasn't helpful to the user since they no longer had a message saying what type of ship they hit. My workaround to this was to increment **boatsRemaining** by 1 and change the corresponding **boatsDestroyed** entry to true. Once all items **boatsDestroyed** are true, a win or loss message is displayed depending on whose ships were all destroyed.


### Player Grid Specifics

After the user has completed choosing all their ship positions on the board, placements are checked by evaluating the number of cells used per ship and also ensuring that the ships have been placed either vertically or horizontally. If these conditions aren't met, then an error message appears which the user can click on to restart the game.

![image](https://github.com/asherddesouza/AdaShip/assets/77273625/80893642-9888-427a-9e40-3299cc1378fb)

When it is the CPU's turn to attack, initially the attacks were randomly targeted at any place on the board that hadn't been before. This was fully functional, but it did make the game a bit too easy for the Player since the CPU's attacks were fully random. To rectify this, I modified the `enemyAttackLog` array's initial useState to include 5 cells where the enemy could never attack, which made it slightly more likely for the opponent to hit a user's ship.
![image](https://github.com/asherddesouza/AdaShip/assets/77273625/8d9c75b6-9dd6-4bfe-9d9a-2810bfc1bb81)
![board placement optimisations](https://github.com/asherddesouza/AdaShip/assets/77273625/e13159dc-947c-4cf5-85f0-d5d79b4a4dc3)

However, because my method of autoplacing ships means that ships can only go within a certain bound, it means that if the user chose to manually place their ships then there would be a risk that there would be cells on the player grid that the CPU could never attack. This has the side-effect that a user who has chosen to AutoPlace their ships will have a slightly higher chance of losing.


### CPU Grid Specifics

When it's the user's turn to attack, they can select any previously non-selected cell on the target grid. A click handler checks if the cell contained an enemy ship, then a 💣 icon is displayed and a ❌ if not.

## Evaluation

![image](https://github.com/asherddesouza/AdaShip/assets/77273625/abcdddab-38c6-4138-bd2b-7264d273df82)
Above is a screenshot of the game when the player has successfully destroyed their opponent's entire fleet. The user can clearly see the following which makes understanding the game flow easier:
- where their ships are
- where opponent ships are
- what ships were destroyed during combat
- a win message

My choice to develop my game in a GUI rather than a command line was because I prefer to develop software that can be used by anyone, not just people who are tech-savvy. For this reason, I also created a 'How To Play' modal so that people new to the game can learn how to play. The ship sizes on the modal are dynamic and will change depending on the contents of the `adaship_config.ini` file

Additionally, through some prior research I knew that some people with accessibility needs will primarily use their keyboards for navigation. Taking this into account, the `How To Play` modal can be closed by pressing the `Esc` key. In future iterations of this game, I will attempt to make the game more accessible by adding keyboard shortcuts to buttons and interactions.

![image](https://github.com/asherddesouza/AdaShip/assets/77273625/c0214786-2387-4472-9fa4-a12d5bc07577)


### Reflective Review
Overall, development of the project went well and I was able to learn a new JavaScript framework as well as practise using GitHub to manage my code. 

To improve my game further, I would want to make the following changes:
- Refactor the AutoPlace functions to be 'smarter' by adding more randomised positions for ships, rather than currently where distinct ships can only occupy certain cells but also spread the ships away from each other so that ships aren't bunched together
- Adding difficulty options which would work by modifying the size of the `enemyAttackLog` to restrict the places where the 'enemy' can attack, this would have to be built at the same time as the above modification
- Improve the UI to look more like a sea warfare game by creating custom game textures and sound effects

Developing this game has also helped me professionally, as I am now much more familiar with the React library which is widely used throughout the industry. As well as this, it has given me a much better understanding of how component parts of a codebase come together to create a unified product.



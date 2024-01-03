# AdaShip
A reimagined take on the classic game of Battleships.

## Challenge Outline & Proposed Solution
AdaShip is a two-player, turn-based game of sea warfare, where you and an opponent first place ships on your respective boards then take it in turns to destroy each other's ships by firing torpedoes every turn. 

A winner is crowned when they have destroyed all the opponent's ships.

My implementation of this has been developed using Next.js, which is a React framework that is widely used in industry. The main React-specific features that I used were:
- Components to compartmentalise the code into distinct sections and 'props' used to pass data between them
- The useState hook to manage global variables
- The useEffect hook to perform asynchronous updates

I chose to develop AdaShip in a JavaScript framework because I enjoy developing more visually engaging projects, and my career goal is to become a Frontend Developer.

---

### Fig. 1 - A UML-style diagram detailing different components and how they interact at a high-level
![image](https://github.com/asherddesouza/AdaShip/assets/77273625/2c618538-cc54-420a-9130-74bcf839a29f)

## Working Plan
I used Git in the command line to make changes to my project, and had two branches, (`main` and `development`)

My approach towards development was to work on the project every day that I was able to, and commit my changes to `development` at the end of the day. I also chose to split up my commits into multiple Pull Requests, which meant that commits of a similar nature were grouped together. After a PR had been completed, it was merged into the `main` branch.

To ensure the quality of the project, I ensured to test before and after making major changes. Although I never needed to, because I was committing my changes every day I could have reverted to a previous commit if I ran into an error that couldn't be fixed easily and wasn't present in a previous commit.

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
- Added functionality for the enemy grid to detect ship hits and misses, and change the icon (💣 or ❌) based on if the user successfully hit it or not.

### AS-009: Finalising gameplay logic
- Added randomised attacks & hit detection functionality to the PlayerGrid
- Added a turn-based system
- Added win or loss messages
- cleaned up unnecessary code

---



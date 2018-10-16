Requirerment:The game consists of:
● 2 Players - 1 vs cpu, 1 vs 2
● Each player has a grid on which to place ships - Toggle Tab between Player 1 and Player 2 view
● The game begins once both players have placed their ships
● The players take turns choosing a position on the opponent’s grid to attack - Toggle tab to select player board to attack
The result of an attack must be one of:
● “Hit” if the opponent has a ship covering the position - console log hit of total to sink ship.
● “Miss” if there is no ship covering the position - icon "BOOM" display on board to show missed.
● “Already Taken” if the position has previously been attacked - icon "BOOM" display on board to show missed.
● “Sunk” if all the positions a ship covers have been hit - icon "sinking ship" display on board to show sunk ship.
● “Win” if all the ships on the opponent's grid have been sunk - message display to point out winner

Instruction:
download file from github
https://github.com/hing-sf/battleShipt
unzip file and double click on index.html, this will open board game in browser
open dev console to view message. Mac/Chrome: alt + command + j
Option 1: 1 vs cpu
toggle default to 1 Player
select Start Game
Board game open as Player 1 view
    cpu ship has already been auto populated in Player 2 tab
select Player 1 ship location, bottom half of the board.
once ship selection completed, console will message Game Start
next click will fire player 2 ships
after fire, toggle tab to player 2
click CPU random fire to fire for cpu, toggle tab back to player 1
repeat above steps.

if player 1 hit player 2 ship, console will display # of total hits to sink. or vice versus
if hit = total to sink, sinking ship icon display in location.
the script then check # of ships on enemy board and how many ship already sunk. if the total # of ship sunk is the same as the length of ship in player object. Message under the header will display who won.

Option 2: 1 vs 1
select 2 Player
Start Game

the steps are the same as 1 vs cpu, the difference is the player 2 does not have option random fire to mimic cpu action.

the layout is very basic to display the interatcion of the game, much can be improved.




Shipt Engineering Coding Assessment
Thank you for taking part in the Shipt technical interview! The goal of this portion of the
interview is to give you an opportunity to demonstrate your software engineering skills,
especially around code organization, data structure use, problem solving and testing,
while optimizing for your time and energy. We will judge the submitted code as if it were
production ready code. Please refrain from using frameworks and libraries. Please
complete this in 5 business days. Reach out to your recruiter if you need more time.
Requirements
Create an implementation of the game Battleship. The game should be playable with at
least one person. For example, human vs computer or human vs human.
The game consists of:
● 2 Players - Done
● Each player has a grid on which to place ships - Toggle Tab between Player 1 and Player 2 view
● The game begins once both players have placed their ships
● The players take turns choosing a position on the opponent’s grid to attack - Toggle tab to select player board to attack
The result of an attack must be one of:
● “Hit” if the opponent has a ship covering the position - console log hit of total to sink ship.
● “Miss” if there is no ship covering the position - icon "BOOM" display on board to show missed.
● “Already Taken” if the position has previously been attacked - icon "BOOM" display on board to show missed.
● “Sunk” if all the positions a ship covers have been hit - icon "sinking ship" display on board to show sunk ship.
● “Win” if all the ships on the opponent's grid have been sunk - message display to point out winner
As is often the case, the given specification is ambiguous in regards to some details
about a game of Battleship. Feel free to add constraints as you see fit in order to clarify
the specification and limit the problem scope to something appropriate for your allotted
time.
Evaluation
Your solution will be evaluated on the following:
● Appropriate use of software design principles
● Proficiency with the chosen language and development stack
● Correctness - How do you verify the correctness of the solution?
● Maintainability - How easy is the solution to understand and modify?
● Extensibility - How easily could the solution be adapted to specification changes?
● Completeness - How much of the specification does the solution implement?
A user interface is not a requirement. Though your code should have some way of
demonstrating functionality such as log statements, unit tests, console output, etc. as
well as instructions for running the project.
Submission
You have a choice of options to submit your challenge:
● Commit your code to your personal GitHub account and send us a link at
coding@shipt.com
● Create a new GitHub account to commit your code and send us a link at
coding@shipt.com
● Save your challenge as a .zip file and send back to us at coding@shipt.com
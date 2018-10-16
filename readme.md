Language: Vanilla Javascript

Requirements: The game consists of:
● 2 Players - 1 vs cpu, 1 vs 2 : DONE
● Each player has a grid on which to place ships - Toggle Tab between Player 1 and Player 2 view : DONE
● The game begins once both players have placed their ships. Console will message Game Start after ships are set : DONE
● The players take turns choosing a position on the opponent’s grid to attack - Toggle tab to select player board to attack : DONE

The result of an attack must be one of:
● “Hit” if the opponent has a ship covering the position - console log hit of total to sink ship. : DONE
● “Miss” if there is no ship covering the position - icon "BOOM" display on board to show missed. : DONE
● “Already Taken” if the position has previously been attacked - icon "BOOM" display on board to show missed. : DONE
● “Sunk” if all the positions a ship covers have been hit - icon "sinking ship" display on board to show sunk ship. : DONE
● “Win” if all the ships on the opponent's grid have been sunk - message display to point out winner : DONE

Instruction to download and play game:
download file from my personal github account
https://github.com/hing-sf/battleShipt
unzip file and double click on index.html, this will open board game in the browser
open dev console to view message. Mac/Chrome: keyboard shortcut -  alt + command + j
Option 1: 1 vs cpu
toggle selection will default to 1 Player
select Start Game
Board game open as Player 1 view
    cpu ship has already been auto populated in Player 2 tab
select Player 1 ship location, bottom half of the board.
once ship selection completed, console will message Game Start
next click will fire missle at player 2 ships
after fire, toggle tab to player 2
click CPU random fire to fire for “cpu” player 2, toggle tab back to player 1
repeat above steps.

if player 1 hit player 2 ship, console will display # of total hits to sink. and vice versus
if hit = total to sink, sinking ship icon display in location.
the script then check # of ships on enemy board and how many ship already sunk. if the total # of ship sunk is the same as the length of ship in player object. Message under the header will display player that won.

Option 2: 1 vs 1
select 2 Player
Start Game

the steps are the same as 1 vs cpu, the difference is the player 2 does not have option random fire to mimic cpu action and player 2 need to select placements.

Additional options to game:
•	Number of ships per team. update line 22 in js file.
•	Number of hits to sink ship. update line 23 in js file.


Keep in mind the HTML and CSS is very minimal since it was not required in the challenge.

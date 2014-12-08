# Robattler

##Description

Robattler is a 2D fighting game where players battle with robots in single combat. These robots are controlled by scripts that the players write through __code blocks__.

This game requires a little programming knowledge but even if you have no formal education in programming languages, this game should be fairly straightforward to pick up.

Tutorials are not implemented yet due to time constraints. The end goal of Robattler is to be an educational game that is extremely fun. No boring elementary learning crap here. Our goal is to make it simple and intuitive, yet have a deep and fulfilling combat system. On completion, this game will deliver fast paced robot crushing mayhem.

### Getting started

###Stats

Each robot starts with these stats:
 - 100 HP
 - 10 AP

####HP
HP stands for hit points. They represent how much damage the robot can take before shutting down. You lose HP by getting hit by your opponent's attacks and you inflict damage on your opponent the same way. You win when you reduce your opponent's life to zero.

####AP
AP stands for action points. These represent what actions your robot can do per turn. Moving, attacking and blocking consume AP. Think of it as fuel. You replenish 10 AP per turn. You can have a maximum of 15 AP only.

###Code Blocks
The robot has the following code blocks categories ready to use in Program Mode: (ignore the ones marked advanced for now, since we have yet to implement this)

1. Logic - your basic conditional statement: if/else. Example: if enemy distance == 0, punch
2. Math - numbers you can use almost everywhere!
3.  Loops - for, while. Example: repeat while your ap >= 10, punch
4. Movement (Basic)
    - Forward
    - Back
5. Actions (Basic)
    - Block
    - Punch
    - Hammer
6. Analysis (Basic)
    - HP
    - AP
    - Distance
    - isBlocking
    - Position
7. Actions (Advanced)
    - Uppercut
    - Rotate Elbow
    - Rotate Shoulder
    - Fire laser
    - Charge laser
    - Aim laser
8. Movement (Advanced)
    - Crouch
    - Stand
9. Analysis (Advanced)
    - isCrouching
    - isCharging
    - isRotating
    - isAiming

### Movement
As you saw in Section 3 in the movement category you have a few commands available. To understand what these do, you must first understand the arena.

####The Arena

The arena is composed of tiles laid out like this:
PLAYER_ONE 1 2 3 4 5 5 4 3 2 1 PLAYER_TWO

Both players start at their respective tile number 3.

A player can move his robot to that column by using the movement commands forward and back.
If a player’s robot reaches column 1 of either side, he cannot move backwards anymore.

A player’s robot may only hit with attacks if it is adjacent to its opponent.

Back to the moves. Each of these will cost you 5 AP.
1. Forward - moves robot 1 column forward
2. Back - moves robot 1 column back

### Basic Actions and Combat

1. Block - block punches. Costs 5 AP.
If you perform movements after this, robot will not return to blocking mode except while crouched.
If this is the last movement you perform, you will start the next turn already blocking.
2. Punch - a punch to the head that deals 6 damage. Costs 5 AP.
Crouch Punch - this may be performed when your robot is crouching. Deals 5 damage. Costs only 5 AP.
3. Hammer - a hammerfist strike that deals 12 damage. Can't be blocked. Costs 10 AP.

###Analysis
Each player’s robot may analyze the other in order to try to predict what his or her opponent will do next. Analysis does not cost AP. You can analyze your own robot.

Most of the items in the analysis section are self explanatory, so example use cases will be provided here to justify their addition:

1. HP - Opponent has only 10 HP left, I should program my robot to move more aggressively.
2. AP - Opponent has been conserving AP. This means he is a heavy blocker or counter-hitter. I must find holes in his defense or use my laser more.
3. Distance - Opponent is 3 tiles away. Should expend AP on closing the gap.

###The Future

The vision for Robattler is to make educational games fun again. It will be to be highly customizable (create your own moves) using limb rotation. You will be able to battle other players AI via a VS Mode, tweak your own bot in Program Mode, fight random stock AI and occasionally some other players' AI in Arcade Mode, a profile page for your win/lose/draw rate and of course a leaderboard.

We plan to continue development of this game after the hackathon because we had a heck of a lot of fun programming it despite being up in the mountains for a company outing, multiple power outages and threats from typhoon Ruby.

We think this thing could be a hella lotta fun once polished.

##Screenshots

## API's used

- Phaser
- Google's Blockly

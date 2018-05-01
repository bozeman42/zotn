# Zombies of the North

## Description
Zombies of the North is a multiplayer, hunters vs zombies game to be played at conventions using QR coded game assets that are checked in via a webcam or HID QR code scanner. This application manages the players and all game assets. At this time I am not granting any license for this software. Copyright © 2018 Aaron Kvarnlov-Leverty

## Pre-requisites
1. Install postgres
2. Install npm / yarn
3. Requires either a webcam or a dedicated HID QR code scanner ([such as this](https://www.amazon.com/TEEMI-Automatic-Hands-free-presentation-Supermarket/dp/B073J7HTJR/ref=sr_1_9?ie=UTF8&qid=1525150436&sr=8-9&keywords=teemi%2Bbarcode%2Bscanner&th=1)) for data entry
## Instructions
1. Fork / clone the repository
2. Create the database according to the `zotn.sql` file.
3. run `yarn install` in the root directory
4. In another terminal window, navigate to the server directory and run `yarn start`
5. Run `yarn start` in the root directory
6. Navigate to `localhost:5000`
## Usage concept
This game is intended to be played at game conventions, specifically [Con of the North](http://www.conofthenorth.org/). Players check in to the system using their convention badge, which has a QR code on the front. In conventions without such a badge, player badges can be produced.

Players are assigned a faction and are issued a faction lanyard.
![](https://i.imgur.com/1UWBs1E.jpg)
*Faction lanyard prototypes*

Players interact as they move about the convention and interact through exchanges of QR coded assets and check in at game kiosks periodically to turn in zombie/hunter kills and purchase new supplies with in game credits.

# EmbAIrk Text Adventure
Embark on an unparalleled text adventure with our innovative game powered by GPT-3.5-turbo! Craft your unique journey by customizing health, enemies, and challenges using convenient presets. Take control as you seamlessly weave your narrative, enhancing the game with personalized modifications—shape the obstacles you confront and sculpt the vivid settings that envelope your story. The GPT-3.5-turbo model ensures an immersive experience, dynamically responding to your inputs, making every decision impactful. Unleash your creativity and relish the limitless possibilities in this next-level text adventure where the only limit is your imagination!

## Frontend - React


## Backend Server - Python
Requires the following libraries:
- sqlalchemy
- fastapi
- time
- openai
- tiktoken

To run server on port 8000: 
Utilizing the Run & Debug window in vscode, run the `Python: FastAPI` run configuration.


## Database
Create empty database called textadventure in phpMyAdmin (We hosted through XAMPP).
Click on Import, then upload the .sql file from the sql folder in our repo.
You don't need to change any other settings, once you have chosen the .sql file, hit import and you will have the login table and stored procedures that the textadventure game uses.
As long as the server/database is running through localhost (port 3306 by default, can be changed in database.py) in a database titled 'textadventure', the game should work.
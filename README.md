# EmbAIrk Text Adventure
Embark on an unparalleled text adventure with our innovative game powered by GPT-3.5-turbo! Craft your unique journey by customizing health, enemies, and challenges using convenient presets. Take control as you seamlessly weave your narrative, enhancing the game with personalized modifications—shape the obstacles you confront and sculpt the vivid settings that envelope your story. The GPT-3.5-turbo model ensures an immersive experience, dynamically responding to your inputs, and making every decision impactful. Unleash your creativity and relish the limitless possibilities in this next-level text adventure where the only limit is your imagination!

More information about each file can be found within the files' documentation.

## Frontend - React
Requires the following:
- React (use `create-react-app` command to create a React project)
- useState
- useEffect

To deploy the project, open a new terminal. Use the `cd` command to navigate to the folder containing the react app. Then, use `npm start` to launch to the web browser. By default, it runs on localhost:3000.


## Backend Server - Python
Requires the following libraries:
- pymysql (for database.py)
- fastapi["all"] (for api.py)
- openai (for gpt.py)
- tiktoken (for gpt.py)

To run the server: 
Utilizing the Run & Debug window in vscode, run the `Python: FastAPI` run configuration. By default, it runs on localhost:8000.


## Database
Create an empty database called 'textadventure' in phpMyAdmin (We hosted through XAMPP).
Click on Import, then upload the .sql file from the sql folder in our repo.
You don't need to change any other settings, once you have chosen the .sql file, hit import and you will have the login table and stored procedures that the textadventure game uses.
The game should work as long as the server/database is running through localhost (port 3306 by default, can be changed in database.py) in a database titled 'textadventure'.

The database has three columns. id (string of 16 random upper or lowercase letters), context (gpt context), and notes (user notes).

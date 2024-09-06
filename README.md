# TalentFind
TalentFind is an AI-based talent acquisition platform designed to help companies find the most suitable candidates for available positions. By using TalentFind, companies can increase the competence and expertise of their team. The platform also offers a feature for candidates to analyze their CVs, helping them find jobs and companies that match their profile.

# Teams
1. @[David](https://github.com/daviezu) as Backend Engineer
2. @[Nicholas Nelson](https://github.com/vnnico) as Project Manager and Frontend Engineer
3. @[Andrew Alfonso Lie](https://github.com/andrewal16) as AI Engineer

# Requirements
To make sure the program runs succesfully, please install these:
* node.js 18.x and above
* npm (Node Package Manager)
* Python 3.x
* pip (Python Package Installer)
* Visual Studio Code (IDE to run the project)

# How to run the program

1. Install Visual Studios Code
2. Clone this github url https://github.com/vnnico/TalentFind.git or download the file
3. Open in Visual Studios Code
4. Setting Project Path <br>
   Inside Visual Studio Code, do the following list:
   1. Backend
      - Open a terminal and change directory to backend folder using "cd backend"
        ```javascript
        cd backend
      - Installing the Required Packages
        Once the directory is set, install all required packages using npm install
        ```node
        npm install
      - if success, type "nodemon index" to run the backend server
        ```node
        nodemon index
        ```
        if failed, try using "node index" 
         ```node
         node index
         ```
      - The result of backend in terminal if run succesfully
         ```bash
         App listening on http://localhost:3000
         Database Connected
         ```
   2. Frontend
      - Open another terminal and change directory to backend folder using "cd backend"
        ```javascript
        cd frontend
        ```
        - Installing the Required Packages
          Once the directory is set, install all required packages using npm install 
        ```node
        npm install
        ```
        - Running the frontend server
          if success, type "npm run dev" to run the frontend server.
        ```node
        npm run dev
        ```
           The frontend server will run at http://localhost:5173/
   3. AI 
        - Open another terminal and change directory to backend folder using "cd backend"
       ```python
       cd AI
       ```
       - Installing the Required Packages
         Once the directory is set, install all required packages using the requirements.txt file.
      ```bash
      pip install -r requirements.txt
      ```
       - Running the AI server
         Run the flask server to start the website.
      ```python
      python ai.py
      ```
         The flask server will run at http://127.0.0.1:8000
5. How to run the website <br>
   Make sure all the 3 server (backend, frontend, and AI) is running properly. To try the website, use the HTTPS from the frontend server. <br>
   ```bash
   http://localhost:5173/ # frontend server
   ```
6. Test account <br>
   To login use this email and password below.

   ### Talent
      <pre><code>
         email: xavier@gmail.com
         password: xavier123
      </code></pre>
   ### Recruiter
      <pre><code>
         email: caiden@gmail.com
         password: caiden123
      </code></pre>

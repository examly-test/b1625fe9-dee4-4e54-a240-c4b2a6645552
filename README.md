# quiz-node-version
# Add quiz data
* The app is divided into two parts to add quiz data and user side
* The "Add quiz data" allows the user to add quiz topics in a multi layered way, where each quiz topic can have 3 difficulty levels: easy     medium and hard. Under each difficulty level there will be a chapter, under each chapter contains sections, under each section there will   quiz questions
* To use the AddQuizData, navigate into AddQuizData folder, "Run npm install and run npm run dev"
# User Side
* To use the user side, navigate into userside folder, "Run npm install and run npm start"
* On the user side, when the user logs in, by default every quiz subjects will be under difficulty level easy
* The user can change the difficulty level to either easy medium or hard, the difficulty level hard can be sometimes not available for       certain subjects, in that case the user will be prompted to choose another alternative difficulty level for the concerned subjects.
* The user can take tests, upon completion, the user will be taken to the results page, where the user has privilege to save or discard his   test results.
* To load the existing data for both AddQuizData and userside, navigate into the db_dumps folder and import the sql file into mysql workbench

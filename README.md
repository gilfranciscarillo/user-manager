# User manager
App for managing users

This app is created using PHP(CI4) for backend and ReactJS/Typescript for front end

SOLID principles applied
1. Single responsibility - controller class User is dedicated for user api requests in handling CRUD operation for user data
2. Decoupling(Dependency Injection/Removal) - Shared instance of user model is used and no new instance is used inside User controller class
3. Open/Close - User controller class is derived from a parent class ResourceController and overriden existing methods instead of changing the parent methods

# Setup
This app requires the following:
1. Composer for php dependency installer
2. Npm and nodejs for for installing package dependencies for front end part of the app

This app expects that a mysql server is available and running in the current environment. Then in the root folder of the project, you will see an sql file CreateDatabase.sql. Please run it's content to your mysql server. After running successfully, in the same folder location, you will see a .env file. Please fill out the corresponding mysql connection info for these configurations

database.default.hostname
database.default.database = usermanager
database.default.username 
database.default.password
database.default.port

Once configured, open a terminal of your choice. Before doing this, please make sure that composer, npm and nodejs is already installed in your computer. Then in your terminal, do the following steps

# Composer and npm
1. cd to usermanager then run "composer install"
2. cd to usermanager/js folder then run "npm install"

# Migration
1. cd to usermanager then run "php spark migrate"

# Execution
1. open a dedicated terminal then cd to usermanager then run "php spark serve"
2. open another dedicated terminal then cd to usermanager/js then run "npm run dev"
3. open a browser of your choice and navigate to http://localhost:5173

http://localhost:5173 - reactjs server
http://localhost:8080 - php backend api server 
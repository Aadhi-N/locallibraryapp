<h1 align="center">
  Local Library App
</h1>

##  :closed_book: Overview

    This app was created using:
    - Express
    - Mongoose/MongoDB
    - Pug
    - PassportJS
    - CSS
    - MVC pattern

    
## Description
**Link to application: [https://safe-citadel-71112.herokuapp.com/](https://safe-citadel-71112.herokuapp.com/)**

Local Library App is an application that uses Express as the Node web server, Mongoose as the database, and Pug as the templating engine. 

The purpose of this website is to provide an online catalog for a small local library, where users can browse available books and administrators can manage accounts and inventory. 

The app uses forms and authentication using cookies and passportJS.

## Note on source code/application 

The code is currently being developed, so exploring the live site or running the project locally will work, but not perfectly. 

*In progress:*
    *-work on authentication*
    *-CSS*


#### Run project locally:
Clone the repo to your local machine.
```
git clone https://github.com/Aadhi-N/locallibraryapp
cd locallibraryapp
```

Install all dependencies (using the `npm install` command).

Set local environment variables:
```
DB_USERNAME=***
DB_PASSWORD=***
SESSION_SECRET_KEY=***
MONGODB_URI=***
```
Start server:
```
DEBUG=locallibraryapp:* npm run devstart
open http://localhost:3000

```

### Dependencies

* Express
* Mongoose
* Pug
* Connect-Ensure-Login
* PassportJS



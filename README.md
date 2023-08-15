# GDspace
Board game inspired web app type thing.
(Work in progress)
---

### Dependencies:
This app uses the PERN stack!
<div id="stack" align="center">
    <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="PostgreSQL" alt="PostgreSQL" width="50" height="50"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express" alt="Express" width="50" height="50"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="50" height="50"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="50" height="50"/>&nbsp;
</div>
In addition, this app is using the following libraries/frameworks:

- [node-postgres](https://github.com/brianc/node-postgres)
- [cors](https://github.com/expressjs/cors)
- [dotenv](https://github.com/motdotla/dotenv)
- [node.bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)

- tbc...

---
### TODO:
##### SERVER:
- [ ] Player API endpoints
    - [x] create player
    - [x] Login
    - [x] password hashing
    - [ ] Auth
    - [x] read player
    - [x] update player
    - [x] delete player
- [ ] Games
- [ ] Maps
##### CLIENT:
- [ ] Login
    - [x] get api endpoint working
    - [x] bcrypt check login attempt
    - [x] client fetch request
    - [ ] authentication (JWT/Session)?
    - [ ] protected routes for logged in users

- [x] Registration
    - [ ] automatic login on successful registration
    - [ ] rate limiting?
          
- [ ] Player Page
    - [ ] basic user info lookup
    - [ ] logged in user dashboard (protected route)
        - [ ] update player info (name, password, etc.)
        - [ ] delete account
               
- [ ] Many more very ambitious features.

# Developing Alpha v1.0

## Converting to Nuxt.js
https://github.com/Makkoyev/usernames.online/tree/Nuxt.js

## Description:
It is an open source community where you can meet other users, review them, chat with them, ask questions and confess your sins :scream:. You will be able to sponsor your social network account for free to have even more followers.

## Community rules:
Usernames Online is a friendly community, which does not carry out any kind of discrimination based on sex or personal tastes. Everyone is welcome, but as in all the communities, there are few rules that need to be followed:

* It is strictly forbidden to spam, write meaningless messages and try to evade the automatic filter system.
* It is strictly forbidden to judge people based on their tastes, offend them or insult them. Remember that this is a friendly community, and this kind of attitude is not allowed.
* This community is not aimed at an adult audience, so anyone will be caught bothering, requesting or sharing nude content, will be immediately banned.

## URL
https://usernames.online


# DEV
## Packages
* Moment.js
* Animate.css
## Firebase Setup
Create initializeFirebase.js
```
import firebase from 'firebase/app'

export default firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
});
```
Then require it from main.js (choosing the right path):
```
require('./initializeFirebase');
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
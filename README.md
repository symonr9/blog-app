# Symon's Blog App

Link to Site: https://symon-blog.netlify.com/
Link to Demo and Screenshots: https://github.com/symonr9/blog-app/tree/master/docs
Backend Repository: https://github.com/symonr9/blog-app-backend

## This is a web application I created to act as a portfolio blog for my personal writing. 

![Browser Poetry Page](https://github.com/symonr9/blog-app/blob/master/docs/screenshots/browser_poetry_1.PNG)

## Technology Used

### Frontend
- React
- MaterialUI
- React Router
- React Redux
- axios

### Backend
- NodeJS
- Express
- MongoDB
- Mongoose


## Features

### Completed
- Full CRUD functionality for Poetry, Quotes, and Prose.
- Sort, Filter, and Search Functionality on Browse pages.
- Dynamic pagination on Browse pages.
- Dynamic navbar menu layout (hamburger bars for mobile).
- Word Lookup feature to search rhymes, synonyms, definitions, and more in Create Page (using WordsAPI).
- Normal and Side-By-Side View for Word Lookup.
- NodeJS Express Server integration with MongoDB.
- Document Model and Schema created by leveraging Mongoose.
- User Authentication (Login and Signup) and Tokens/Session Timeout.
- Comments and Reaction Integration on Individual Items Pages (using Disqus).
- Profile Page to list out user created items.
- Admin Dashboard where admins can perform CRUD functionality on any items.
- Mobile support to scale across iOS, Android, and tablets.
- Responsive screen size.
- Standalone PWA on mobile devices.
- Splashscreen Prompt on Mobile Device Browsers prompting to install app on homescreen.
- CI Deployment to Netlify and Heroku.

### In Development

#### Had we but world enough and time...
- [ ] Upload Documents
- [ ] Color Scheme User Personalization 
- [ ] Enhancements to User Profile
- [ ] Uploadable images to pair with items


## Development

- Note: Please install node and npm onto your computer. If you need help doing this, check this (article)[https://phoenixnap.com/kb/install-node-js-npm-on-windows] out. 

1. Clone the project to your local directory (EX: In a folder you created called 'blog').
2. Run `npm i` in the root directory.
3. Create a .env file in your project root directory (in blog-app, not src) with the following content: `PORT=1996`.
4. Go to `blog-app/src/config/config.js` and set `isDevelopmentServer` to true.
5. Set-up the local development server by performing the following steps:
  - Clone the [Backend Repo](https://github.com/symonr9/blog-app-backend) to your local directory (EX: In a folder you created called 'blog', not in the blog-app directory).
  - Run `npm i` in the root directory.
  - Create a .env file in the project root directory (in blog-app-backend, not src) with content for the following environmental variables: `MONGOURI` and `RAPIDAPIKEY`. These variables access the mongoDB URI and APIs from RapidAPI respectively.
  - Run `npm start` to begin the server. 
6. Run `npm start` run the project on local host.



## Notes

- This project was bootstrapped with Create React App.
- `npm run build` will build the app for production to the build folder.
- I eagerly welcome any suggestions, comments, and insights! I'm always looking to learn more about modern web application development and best practices. Thank you for taking the time to look through my code and check out my site. 

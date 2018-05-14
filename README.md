# Cookbook

A Full Stack social recipe sharing app that let's you follow your friends' recipes, fork them (put your own spin on a recipe), and create cooking events that are referred to as potlucks. 

![Alt text](./assets/cookbook.gif?raw=true "Landing Page")

## Features


### User Authentication 

Modals are used for login and registration. Using bcrypt, user passwords are hashed and salted. 

![Alt text](./assets/cookbooklogin.gif?raw=true "Login")


### Notifications 

Users are notified when they are invited to a Potluck, one of their recipes is favorited, they receive a comment on a recipe post, or when they have a new follower. 

![Alt text](./assets/cookbook-notification.gif?raw=true "Notifications")


### Live Search 

Using the react-autosuggest module, users can search for recipes by recipe name or other users by username or full name. With each key press, a fetch request is made and the results that are displayed are live updated.  

![Alt text](./assets/cookbook-search.gif?raw=true "Live Search")


### Like and Comment 

Users can favorite or unfavorite recipes by clicking on the heart icon. The number of likes is displayed next to the heart. At the bottom of each recipe, users can also add comments. 

![Alt text](./assets/cookbook-likefinal.gif?raw=true "Like/Comment")


### Add recipes

Users add new recipes filling out ingredients, directions, etc in the add recipe form. They have the option to mark the recipe as vegeterian or vegan, as well as whether it can be forked by other users. 

![Alt text](./assets/cookbook-addrecipe.gif?raw=true "Add Recipe")


### Events aka Potlucks

Potlucks allow users to create events where they invite friends that they are following and add food items they would like invitees to bring. Potluck pages display the date, time, and location of the potluck as well as the invitee and things to bring lists. Invitees change their RSVP status and and can invite friends. 

![Alt text](./assets/cookbook-potluck.gif?raw=true "Potluck RSVP/Add")

In the "Things to Bring" section of potlucks, users can sign up or remove their sign ups for specific things and even suggest new things to bring to the Potluck. 

![Alt text](./assets/cookbook-potluckthings.gif?raw=true "Potluck Things To Bring")


### Fork Recipes 

Forking a recipe is make a copy of a recipe and put your own twist on it. 

![Alt text](./assets/cookbook-fork.gif?raw=true "Fork")


### User Profile Page

View a user's recipes sorted by top and most recent. Also view the recipes they have favorited. The user profile page also provides information on how many followers and following a specific user has. 

![Alt text](./assets/cookbook-profile.gif?raw=true "Profile")

## Getting Started 

```
git clone git@github.com:lmaciejak/Cookbook.git
cd Cookbook/backend 
npm install
npm start 

In a new terminal: 
cd frontend
npm install 
npm start
```

## Authors 

* [Luiza Maciejak](https://github.com/lmaciejak)
* [Xavier Munroe](https://github.com/XavierC4Q)
* [Umed Ibrohimov](https://github.com/hackrack)
* [Eion Contaste](https://github.com/EroStark)
* [Shaedon Blackman](https://github.com/sblackstealth)



## Acknowledgements 

* [Lev Izraelit](https://github.com/lizraeli)
* [Reed Gaines](https://github.com/crymall)



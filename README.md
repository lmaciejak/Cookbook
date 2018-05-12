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

![Alt text](./assets/cookbook-addrecipe.gif?raw=true "Like/Comment")
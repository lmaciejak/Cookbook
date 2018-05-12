# Cookbook

A Full Stack social recipe sharing app that let's you follow your friends' recipes, fork them (put your own spin on a recipe), and create cooking events that are referred to as potlucks. 

![Alt text](./assets/cookbook.gif?raw=true "Landing Page")

### User Authentication 

Modals are used for login and registration. Using bcrypt, user passwords are hashed and salted. 

![Alt text](./assets/cookbooklogin.gif?raw=true "Login")

### Notifications 

Users are notified when they are invited to a Potluck, one of their recipes is favorited, they receive a comment on a recipe post, or when they have a new follower. 

![Alt text](./assets/cookbook-notification.gif?raw=true "Notifications")


### Live Search 

Using the react-autosuggest module, users can search for recipes by recipe name or other users by username or full name. With each key press, a fetch request is made and the results that are displayed are live updated.  

## Forking 



var express = require('express');
var router = express.Router();
var db = require('../db/queries')
const {
  loginRequired
} = require("../auth/helpers");


/*GET Request*/
router.get('/logout', loginRequired, db.logoutUser)
router.get('/profile/:userID', db.getSingleUser)
router.get('/profile/:userID/favorites', db.getSingleUserFavorites)
router.get('/followers/:userID', db.getFollowers)
router.get('/following/:userID', db.getFollowing)
router.get('/comment/:recipeID', db.getRecipeComments)
router.get('/allusers', db.getAllUsers);
router.get('/allrecipes', db.getAllResipes);
router.get('/allrecipes/:userID', db.getAllResipesByUserID);
router.get('/allfollowersrecipes/:userID', db.getAllFollowersRecipes);


/*POST Request*/
router.post('/register', db.registerUser)
router.post('/addComment/:recipeID', loginRequired, db.addRecipeComment)
router.post('/removeComment/:recipeID', loginRequired, db.removeRecipeComment)
router.post('/addRecipe', loginRequired, db.addRecipe)
router.post('/removeRecipe', loginRequired, db.removeRecipe)
router.post('/favorite', loginRequired, db.favoriteRecipe)
router.post('/unfavorite', loginRequired, db.unfavoriteRecipe)
router.post('/followUser', loginRequired, db.followUser)
router.post('/unfollowUser', loginRequired, db.unfollowUser)
router.post('/login', db.loginUser)

/*PATCH Request*/
router.patch('/edit/:userID', loginRequired, db.editUser)
router.patch('/editRecipe/:recipeID', loginRequired, db.editRecipe) // route altered
router.patch('/editComment/:commentID', loginRequired, db.editRecipeComment) // route altered

module.exports = router;

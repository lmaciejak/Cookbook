const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");


/* -------------------------------GET Requests----------------------------------- */

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function getSingleUser(req, res, next) {
  db.any(`SELECT user_id, username, email, first_name, last_name
          FROM users
          WHERE user_id=$1`, [req.params.userID])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getSingleUserFavorites(req, res, next) {
  db.any(`SELECT recipe_name, recipe, img
          FROM recipes
          INNER JOIN favorites ON(recipes.recipe_id=favorites.recipe_id)
          INNER JOIN users ON(users.user_id=favorites.user_id)
          WHERE users.user_id=$1`, [req.params.userID])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getFollowers(req, res, next) {
  db.any(`SELECT user_id, username, email, first_name, last_name
          FROM users
          INNER JOIN followings ON(users.user_id=followings.follower_id)
          WHERE followee_id=$1;`, [req.params.userID])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getFollowing(req, res, next) {
  db.any(`SELECT user_id, username, email, first_name, last_name
          FROM users
          INNER JOIN followings ON(users.user_id=followings.followee_id)
          WHERE follower_id=$1`, [req.params.userID])
  .then(data => {
    res.json(data);
  })
  .catch(error => {
    res.json(error);
  });
}

function getRecipeComments(req, res, next) {
  db.any(`SELECT comment
          FROM comments
          INNER JOIN recipes ON(recipes.recipe_id=comments.recipe_id)
          WHERE recipes.recipe_id=$1;`, [req.params.recipeID])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getAllUsers(req, res, next) {
  db.any(`SELECT USER_id, username, email, first_name, last_name
          FROM users;`)
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            res.json(error);
          });
}

function getAllResipes(req, res, next) {
  db.any(`SELECT *
          FROM recipes;`)
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            res.json(error);
          });
}

function getAllResipesByUserID(req, res, next) {
  db.any(`SELECT *
          FROM recipes
          WHERE user_id=${req.params.userID};`)
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            res.json(error);
          });
}

function getAllFollowersRecipes(req, res, next) {
 db.any(`SELECT recipe_name, recipes.recipe_id, recipe, recipe_name, img, recipe_timestamp, isVegeterian, 
 isVegan, COUNT(favorites.recipe_id) AS favorites_count, users.username, users.user_id
        FROM recipes
        JOIN favorites
        ON recipes.recipe_id = favorites.recipe_id
        JOIN users 
        ON recipes.user_id = users.user_id
        WHERE recipes.user_id IN (SELECT followee_id
                          FROM followings
                          WHERE follower_id =${req.params.userID})
 GROUP BY recipes.recipe_id, users.user_id
 ORDER BY recipe_timestamp DESC;`)
         .then(data => {
           res.json(data);
         })
         .catch(error => {
           res.json(error);
         });
}

function getUser(req, res, next) {
  db.any(`SELECT user_id, username, email, first_name, last_name
          FROM users
          WHERE user_id=$1`, [req.user.user_id])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getSortedRecipes(req, res, next) {
  db.any(`SELECT
          COUNT(recipes.recipe_id)
          AS favorites_count, recipe_name, recipe, img, USERs.username
          FROM recipes
          INNER JOIN favorites ON(recipes.recipe_id=favorites.recipe_id)
          INNER JOIN users
          ON(recipes.user_id=users.user_id)
          WHERE recipes.recipe_id IN (SELECT recipes.recipe_id FROM recipes)
          GROUP BY recipes.recipe_id, users.username
          ORDER BY favorites_count DESC;`)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

/*-------------------------------POST Request----------------------------------*/

function registerUser(req, res, next) {
  return authHelpers
    .createUser(req)
    .then(response => {
      passport.authenticate("local", (err, user, info) => {
        if (user) {
          res.status(200).json({
            status: "success",
            data: user,
            message: "Registered one user"
          });
        }
      })(req, res, next);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        detail: err.detail
      });
    });
}

function addRecipeComment(req, res, next) {
  return db.none(
    "INSERT INTO comments (recipe_id, user_id, comment) VALUES (${recipe_id}, ${user_id}, ${comment})",
    {
      recipe_id: req.params.recipeID,
      user_id: req.user.user_id,
      comment: req.body.comment
    }
  )
    .then(data => {
      res.json("success");
    })
    .catch(error => {
      res.json(error);
    });
}

function removeRecipeComment(req, res, next) {
  return db.none(
    "DELETE FROM comments WHERE recipe_id=$1;",
    [req.params.recipeID] )
    .then(data => {
      res.json("deleted");
    })
    .catch(error => {
      res.json(error);
    });
}

function addRecipe(req, res, next) {
  return db.one(
    "INSERT INTO recipes (user_id, recipe_name, recipe, img, isvegeterian, isvegan)"
    + " VALUES (${user_id}, ${recipe_name}, ${recipe}, ${img}, ${isvegeterian}, ${isvegan})"
    + " RETURNING recipe_id",
    {
      user_id: req.body.user_id,
      recipe_name: req.body.recipe_name,
      recipe: req.body.recipe,
      img: req.body.img,
      isvegeterian: req.body.isvegeterian,
      isvegan: req.body.isvegan
    }
  )
  .then(data => {
     res.json({recipe_id: data.recipe_id});
  })
  .catch(error => {
    res.json(error);
  });
}

function addIngredients(req, res, next) {
  return db.task(t => {
      const ingredients  = JSON.parse(req.body.ingredients);
      const queries = ingredients.map(ingredient => {
            return t.none("INSERT INTO ingredients (recipe_id, amount, name, notes) "
            + " VALUES (${recipe_id}, ${amount}, ${name}, ${notes})",
            {
              recipe_id: req.params.recipeID,
              // food_id: req.body.food_id,
              amount: ingredient.amount,
              name: ingredient.name,
              notes: ingredient.notes
            }
          );
      });
      return t.batch(queries);
    })
    .then(data => {
      res.json("success");
    })
    .catch(error => {
      res.json(error);
    });
}

function removeRecipe(req, res, next) {
  return db.none(
    "DELETE FROM recipes WHERE recipe_id=$1;",
    [req.body.recipe_id]
  )
  .then(data => {
    res.json("deleted");
  })
  .catch(error => {
    res.json(error);
  });
}

function favoriteRecipe(req, res, next) {
  return db.none(
    "INSERT INTO favorites (recipe_id, user_id) VALUES (${recipe_id}, ${user_id});",
    {
      recipe_id: req.body.recipe_id,
      user_id: req.user.user_id
    }
  )
  .then(data => {
    res.json("success");
  })
  .catch(error => {
    res.json(error);
  });
}

function unfavoriteRecipe(req, res, next) {
  return db.none(
    "DELETE FROM favorites WHERE favorites_id=$1;",
    [req.body.favorites_id]
  )
  .then(data => {
    res.json("deleted");
  })
  .catch(error => {
    res.json(error);
  });
}

function followUser(req, res, next) {
  return db.none(
    "INSERT INTO followings (follower_id, followee_id) VALUES (${follower_id}, ${followee_id})",
    {
      follower_id: req.user.user_id,
      followee_id: req.body.user_id
    }
  )
  .then(data => {
    res.json("success");
  })
  .catch(error => {
    res.json(error);
  });
}

function unfollowUser(req, res, next) {
  return db.none(
    "DELETE FROM followings WHERE follows_id=$1;",
    [req.body.follows_id]
  )
  .then(data => {
    res.json("deleted");
  })
  .catch(error => {
    res.json(error);
  });
}

function loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.log(err);
        res.status(500).send("error while trying to log in");
      } else if (!user) {
        res.status(401).send("invalid username/password");
      } else if (user) {
        req.logIn(user, function(err) {
          if (err) {
            res.status(500).send("error");
          } else {
            res.status(200).send(user);
          }
        });
      }
    })(req, res, next);
}

/*------------------------------PATCH Request-----------------------------------*/

function editUser(req, res, next) {
  return db.none(
    `UPDATE users
     SET username=$1, password=$2, email=$3, first_name=$4, last_name=$5
     WHERE user_id=${req.params.userID};`,
    [
      req.body.username, req.body.password,
      req.body.email, req.body.first_name,
      req.body.last_name
    ]
  )
  .then(data => {
    res.json("success");
  })
  .catch(error => {
    res.json(error);
  });
}

function editRecipe(req, res, next) {
  return db.none(
    `UPDATE recipes
     SET user_id=$1, recipe_name=$2, recipe=$3, img=$4, isvegeterian=$5, isvegan=$6
     WHERE recipe_id=${req.params.recipeID};`,
    [
      req.body.user_id, req.body.recipe_name,
      req.body.recipe, req.body.img,
      req.body.isvegeterian, req.body.isvegan
    ]
  )
  .then(data => {
    res.json("success");
  })
  .catch(error => {
    res.json(error);
  });
}

function editRecipeComment(req, res, next) {
  return db.none(
    `UPDATE comments
     SET recipe_id=$1, user_id=$2, comment=$3
     WHERE comments_id=${req.params.commentID};`,
    [
      req.body.recipe_id,
      req.body.user_id,
      req.body.comment
    ]
  )
  .then(data => {
    res.json("success");
  })
  .catch(error => {
    res.json(error);
  });
}


module.exports = {
  logoutUser,
  getSingleUser,
  getSingleUserFavorites,
  getFollowers,
  getFollowing,
  getRecipeComments,
  registerUser,
  addRecipeComment,
  removeRecipeComment,
  addRecipe,
  addIngredients,
  removeRecipe,
  favoriteRecipe,
  unfavoriteRecipe,
  followUser,
  unfollowUser,
  loginUser,
  editUser,
  editRecipe,
  editRecipeComment,
  getAllUsers,
  getAllResipes,
  getAllResipesByUserID,
  getAllFollowersRecipes,
  getUser,
  getSortedRecipes,
};

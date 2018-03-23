const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");


/* -------------------------------GET Requests----------------------------------- */

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function isFavorite(req, res, next) {
  console.log("fire from isFavorite");
  console.log(req.params);
  db.any(`SELECT *
          FROM favorites
          WHERE user_id=${req.user.user_id}
          AND recipe_id=${req.params.recipeID};`)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
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

function getFolloweeById(req, res, next) {
  db.any(`SELECT *
      FROM followings
      WHERE follower_id=$1 AND followee_id=$2`,[req.params.userID,req.params.followeeID])
      .then(data => {
        res.json(data)
      })
      .catch(error => {
        res.json(error)
      })
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
 db.any(`SELECT recipe_name, recipes.recipe_id, description,
           recipe, recipe_name, img, recipe_timestamp,
           isVegeterian, isVegan,
        COUNT(favorites.recipe_id)
        AS favorites_count, users.username, users.user_id
        FROM recipes
        INNER JOIN favorites
        ON recipes.recipe_id = favorites.recipe_id
        INNER JOIN users
        ON recipes.user_id = users.user_id
        WHERE recipes.user_id
        IN (SELECT followee_id
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
  console.log(req.user)
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
          AS favorites_count, recipe_name, recipe, img, users.username, description, recipes.recipe_id, users.user_id
          FROM recipes
          INNER JOIN favorites ON(recipes.recipe_id=favorites.recipe_id)
          INNER JOIN users
          ON(recipes.user_id=users.user_id)
          WHERE recipes.recipe_id IN (SELECT recipes.recipe_id FROM recipes)
          GROUP BY recipes.recipe_id, users.username, users.user_id
          ORDER BY favorites_count DESC;`)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}


function searchByRecipe(req, res, next) {
  db.task('get-everything', t => {
    return t.batch([
        t.any(`SELECT recipe_name AS identifier, recipe_id FROM recipes WHERE LOWER (recipe_name) LIKE LOWER('%${req.params.search}%')`),
        t.any(`SELECT username AS identifier, user_id FROM users WHERE LOWER (username) LIKE LOWER('%${req.params.search}%')`),
        t.any(`SELECT first_name AS identifier, user_id FROM users WHERE LOWER (first_name) LIKE LOWER('%${req.params.search}%')`),
        t.any(`SELECT last_name AS identifier, user_id FROM users WHERE LOWER (last_name) LIKE LOWER('%${req.params.search}%')`)
    ]);
})
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            res.json(error);
          });
}

function getSingleRecipeById(req, res, next) {
  db.any(`SELECT
          COUNT(favorites.recipe_id)
          AS favorites_count,USERname,recipe_name,
            recipe, img, isvegeterian,isvegan,recipe_timestamp
          FROM recipes
          INNER JOIN USERs ON(recipes.user_id=users.user_id)
          INNER JOIN favorites ON(favorites.recipe_id=recipes.recipe_id)
          WHERE recipes.recipe_id=${req.params.recipeID}
          GROUP BY recipes.recipe_id, users.username;`)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getIngredientsByRecipeId(req, res, next) {
  db.any(`SELECT *
          FROM ingredients
          WHERE recipe_id=${req.params.recipeID};`)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getAllRecentUsersRecipes(req, res, next) {
  db.any(`SELECT *
          FROM recipes
          WHERE user_id=${req.user.user_id}
          ORDER BY recipe_timestamp DESC;`)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error);
    });
}

function getMostTopRecipes(req, res, next) {
  db.any(`SELECT
          COUNT(recipes.recipe_id)
          AS favorites_count, recipe_name, recipe, img
          FROM recipes
          INNER JOIN favorites ON(recipes.recipe_id=favorites.recipe_id)
          WHERE recipes.USER_id=${req.user.user_id}
          GROUP BY recipes.recipe, recipes.recipe_name, recipes.img
          ORDER BY favorites_count DESC`)
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
    "INSERT INTO recipes (user_id, recipe_name, recipe, description, img, isvegeterian, isvegan)"
    + " VALUES (${user_id}, ${recipe_name}, ${recipe}, ${description}, ${img}, ${isvegeterian}, ${isvegan})"
    + " RETURNING recipe_id",
    {
      user_id: req.user.user_id,
      recipe_name: req.body.recipe_name,
      recipe: req.body.recipe,
      description: req.body.description,
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
    // const ingredients  = JSON.parse(req.body.ingredients);
      const ingredients = req.body.ingredients;
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
  console.log(req.body.recipe_id);
  console.log("userrrrrr from passport: ", req.user.user_id);
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
    `DELETE FROM favorites WHERE user_id=${req.user.user_id} AND recipe_id=${req.body.recipe_id};`,
  )
  .then(data => {
    res.json("deleted");
  })
  .catch(error => {
    res.json(error);
  });
}

function followUser(req, res, next) {
  console.log(req.body.follower_id)
  console.log(req.body.followee_id)
  return db.none(
    "INSERT INTO followings (follower_id, followee_id) VALUES (${follower_id}, ${followee_id})",
    {
      follower_id: req.body.follower_id,
      followee_id: req.body.followee_id
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
    "DELETE FROM followings WHERE follower_id=$1 AND followee_id=$2",
    [req.body.follower_id, req.body.followee_id]
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
  console.log('EDIT USER',req.body)
  return db.none(
    `UPDATE users
     SET username=$1, email=$2, first_name=$3, last_name=$4
     WHERE user_id=${req.params.userID};`,
    [
      req.body.username,
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
     SET user_id=$1, recipe_name=$2, recipe=$3, description=$4, img=$5, isvegeterian=$6, isvegan=$7
     WHERE recipe_id=${req.params.recipeID};`,
    [
      req.body.user_id, req.body.recipe_name,
      req.body.recipe, req.body.description,
      req.body.img, req.body.isvegeterian,
      req.body.isvegan
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
  getFolloweeById,
  getFollowers,
  getFollowing,
  getRecipeComments,
  getSingleRecipeById,
  getIngredientsByRecipeId,
  getAllRecentUsersRecipes,
  getMostTopRecipes,
  isFavorite,
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
  searchByRecipe,
};

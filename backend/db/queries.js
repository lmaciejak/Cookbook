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

function getSingleGroup(req, res, next) {
  db.any(`SELECT users.user_id, username, first_name, last_name, group_name, group_description, groupowners.group_id
        FROM USERS
        INNER JOIN groupowners ON (users.user_id=groupowners.user_id)
        WHERE groupowners.group_id=$1`, [req.params.groupID])
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.json(error)
    })
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
  db.any(`SELECT comment, username, users.user_id, comments_id,
          CONCAT(first_name, ' ', last_name) AS FULLname
          FROM users
          INNER JOIN comments ON(users.user_id=comments.user_id)
          INNER JOIN recipes ON(recipes.recipe_id=comments.recipe_id)
          WHERE recipes.recipe_id=$1
          ORDER BY comments_timestamp DESC;`, [req.params.recipeID])
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

function getAllGroups(req, res, next) {
  db.any(`SELECT user_id, group_name, group_description, group_id
          FROM groupowners`)
          .then(data => {
            res.json(data);
          })
          .catch(error => {
            res.json(error);
          })
}

function userFollowsGroup(res, req, next) {
  db.any(`SELECT *
    FROM groupfollows
    WHERE user_id=${req.params.userID} AND group_id=${req.params.groupID}`)
    .then(data => {
      res.json(data)
    })
    .catch(error => {
      res.json(error)
    })
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
        t.any(`SELECT recipe_name
               AS identifier, recipe_id, username
               FROM recipes
               JOIN USERS ON (recipes.user_id = users.user_id)
               WHERE LOWER (recipe_name)
               LIKE LOWER('%${req.params.search}%')`),
        t.any(`SELECT username
               AS identifier, user_id
               FROM users
               WHERE LOWER (username)
               LIKE LOWER('%${req.params.search}%')`),
        t.any(`SELECT concat(first_name, ' ', last_name)
               AS identifier, user_id
               FROM users
               WHERE LOWER (first_name)
               LIKE LOWER('%${req.params.search}%')
               OR LOWER (last_name)
               LIKE LOWER('%${req.params.search}%')`)
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
  let sendingData = [];
  db.any(`SELECT
          COUNT(favorites.recipe_id)
          AS favorites_count,USERname,users.user_id,recipe_name,
            recipe, img, description, isvegeterian,isvegan,recipe_timestamp, fork, forkedFrom
          FROM recipes
          LEFT JOIN USERs ON(recipes.user_id=users.user_id)
          LEFT JOIN favorites ON(favorites.recipe_id=recipes.recipe_id)
          WHERE recipes.recipe_id=${req.params.recipeID}
          GROUP BY recipes.recipe_id, users.username, users.user_id;`)
    .then(data => {
      res.json(data)
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

function getAllGroupFollowers(req, res, next) {
  db.any(`SELECT users.user_id, username, first_name, last_name, group_name, groupowners.group_id
          FROM users
          JOIN groupfollows ON (USERs.user_id=groupfollows.user_id)
          JOIN groupowners ON (groupowners.group_id=groupfollows.group_id)
          WHERE groupfollows.group_id=${req.params.groupID}`)
          .then(data => {
            res.json(data)
          })
          .catch(error => {
            res.json(error)
          })
}

function isFavorite(req, res, next) {
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

function getSingleComment(req, res, next) {
  db.any(`SELECT * FROM comments WHERE comments_id=${req.params.commentID};`)
    .then( (data) => {
      res.json(data);
    })
    .catch( (err) => {
      res.json(err);
    })
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
      recipe_id: req.body.recipe_id,
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
    "INSERT INTO recipes (user_id, recipe_name, recipe, description, img, isvegeterian, isvegan, fork, forkedFrom)"
    + " VALUES (${user_id}, ${recipe_name}, ${recipe}, ${description}, ${img}, ${isvegeterian}, ${isvegan}, ${fork}, ${forkedFrom})"
    + " RETURNING recipe_id, user_id",
    {
      user_id: req.user.user_id,
      recipe_name: req.body.recipe_name,
      recipe: req.body.recipe,
      description: req.body.description,
      img: req.body.img,
      isvegeterian: req.body.isvegeterian,
      isvegan: req.body.isvegan,
      fork: req.body.fork,
      forkedFrom: req.body.forkedFrom
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
    `DELETE FROM favorites WHERE user_id=${req.user.user_id} AND recipe_id=${req.body.recipe_id}`)
  .then(data => {
    res.json("success");
  })
  .catch(error => {
    res.json(error);
  });
}

function followUser(req, res, next) {
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

function createGroup(req, res, next) {
  return db.none(
    "INSERT INTO groupowners (user_id, group_name, group_description) VALUES (${user_id}, ${group_name}, ${group_description})",
    {
      user_id: req.body.user_id,
      group_name: req.body.group_name,
      group_description: req.body.group_description
    }
  )
  .then(data => {
    res.json("success");
  })
  .catch(error => {
    res.json(error);
  })
}

function joinGroup(req, res, next) {
  return db.none(
    "INSERT INTO groupfollows (user_id, group_id) VALUES (${user_id}, ${group_id})",
    {
      user_id: req.body.user_id,
      group_id: req.body.group_id
    }
  )
  .then(data => {
    res.json("success")
  })
  .catch(error => {
    res.json(error)
  })
}

function leaveGroup(req, res, next) {
  return db.none(
    "DELETE FROM groupfollows WHERE user_id=$1 AND group_id=$2",
    [req.body.user_id, req.body.group_id]
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
     SET recipe_name=$1, recipe=$2, description=$3, img=$4, isvegeterian=$5, isvegan=$6
     WHERE recipe_id=${req.params.recipeID};`,
    [
      req.body.recipe_name,
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

function editIngredients(req, res, next) {
  const ingredients = req.body.ingredients;
  return db.task(t => {
    const ingredientsWithId = ingredients.filter(ingredient => ingredient.ingredient_id);
    const update = ingredients.map(ingredient => {
       return t.any(`UPDATE ingredients
                     SET amount=$1, name=$2, notes=$3
                     WHERE ingredient_id=${ingredient.ingredient_id};`,
              [ingredient.amount, ingredient.name, ingredient.notes]
            );
    });

    const ingredientsWithoutId = ingredients.filter(ingredient => !ingredient.ingredient_id);
    const insert = ingredientsWithoutId.map(ingredient => {
          return t.none("INSERT INTO ingredients (recipe_id, amount, name, notes) "
          + " VALUES (${recipe_id}, ${amount}, ${name}, ${notes})",
          {
            recipe_id: req.params.recipeID,
            amount: ingredient.amount,
            name: ingredient.name,
            notes: ingredient.notes
          }
        );
    });
    return t.batch(ingredientsWithId.concat(ingredientsWithoutId));
  })
  .then(data => {
    res.json("success");
  })
  .catch(error => {
    res.json(error);
  });
}

function editRecipeComment(req, res, next) {
  if (req.body.comment.length === 0) {
    return db.none(
        `DELETE FROM comments WHERE comments_id=${req.params.commentID}`)
      .then(data => {
        res.json("deleted");
      })
      .catch(error => {
        res.json(error);
      });
  } else {
    return db.none(
      `UPDATE comments
       SET recipe_id=$1, user_id=$2, comment=$3, comments_timestamp=$4
       WHERE comments_id=${req.params.commentID};`,
      [
        req.body.recipe_id,
        req.user.user_id,
        req.body.comment,
        new Date()
      ]
    )
    .then(data => {
      res.json("success");
    })
    .catch(error => {
      res.json(error);
    });
  }
}

function deleteIngredients(req, res, next) {
  return db.none(
    "DELETE FROM ingredients WHERE recipe_id=$1",
      [req.body.recipe_id]
    )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      res.json(err);
    })
}

function deleteRecipe(req, res, next) {
  return db.none(
    "DELETE FROM recipes WHERE recipe_id=$1",
    [req.body.recipe_id]
  )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      res.json(err);
    })
}

function deleteComments(req, res, next) {
  return db.none(
    "DELETE FROM comments WHERE recipe_id=$1",
    [req.body.recipe_id]
  )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      res.json(err);
    })
}

function deleteFavorites(req, res, next) {
  return db.none(
    "DELETE FROM favorites WHERE recipe_id=$1",
    [req.body.recipe_id]
  )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      res.json(err);
    })
}


module.exports = {
/*-------GET Request-------*/
  logoutUser,
  getSingleUser,
  getSingleUserFavorites,
  getSingleGroup,
  getFolloweeById,
  getFollowers,
  getFollowing,
  getAllGroups,
  getAllGroupFollowers,
  userFollowsGroup,
  getRecipeComments,
  getAllUsers,
  getAllResipes,
  getAllResipesByUserID,
  getAllFollowersRecipes,
  getSingleRecipeById,
  getIngredientsByRecipeId,
  getAllRecentUsersRecipes,
  getUser,
  getSortedRecipes,
  searchByRecipe,
  getMostTopRecipes,
  isFavorite,
  getSingleComment,
/*--------POST Request-------*/
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
  createGroup,
  joinGroup,
  leaveGroup,
  loginUser,
/*----------PATCH Request-------*/
  editUser,
  editRecipe,
  editIngredients,
  editRecipeComment,
  deleteIngredients,
  deleteRecipe,
  deleteComments,
  deleteFavorites,
};

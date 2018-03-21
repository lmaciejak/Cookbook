import React from "react";
import { Link } from "react-router-dom";

const SingleRecipe = (props) => {

  const { favorites_count, username,
      recipe_name, recipe, img,
      isvegeterian, isvegan,
      recipe_timestamp, ingredients } = props;

  return (
    <div>
      <h1>Name {recipe_name}</h1>
      <img src={img} alt="recipe_image" />
      <p>Direction {recipe}</p>
      <ul type="none">Ingredient
        {
          ingredients.map( (ingredient) => {
            return <li key={Math.random()}>{ingredient.amount}{" "}{ingredient.name}</li>
          })
        }
      </ul>
      <h6>Chef {username}</h6>
      <p>
        Vegeterian {isvegeterian}{" "}
        Vegan {isvegan}{" "}
        Favorites {favorites_count}{" "}
        uploaded {recipe_timestamp}{" "}
      </p>
      <Link to="/">Back</Link>
    </div>
  )
}
export default SingleRecipe;

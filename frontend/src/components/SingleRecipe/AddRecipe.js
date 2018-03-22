import React from "react";
import axios from "axios";

class AddRecipe extends React.Component {
  constructor(){
    super()
    this.state = {
      recipe_name : "",
      recipe : "",
      description: "",
      ingredients: [{name:'' , amount:'',notes:''}],
      img: "",
      isvegeterian: false ,
      isvegan:false ,
      ingredientsList: ["","eggs","chicken","potatoes"]
    }
  }

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleIngredientChange = (idx) => (e) => {
    const newIngredient = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
        return { ...ingredient, name: e.target.value };
      });
    this.setState({ ingredients: newIngredient });
  }

  handleAmountChange = (idx) => (e) => {
    const newIngredient = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
        return { ...ingredient, [e.target.name]: e.target.value };
      });
    this.setState({ ingredients: newIngredient });
  }

  handleAddIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients , { name: '', amount: '' }]
    });
  }

  handleRemoveIngredient = idx => () => {
    const {ingredients} = this.state;
    this.setState({
      ingredients: ingredients.filter((s, sidx) => idx !== sidx)
    });
  }

  handleChecked = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {recipe_name, recipe, description,
           ingredients, ingredientsList,
           isvegeterian, isvegan, img } = this.state
    axios
			.post('/users/addRecipe', {
        recipe_name: recipe_name,
        description: description,
        recipe: recipe,
        img: img,
        isvegeterian: isvegeterian,
        isvegan: isvegan
			})
			.then(res => {
        axios
          .post(`/users/addIngredients/${res.data.recipe_id}`, {
            ingredients: ingredients
			    })
      })
      .then( () => {
        this.setState({
          recipe_name : "",
          recipe : "",
          description: "",
          ingredients: [{name:'' , amount:'',notes:''}],
          img: "",
          isvegeterian: false,
          isvegan: false,
          ingredientsList: ["","eggs","chicken","potatoes"]
        })
      })
			.catch(err => {
				this.setState({
					message: "Error posting new image"
				})
			})
  }

    render() {
      const {recipe_name, recipe, description,
             ingredients, ingredientsList,
             isvegeterian, isvegan, img } = this.state

             console.log(description)
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <p>Recipe Name
                    <input
                      type= "text"
                      name="recipe_name"
                      onChange={this.handleChange}
                      value={recipe_name}
                      className= "addRecipe"
                    />
                </p>
                <p>ImageURL
                    <input
                      type= "url"
                      name="img"
                      onChange={this.handleChange}
                      value={img}
                      className= "addRecipe"
                    />
                </p>
                <h4>Description</h4>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    placeholder="Tell your friends all about your recipe"
                    onChange={this.handleChange}
                  />
                <h4>Ingredients</h4>
                    {ingredients.map((ingredient, idx) =>(
                        <div className="ingredients">
                           {`Ingredient ${idx + 1}`}
                        <input
                            list="ingredients"
                            value ={ingredient.name}
                            onChange={this.handleIngredientChange(idx)}
                         />
                         <datalist id="ingredients">
                            {ingredientsList.map(ingredient =>
                            <option value={ingredient}> {ingredient}</option>)}
                         </datalist>
                            {/* {ingredientsList.map(ingredient =>
                            <option value={ingredient}> {ingredient}</option>)} */}
                      
                Amount:
                  <input
                    type="text"
                    name="amount"
                    onChange={this.handleAmountChange(idx)}
                    value={ingredient.amount}
                    className= "addRecipe"
                  />
                Notes
                  <input
                    type="text"
                    name="notes"
                    onChange={this.handleAmountChange(idx)}
                    value={ingredient.notes}
                    className= "addRecipe"
                  />
                  <button
                    type="button"
                    onClick={this.handleRemoveIngredient(idx)}>x
                  </button>
                  </div>
                    ))}
                    <button
                      type="button"
                      onClick={this.handleAddIngredient}>
                      CHILL ... ANOTHER ONE
                    </button>
                <p>
                Directions
                  <textarea
                    type="text"
                    name="recipe"
                    value={recipe}
                    placeholder="eg(1. Melt two table spoons of butter...)"
                    onChange={this.handleChange}
                  />
                </p>
                <p>
                Vegeterian
                  <input type="checkbox"
                    name="isvegeterian"
                    checked={isvegeterian}
                    onChange={this.handleChecked}
                  />
                </p>
                <p>
                Vegan
                  <input type="checkbox"
                    name="isvegan"
                    checked={isvegan}
                    onChange={this.handleChecked}
                  />
                </p>
                <button>Submit</button>
             </form>
            </div>
        )
    }
}
export default AddRecipe;

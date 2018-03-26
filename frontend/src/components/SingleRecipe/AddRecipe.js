import React from "react";
import axios from "axios";
import SearchBar from "../Search/SearchBar.js"

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
              <SearchBar />
              <div className="formContainer">
              <div className="formStyle">
                <h1 className="formHeader">Add a New Recipe! <span>Let Your Everyone Know Whats Cooking</span></h1>
                <form onSubmit={this.handleSubmit}>
                <div className="formSection"><span>1</span>Recipe Name & ImageUrl</div>
                
                <div className="formInnerWrap">
                <label className="formLabels">Recipe Name
                    <input
                      type= "text"
                      name="recipe_name"
                      onChange={this.handleChange}
                      value={recipe_name}
                      className= "formInput"
                    />
                </label>
                <label className="formLabels">ImageURL
                    <input
                      type= "url"
                      name="img"
                      onChange={this.handleChange}
                      value={img}
                      className= "formInput"
                    />
                </label>
                </div>

                <div className="formSection"><span>2</span>Recipe Description</div>
                <div className="formInnerWrap">
                <label className="formLabels">Description
                <textarea
                    type="text"
                    name="description"
                    className="formInput"
                    value={description}
                    placeholder="Tell your friends all about your recipe"
                    onChange={this.handleChange}
                  />
                </label>
                </div>

                <div className="formSection"><span>3</span>Ingredients</div>
                <div className="formInnerWrap">
                    {ingredients.map((ingredient, idx) =>(
                        <div className="ingredients">
                        <label className="formLabels"> <b>{`Ingredient ${idx + 1}`}</b>
                        <input
                            list="ingredients"
                            value ={ingredient.name}
                            onChange={this.handleIngredientChange(idx)}
                            className="formInput"
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
                    className= "ingAmount formInput"
                  />
                
                Notes
                  <input
                    type="text"
                    name="notes"
                    onChange={this.handleAmountChange(idx)}
                    value={ingredient.notes}
                    className= "notes formInput"
                  />
                
                  <button
                    type="button"
                    className="xButton"
                    onClick={this.handleRemoveIngredient(idx)}>x
                  </button>
                  </label>
                  </div>
                    ))}
                  
                    <button
                      type="button"
                      className="formButton"
                      onClick={this.handleAddIngredient}>
                      MORE INGREDIENTS
                    </button>
                </div>
                
                <div className="formSection"><span>4</span>Directions</div>
                <div className="formInnerWrap">
                <label className="formLabels">Directions
                  <textarea
                    type="text"
                    name="recipe"
                    className="formInput"
                    value={recipe}
                    placeholder="eg(1. Melt two table spoons of butter...)"
                    onChange={this.handleChange}
                  />
                </label>
                </div>
                
                <div className="formSection"><span>5</span>Vege Friendly?</div>
                <div className="formInnerWrap">
                
                <label className="formLabels">Vegeterian
                  <input type="checkbox"
                    name="isvegeterian"
                    checked={isvegeterian}
                    onChange={this.handleChecked}
                  />
                </label>
                <label className="formLabels">Vegan
                    <input type="checkbox"
                      name="isvegan"
                      checked={isvegan}
                      onChange={this.handleChecked}
                    />
                </label>
                </div>

                <button className="formButton">Submit</button>
                </form>
              </div> 
              </div> 
            </div>
        )
    }
}
export default AddRecipe;

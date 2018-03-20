import React from "react";
import axios from "axios";

class AddRecipe extends React.Component {
    constructor(user){
        super(user)
        this.state={
            user_id:"yurr",
            recipeName : "",
            directions : "",
            ingredients: [{name:'' , amount:'',notes:''}] ,
            img: "",
            isVegetarian: false ,
            isVegan:false ,
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
            const {ingredients} = this.state
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

        }

    render(){
        const{ recipeName, directions, ingredients, ingredientsList, isVegetarian, isVegan, img } = this.state
        const a = 1
        console.log('isVeg' , this.state.isVegetarian , 'isVegan', this.state.isVegan )
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <p>Recipe Name
                    <input 
                        type= "text" 
                        name="recipeName" 
                        onChange={this.handleChange} 
                        value={recipeName} 
                        className= "addRecipe"/>
                </p>
                <p>image
                    <input 
                        type= "url" 
                        name="imgURL" 
                        onChange={this.handleChange} 
                        value={img} 
                        className= "addRecipe"/>
                </p>
                Ingredients
                    {ingredients.map((ingredient, idx) =>(
                        <div className="ingredients">
                           {`Ingredient ${idx + 1}`} 
                        <select
                            value ={ingredient.name}
                            onChange={this.handleIngredientChange(idx)}
                         >
                            {ingredientsList.map(ingredient => 
                            <option value={ingredient}> {ingredient}</option>)}
                        </select> 
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
                <p>Directions</p>
                <textarea placeholder="eg(1. Melt two table spoons of butter...)" />
                <p>
                Vegeterian
                    <input type="checkbox"  
                    name="isVegetarian" 
                    checked={isVegetarian} 
                    onChange={this.handleChecked}/>
                </p>

                <p>
                Vegan
                    <input type="checkbox"  
                        name="isVegan" 
                        checked={isVegan} 
                        onChange={this.handleChecked}
                    />
                </p>
                {/* <input type= 'radio' onclick ={this.handleChange} name="isVegan"  className= "addRecipe"/>Vegan */}
                <button>Submit</button>
             </form>   
            </div>
        )
    }
}

export default AddRecipe

import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import SearchBar from "../Search/SearchBar.js"


class AddRecipe extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recipe_id: '',
      recipe_name : "",
      recipe : "",
      description: "",
      ingredients: [{name:'' , amount:'',notes:''}],
      img: "",
      isvegeterian: false ,
      isvegan:false ,
      fork: false,
      ingredientsList: ["","eggs","chicken","potatoes"],
      redirect: false,
      recipe_id: "",
      groups: [],
      shareOptions: []
    }
  }

  getGroupFollows = () =>{
    const { groups } = this.state
    axios
      .get(`/users/allGroupFollows/${this.props.user.user_id}`)
      .then(res => {
        this.setState({
          groups: res.data
        })
      })
      .catch(error => {
        console.log('error get user group follows')
      })
  }



  componentDidMount(){
    this.getGroupFollows()
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

  handleSharing = (e) => {
    const { shareOptions } = this.state
    let valueArr = shareOptions
    if(e.target.checked && !valueArr.includes(e.target.value)){
      valueArr.push(parseInt(e.target.value))
      this.setState({ shareOptions: valueArr })
    }
    else {
      this.setState({ shareOptions: shareOptions.filter((values) => values != e.target.value)})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {recipe_name, recipe, description,
           ingredients, ingredientsList,
           isvegeterian, isvegan, img, recipe_id, fork, groups, shareOptions } = this.state

    let isPublic = shareOptions.includes(0) || shareOptions.length === 0

    axios
			.post('/users/addRecipe', {
        recipe_name: recipe_name,
        description: description,
        recipe: recipe,
        img: img,
        isvegeterian: isvegeterian,
        isvegan: isvegan,
        fork: fork,
        public: isPublic
			})
			.then(res => {
        const recipe_id = res.data.recipe_id
        this.setState({ recipe_id: recipe_id })

        axios
          .post(`/users/addIngredients/${res.data.recipe_id}`, {
            ingredients: ingredients
			    })
          .then(res => {
            let groupID = shareOptions.filter((value) => value !== 0)
            groupID.map(id => {
              let findGroup = groups.find(group => group.group_id === id)
              axios
                .post('/users/addRecipeToGroup',{
                  recipe_id: recipe_id,
                  user_id: this.props.user.user_id,
                  group_id: findGroup.group_id
                })
                .catch(error => {
                  console.log('error add group recipes')
                })
            })
          })
      })
      .then( (res) => {
        this.setState({
          recipe_name : "",
          recipe : "",
          description: "",
          ingredients: [{name:'' , amount:'',notes:''}],
          img: "",
          isvegeterian: false,
          isvegan: false,
          ingredientsList: ["","eggs","chicken","potatoes"],
          redirect: true,
          fork: false,
          groups: [],
          shareOptions: []
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
             isvegeterian, isvegan, img, redirect, recipe_id, fork, groups, shareOptions } = this.state

      let groupDisplay = [{group_name: 'Public', group_id: 0},...groups]

             if(redirect) {
              return <Redirect to={`/cb/${this.props.user.user_id}/${recipe_id}`}/>
             }
        return(
            <div>
              <SearchBar user={this.props.user} />
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
                Do you want to share your recipe with your friend?<label className="formLabels">Fork
                    <input type="checkbox"
                      name="fork"
                      checked={fork}
                      onChange={this.handleChecked}
                    />
                </label>
                </div>
                <div className="formSection"><span>6</span>Share Options
                  <label className="formLabels">
                    {groupDisplay.map(group => (
                      <label key={Math.random()}>
                        {group.group_name}
                        <input
                          name={group.group_name}
                          value={group.group_id}
                          onChange={this.handleSharing}
                          checked={shareOptions.includes(group.group_id)}
                          type='checkbox'
                          />
                      </label>
                    ))}
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

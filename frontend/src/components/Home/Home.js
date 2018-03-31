import React from "react";
import axios from "axios";
import RecipeBox from "../SingleRecipe/RecipeBox"
import LoginUser from "../Modals/LoginUser"
import RegisterUser from "../Modals/RegisterUser";


class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      favorites: []
    }
  }

  componentDidMount() {
    axios
      .get("/users/sortedrecipes")
      .then(res => {
        this.setState({
          favorites: res.data
        })
			})
			.catch(err => {
        console.log(err);
			})
  }

  render() {
    const { favorites } = this.state;
      return (
        <div className="landingPage">
          <div className="landingPhoto">
            <div id="sl1">
              <img src='https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' class="slide-number" alt=''/>
              <img src='https://images.pexels.com/photos/76093/pexels-photo-76093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' class="slide-number" alt=''/>
              <img src='https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&dl=maarten-van-den-heuvel-400626-unsplash.jpg&s=9509ba35b5e71ce1c654cc3e3e04cd7b,' class="slide-number" alt=''/>
              <img src='https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' class="slide-number" alt=''/>
            </div>
            <div className="header">
            <img src='https://lh3.googleusercontent.com/pNVvwSQCNJEwoYQyhieGwwd914wK-f-635oCdwSbKyP3vr_n1sCwOKlxznAto6skdWZjsnf0pJWSfgKGgyFYJJe2_ywT5HwF5BpiZXpzP2Vy6I0y3o4h93Lvtlt2ShvC14oIKAQ91EU' alt='logo'/>
              <h1>Eat. Share. Repeat. </h1>
              <div className="landButton">
              <LoginUser className="button" />
              <RegisterUser className="button" />
              </div>
            </div>
          </div>
          <div>
              <h2 className="landingPageHeader">Best Recipes on Cookbook</h2>
          </div>

          <div className="landingPageFeatured">
              {favorites.map(recipe => (
                    <RecipeBox recipe={recipe} />
              ))}
          </div>
        </div>
      )
  }
}

export default Home;

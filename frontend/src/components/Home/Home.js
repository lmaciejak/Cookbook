import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import RecipeBox from "../SingleRecipe/RecipeBox";
import LoginUser from "../Modals/LoginUser";
import RegisterUser from "../Modals/RegisterUser";
import { Link, Redirect } from "react-router-dom";
import cookbooklogo from "../../images/cookbooknamelogo.png";
import "./Home.css";
import { React_Bootstrap_Carousel } from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  slideNext = () => {
    this.slider.slideNext();
  };
  slidePrev = () => {
    this.slider.slidePrev();
  };
  goToSlide = () => {
    this.slider.goToSlide(4);
  };

  render() {
    return (
      <div className="container-fluid">
        <React_Bootstrap_Carousel
          animation={true}
          slideshowSpeed={5000}
          onSelect={this.onSelect}
          className="carousel-slide"
        >
          <div style={{ height: 500 }}>
            <img
              style={{ width: "100%", height: "auto" }}
              src="https://images.pexels.com/photos/977369/pexels-photo-977369.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
              maxHeight="100%"
              className="slideshowImage"
            />
          </div>
          <div style={{ height: 500 }}>
            <img
              style={{ width: "100%", height: "auto" }}
              src="https://images.pexels.com/photos/7765/food.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              maxHeight="100%"
              className="slideshowImage"
            />
          </div>
          <div style={{ height: 500 }}>
            <img
              style={{ width: "100%", height: "auto" }}
              src="https://images.pexels.com/photos/691114/pexels-photo-691114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              maxHeight="100%"
              className="slideshowImage"
            />
          </div>

          <div style={{ height: 500 }}>
          <img
            style={{ width: "100%", height: "auto" }}
            src="https://images.pexels.com/photos/70862/pexels-photo-70862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
            maxHeight="100%"
            className="slideshowImage"
          />
        </div>

          <div style={{ height: 500 }}>
            <img
              style={{ width: "100%", height: "auto" }}
              src="https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
              maxHeight="100%"
              className="slideshowImage"
            />
          </div>
          <div style={{ height: 500 }}>
            <img
              style={{ width: "100%", height: "auto" }}
              src="https://images.pexels.com/photos/262947/pexels-photo-262947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
              maxHeight="100%"
              className="slideshowImage"
            />
          </div>
        </React_Bootstrap_Carousel>
      </div>
    );
  }
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }

  componentDidMount() {
    axios
      .get("/users/sortedrecipes")
      .then(res => {
        this.setState({
          favorites: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { favorites } = this.state;
    return (
      <div className="landingPage">
        <div className="searchbar searchbarLanding">
          <Link to={`/cb/feed`}>
            <img className="searchbarLogoName" src={cookbooklogo} />
            <img
              className="searchbarLogo"
              src="http://irfanyurdu.org/wp-content/uploads/2017/04/eat-flat-1.png"
            />
          </Link>
          <div className="landButton">
            <LoginUser className="button" />
            <RegisterUser className="button" />
          </div>
        </div>
        <div className="landingPhoto">
          <Slideshow />
          <div className="header">
            <h1>Eat. Share. Repeat. </h1>
          </div>
        </div>
        <div className="LandingFavoritesContainer">
          <h2 className="landingPageHeader">The Best Recipes on Cookbook</h2>
        </div>

        <div className="landingPageFeatured">
          {favorites.map(recipe => <RecipeBox recipe={recipe} />)}
        </div>
      </div>
    );
  }
}

export default Home;

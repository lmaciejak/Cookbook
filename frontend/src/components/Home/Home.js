import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import RecipeBox from "../SingleRecipe/RecipeBox";
import LoginUser from "../Modals/LoginUser";
import RegisterUser from "../Modals/RegisterUser";
import { Link, Redirect } from "react-router-dom";
import cookbooklogo from "../../images/cookbooknamelogo.png";
import utensilLogo from "../../images/utensil-logo.png";
import "./Home.css";
import { React_Bootstrap_Carousel } from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import DemoLogin from "../Modals/DemoLogin";

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
              src="https://images.pexels.com/photos/271458/pexels-photo-271458.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
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
            src="https://images.pexels.com/photos/313715/pexels-photo-313715.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
            maxHeight="100%"
            className="slideshowImage"
          />
        </div>

          <div style={{ height: 500 }}>
          <img
            style={{ width: "100%", height: "auto" }}
            src="https://images.pexels.com/photos/175754/pexels-photo-175754.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
            maxHeight="100%"
            className="slideshowImage"
          />
        </div>

        <div style={{ height: 500 }}>
        <img
          style={{ width: "100%", height: "auto" }}
          src="https://images.pexels.com/photos/688803/pexels-photo-688803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
          maxHeight="100%"
          className="slideshowImage"
        />
      </div>

          <div style={{ height: 500 }}>
            <img
              style={{ width: "100%", height: "auto" }}
              src="https://images.pexels.com/photos/11415/befa5c7cfca376be94eddaf5af8d72f6.jpg?auto=compress&cs=tinysrgb&dpr=2&h=350"
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
              src={utensilLogo}
            />
          </Link>
          <div className="landButton">
            <button className="button" onClick={() => { this.child1.closeModal();
              this.child2.closeModalLogin();}}>
              <LoginUser ref={instance => { this.child = instance; }} />
            </button>
            <button className="button" onClick={() => { this.child.closeModalLogin();
              this.child2.closeModalLogin();}}>
              <RegisterUser ref={instance => { this.child1 = instance; }} />
            </button>
            <button className="button" onClick={() => { this.child.closeModalLogin();
              this.child1.closeModal();}}>
            <DemoLogin ref={instance => { this.child2 = instance; }} />
          </button>
          </div>
        </div>
        <div className="landingContainer">
        <div className="landingPhoto">
          <Slideshow />
          <div className="header">
            <h1>Share. Eat. Repeat. </h1>
          </div>
        </div>
        <div className="LandingFavoritesContainer">
          <h2 className="landingPageHeader">The Best Recipes on Cookbook</h2>
        </div>
<div className="landingPageFeaturedContainer">
        <div className="landingPageFeatured">
          {favorites.map(
            recipe => <RecipeBox recipe={recipe} click='false' key={Math.random()} />)}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Home;


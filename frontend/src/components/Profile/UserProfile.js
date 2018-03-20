import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({userInfo}) => (
    <div className="userProfile">
       <div className="userProfileBanner"> 
            <div className="userPhotoSpace">
                <img  className="profilePhoto" src="https://images.pexels.com/photos/35666/cooking-baby-only-kitchen.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb" alt="userProfilePhoto" width="150"/>
            </div>

            <div className="userInfo">
                <h3>Name</h3>
                <div className="followInfo">
                    <a>Followers</a>
                    <a>Following</a>
                    <a>Favorites</a>
                    <a>Follow</a>
                </div>
            </div>

            <div> 
            </div>
            <div> 
            </div>
        </div>
        
        <div>
            <h3 className="userProfileTitle">Names Top Recipes</h3>
        </div>
    </div>


)

export default UserProfile;
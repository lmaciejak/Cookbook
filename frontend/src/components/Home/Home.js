import React from "react";

class Home extends React.Component {
   
    render() {
        
        return (
            <div className="landingPhoto">
                <div className="header"> 
                    <div></div>               
                    <h1>Welcome to CookBook </h1>  
                    <div className="landButton"><a className="button"> Login </a> <a className="button"> Sign Up </a>  </div>  
                </div>    
             </div>
        )
    }
}

export default Home;

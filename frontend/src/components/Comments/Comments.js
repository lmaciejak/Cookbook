import React from "react";

class ShowAllComments extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                comments: this.props.comments 
            }
        }
        render(){
            const { comments } = this.state 
            return(
                <div>
                    {comments.map(comment =>(
                        <p>{comment}</p>
                    ))}
                </div>
            )
        } /* takes all comments and maps them as a pp */
    }
export default ShowAllComments;
  

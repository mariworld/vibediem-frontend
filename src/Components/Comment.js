import React, { Component } from 'react'

export class Comment extends Component {
    
    state = {
        allComments: [],
        comment: {
            commentText:"",
            commentUser:""
        },
        clicked: false
       
    }

    componentDidMount = () => {
       

        fetch("http://localhost:3000/comments")
        .then(r => r.json())
        .then(commentsArr => {
          this.setState({
            allComments: commentsArr,
            token: localStorage.token
          })
        })

    fetch("http://localhost:3000/cards")
    .then(r => r.json())
    .then(cardsArr => {
      this.setState({cards: cardsArr, token: localStorage.token})
        })
    }
    

   

    handleToggle = () => {
        this.setState({
            clicked: !this.state.clicked
        })
    }

    handleOnChange = (e) => {
        this.setState({
            comment: {
                commentText: e.target.value,
                commentUser: ""
            }
          })
          
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addComment(this.state.commentText)
    }


    render() {
      console.log(this.state,this.props)

        return (
            <div>  
            <div onClick={this.handleToggle}>
                {
                    this.state.clicked
                
                    ?
                    `Username: lets make sure comments go here`
                    :
                    <div style={{overflow:"auto"}}>
                   
                    <ul>
                    Comments (click to see):
                   
                    </ul>
                </div>
                }
            </div>     
            <form onSubmit={this.handleSubmit}>
             <input type="text" name="commentText" placeholder="add a comment" value={this.state.CommentText} onChange={this.handleOnChange} />
            <input type="submit" value="add comment" />
          </form>
                   
                
            </div>
        )
    }
}

export default Comment

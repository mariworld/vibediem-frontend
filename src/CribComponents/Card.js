import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
// import YouTube from 'react-youtube';
// import { SketchPicker } from 'react-color';
import Comment from '../Components/Comment'


const Cards = (props) => {
  
  const handleDelCard = () => {
    props.delYourCard(props.card.id)

  }

  const handleClick = (e) => {
     //add this card to your crib container 
     //append it to your array of cards
     //
     console.log(props)
   props.currentUser.cards.push(props.card)

  }

  const renderComments = () => {
     return props.card.comments.map(commentObj => {
        return `${commentObj.comment_username}: ${commentObj.comment_text}`
        console.log(commentObj.comment_username)
      })
  }

console.log(props)


 return(


  <div className="ui cards ">
  
    <div className="card" onClick={handleClick}> 
      <Card.Content >
        <Card.Header margin="auto" > {props.card.card_title} 
        {/* {
        props.currentUser.username === props.card.user.username
        ?
        <button margin="right">Edit Title</button>
         :
         null
      } */}
      </Card.Header>
        <Card.Meta>
          <span className='date'></span>
        </Card.Meta>
        <Card.Content > 
       
          {/* do some conditional rendering for text vs image -  */
          //if the input includes ".png" or ".jpg" then render the image component else render a text component}
          
         
        
          <Image src={props.card.content_url} alt={`image of ${props.card.title}`} wrapped ui={false} height="100%" width="100%"/>
        
          }     
      </Card.Content >
        <Card.Description justify="center">
         
        </Card.Description>
      </Card.Content>
      <Card.Content justify="center" extra>
          <Icon name='' />
          {props.card.user.username}: {props.card.message}<br/>
          {/* {props.card.comments.map(commentObj => `${commentObj.comment_text}`)} */}
      </Card.Content>
         <Card.Content>
              <Comment addComment={props.addComment} currentUser={props.currentUser}/>
           
           {renderComments()}
         </Card.Content>
      <Card.Content justify="center" extra>
          {/* <form onSubmit={handleSubmit}>
          <input type="text" placeholder="add a comment" value={props.commentText} onChange={handleComment}/>
          <input type="submit" value="Add Comment"/>
          </form> */}
    
         
      </Card.Content>
      {
        props.currentUser.username === props.card.user.username
        ?
         <button float="right" onClick={handleDelCard}>X</button> 
         :
         <button>Add to your Collection</button>
      }
     
    
      
    </div>
  
  </div>
  )
};

export default Cards;
import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import YouTube from 'react-youtube';
import { SketchPicker } from 'react-color';


const Cards = (props) => {
  
  const handleDelCard = () => {
    props.delOneCard(props.card.id)
  }

  console.log(props)
  return(
  

  <div className="four wide column " >
  
    <Card style={{backgroundColor: props.color}}> 
      <Card.Content >
        <Card.Header margin="auto" >{props.card.user.username}</Card.Header>
        <Card.Meta>
          <span className='date'></span>
        </Card.Meta>
        <Card.Content >
          <Image src={props.card.content_url} alt={`image of ${props.card.title}`} wrapped ui={false} height="100%" width="100%"/>
      </Card.Content >
        <Card.Description justify="center">
          {props.card.card_title}
        </Card.Description>
      </Card.Content>
      <Card.Content justify="center" extra>
          <Icon name='' />
          {props.card.message}
         
      </Card.Content>
      <button float="right" onClick={handleDelCard}>X</button>
    </Card>
  
  </div>
  )
};

export default Cards;
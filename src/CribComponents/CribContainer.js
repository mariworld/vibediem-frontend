import React, { Component } from 'react';
import Card from './Card'
import NewCardForm from './NewCardForm'
import AllCardsContainer from './AllCardsContainer';
import { Link } from "react-router-dom"
// import NavBar from './Components/NavBar'

class CribContainer extends Component {
 state = {
   cards: [],
   color: ""
 }

 componentDidMount = () => {
  fetch("http://localhost:3000/cards")
  .then(r => r.json())
  .then(cardsArr => {
  this.setState({
      cards: cardsArr
      })
})
}

  changeCardColor = (hexCode) => {
    this.setState({
      color: hexCode
    })
  }

  logout = () => {
  //perhaps the function can trigger the other function
  this.props.logoutUser()
    
  }

  renderCribCards = () => {
    let arrayOfCards = this.props.cards.sort((a,b) => {
      return Date.parse(b.created_at) - Date.parse(a.created_at) 
   }).map((card) => {
      return <Card key={card.id} 
              card={card} 
              delOneCard={this.props.delOneCard} 
              delYourCard={this.props.delYourCard} 
              changeCardColor={this.changeCardColor} 
              color={this.props.color} 
              token={this.props.token}
              currentUser={this.props.user}
              comments={this.props.comments}
              addComment={this.props.addComment}
              />
    })
    return arrayOfCards
  }


  
  render() {
  
    let {id, username, cards} = this.props.user
   
 
console.log(this.props,this.state)
    return (
      <div>
        <h1 align="center">vibe diem</h1>
        {
          this.props.user.username

          ?
          <h2 align="left">{username}&apos;s crib</h2>
          :
          <h2 align="left">{username}(could be your)'s crib</h2>
        }
        <div align="center">
    
              <Link to="/cards" align="center">see all cards</Link> <br/>
              {this.props.user.username
              
              ?
              <Link align="center" onClick={this.logout} to="/">log out</Link> 
              :
              <Link align="center" to="/">main page</Link>
              
            }
        </div>
    
      
        <NewCardForm
          token={this.props.token}
          addOneCard={this.props.addOneCard}
          changeCardColor={this.changeCardColor}
        />
        <h3>cards</h3>
        
        <div className="ui grid container">
            { this.renderCribCards()
            //   cards.sort((a,b) => {
            //     return Date.parse(b.created_at) - Date.parse(a.created_at) 
            //  }).map((card) => {
            //     return <Card key={card.id} 
            //             card={card} 
            //             delOneCard={this.props.delOneCard} 
            //             delYourCard={this.props.delYourCard} 
            //             changeCardColor={this.changeCardColor} 
            //             color={this.props.color} 
            //             token={this.props.token}
            //             currentUser={this.props.user}
            //             comments={comments}
            //             addComment={this.props.addComment}
            //             />
            //   })
            }
        </div>

       

      </div>
    );
  }

}

export default CribContainer;
import React, { Component } from 'react';
import Card from './Card'
import NewCardForm from './NewCardForm'
import AllCardsContainer from './AllCardsContainer';
import { Link } from "react-router-dom"
// import NavBar from './Components/NavBar'

class CribContainer extends Component {
 state = {
   color: ""
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


  
  render() {
  
    let {id, username, cards} = this.props.user

 
console.log(this.props)
    return (
      <div>
        <h1 align="center">vibe diem</h1>
        <h2 align="center">{username}&apos;s crib</h2>
        {/* <button  onClick={() => this.props.history.push('/cards')}>See All Cards</button> */}
    
          <Link to="/cards">see all cards</Link> <br/>
          <Link onClick={this.logout} to="/">log out</Link> <br/>
    
        {/* <button onClick={this.logout}>Log Out</button> */}
        <NewCardForm
          token={this.props.token}
          addOneCard={this.props.addOneCard}
          changeCardColor={this.changeCardColor}
        />
        <h3>cards</h3>
        
        <div className="ui grid container">
            {
              cards.sort((a,b) => {
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
                        />
              })
            }
        </div>

       

      </div>
    );
  }

}

export default CribContainer;
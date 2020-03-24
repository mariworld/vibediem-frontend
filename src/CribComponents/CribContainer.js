import React, { Component } from 'react';
import Card from './Card'
import NewCardForm from './NewCardForm'

class CribContainer extends Component {
 state = {
   color: ""
 }

  changeCardColor = (hexCode) => {
    this.setState({
      color: hexCode
    })
  }
  render() {
    let {id, username, cards} = this.props.user

 

    return (
      <div>
        <h2>{username}&apos;s Crib</h2>
        <button onClick={console.log(this)}>Log Out</button>
        <NewCardForm
          token={this.props.token}
          addOneCard={this.props.addOneCard}
          changeCardColor={this.changeCardColor}
        />
        <h3>cards</h3>
        
        <div className="ui grid container">
            {
              cards.map((card) => {
                return <Card key={card.id} card={card} delOneCard={this.props.delOneCard} changeCardColor={this.changeCardColor} color={this.state.color}/>
              })
            }
        </div>

       

      </div>
    );
  }

}

export default CribContainer;
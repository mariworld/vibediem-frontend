import React, { Component } from 'react'
import Card from './Card'
import { Link } from "react-router-dom"



export class AllCardsContainer extends Component {
    
    state = {
        cards: []
    }

    componentDidMount = () => {
        fetch("http://localhost:3000/cards")
        .then(r => r.json())
        .then(cardsArr => {
        this.setState({
            cards: cardsArr,
            token: localStorage.token})
    })
    }

    
    renderCards = () => {
        let arrayOfCards = this.props.allCards.sort((a,b) => {
           return Date.parse(b.created_at) - Date.parse(a.created_at) 
        })
        .map(cardObj => {
            return <Card
                    key={cardObj.id}
                    card={cardObj}
                    token={this.props.token}
                    delOneCard={this.props.delOneCard} 
                    currentUser={this.props.user}
                    delYourCard={this.props.delYourCard} />
        })
        return arrayOfCards
    }

    handleSearch = (e) => {
        this.props.cardFromSearchTerm(e.target.value)
    }

  

    // updateStateInAllCardsContainer = () => {
    //     this.setState({
    //         cards: []
    //     })
    // }
    
    render() {
        let {cards, user} = this.props
        console.log(this.state, this.props)
        
        return (
            <div>
                 <h1 align="center">vibe diem</h1>
                <h2>{user.username}</h2>
                {/* <Link to="/">Main Page</Link> <br/> */}
                <div align="center"><Link to="/crib" align="center">the crib</Link></div> <br/>
                <div style={{paddingTop:'-100px'}} align="center">
                    search through all cards: 
               <br/> <input style={{marginTop:"25px", justify:"center"}} 
                        type="search" 
                        value={this.props.searchTerm} 
                        onChange={this.handleSearch}></input>
                </div><br/>
               
               <div>
                    <div className="ui grid container four column" >
                        {this.renderCards()}
                
                    </div>
               </div>
            </div>
        )
    }
}

export default AllCardsContainer

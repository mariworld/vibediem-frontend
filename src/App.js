import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Form from './Components/Form'
import SignUpForm from './Components/SignUpForm'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CribContainer from './CribComponents/CribContainer'
import AllCardsContainer from './CribComponents/AllCardsContainer'


import {withRouter} from 'react-router-dom'




class App extends React.Component {


  state={
    user: {
      id: 0,
      username: "",
      cards: [],
      comments: []
    },
    cards: [],
    searchTerm:"",
    allComments:[]
  }

  

  componentDidMount() {
    
    if (localStorage.token) {
      fetch("http://localhost:3000/persist", {
        //persists the user session
        headers: {
          "Authorization": `bearer ${localStorage.token}`
        }
      })
      .then(r => r.json())
      .then(this.handleToken(localStorage.token))
      //maybe i need to handle the token so that it's present everytime the information mounts

    fetch("http://localhost:3000/cards")
    .then(r => r.json())
    .then(cardsArr => {
      this.setState({cards: cardsArr, token: localStorage.token})
    })
    }

    fetch("http://localhost:3000/comments")
    .then(r => r.json())
    .then(commentsArr => {
      this.setState({
        allComments: commentsArr,
        token: localStorage.token
      })
    })

  }

  handleToken = (token) => {
    localStorage.getItem(token)
  }


  handleSignUp = (resp) => {
    if (resp.user) {
      localStorage.token = resp.token
      this.setState({
        user: resp.user,
        token: resp.token
      }, () => {
        this.props.history.push("/crib")
      })
    } else {
      alert(resp.error)
    }
  }

  handleLogin = (resp) => {
    if (resp.user) {
      localStorage.token = resp.token
      this.setState({
        user: resp.user,
        token: localStorage.token
      }, () => {
        this.props.history.push("/crib")
      })
    } else {
      alert(resp.error)
    }
  }

  logoutUser = () => {
    localStorage.removeItem(this.state.token)
   return this.setState({
      token: "", 
      }), () => 
      this.props.history.push("/")
      
  }

  addOneCard = (cardObj) => {
    this.setState({
      user: {
        ...this.state.user,
        cards: [...this.state.user.cards, cardObj],
        comments: []
      }
    })
  }

  delYourCard = (id) => {
    fetch(`http://localhost:3000/cards/${id}`,{
      method:"DELETE",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${this.state.token}`
      },
    })
    .then(r => r.json())
    .then(cardsAfterDel => {
      this.setState({
        // cards: this.state.user.cards.filter(cardObj => cardObj.id !== id )
        user: {
          ...this.state.user,
          cards: this.state.user.cards.filter(cardObj => cardObj.id !== id )
        }
      })
    })
  }

  handleLoginSubmit = (userInfo) => {

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleLogin)
  }

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
    .then(r => r.json())
    .then(this.handleSignUp)
  }

  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="vibe in" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/signup") {
      return <SignUpForm formName="vibe up" handleRegisterSubmit={this.handleRegisterSubmit}/>
    }
  }

  changeCardColor = () => {
    console.log('hi')
  }

  renderHome = () => {
    return <Home/>
  }

  renderCrib = (routerProps) => {
    return <CribContainer
      user={this.state.user}
      color={this.changeCardColor}
      token={this.state.token}
      addOneCard={this.addOneCard}
      delOneCard={this.delOneCard}
      delYourCard={this.delYourCard}
      changeCardColor={this.changeCardColor}
      logoutUser={this.logoutUser}
     
      
    />
  }

  renderCards = () => {
    return <AllCardsContainer
          allCards={this.filteredCardsArray()}
          user={this.state.user}
          token={this.state.token}
          delYourCard={this.delYourCard}
          deleteFromCardsPage={this.deleteFromCardsPage}
          cardFromSearchTerm={this.cardFromSearchTerm}
         />
  }

  cardFromSearchTerm = (searchTerm) => {
    this.setState({
      searchTerm: searchTerm
    })
  }


  filteredCardsArray = () => {
    let filteredArray = this.state.cards.filter(cardObj => {
  
      if (cardObj.card_title.toLowerCase().includes(this.state.searchTerm) || cardObj.message.toLowerCase().includes(this.state.searchTerm)){
        return cardObj
      } else if(cardObj.user.username.includes(this.state.searchTerm)) {
        return cardObj
      }
    })
    return filteredArray
  }

  render(){
   console.log(this.state)
    return (
      <div className="App">
        <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/signup" render={ () => <SignUpForm handleRegisterSubmit={this.handleRegisterSubmit}/> } />
          <Route path="/crib" render={ this.renderCrib } />
          <Route path="/" exact render={() => <Home /> } />
          <Route path="/cards" exact render={this.renderCards } />
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App)

import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Form from './Components/Form'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CribContainer from './CribComponents/CribContainer'

import {withRouter} from 'react-router-dom'




class App extends React.Component {


  state={
    user: {
      id: 0,
      username: "",
      cards: [],
      comments: []
    }
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
      .then(this.handleResp)
    }
  }



  handleResp = (resp) => {
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

  addOneCard = (cardObj) => {
    this.setState({
      user: {
        ...this.state.user,
        cards: [...this.state.user.cards, cardObj],
        comments: []
      }
    })
  }

  delOneCard = (id) => {
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
    console.log("Login form has been submitted")

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleResp)
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
    .then(this.handleResp)
  }



  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Vibe In" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/signup") {
      return <Form formName="Vibe Up" handleSubmit={this.handleRegisterSubmit}/>
    }
  }

  changeCardColor = () => {
    console.log('hi')
  }

  renderCrib = (routerProps) => {
    return <CribContainer
      user={this.state.user}
      token={this.state.token}
      addOneCard={this.addOneCard}
      delOneCard={this.delOneCard}
      changeCardColor={this.changeCardColor}
    />
  }

  render(){
    console.log(this.props, "APP PROPS");
    return (
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/login" render={ this.renderForm } />
          <Route path="/signup" render={ this.renderForm } />
          <Route path="/crib" render={ this.renderCrib } />
          <Route path="/" exact render={() => <Home /> } />
          <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App)

import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Form from './Components/Form'
import SignUpForm from './Components/SignUpForm'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import CribContainer from './CribComponents/CribContainer'
import AllCardsContainer from './CribComponents/AllCardsContainer'
import Comment from './Components/Comment'
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
    allComments:[],
    token: ""
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
      .then(this.handleLogin)
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

  //it's not doing anything with response right now
  // handleToken = (token) => {

  //   localStorage.getItem(token)
  // }


  // handleSignUp = (resp) => {
  //   if (resp.user) {
  //     localStorage.token = resp.token
  //     this.setState({
  //       user: resp.user,
  //       token: resp.token
  //     }, () => {
  //       this.props.history.push("/crib")
  //     })
  //   } else {
  //     alert(resp.error)
  //   }
  // }

  handleLogin = (resp) => {
    if (resp.user) {
      //saves to local storage
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

  logoutUser = () => {
    localStorage.clear()
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
      },
      cards: [...this.state.cards, cardObj]
    })
  }

  // updateCardArrayMyChild = (newCardArr) => {
  //   this.setState({
  //     cards: newCardArr
  //   })
  //   // this.renderCards()
  // }

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
        },
        cards: this.state.user.cards.filter(cardObj => cardObj.id !== id )
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
    .then(this.handleLogin)
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

  renderCrib = () => {
    return <CribContainer
      user={this.state.user}
      cards={this.state.cards}
      color={this.changeCardColor}
      token={this.state.token}
      addOneCard={this.addOneCard}
      delOneCard={this.delOneCard}
      delYourCard={this.delYourCard}
      changeCardColor={this.changeCardColor}
      logoutUser={this.logoutUser}
      addComment={this.addComment}
      comments={this.state.allComments}
     
      
    />
  }

  filteredCardsArray = () => {
    // fetch("http://localhost:3000/cards")
    // .then(r => r.json())
    // .then(cardsArr => {
    //   let filteredArray = cardsArr.filter(cardObj => {
    //     if (cardObj.card_title.toLowerCase().includes(this.state.searchTerm) || cardObj.message.toLowerCase().includes(this.state.searchTerm)){
    //       return cardObj
    //     } else if(cardObj.user.username.includes(this.state.searchTerm)) {
    //       return cardObj
    //     } 
    //   }) 
    //   return filteredArray
    // }) 
    // this.setState({cards: filteredArray, token: localStorage.token})

    let filteredArray = this.state.cards.filter(cardObj => {
  
      if (cardObj.card_title.toLowerCase().includes(this.state.searchTerm) || cardObj.message.toLowerCase().includes(this.state.searchTerm)){
        return cardObj
      } else if(cardObj.user.username.includes(this.state.searchTerm)) {
        return cardObj
      }
    })
    return filteredArray
  }
  
  // addComment = (commentTextFromCard) => {
  //     console.log(commentTextFromCard)
  // }

  // renderComments = () => {
  //   //this should take the current state of comments and render them
  //   return <Comment
  //           comments={this.state}
  //           />

  // }

  addComment = (commentObj) => {
      let newCommentObj = {...commentObj}
      fetch('http://localhost:3000/comments',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newCommentObj)
      })
      .then(r => r.json())
      .then(brandNewcomment => {
        let newArrayOfcomments = [brandNewcomment, ...this.state.allComments]
        this.setState({
          comments: newArrayOfcomments
        })
      })
    }
  
  renderCards = () => {
   
    //can the state be set in here?

    return <AllCardsContainer
          //all cards in the parent doesnt have access to its local state array of card objects before render.
          //should all cards
          allCards={this.filteredCardsArray()}
          addOneCard={this.addOneCard}
          user={this.state.user}
          token={this.state.token}
          delYourCard={this.delYourCard}
          deleteFromCardsPage={this.deleteFromCardsPage}
          cardFromSearchTerm={this.cardFromSearchTerm}
          updateCardArrayMyChild={this.updateCardArrayMyChild}
          addComment={this.addComment}
          comments={this.state.allComments}
         />
  }

  cardFromSearchTerm = (searchTerm) => {
    this.setState({
      searchTerm: searchTerm
    })
  }




  render(){
  
    return (
      <div className="App" >
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

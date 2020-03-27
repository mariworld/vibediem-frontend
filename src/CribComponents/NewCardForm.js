import React, { Component } from 'react';

class NewCardForm extends Component {

  state = {
    content_url: "",
    card_title: "",
    message: ""
    }
  

  // handleChangeComplete = (color) => {
  //   this.setState({ ...card, color: color.hex });
  // };

  handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/cards", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${this.props.token}`
      },
      body: JSON.stringify({
        message: this.state.message,
        content_url: this.state.content_url,
        card_title: this.state.card_title
      })
    })
    .then(r => r.json())
    .then((resp) => {
      console.log(resp);
      if (resp.id) {
        this.props.addOneCard(resp)
      } else {
        alert("Please login or sign-up")
      }
    })
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }



  handleColor = (e) => {
    this.props.changeCardColor(e.target.value)
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title:</label>  <br/>
        <input type="text" autoComplete="off" name="card_title" value={this.state.card_title} onChange={this.handleChange} /> <br/>
        <label>Image Address:</label><br/>
        <input type="text" autoComplete="off" name="content_url" value={this.state.content_url} onChange={this.handleChange} /><br/>
        <label>Message:</label><br/>
        <input type="text" autoComplete="off" name="message" value={this.state.message} onChange={this.handleChange} /><br/>
        {/* <label>Card Color:</label> <br/>
        <input type="color" autoComplete="off" name="color" value={this.state.color} onChange={this.handleColor} /><br/> */}
        <input type="submit" value="Create New Card" />
      </form>
    );
  }

}

export default NewCardForm;
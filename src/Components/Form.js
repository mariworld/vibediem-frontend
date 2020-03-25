import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Form extends Component {

  state = {
    username: "",
    password: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let {formName} = this.props
    let {username, password} = this.state

    return (
      <div align="center">
      <form onSubmit={this.handleSubmit}>
        <h1>{formName}</h1>
        <label htmlFor="username">Username:</label><br/>
        <input type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}/><br/>
        <label htmlFor="password">Password:</label><br/>
        <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/><br/>
        <input type="submit" value="Submit"/>
      </form>
      <Link to="/">Back To Main Page</Link>
      </div>
    );
  }

}

export default Form;


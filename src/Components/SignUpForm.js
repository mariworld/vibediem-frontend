import React, { Component } from 'react';
import { Link } from "react-router-dom"


class SignUpForm extends Component {

  state = {
    username: "",
    password: "",
    agreement: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let committment = "I hereby commit to be a magnificent vibe to this community."
    if (this.state.agreement.includes(committment.toLowerCase())){
      this.props.handleRegisterSubmit(this.state)
    }else{
      alert("Please agree to magnificent vibes")
    }
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let {formName} = this.props
    let {username, password, agreement} = this.state

    return (
      <div align="center">
      <h1 id="header">Vibe Diem</h1> 
      <form onSubmit={this.handleSubmit}>
        <h1>{formName}</h1>
        <label htmlFor="username">Username:</label><br/>
        <input type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}  aria-label={"Username"}
  aria-required="true"/><br/>
        <label htmlFor="password">Password:</label><br/>
        <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange} aria-label={"Password"}
  aria-required="true"/><br/>
        <label htmlFor="agreement">Agreement:</label><br/>
        <input type="text" autoComplete="off" name="agreement" value={agreement} onChange={this.handleChange} aria-label={"Agreement"}
  aria-required="true"/><br/> Type to Agree: I hereby commit to be a magnificent vibe to this community.<br/>
        <input type="submit" value="Submit" aria-label={"Submit"}

  aria-required="true"/>
      </form>
      <Link to="/">Back To Main Page</Link>
      </div>
    );
  }

}

export default SignUpForm;


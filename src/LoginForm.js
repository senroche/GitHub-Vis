import React, { Component } from 'react';
import './style.css';
const octokit = require('@octokit/rest')()

class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUsername= this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsername(event) {
    this.setState({username: event.target.value});
  }
  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    octokit.authenticate({username: this.state.username, password: this.state.password, type:'basic'})
    octokit.repos.list().then(result => {console.log(result)});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <label htmlFor="username">GitHub Access</label>
        <div>
          <input type="text" required className="form-control" name="username"
            placeholder="Username"
            onChange={this.handleUsername}/>
        </div>
        <div>
          <input type="password" className="form-control" name="text"
            placeholder="Password"
            onChange={this.handlePassword}/>
        </div>
        <button type="submit" className="btn btn-primary">Find Me</button>
      </form>
    )
  }
}

export default LoginForm;
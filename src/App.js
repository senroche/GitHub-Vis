import React, { Component } from 'react';
import './App.css';
import LoginForm from './LoginForm.js';


const octokit = require('@octokit/rest')()

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submit: false,

    };
    console.log(this.props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("trying to log in with username:", this.state.username, "Password:", this.state.password);
    octokit.authenticate({username: this.state.username, password: this.state.password, type:'basic'});
    octokit.repos.list().then(result => {console.log(result)});
    this.setState({submit:true});
  }


  handleChanges(event) {
    if(event.target.name==="username"){
      this.setState({username: event.target.value});
    }
    else if(event.target.name === "password"){
      this.setState({password: event.target.value});
    }
    else{
      console.log('Trying to update:',event.target.name,'to',event.target.value);
    }
  }



     

  render() {
    return (
      <div>
            
              <LoginForm onChange={this.handleChanges} onSubmit={this.handleSubmit}/>
            
          </div>
        
    );
  }
}

export default App;
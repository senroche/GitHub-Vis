import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm.js';
import Dashboard from './components/Dashboard.js';
import User from './components/User.js';

const octokit = require('@octokit/rest')()

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submit: false,
      userInfo: '',
      repoData: '',
      projects: '',
      starred: ''
    };
    console.log(this.props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let promises =[];

    //Authenticate User (may be optional in the future)
    console.log("Trying to log in with username:", this.state.username, "Password:", this.state.password);
    octokit.authenticate({username: this.state.username, password: this.state.password, type:'basic'});

    // Get user info
    octokit.users.getAuthenticated().then(result => {
      this.setState({userInfo: result.data});
      console.log("User Info",this.state.userInfo);
    
    
    //Get repo info
    octokit.repos.list().then(result => {
      this.setState({repoData: result.data});
      console.log("Repo data", this.state.repoData);});
    
  
    //Get activity
    octokit.activity.listNotifications().then(result => {
      console.log("Activity",result)});
    
      
    
    //Get starred repos 
      promises.push(octokit.activity.listReposStarredByUser({
        username: this.state.userInfo.login,
        sort:     "updated",
      }))
      promises.push(octokit.projects.listForUser({
        username: this.state.userInfo.login
      }))
       Promise.all(promises).then(resps => {
         console.log(resps)
        this.setState({projects: resps[0].data, starred : resps[1].data});
      })
      console.log('Promises', promises);   
      })

      // Make submit true (changes screen)
      console.log(this.state.starred);
      console.log(this.state.projects);
      this.setState({submit:true});
    
    };

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
        {this.state.submit ? (
          <Dashboard info={this.state.userInfo} repoData={this.state.repoData}/>
            ) : (
            <LoginForm onChange={this.handleChanges} onSubmit={this.handleSubmit}/>
            )}
        </div>
        
    );
  }
}

export default App;
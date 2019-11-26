import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm.js';
import Dashboard from './components/Dashboard.js';
import User from './components/User.js'
import Octokit from '@octokit/rest';
const octokit = require('@octokit/rest')()

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submit: false,
      userInfo: '',
      repoData: null,
      projects: '',
      starred: '',
      langStats: null,
      repoPrivData: '',
      punchStats:null
    };
    console.log(this.props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    let promises =[];

    //Authenticate User (may be optional in the future)
    console.log("Trying to log in with username:", this.state.username, "Password:", this.state.password);
    octokit.authenticate({username: this.state.username, password: this.state.password, type:'basic'});



    octokit.repos.listForUser({
      username: this.state.username
      }).then(result => {
      this.setState({repoPrivData: result.data})
      })
      .then(() =>{
      console.log("Repo data", this.state.repoPrivData);
    
      this.getPunchCardStats()  
      .then(r=>
        this.setState({punchStats: r}))
      });
    

      


    // Get user info
    octokit.users.getAuthenticated().then(result => {
      this.setState({userInfo: result.data});
      console.log("User Info",this.state.userInfo);
    
    
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
    })
        this.getLanguageStats().then(res=>{
        this.setState({langStats: res,  submit:true});
        console.log('repo data' , this.state.repoData);
      })
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

  

   /* Get public repo language stats*/
  async getLanguageStats(){
    let arr = [];
    let newArray=[];
    //List repos for given username
    octokit.repos.listForUser({
      username: this.state.username
      }).then(res => {
      //Set state with repo data
      this.setState({repoData:res.data});
      console.log('repo data' , this.state.repoData);
      let userRepos = res.data.map(e => e.name);
      //For each repo name
      userRepos.forEach(e => {
      arr.push(octokit.repos.listLanguages({
        owner: this.state.username,
          repo: e
              }))
          })
          Promise.all(arr).then(repoStats => {
          let languageStats = Object()
            repoStats.map(e =>    
                    e.data
            ).filter(e => 
                Object.keys(e).length
            ).forEach(e => {
                for(let key of Object.keys(e)){
                    if(key in languageStats){
                        languageStats[key] += e[key]
                    }else{
                        languageStats[key] = e[key]
                    }
                }
                console.log('e'+e)
              })
              for (var key in languageStats) {
                var obj = {
                  name: key,
                  count: languageStats[key]
                };
                newArray.push(obj);
            }
            this.setState({langStats: newArray});
          console.log('Public language stats' , newArray);
        });
       })
          
    return newArray;
  }
  
  /* punchCardData:
 > [repo, repo, ..] length = number of repos 
     |
    >[0..167]       length = 24 hours * 7 days 
          |
        >[day(0-6), hour(0-23), number of commits] length =  3

  */

 combineData(punchCardData){
  
  var combined=[];
  var k=0;
  var j = 0;
  //Create array [day][hour][(commits = 0)]
  for(var i=0; i<168; i++){
      if(i%24===0 && i!=0){
        j++;
      }
      var commits = 0;
      combined.push([j, i%24, 0]);
    }
    console.log('Looks like this', combined)
    console.log(combined[1][2]);
  
  var k=0;
  var j = 0;
  var i = 0;
  for(var i=0; i<punchCardData.length; i++){
    for(var j=0; j<168; j++){
      if(punchCardData[i][j][2]!=0){
       var commits = punchCardData[i][j][2];
       combined[j][2]+=commits;
        }
    }
  }
 
 return combined;
}

  async getPunchCardStats() {
    const userRepo = this.state.repoPrivData
    let promiseArr = [];
    let punchCardData;
    userRepo.forEach(d => {
      promiseArr.push(
        octokit.repos.getPunchCardStats({
          owner: this.state.username,
          repo: d.name
        })
      );
    });
    
    Promise.all(promiseArr).then(repoStats => {
       punchCardData = repoStats.map(d => d.data);

    }).then(()=> {
      this.setState({punchStats:this.combineData(punchCardData)});
      console.log('Condensed',this.state.punchStats);
      return this.state.punchStats;

    }).catch(err =>
      console.log(err));
}



  render() {
    return (
      <div>
        {this.state.submit ? (
          <Dashboard info={this.state.userInfo} repoData={this.state.repoData} lang={this.state.langStats} />
            ) : (
            <LoginForm onChange={this.handleChanges} onSubmit={this.handleSubmit}/>
            )}
        </div>
        
    );
  }
}

export default App;
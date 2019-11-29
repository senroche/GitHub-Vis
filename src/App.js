import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm.js';
import Dashboard from './components/Dashboard.js';
const octokit = require('@octokit/rest')()

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userInfo: '',
      repoData: '',
      starred: '',
      langStats: null,
      punchStats:null,
      loadedPie: false,
      loadedPunch:false,
      submit: false
    };

    this.baseState = this.state
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
  }

  reset() {
    this.setState(this.baseState)
  }

  async handleSubmit(event) {
    event.preventDefault();
    

    //Authenticate User (may be optional in the future)
    try{
    octokit.authenticate({username: this.state.username, password: this.state.password, type:'basic'})

    // Get user info
    octokit.users.getAuthenticated().then(result => {
      this.setState({userInfo: result.data})

    octokit.activity.listReposStarredByUser({
      username: this.state.username,
    }).then(result => {
      this.setState({starred: result.data});
    })
       
    octokit.repos.listForUser({
      username: this.state.username
      }).then(result => {
      this.setState({repoData: result.data})
      }).then(()=>{

      this.getLanguageStats().then(res=>{
      this.setState({langStats: res, loadedPie:true})});
      
      this.getPunchCardStats()
    });
      
    })
    }
    catch(err) {
      alert("Something went wrong, please check your details and try again.")
      this.reset();
    }
    
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

  

   /* Get public repo language stats*/
  async getLanguageStats(){
    let arr = [];
    let newArray=[];
    let userRepos = this.state.repoData
    userRepos = userRepos.map(e => e.name);
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
        });
       //})
          
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
  var j = 0;
  //Create array [day][hour][(commits = 0)]
  for(var i=0; i<168; i++){
      if(i%24===0 && i!=0){
        j++;
      }
      var commits = 0;
      combined.push([j, i%24, 0]);
    }
  
  for(var i=0; i<punchCardData.length; i++){
    for(var j=0; j<168; j++){
      if(punchCardData[i][j][2]!=0){
       var commits = punchCardData[i][j][2];
       combined[j][2]+=commits;
        }
    }
  }
  //The graph only needs array values where there are commits
  const day = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  var newArr = [];
  var obj = new Object();
  for(var i = 0; i <combined.length; i++){
    if(combined[i][2]!=0){
    obj = {
      name: day[combined[i][0]],
      value: combined[i][1],
      count: combined[i][2]
    }
    newArr.push(obj);
    //Make sure graph starts at 0
    newArr.push({name: 'Monday', value: 0, count: 0});
    }
  }
    return newArr;
  }
  


  async getPunchCardStats() {
    const userRepo = this.state.repoData;
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
      this.setState({punchStats:this.combineData(punchCardData), loadedPunch:true})
      .then(()=>{
      return this.state.punchStats;
      });

    }).catch(err =>
      console.log(err));
}

//Don't think I'll have time to implement this before exams due to study
/*
async getContributors() {
  const userRepo = this.state.repoData
  let promiseArr = [];
  userRepo.forEach(d => {
    promiseArr.push(
      octokit.repos.listContributors({
        owner: this.state.username,
        repo: d.name
      })
    );
  });
  
  Promise.all(promiseArr).then(repoStats => {
     punchCardData = repoStats.map(d => d.data);

  }).then(()=> {
    this.setState({})
    .then(()=>{
    return this.state.punchStats;
    });

  }).catch(err =>
    console.log(err));
}

*/

  render() {
    return (
      <div>
        {this.state.submit && this.state.loadedPunch && this.state.loadedPie ? (
          <Dashboard info={this.state.userInfo} repoData={this.state.repoData} lang={this.state.langStats} punch={this.state.punchStats} star={this.state.starred} />
            ) : (
            <LoginForm onChange={this.handleChanges} onSubmit={this.handleSubmit}/>

            )}
        </div>
        
    );
  }
}

export default App;
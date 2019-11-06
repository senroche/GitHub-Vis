import React, { Component } from 'react';
import './style.css';

class LoginForm extends Component {
 
  render () {
    
    return (
      <form className="login" onSubmit={this.props.onSubmit}>
        <label htmlFor="username">GitHub Access</label>
        <div>
          <input type="username" required className="form-control" 
            name="username"
            placeholder="Username" 
            value={this.props.username}
            onChange={this.props.onChange}/>
        </div>
        <div>
          <input type="password" className="form-control" 
            name="password"
            placeholder="Password"
            value={this.props.password}
            onChange={this.props.onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    )
  }
}

export default LoginForm;
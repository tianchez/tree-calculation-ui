import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import './signinComponent.css';
import UserService from '../../service/userService'
import Cookies from 'universal-cookie';


class SigninComponent extends Component{
    constructor(props){
        super(props);
    
        this.state = {};
        this.loginClicked = this.loginClicked.bind(this);
        this.signupClicked = this.signupClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }


    handleChange(e){
        this.setState({
          [e.target.id]: e.target.value
        })
      }
    
    loginClicked(e){
        e.preventDefault();
        let cred = {
            username: this.state.username,
            password: this.state.password
        }

        UserService.signin(cred).then(res=>{
            if (!res.success){
                alert(res.message);
                return;
            }
            const cookies = new Cookies();
            var ONE_HOUR = 60 * 60 * 1000; /* ms */
            cookies.set('jwt_token', res.token, { path: '/', expires: new Date(Date.now() + ONE_HOUR) });
            cookies.set('firstname', res.firstName, { path: '/', expires: new Date(Date.now() + ONE_HOUR) });
            console.log(cookies.get('jwt_token')); 
            this.setState({loggeddIn: true})
        }).catch(err => alert(err)); 
    }

    signupClicked(){
        const { history } = this.props;
        history.push('/signup');
    }

    componentDidMount(){

        
    }

    render(){
       if (this.state.loggeddIn){
        return <Redirect to='/tree' />
       }
       else{
        return (
            <div className="container">
                <form className="white signin-form">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        {!this.state.username ? <label htmlFor="username">Username</label>: ''}
                        <input type="text" id='username' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        {!this.state.password ? <label htmlFor="password">Password</label>: ''}
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="cred-button signin-button btn pink lighten-1 z-depth-0" onClick={this.loginClicked}>Login</button>
                        <button className="cred-button signup-button btn pink lighten-1 z-depth-0" onClick={this.signupClicked}>Sign up</button>
                        <div className="center red-text">
                        </div>
                    </div>
                </form>
            </div>
          );
       }
        
    }

   
}

export default SigninComponent;
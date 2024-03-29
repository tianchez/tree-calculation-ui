import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import '../signin/signinComponent.jsx';
import UserService from '../../service/userService'


import Cookies from 'universal-cookie';


class SignupComponent extends Component{
    constructor(props){
        super(props);
    
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);


    }


    handleChange(e){
        this.setState({
          [e.target.id]: e.target.value
        })
      }
    
    handleSubmit(e){
        e.preventDefault();
        let cred = {
            first: this.state.firstName,
            last: this.state.lastName,
            username: this.state.username,
            password: this.state.password
        }

        UserService.signup(cred).then(res=>{
            if (!res.success){
                alert(res.message);
                return;
            }
            const cookies = new Cookies();
            var ONE_HOUR = 60 * 60 * 1000; /* ms */
            cookies.set('jwt_token', res.token, { path: '/', expires: new Date(Date.now() + ONE_HOUR) });
            cookies.set('firstname', res.firstName, { path: '/', expires: new Date(Date.now() + ONE_HOUR) });
            this.setState({loggeddIn: true})
        }).catch(err =>{
            alert(err);
        });
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
                    <form className="white signin-form" onSubmit={this.handleSubmit}>
                        <h5 className="grey-text text-darken-3">Sign Up</h5>
                        <div className="input-field">
                            {!this.state.firstName ? <label htmlFor="firstName">First name</label>: ''}
                            <input type="text" id='firstName' onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            {!this.state.lastName ? <label htmlFor="lastName">Last name</label>: ''}
                            <input type="text" id='lastName' onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            {!this.state.username ? <label htmlFor="username">Username</label>: ''}
                            <input type="text" id='username' onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            {!this.state.password ? <label htmlFor="password">Password</label>: ''}
                            <input type="password" id='password' onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Sign up</button>
                            <div className="center red-text">
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }

   
}

export default SignupComponent;
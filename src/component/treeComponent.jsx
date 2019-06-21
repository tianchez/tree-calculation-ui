import React, {Component} from 'react';
import Constants from '../Constants';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'

import './treeComponent.css';

class TreeComponent extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.calculateClicked = this.calculateClicked.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
        
        this.cookies = new Cookies();

        this.tree_data ={
            key: 'sdsdd',
            val: '1',
            children: [
                {
                    key: 'ehgr',
                    val: '2',
                    children: [
                        {
                            key: 'cvdsvs',
                            val: '4',
                            children: []
                        },
                        {
                            key: 'gfdg',
                            val: '5',
                            children: [
                                {
                                    key: 'sfgs',
                                    val: '6',
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 'fsdfsd',
                    val: '3',
                    children: [
                        {
                            key: 'bvbc',
                            val: '7',
                            children: [
                                {
                                    key: 'rwerw',
                                    val: '8',
                                    children: [
                                        {
                                            key: 'grge',
                                            val: '9',
                                            children: [
                                                {
                                                    key: '67657',
                                                    val: '15',
                                                    children: []
                                                },
                                                {
                                                    key: 'hrhr',
                                                    val: '16',
                                                    children: [
                                                        {
                                                            key: 'dfddfh',
                                                            val: '17',
                                                            children: []
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    key: 'asdda',
                                    val: '10',
                                    children: [
                                        {
                                            key: 'ewrew',
                                            val: '11',
                                            children: []
                                        },
                                        {
                                            key: 'hrthr',
                                            val: '12',
                                            children: [
                                                {
                                                    key: 'zcvzcv',
                                                    val: '13',
                                                    children: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key: 'zvssdv',
                            val: '14',
                            children: []
                        }
                    ]
                }
            ]
        }

        var input_states = {};
        this.buildTree(this.tree_data, input_states);
        this.state = {value: '', input_states: input_states, result: '?'};        

    }

    componentDidMount(){

        
    }

    buildTree(data, input_states){
        if (!data.key) return;
        input_states[data.key] = data.val;
        if (data.children && data.children.length > 0){
            data.children.forEach(item=>{
                this.buildTree(item, input_states);
            })
        }
    }

    handleChange(event, key) {
        console.log(event.target.value);
        let input_states = this.state.input_states;
        input_states[key] = event.target.value;
        this.updateData(key, event.target.value, this.tree_data);
        this.setState({input_states: input_states});
      }

    getTreeDOM(data){
        if (!data.key) return;
        let child_div = data.children && data.children.length > 0 ?  data.children.map(item=>{
            return (
                <li>
                    {this.getTreeDOM(item)}
                </li>
            )
        }) :'';
        return (
            <React.Fragment>
                <input className="tree-input" key={data.key} type="number" value={this.state.input_states[data.key]} onChange={(e) =>this.handleChange(e, data.key)} />
                {data.children && data.children.length > 0 ? (
                    <ul>
                        {child_div}
                    </ul>
                ): ''}
            </React.Fragment>
        )
    }

    updateData(key, val, data){
        if (!data.key) return;
        else if (data.key == key){
            data.val = val;
            return;
        }
        if (data.children){
            data.children.forEach(item=>{
                this.updateData(key, val, item);
            })
        }
    }

    calculateClicked(){
        let api_data = {
            treeData: this.tree_data
        }
        fetch(`${Constants.HOST_NAME}/calculate`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(api_data), // body data type must match "Content-Type" header
        })
        .then(response =>response.json())
        .then(res=>{
            if (res.success){
                this.setState({result: res.sum});
            }
        }).catch(err => console.log(err)); // parses JSON response into native Javascript objects
    }

    logoutClicked(){
        const { history } = this.props;
        const cookies = new Cookies();
        cookies.remove('jwt_token');
        cookies.remove('firstname');
        history.push('/signin');
    }

    render(){
        if (!this.cookies.get('jwt_token')){
            return <Redirect to='/signin' />
        }
        else{
            return (
            <div className="container">
                <h5>Hello, {this.cookies.get('firstname')}</h5>
                <h5>Get the sum in the longest path in the tree</h5>
                <div class="tree">
                     <ul>
                         <li>
                             {this.getTreeDOM(this.tree_data)}
                         </li>
                     </ul>
                 </div>
                 <button className="calculate-button" onClick={this.logoutClicked}>Log out</button>
                 <button className="calculate-button" onClick={this.calculateClicked}>Calculate!</button>
                 <div className="result-area">
                     <span>Result:</span> <span>{this.state.result}</span>
                 </div>
            </div> 
            )
        }
        
    }

   
}

export default TreeComponent;
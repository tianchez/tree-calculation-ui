import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import TreeService from '../../service/treeService';
import './treeComponent.css';

class TreeComponent extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.calculateClicked = this.calculateClicked.bind(this);
        this.logoutClicked = this.logoutClicked.bind(this);
        this.removeClicked = this.removeClicked.bind(this);
        this.addClicked = this.addClicked.bind(this);

        this.cookies = new Cookies();

        // Initial tree data
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

        // parent key -> children key list and value
        var data_map = new Map();
        // child key -> parent key
        var parent_map = new Map();
        // set root's parent as null
        parent_map.set(this.tree_data.key, null);
        this.deserializeTree(data_map, this.tree_data, parent_map);

        this.state = {result: '?', data_map: data_map, parent_map, parent_map,root_key: this.tree_data.key};     

    }

    componentDidMount(){

        
    }

    // Use DFS to convert JSON to HashMap
    // Time: O(n)
    deserializeTree(data_map, tree_node, parent_map){
        if (!tree_node.key) return;
        let key = tree_node.key;
        let value = {val: tree_node.val, children:[]};
        if (tree_node.children && tree_node.children.length > 0){
            tree_node.children.forEach(child=>{
                value.children.push(child.key);
                parent_map.set(child.key, tree_node.key);
                this.deserializeTree(data_map, child, parent_map);
            })
        }
        data_map.set(key, value);
    }

    // Use DFS to convert HashMap to JSON
    // Time: O(n)
    serializeTree(key){
        if (!this.state.data_map.has(key)) return null;
        else if (this.state.data_map.get(key).children.length == 0){
            return {
                key: key,
                val: this.state.data_map.get(key).val,
                children: []
            }
        }
        else{
            let children_list = [];
            this.state.data_map.get(key).children.forEach(child_key=>{
                let child_node = this.serializeTree(child_key);
                if (child_node){
                    children_list.push(child_node);
                }
            });
            return {
                key: key,
                val: this.state.data_map.get(key).val,
                children: children_list
            }
        }
    }

    handleChange(event, key) {
        this.state.data_map.get(key).val = event.target.value;;
        this.forceUpdate();
      }

    getTreeDOM(key){
        if (!this.state.data_map.has(key)) return null;
        let child_div = this.state.data_map.get(key).children && this.state.data_map.get(key).children.length > 0 ?  this.state.data_map.get(key).children.map(child_key=>{
            let child_node = this.getTreeDOM(child_key);
            if (child_node){
                return (
                    <li key={child_key}>
                        {this.getTreeDOM(child_key)}
                    </li>
                )
            }
            else return '';
        }) :'';
        return (
            <React.Fragment>
                <div className="node-container">
                    {/* Show remove button only as leave node and not the root node */}
                    {this.state.data_map.get(key).children.length == 0  && key != this.state.root_key? 
                        <button className="edit-button btn-floating btn-small waves-effect waves-light red" onClick={(e) =>this.removeClicked(e, key)}>
                            <i className="material-icons">remove</i>
                        </button> :''}
                    <input className="tree-input" type="number" value={this.state.data_map.get(key).val} onChange={(e) =>this.handleChange(e, key)} />
                    {/* Show add button only has fewer than 2 childs */}
                    {this.state.data_map.get(key).children.length < 2 ?
                        <button className="edit-button btn-floating btn-small waves-effect waves-light green" onClick={(e) =>this.addClicked(e, key)}>
                            <i className="material-icons">add</i>
                        </button> :''}
                </div>
                {/* child Nodes */}
                {this.state.data_map.get(key).children && this.state.data_map.get(key).children.length > 0 ? (
                    <ul>
                        {child_div}
                    </ul>
                ): ''}
            </React.Fragment>
        )
    }

    calculateClicked(){
        let tree_node = this.serializeTree(this.state.root_key);
        if (!tree_node) tree_node = {};

        TreeService.calcultaeSum(tree_node)
        .then(res=>{
            if (!res.success){
                alert(res.message);
                return;
            }
            this.setState({result: res.sum});
        }).catch(err => alert(err)); 
    }

    logoutClicked(){
        const { history } = this.props;
        const cookies = new Cookies();
        cookies.remove('jwt_token');
        cookies.remove('firstname');
        history.push('/signin');
    }

    removeClicked(event, key){
        const parent_key = this.state.parent_map.get(key);
        if (parent_key){
            let parent_children_list = this.state.data_map.get(parent_key).children;
            // remove from parent's children list
            parent_children_list = parent_children_list.filter(child_key => child_key !==key);
            this.state.data_map.get(parent_key).children = parent_children_list;
        }
        // remove key from parent map and data_map
        this.state.parent_map.delete(key);
        this.state.data_map.delete(key);
        this.forceUpdate();
    }

    addClicked(event, key){
        const new_key = this.generateKey(6);
        let new_node = {
            key: new_key,
            val: 0,
            children: []
        };
        // Add new node to parent list
        this.state.data_map.get(key).children.push(new_key);
        // Add new node to data_map and parent_map
        this.state.data_map.set(new_key, new_node);
        this.state.parent_map.set(new_key, key);
        this.forceUpdate();

    }

    generateKey(length) {
        var result;
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        while (!result || this.state.data_map.has(result)){
            result = '';
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
             }
        }
        return result;
     }

    render(){
        // Login credential is expired
        if (!this.cookies.get('jwt_token')){
            return <Redirect to='/signin' />
        }
        else{
            return (
                <div className="container">
                    <h5>Hello, {this.cookies.get('firstname')}</h5>
                    <h5>Get the sum in the longest path in the tree</h5>
                    <button className="tree-menu-button btn waves-effect waves-light" onClick={this.calculateClicked}>Calculate <i class="material-icons right">send</i></button>
                    <button className="tree-menu-button btn waves-effect waves-light red lighten-2" onClick={this.logoutClicked}>Log out</button>
                    <div className="result-area">
                        <span>Result:</span> <span>{this.state.result}</span>
                    </div>
                    <div className="tree">
                        <ul>
                            <li key={this.state.root_key}>
                                {this.getTreeDOM(this.state.root_key)}
                            </li>
                        </ul>
                    </div>
                </div> 
            )
        }
        
    }

   
}

export default TreeComponent;
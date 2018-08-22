import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ApiService from './utils/ApiService';

// @log
// class a {
//     jid;

//     constructor(){
//         this.jid = 123;
//     }
// }

// function log(target){

// }

// var ac  = new a();
// console.log('c',ac.jid)


class App extends Component{
    componentDidMount(){
        ApiService({_mt: 'sims.getUserProfile'}, true).then((res)=>{
            console.log(res);
        })
    }
    componentWillMount(){
        console.log(this.props)
    }
    handleClick(){
        this.props.history.push("/about")
    }
    render(){
        return (<div onClick={this.handleClick.bind(this)}>App x</div>)
    }
}

export default withRouter(App)
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class App extends Component{
    componentWillMount(){
        console.log(this.props)
    }
    handleClick(){
        this.props.history.push("/about")
    }
    render(){
        return (<div onClick={this.handleClick.bind(this)}>App</div>)
    }
}

export default withRouter(App)
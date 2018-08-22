import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class About extends Component{
    componentWillMount(){
        console.log(this.props)
    }
    handleClick(){
        this.props.history.push('/topics')
    }
    render(){
        return <div onClick={this.handleClick.bind(this)}>about</div>
    }
}

export default withRouter(About)
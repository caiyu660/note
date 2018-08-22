import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'index.scss';

class App extends Component{
    static propTypes = {
        content: PropTypes.string
    }
    render(){
        return <div>{this.props.content}</div>
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));
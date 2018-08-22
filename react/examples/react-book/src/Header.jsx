import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


// @log
// class abc{

// }

// function log(target){
//     console.log('a');
// }

var a  = new abc();

class Header extends Component{
    static propTypes = {
        color: PropTypes.string
    }
    render(){
        return <h1 style={{color: this.props.color}}>react xiaoshu</h1>
    }
}

const mapStateToProps = (state) => {
    return {
        color: state.color
    }
}

export default connect(mapStateToProps)(Header)
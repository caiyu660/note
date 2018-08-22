import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Switch from './Switch'
import {connect} from 'react-redux'

class Content extends Component{
    static propTypes = {
        color: PropTypes.string
    }
    render(){
        return (<React.Fragment>
            <div style={{color: this.props.color}}>Content</div>
            <Switch />
        </React.Fragment>)
    }
}

const mapStateToProps = (state) => {
    return {
        color: state.color
    }
}

export default connect(mapStateToProps)(Content)
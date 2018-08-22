import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Switch extends Component{
    static propTypes = {
        color: PropTypes.string.isRequired,
        onSwitchColor: PropTypes.func
    }
    handleClick(color){
        if(this.props.onSwitchColor){
            this.props.onSwitchColor(color)
        }
    }
    handleDoubleClick(){
        if(this.props.onDoubleClick){
            this.props.onDoubleClick('yellow')
        }
    }
    render(){
        return (
            <React.Fragment>
                <button style={{color: this.props.color}} onClick={this.handleClick.bind(this, 'red')}>red</button>
                <button style={{color: this.props.color}} onClick={this.handleClick.bind(this, 'blue')} onDoubleClick={this.handleDoubleClick.bind(this)}>blue</button>
            </React.Fragment>
        )
    }   
}
// 

const delaySet = (color) => (dispatch, getState) => {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:9999');
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            console.log(xhr.responseText)
            dispatch({type: "CHANGE_COLOR", color: color})
        }
    }
    xhr.send(null)
    // setTimeout(()=>{
    //     dispatch({type: "CHANGE_COLOR", color: 'green'})
    // }, 6000)
}

const setColor = (color) => {
    return {
        type: "OVER_COLOR",
        promise: new Promise((reslove)=>{
            setTimeout(()=>{
                return reslove(color)
            }, 3000)
        })
    }
}

export default connect((state)=>{
    return {
        color: state.color
    }
}, (dispatch)=>{
    return {
        onSwitchColor: (color)=>{
            dispatch(delaySet(color))
        },
        onDoubleClick: (color)=>{
            dispatch(setColor(color))
        }
    }
})(Switch)
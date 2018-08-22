import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {middleware as reduxPackMiddleware} from 'redux-pack'
import Thunk from 'redux-thunk'
import Header from './Header'
import Content from './Content'
import {handle} from 'redux-pack'


class Index extends Component{
  render(){
    console.log()
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

const reducer = (state, action) => {
  console.log(state)
  if(!state){
    return {
      color: 'red'
    }
  }
  switch(action.type){
    case "CHANGE_COLOR":
      return {...state, color: action.color}
    case "OVER_COLOR":
      return handle(state, action, {
        success: (preState) => ({
          ...preState,
          color: action.payload
        })
      })
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(Thunk, reduxPackMiddleware))


ReactDOM.render(
  <Provider store={store}>
    <Index/>
  </Provider>,
  document.getElementById('root')
)
import React, { Component } from 'react'
import  Loading from './spinner.gif';
export default class Spinner extends Component {
  render() {
    return (
        <div className='text-center'>
        <img src={Loading} alt="Loading" style={{aspectRatio : "1",height: "20px"}}/>
        </div>
    )
  }
}

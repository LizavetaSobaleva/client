import React from 'react'
import './input.less'

const Input = (props) => {
  return (
    <input {...props} data-testid={props['data-testid'] || "testInput"}/>
  )
}

export default Input
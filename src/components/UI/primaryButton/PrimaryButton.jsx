import React from 'react'
import './primaryButton.less'

const PrimaryButton = ({children, ...props}) => {
  return (
    <button {...props} className='primaryButton'>
        {children}
    </button>
  )
}

export default PrimaryButton
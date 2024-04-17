import React from 'react'
import './secondaryButton.less'

const SecondaryButton = ({children, ...props}) => {
  return (
    <button {...props} className='secondaryButton'>
        {children}
    </button>
  )
}

export default SecondaryButton
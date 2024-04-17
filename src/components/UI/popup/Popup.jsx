import React from 'react'
import './popup.less'
import SecondaryButton from '../secondaryButton/SecondaryButton'
import close from '../../../assets/img/close.svg'

const Popup = ({header, onClick, children, ...props}) => {

  return (
    <div className='popup' {...props} onClick={(e) => e.stopPropagation()}>
      <div className="popup__header">
        <div className="popup__title">{header}</div>
        <SecondaryButton onClick={onClick}>
          <img src={close} alt='' className='popup__close'/>
        </SecondaryButton>
      </div>
      {children}
    </div>
  )
}

export default Popup
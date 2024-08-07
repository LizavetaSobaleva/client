import React from 'react'
import './popup.less'
import SecondaryButton from '../secondaryButton/SecondaryButton'
import close from '../../../assets/img/close.svg'

const Popup = ({header, onClick, children, ...props}) => {

  return (
    <div className='popup' {...props} onClick={(e) => e.stopPropagation()} data-testid="popup">
      <div className="popup__header">
        <div className="popup__title" data-testid="popupTitle">{header}</div>
        <SecondaryButton onClick={onClick} data-testid="popupCloseBtn">
          <img src={close} alt='' className='popup__close'  data-testid="popupCloseIcon"/>
        </SecondaryButton>
      </div>
      {children}
    </div>
  )
}

export default Popup
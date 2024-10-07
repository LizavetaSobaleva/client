import React from 'react'
import './label.less'

const Label = ({children, status, ...props}) => {
  const statusClass = `label ${status}`;

  return (
    <div {...props} className={statusClass} data-testid={props['data-testid'] || "label"}>
        {children}
    </div>
  )
}

export default Label
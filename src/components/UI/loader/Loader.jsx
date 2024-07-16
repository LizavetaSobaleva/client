import React from 'react'
import "./loader.less"

const Loader = () => {
  return (
    <div className="loader" data-testid="loader">
      <div className="loader__line"  data-testid="loaderLine"></div>
    </div>
  )
}

export default Loader
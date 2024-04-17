import React from 'react'
import './progressBar.less'

const ProgressBar = ({progress}) => {
  return (
    <div className='progressBar'>
        <div className="progressBar__line">
        <div className="progressBar__upload" style={{width: progress + '%', backgroundColor: progress === 100 && 'green'}}/>
        </div>
        
        <div className="progressBar__percent" style={{marginRight: (100 - progress) + '%'}}>{progress}%</div>
    </div>
  )
}

export default ProgressBar
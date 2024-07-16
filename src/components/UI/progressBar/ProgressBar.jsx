import React from 'react'
import './progressBar.less'

const ProgressBar = ({progress}) => {
  return (
    <div className='progressBar' data-testid="progressBar">
        <div className="progressBar__line" data-testid="progressBarLine">
        <div className="progressBar__upload" data-testid="progressBarUpload" style={{width: progress + '%', backgroundColor: progress === 100 && 'green'}}/>
        </div>
        
        <div className="progressBar__percent" data-testid="progressBarPercent" style={{marginRight: (100 - progress) + '%'}}>{progress}%</div>
    </div>
  )
}

export default ProgressBar
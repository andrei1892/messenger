import React from 'react'
import "./Button.css"

const Button = (props) => {
  const {classes, type, value, onClick, content} = props;
    return(
        <button 
          className={classes} 
          type={type} 
          value={value}
          onClick={onClick}>
        {content}
      </button>
    )
}

export {Button};
import React from 'react'
import "./Button.css"

const Button = (props) => {
  const { extraClass, type, value, onClick, text} = props;
    return(
        <button 
          className={extraClass} 
          type={type} 
          value={value}
          onClick={onClick}>
        {text}
      </button>
    )
}

export {Button};
import React from 'react'
import "./Button.css"

const Button = (props) => {
  const {type, classes, content, onClick} = props;
    return(
        <button className={classes} type={type} onClick={onClick}>
        {content}
      </button>
    )
}

export {Button};
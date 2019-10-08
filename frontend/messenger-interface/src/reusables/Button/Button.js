import React from 'react'
import "./Button.css"

const Button = (props) => {
  const {type, classes, content} = props;
    return(
        <button className={classes} type={type}>
        {content}
      </button>
    )
}

export {Button};
import React from 'react';
import './Loader.css';

const Loader = (props) => {
    const size = props.size;
    return(
        <div className={`loader ${size}`} />
    )
}

export default Loader;
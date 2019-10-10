import React from 'react';
import './Loader.css';

const Loader = (props) => {
    const size = props.size;
    if( props.isLoading ) return (
        <div className={`loader ${size}`} />
    )
    else return <React.Fragment> {props.children} </React.Fragment>
}

export default Loader;
import React from 'react';
import './FormField.css';

const FormField = (props) => {
    const {label, labelFor,  dataQa, extraClass , children} = props;
    return(
    <div className={`form-field-container ${extraClass}`} >
        {label ? <label htmlFor={labelFor}>{label}</label> : null}
        {children}
    </div>
    );
}

export {FormField};
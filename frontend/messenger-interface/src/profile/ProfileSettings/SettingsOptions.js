import React from 'react';

 const PersonalInfo = (props) => {
    return (
        <form id="personalInfo" className="form">
            <label>First Name</label>
            <input
                id='settingsFirstName'
                value={props.defaultValue || ''}
                autoComplete="off"
                //onChange
            />
            <label>Last Name</label>
            <input
                id='settingsLastName'
                value={props.defaultValue || ''}
                autoComplete="off"
                //onChange
            />
            <label>Age</label>
            <input
                id='age'
                value={props.defaultValue || ''}
                autoComplete="off"
                //onChange
            />
             <label>Sex</label>
            <input
                id='age'
                value={props.defaultValue || ''}
                autoComplete="off"
                //onChange
            />
            <label>Currently Living</label>
            <input
                id='location'
                value={props.defaultValue || ''}
                autoComplete="off"
                //onChange
            />
        </form>
    )
}

const Language = () => {

}

const Security = () => {

}

export const configSettingsMenu = (props) => {
   const config = {
        personalInfo: PersonalInfo,
        language: Language,
        security: Security
    }

    return config[props];
}

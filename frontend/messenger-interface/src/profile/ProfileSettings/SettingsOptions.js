import React from 'react';
import {FormField} from 'reusables/FormField/FormField';
import "./ProfileSettings.css"

 const PersonalInfo = (props) => {
    return (
        <form id="personalInfo" className="settings-form">
            <fieldset>
               <FormField label={'First Name'} labelFor={'settingsFirstName'} >           
                    <input
                        id='settingsFirstName'
                        defaultValue={props.default}
                        // value={''}
                        autoComplete="off"
                        //onChange
                        />
                </FormField>
                <FormField  label={'Last Name'} labelFor={'settingsLastName'}>
                    <input
                        id='settingsLastName'
                        defaultValue={props.default}
                        // value={''}
                        autoComplete="off"
                        //onChange
                    />
                </FormField>
            <label>Age</label>
            <input
                id='age'
                defaultValue={props.default}
                // value={''}
                autoComplete="off"
                //onChange
                />
             <label>Sex</label>
             
            <input
                id='age'
                defaultValue={props.default}
                // value={''}
                autoComplete="off"
                //onChange
                />
            <label>Currently Living</label>
            <input
                id='location'
                defaultValue={props.default}
                // value={''}
                autoComplete="off"
                //onChange
                />
        </fieldset>
    </form>
    )
}

const Language = () => {

}

const Security = () => {

}

export const ConfigSettingsMenu = (props) => {
   const config = {
        personalInfo: PersonalInfo,
        language: Language,
        security: Security
    }

    const SettingsMenuForm = config[props.type];

    return <SettingsMenuForm default={props.default} />
}

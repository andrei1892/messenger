import React from 'react';
import {FormField} from 'reusables/FormField/FormField';
import Form from 'react-bootstrap/Form'
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
                <FormField label={'Age'} labelFor={'Age'}>
                    <input
                        id='age'
                        defaultValue={props.default}
                        // value={''}
                        autoComplete="off"
                        //onChange
                        />
                </FormField>
                <FormField  label={'Sex'} labelFor={'sex'}>
                    <input
                        id='sex'
                        defaultValue={props.default}
                        // value={''}
                        autoComplete="off"
                        //onChange
                    />
                     <Form.Check
                        id='visibleSex' 
                        type="switch"
                        label="Show on profile"
                    />
                </FormField>
                <FormField  label={'Currently Living'} labelFor={'location'}>
                    <input
                        id='location'
                        defaultValue={props.default}
                        // value={''}
                        autoComplete="off"
                        //onChange
                    />
                </FormField>
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

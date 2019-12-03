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
                <FormField label={'Age'} labelFor={'settingsAge'}>
                    <input
                        id='settingsAge'
                        defaultValue={props.default}
                        // value={''}
                        autoComplete="off"
                        //onChange
                        />
                    <Form.Switch
                        id='visibleAge' 
                        type="switch"
                        label="Show on profile"
                    />        
                </FormField>
                <FormField  label={'Sex'} labelFor={'settingsGender'}>
                    <input
                        id='settingsGender'
                        defaultValue={props.default}
                        // value={''}
                        autoComplete="off"
                        //onChange
                    />
                    <Form.Switch
                        id='visibleGender' 
                        type="switch"
                        label="Show on profile"
                    />
                </FormField>
                <FormField  label={'Currently Living'} labelFor={'settingsLocation'}>
                    <input
                        id='settingsLocation'
                        defaultValue={props.default}
                        // value={''}
                        autoComplete="off"
                        //onChange
                    />
                    <Form.Switch
                        id='visibleLocation' 
                        type="switch"
                        label="Show on profile"
                    />
                </FormField>
        </fieldset>
    </form>
    )
}

const Language = (props) => {
    return(
        <form id="siteLanguage" className="settings-form">
            <fieldset>
            <FormField label={'Language'} labelFor={'settingsLanguage'} >           
                    <select
                        id='settingsLanguage'
                        defaultValue={props.default}
                        // value={''}
                        autoComplete="off"
                        //onChange
                    >
                        <option value='english'>English</option>
                        <option value='english'>French</option>
                        <option value='english'>German</option>
                    </select>
            </FormField>
            </fieldset>
        </form>
    )

}

const Security = () => {

}

const SettingsMenu = [
    {
        label: 'Personal Info',
        value: 'personalInfo'
    },
    {
        label: 'Language',
        value: 'language'
    },
    {
        label: 'Security',
        value: 'security',
    }
];

export const ConfigSettingsMenu = (props) => {
   const config = {
        personalInfo: PersonalInfo,
        language: Language,
        security: Security
    }

    const menuType = SettingsMenu.find( menu => menu.label === props.type);
    const SettingsMenuForm = config[menuType.value];

    return <SettingsMenuForm default={props.default} />
}

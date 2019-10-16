import React, {Component} from 'react';
import './ProfileSettings.css';

class ProfileSettings extends Component {
    render() {
         return ( 
        <div className='profile-settings-menu'>
            <div className='sidebar-wrapper'>
                <ul className='settings-list' >
                    <li className='settings-list-item'> Personal Info </li>
                    <li className='settings-list-item'> Language </li>
                </ul>
            </div>
        </div>
        )
    }
}

export {ProfileSettings};

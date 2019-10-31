import React, {Component} from 'react';
import './ProfileSettings.css';

import {configSettingsMenu} from './SettingsOptions';

// const configMenu = {
//     personal: 'personalInfo',
//     language: 'language',
//     security: 'security'
// };
class ProfileSettings extends Component {

constructor(props) {
    super();
    this.state = {
            currentMenu: ''
        }
    }
  
  renderList = () => {
    return ( 
            <ul className='settings-list' >
                    <li className='settings-list-item'> Personal Info </li>
                    <li className='settings-list-item'> Language </li>
                    <li className='settings-list-item'> Security </li>
            </ul>
    );
  }

  setMenu = (type) => {
    this.setState({currentMenu: type})
  }

  render() {
         return ( 
        <div className='profile-settings-menu'>
            <div className='sidebar-wrapper'>
              {this.renderList()}
            </div>
            <div className='form-menu-container'>

            </div>
        </div>
        )
    }
}

export {ProfileSettings};

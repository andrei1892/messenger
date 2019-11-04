import React, {Component} from 'react';
import './ProfileSettings.css';

import {ConfigSettingsMenu} from './SettingsOptions';

class ProfileSettings extends Component {

constructor(props) {
    super();
    this.state = {
            currentMenu: 'personalInfo', // default menu
            currentMenuData: {

            }
        }
    }

  componentDidMount() {
      // get info about;
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

  inputData = e => {
    this.setState();
  }

  render() {
         return ( 
        <div className='profile-settings-menu'>
            <div className='sidebar-wrapper'>
              {this.renderList()}
            </div>
            <div className='form-menu-container'>
              <ConfigSettingsMenu type={this.state.currentMenu} default={'N/A'} />
            </div>
        </div>
        )
    }
}

export {ProfileSettings};

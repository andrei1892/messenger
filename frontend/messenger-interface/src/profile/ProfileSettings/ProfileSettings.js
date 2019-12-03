import React, {Component} from 'react';
import './ProfileSettings.css';

import {ConfigSettingsMenu} from './SettingsOptions';

class ProfileSettings extends Component {

constructor(props) {
    super();
    this.state = {
            currentMenu: 'Personal Info', // default menu
            currentMenuData: {}
        }
    }

  componentDidMount() {
      // get info about;
  }
  
  renderList = () => {
    return ( 
            <ul className='settings-list'>
                    <li className='settings-list-item' onClick={(e) => this.setMenu(e)} > Personal Info </li>
                    <li className='settings-list-item' onClick={(e)=>  this.setMenu(e)} > Language </li>
                    <li className='settings-list-item' onClick={(e)=>  this.setMenu(e)} > Security </li>
            </ul>
    );
  }

  setMenu = (e) => {
    this.setState({currentMenu: e.currentTarget.innerText})
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
              <ConfigSettingsMenu type={this.state.currentMenu} default={''} />
            </div>
        </div>
    );
  }
}

export {ProfileSettings};

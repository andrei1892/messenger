import React, {Component} from 'react';
import {Button} from 'reusables/Button/Button'
import '../FriendsPanel.css';

class FriendProfile extends Component{

    render() {
        const {toggle, info, closeFriendInfo } = this.props;
        if(toggle){
        return(
            <div className='friend-profile friend-profile-open slide-down'>
                <Button classes={'close-button'} onClick = {closeFriendInfo} content={'X'} />
                <div>{info.firstname} {info.lastname}</div>
                <div>Email: {info.email}</div>
            </div>
        )}
        else {
            return  (
            <div className='friend-profile friend-profile-close slide-up' />
            )
        }
    }

}

export {FriendProfile};

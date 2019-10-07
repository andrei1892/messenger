import React, {Component} from 'react';
import '../FriendsPanel.css';

class FriendProfile extends Component{

    render() {

        if(this.props.on){
        return(
            <div className='friend-profile slide-down'>
                <button className='close-button'
                onClick={this.props.toggleFriendInfo}
                >X</button>
            </div>
        )}
        else {
            return  (
            <div className='friend-profile friend-profile-close'>
            </div>
            )
        }
    }

}

export {FriendProfile};

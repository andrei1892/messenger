import React,{Component} from 'react';
import Friends from './Friends'
import FriendsSuggestions from './FriendsSuggestions'

class Friendships extends Component{
    constructor(props){
        super();
        this.state={}
    }

    render(){
        return(
            <div className="friendships-bar-container column" >
                <Friends friends={this.props.friends} pendingRequests={this.props.pendingRequests}  acceptRequest={this.props.acceptRequest}    />
                <br/>
                <FriendsSuggestions sendFriendRequest={this.props.sendFriendRequest} suggestions={this.props.suggestions} />
            </div>
        )
    }

}

export default Friendships;
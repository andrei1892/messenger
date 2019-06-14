import React from 'react';

const FriendsSuggestions = (props) => {
    if(props.suggestions.length === 0 ) return (<div className="in-frienships-bar">There are no suggestions</div>)
    else {
         return(
            props.suggestions.map(suggestion => {
                return(
                    <div className="info-box-wrapper" id={suggestion._id} >
                       <span>{suggestion.firstname}</span>{'  '}  
                       <span>{suggestion.lastname}</span>
                       <button className="btn btn-add-friend" onClick={props.sendFriendRequest}>Add Friend</button>
                    </div>
                   
                )
            })
    )}
}
export default FriendsSuggestions;
import React,{Component} from 'react';

const FriendsSuggestions = (props) => {
    if(props.suggestions.length === 0 ) return (<p>There are no suggestions</p>)
    else {
         return(
            props.suggestions.map(suggestion => {
                return(
                    <div className="previous-conversations" id={suggestion._id} >
                       <span>{suggestion.firstname}</span>{' '}  
                       <span>{suggestion.lastname}</span>
                       <button onClick={props.sendFriendRequest}>Add Friend</button>
                    </div>
                   
                )
            })
    )}
}
export default FriendsSuggestions;
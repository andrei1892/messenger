import React from 'react';

const FriendsSuggestions = (props) => {
    if(props.suggestions.length === 0 ) return (<div className="in-frienships-bar">There are no suggestions</div>)
    else {
         return(
             <React.Fragment>
              <h4>Suggestions</h4>
       {     props.suggestions.map((suggestion,key) => {
                return(
                    <div key={key} className="info-box-wrapper" id={suggestion._id} >
                       <span>{suggestion.firstname}</span>{'  '}  
                       <span>{suggestion.lastname}</span>
                       <button className="btn btn-add-friend" onClick={props.sendFriendRequest}>Add Friend</button>
                    </div>
                   
                   )
                })}
         </React.Fragment>
    )}
}
export default FriendsSuggestions;
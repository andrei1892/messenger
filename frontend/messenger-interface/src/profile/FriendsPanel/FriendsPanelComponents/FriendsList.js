import React from "react";
import FriendWrapper from "./FriendBox";
import {ICONS} from 'reusables/Icons/Icons';
import {Button} from 'reusables/Button/Button';
import '../FriendsPanel.css';

const FriendsList = props => {
  if (
    props.friends.length === 0 &&
    props.pendingRequests.length === 0 &&
    props.awaitingRequests.length === 0
  )
    return (
      <div className="frienship-category">
        You have no friends; search suggestions{" "}
      </div>
    );
  else {
    return (
      <div className="frienship-category">
        <FriendWrapper list={props.friends} category={"Friends"} getFriendInfo={props.getFriendInfo} />
        {props.pendingRequests.length !== 0 ? (
          <FriendWrapper list={props.pendingRequests} category={"Friend Requests"}>
            <div>
              <Button classes={'btn btn-add-friend'} value={'accept'}  content={'Accept'} onClick={props.requestResponse} />
              <Button classes={'btn btn-add-friend'} value={'reject'}  content={'Reject'} onClick={props.requestResponse} />
            </div>
          </FriendWrapper>
        ) : null}
        {props.awaitingRequests.length !== 0 ? (
          <FriendWrapper list={props.awaitingRequests} category={"Requests sent"}>
            <ICONS type={'FaIcons'} name={'FaHourglassHalf'} title={'Awaiting Confirmation'} />
          </FriendWrapper>
        ) : null}
      </div>
    );
  }
};
export {FriendsList};

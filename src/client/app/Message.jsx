import React from 'react';
import TimeAgo from 'react-timeago';
import $ from 'jquery';

class Message extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }

  render(){
    let msg = this.props.message;

    return(
      <li class='chatMessage'>
        <div className='msgTopBar'>
          <img src={msg.photourl}/>
            <div className='msgTop'>
              <div className='topBarStack'>
                <TimeAgo className='msgTime stackItem' date={msg.created}/>
                <p className='usernameTopBar stackItem'>{msg.name}</p>
              </div>
            </div>
          </div>
            <span>
            </span>
        <p className='msgContent'>{msg.message}</p>
      </li>
      )
  }
}

export default Message;
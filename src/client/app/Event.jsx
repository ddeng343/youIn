import React from 'react';
import Chat from './Chat.jsx';
import TopBar from './TopBar.jsx';
import CreateEvent from './CreateEvent.jsx';
import EventOverview from './EventOverview.jsx';
import Account from './Account.jsx';
import {render} from 'react-dom';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedEvent: false
    }
  }

  render () {
    return (
    // { -------PAGE WRAPPER------ }
    <div className="container-fluid main">

      {/* -------LEFT HAND COLUMN------- */}
      <div className="col-sm-3 account">
        <Account
          friends={this.props.friends} 
          myEvents={this.props.ownerEvents} 
          friendEvents={this.props.ownerEvents}
        />
      </div>

      {/* -------RIGHT HAND COLUMN------- */}
      <div className="col-sm-9 right9">

         {/* -------TOPBAR------- */}
        <div className='col-sm-12 topbar'>
          <TopBar owner={this.props.friends[0]}/>
        </div>

         {/* -------MAIN------- */}
        <div className='col-sm-8 mainview'>
          {this.state.clickedEvent ? 
            <CreateEvent 
              history={this.props.history}
              friends={this.props.friends}
              getEvents={this.props.getEvents} 
            /> : 
            <EventOverview 
            />
          }
        </div>

         {/* -------CHAT------- */}
        <div className='col-sm-4 right4'>
          <Chat/>
        </div>

      </div>
    </div>
	  )
  }
}

export default Event;

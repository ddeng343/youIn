import React from 'react';
import OwnerEventList from './OwnerEventList.jsx';
import FriendEventList from './FriendEventList.jsx';
import LogoutButton from './LogoutButton.jsx';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Chat from './Chat.jsx';
import TopBar from './TopBar.jsx';
import CreateEvent from './CreateEvent.jsx';
import EventOverview from './EventOverview.jsx';
import Account from './Account.jsx';
// import {render} from 'react-dom';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      clickedEvent: false,
      createEvent: false,
      currentEvent: [],

    };
    this.handleWantsCreateEvent = this.handleWantsCreateEvent.bind(this);
    this.handleWantsEvent = this.handleWantsEvent.bind(this);
  }

  componentWillMount(){
    if(this.props.ownerEvents.length > 0){
      this.setState({
        currentEvent: this.props.ownerEvents[0]
      })
    } else if (this.props.friendEvents.length > 0){
      this.setState({
        currentEvent: this.props.friendEvents[0]
      })
    } else {
      this.setState({
        createEvent: true
      })
    }
  }

  // handleClickedEvent() {
  //   this.setState({clickedEvent: !this.state.clickedEvent});
  // }

  pollEvents() {
    this.props.getEvents(this.props.history, function(result) {

      if (result.ownerEvents.length !== this.state.ownerEvents.length) {
        this.setState({
          ownerEvents: result.ownerEvents
        });
      }
      if (result.friendEvents.length !== this.state.friendEvents.length) {
        this.setState({
          friendEvents: result.friendEvents
        });
      }
    });
  }

  handleWantsCreateEvent(event) {
    console.log('insdie handle handleWantsCreateEvent')
    this.setState({
      createEvent: true,
      clickedEvent: false
    })
  }

  handleWantsEvent(event) {
    console.log('inside handle wants event');
    //change event from one to another
      this.setState({
        currentEvent: event,
        clickedEvent: true,
        createEvent: false
      })
    }

  componentDidMount() {
    // this.setState({
    //   intervalId: setInterval(this.pollEvents.bind(this), 1000)
    // });
  }

  componentWillUnmount() {
    // clearInterval(this.state.intervalId);
    // this.setState({
    //   intervalId: null
    // });
  }

  render() {
    if (!this.state.createEvent) {
      return (
      // { -------PAGE WRAPPER------ }
      <div className="container-fluid main">


      {/* -------LEFT HAND COLUMN------- */}
      <div className="col-sm-3 account">
        <Account
              handleWantsEvent={this.handleWantsEvent}
              handleWantsCreateEvent={this.handleWantsCreateEvent}
              username={this.props.userName}
              friends = {this.props.friends}
              myEvents={this.props.ownerEvents}
              friendEvents={this.props.friendEvents}
              clickedEvent={this.state.clickedEvent}
              handleClickedEvent={this.handleClickedEvent}
        />
      </div>

        {/* -------RIGHT HAND COLUMN------- */}
        <div className="col-sm-9 right9">

           {/* -------TOPBAR------- */}
          <div className='col-sm-12 topbar'>
            <TopBar event={this.state.currentEvent} owner={this.props.friends[0]}/>
          </div>

          <div className='mainviewWrapper'>
             {/* -------MAIN------- */}
            <div className='col-sm-8 mainview'>
              <EventOverview event={this.state.currentEvent}/>

            </div>

             {/* -------CHAT------- */}
            <div className='col-sm-4 right4'>
              <Chat event={this.state.currentEvent} owner={this.props.friends[0]}/>
            </div>
          </div>

        </div>
      </div>
      )
    } else {
      return(
        // { -------PAGE WRAPPER------ }
        <div className="container-fluid main">

          {/* -------LEFT HAND COLUMN------- */}
          <div className="col-sm-3 account">
            <Account
              handleWantsEvent={this.handleWantsEvent}
              username={this.props.userName}
              friends = {this.props.friends}
              myEvents={this.props.ownerEvents}
              friendEvents={this.props.friendEvents}
              clickedEvent={this.state.clickedEvent}
              handleClickedEvent={this.handleClickedEvent}
            />
          </div>

          {/* -------RIGHT HAND COLUMN------- */}
          <div className="col-sm-9 right9">

             {/* -------TOPBAR------- */}
            <div className='col-sm-12 topbar'>
              <TopBar event={null} owner={this.props.friends[0]}/>
            </div>

             {/* -------MAIN------- */}
            <div className='col-sm-12 mainview'>
               <CreateEvent
                 history={this.props.history}
                 friends = {this.props.friends}
                 getEvents={this.props.getEvents}
                 />
            </div>

          </div>
        </div>
      )
    }
  }
}

export default Homepage;

import React from 'react';

class TopBar extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    if (this.props.event) {
      return(
        <div className='topBar'>
          <span>#{JSON.stringify(this.props.event.event_id)}</span>
          <span>{JSON.stringify(this.props.getConfirmedUsers)}</span>
          <span>{'Confirmed Users: ' + this.props.confirmedUsers.length}</span>
          <div className="progress">
            <span className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
              <span className="sr-only">60% Complete</span>
            </span>
          </div>
        </div>
      )
    } else {
      return(
        <div className='topBar'>
          <h2>Create an event</h2>
        </div>
      )
    }
  }
}

export default TopBar;

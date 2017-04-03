import React from 'react';
import $ from 'jquery';
import LogoutButton from './LogoutButton.jsx';

class TopBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: 0,
      accepted: 0,
      pending: 0,
      rejected: 0,
      percentage: "0"
    }
  }

  getConfirmedUsers(event_id) {
    let context = this;

    $.ajax({
      url: '/confirmedUsers',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({event_id: event_id}),
      success: function(data) {
        var countStatus = function(status) {
          var counter = 0;
          for (var i = 0; i < data.length; i++) {
            if (data[i].current_status === status) {
              counter++
            }
          }
          return counter;
        }

        context.setState({
          users: data.length,
          accepted: countStatus('accepted'),
          pending: countStatus('pending'),
          rejected: countStatus('rejected'),
          percentage: String(Math.floor(100*countStatus('accepted')/data.length))
        })
      },
      error: function(err) {
        console.error('error in request for confirmed users', err);
      }
    })
  }

  componentDidMount() {
    this.getConfirmedUsers(this.props.event.event_id);
  }

  render(){
    if (this.props.event) {
      return(
        <div className='topBar'>
          <LogoutButton />
          <h1>#{this.props.event.title}</h1>
          <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow={this.state.percentage} aria-valuemin="0" aria-valuemax="100" style={{width: this.state.percentage + '%'}}>
              {this.state.percentage}% Complete
            </div>
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

//{'Confirmed Users: ' + this.state.confirmedUsers.length}

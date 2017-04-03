import React from 'react';

class EventOverview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      remindButtonClicked: false
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEventStatus = this.updateEventStatus.bind(this);
    this.updateEventDetails = this.updateEventDetails.bind(this);
    this.handleRemindClick = this.handleRemindClick.bind(this);
  }
  componentDidMount() {
    console.log('inside DID MOUNT EVENT OVERVIEW');
  }

  updateEventDetails(event) {
    console.log('inside update event details');
  }
  updateEventStatus(url) {
    // AJAX request to delete event from users list in the database
    // console.log('yo', this.props.accessToken);
    $.ajax({
      url: url,
      method: 'POST',
      'Content-type': 'application/json',
      beforeSend: (xhr) => {
        xhr.setRequestHeader ('Authorization', 'Bearer ' + this.props.accessToken);
      },
      data: {
        eventId: JSON.stringify(this.props.event.event_id)
      },
      success: function() {
        console.log('Success');
      },
      error: function(err) {
        console.log('Error in updateEventStatus in OwnerDetailedView.jsx', err);
      }
    });
  }

  deleteEvent () {
    console.log('event DELETED!');
    this.updateEventStatus('/delete/owner');

  }
  sendSmsReminder(url) {
    // AJAX request to send event reminder SMS from users list in the database
    console.log('yay!');
    $.ajax({
      url: url,
      method: 'POST',
      'Content-type': 'application/json',
      data: {
        event: JSON.stringify(this.props.event)
      },
      success: function() {
        console.log('Successful Ajax sendSmsReminder!');
      },
      error: function(err) {
        console.log('Error in sendSmsReminder in OwnerDetailedView.jsx', err);
      }
    });
  }

  handleRemindClick () {
    console.log('reminder clicked!');

    if (!this.state.remindButtonClicked) {
      this.sendSmsReminder('/sms/remind');
    }
    
    this.setState({
      remindButtonClicked: !this.state.remindButtonClicked
    });
  }

  render() {
    const event = this.props.event;
    const date = this.props.event ? this.props.event.date.slice(0, 10) : undefined;
    console.log('EVENT', event);
    return (
      <div className='EventOverviewWrapper'>
        <div className='eventDetails'>
        <h4>Title: {event.title}</h4>
        <h4>Location: {event.location}</h4>
        <h4>Date: {date}</h4>
        <h4>Type: {event.short_desc}</h4>
        <h4>Description: {event.description}</h4>
        <a href='#' onClick={this.updateEventDetails}>Update</a>

        </div>

        <div className='whosIn'>
        <ul>
            <li>MIKE</li>
            <li>ED</li>
            <li>BETH</li>
          </ul>
          <h4>Add Friends</h4>
        </div>

        <div className='reminders'>
          {!this.state.remindButtonClicked
            ? <button 
                onClick={this.handleRemindClick} 
                id="owner-delete-button" 
                className="col-md-offset-1"
                >
                Send event reminders to group now
              </button>
            : <h3 className="sendText" onClick={this.handleRemindClick}>
                Reminder Text Sent!
              </h3>
          }
        </div>
      </div>
    );
  }
}

export default EventOverview;

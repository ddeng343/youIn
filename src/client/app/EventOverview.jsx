import React from 'react';

class EventOverview extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {}
    this.updateEventDetails = this.updateEventDetails.bind(this);
  }
  componentDidMount(){
    console.log('inside DID MOUNT EVENT OVERVIEW')
  }
  updateEventDetails(event){
    console.log('inside update event details');
  }

  render(){
    const event = this.props.event;
    const date = this.props.event ? this.props.event.date.slice(0,10) : undefined;
    console.log('EVENT', event)
    return(
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
          <h4>Send rsvp reminders to group now</h4>
          <h4>Send event reminders to group now</h4>
        </div>
      </div>
    )
  }
}

export default EventOverview;

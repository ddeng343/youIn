import React from 'react';

class EventListItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick(){
    this.props.handleWantsEvent(this.props.event);
  }

  render() {
    return (
      <div className='eventListItem'>
        <li onClick={this.handleEventClick}> {this.props.event.title}
        </li>
      </div>
    );
  }
}

export default EventListItem;

import React from 'react';

class FriendEventOverview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      youIn: 'maybe', // yes / maybe / 
      guests: 0,
      donation: 0,
      brings: ''
    }
  }
  componentDidMount() {
    console.log('inside DID MOUNT EVENT for Friend OVERVIEW')
  }

  onYouInChanged(e) {
    // console.log('YouIn change, event:', e);
    this.setState({youIn: e.currentTarget.value});
  }

  onGuestsChanged(e) {
    this.setState({guests: e.currentTarget.value});
  }

  onDonationChanged(e) {
    this.setState({donation: e.currentTarget.value});
  }

  render() {
    const event = this.props.event.length ? this.props.event[0] : undefined;
    return (
      <div className='EventOverviewWrapper'>
        <div className='eventDetails'>

          <h4>Title: {event.title}</h4>
          <h4>Location: {event.location}</h4><span><a href='#'>map</a></span>
          <h4>Date: {event.date}</h4>
          <h4>Type: {event.short_desc}</h4>
          <h4>description: {event.description}</h4>
        </div>

        <div className='youIn'>
          <h3>You In?</h3>
          <input type='radio'
                  name='youInChoice'
                  value='yes'
                  checked={this.state.youIn === 'yes'} 
                  onChange={this.onYouInChanged.bind(this)}/> <span className='glyphicon glyphicon-ok-sign' />
                  <span> </span>
          <input type='radio'
                  name='youInChoice'
                  value='maybe'
                  checked={this.state.youIn === 'maybe'} 
                  onChange={this.onYouInChanged.bind(this)}/> <span className='glyphicon glyphicon-question-sign' />
                  <span> </span>
          <input type='radio'
                  name='youInChoice'
                  value='no'
                  checked={this.state.youIn === 'no'} 
                  onChange={this.onYouInChanged.bind(this)}/> <span className='glyphicon glyphicon-remove-sign' />                
        </div>
        <div><span>I would like to invite</span><input type='text' value={this.state.guests} 
          onChange={this.onGuestsChanged.bind(this)} /><span> guests</span>
        </div>
        <div><span>Suggested donation: [TODO: insert var here]. I'll contribute: </span>
          <input type='text' value={this.state.donation} 
            onChange={this.onDonationChanged.bind(this)} />
        </div>
        <div><input type='submit' value='Send RVSP'/>TODO: link to a state update function</div>
        <div className='whosIn'>
          <h3>Who's In?</h3>
          <ul>
            <li>MIKE</li>
            <li>ED</li>
            <li>BETH</li>
          </ul>
          <h4>Add Friends</h4>
        </div>
      </div>
    )
  }
}

export default FriendEventOverview;

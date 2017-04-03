import React from 'react';
import Message from './Message.jsx';
import io from 'socket.io-client';
let socket = io();

class Chat extends React.Component{
  constructor(props){
    super(props);
    this.state={
      message: '',
      messages: []
    }
    //bind functions
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.createSocketListener = this.createSocketListener.bind(this);
  }

  componentDidMount(){
    this.createSocketListener()
  }

  createSocketListener(){
    var context = this;
    //listening for 'chat message', setting state
    socket.on('messages', (msg) => {
      console.log('messages', msg);
      let messages = context.state.messages;
      messages = msg;
      console.log('messages', messages);
      context.setState({
        messages: messages
      })
    });
    //GET MESSAGES ON LOAD
    socket.emit('getMessages', this.props.event.event_id);
  }

  handleFormSubmit(event){
    event.preventDefault();
    event.stopPropagation();

    let context = this;
    let author = this.props.owner;
    let name = author.firstname + ' ' + author.lastname;
    console.log('author', author);
    var socket = io();
    var message = {
      event_id: this.props.event.event_id,
      event_owner: this.props.event.owner,
      message: this.state.message,
      photourl: author.photourl,
      author_id: author.user_id,
      author_email: author.email,
      name: name
    }

    console.log('message', message);
    //route and message to send to server
    socket.emit('chat', message);

    this.setState({
      message: ''
    })
  }

  handleTextChange(event){
    console.log('inside handleTextChange')
    this.setState({
      message: event.target.value
    })
  }

  render(){

    return(
    <div className='chatContainer'>
      <form onSubmit={this.handleFormSubmit} className='chatFlexForm'>

      <div className='chatFlexTop'>
        <div className='flexRowTop'>
          <h2 className='flexRowItemLeft'> {this.props.event.title} </h2>
        </div>
      </div>

      <div className='chatFlexMiddle'>
        <ul className='flexRowMiddle'>
          {this.state.messages.map(message =>
            <Message className='displayChatNames' key={message.id} message={message}/>
          )}
        </ul>
      </div>

      <div className='chatFlexBottom'>
        <div className='flexRowBottom'>
          <input type='text' className='chatFlex4-5' onChange={this.handleTextChange} value={this.state.message} placeholder='chat with group' />
          <input type='submit' className='chatFlex1-5' />
        </div>
      </div>

      </form>
    </div>
    )
  }
}


export default Chat;

import React from 'react';

const AttendeeTable = (props) => (
  <div className="col-md-12">
    <ul className="friendsTable col-md-12">
      {props.attendees.map((attendee, i) => 
          <li 
            className="friendsTable"
            key={i}
          >
            <div>
              <div className='col-sm-4'>
                <img src={attendee.photourl}/> 
              </div>
              <div className='col-sm-4'>
                <div className='glyphicon glyphicon-ok-sign' />
              </div>
              <div className='col-sm-4'>
                {attendee.firstname + ' ' + attendee.lastname}
              </div>
            </div>
          </li>
        )}
    </ul>  
  </div>

);
export default AttendeeTable;
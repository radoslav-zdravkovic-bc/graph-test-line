import React, {Component} from 'react';

class Event extends Component {
    render() {
        return (
            <div className="event-box" date="2019-11-01" content="Fifth Democratic Debate">
                <h5>{this.props.monthAndDay} <br></br>
                 {this.props.year}</h5>
                </div>
        );
    }
}

export default Event;
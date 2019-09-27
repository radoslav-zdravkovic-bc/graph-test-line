import React, {Component} from 'react';

class Event extends Component {
    displayEventModal(monthAndDay, year, title) {
        this.props.displayEvent(monthAndDay, year, title);
    }

    render() {
        return (
            <div className="event-box" onClick={() => this.displayEventModal(this.props.monthAndDay, this.props.year, this.props.title)}>
                <h5>{this.props.monthAndDay} <br/>
                 {this.props.year}</h5>
                </div>
        );
    }
}

export default Event;
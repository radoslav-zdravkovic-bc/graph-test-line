import React, {Component} from 'react';

class EventModal extends Component {
    hideEventModal() {
        this.props.hideEvent();
    }

    render() {
        return (
            <div className="event-opened">
                <div className="date-box"><p className="date">{this.props.monthAndDay}<br />{this.props.year}</p></div>
                <h5 className="event-text">{this.props.title}</h5>
                <button type="button" className="event-close" onClick={() => this.hideEventModal()}></button>
            </div>
        );
    }
}

export default EventModal;
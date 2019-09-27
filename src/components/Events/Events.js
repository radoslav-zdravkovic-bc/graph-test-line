import React, {Component} from 'react';
import Event from './Event/Event';
import EventModal from './EventModal/EventModal';
import Scrollbar from "react-scrollbars-custom";

class Events extends Component {
    constructor(props) {
        super(props);
        const eventsData = require('../../data/events.json');

        this.state = {
            allEvents: eventsData,
            eventModalDisplay: false,
            eventModalMonthAndDay: '',
            eventModalYear: '',
            eventModalTitle: ''
        };

        this.eventsArray = [];
        Object.keys(this.state.allEvents).forEach((key) => this.eventsArray.push(this.state.allEvents[key]));

        this.eventOnClickHandler = this.eventOnClickHandler.bind(this);
        this.eventModalButtonOnClickHandler = this.eventModalButtonOnClickHandler.bind(this);
    }

    eventOnClickHandler(monthAndDay, year, title) {
        this.setState({
            eventModalDisplay: true,
            eventModalMonthAndDay: monthAndDay,
            eventModalYear: year,
            eventModalTitle: title
        });
    }

    eventModalButtonOnClickHandler() {
        this.setState({
            eventModalDisplay: false
        });
    }

    render() {
        const currentDate = new Date();

        const eventsArrayForDisplay = this.eventsArray[0].map((item) =>  {
            let d = new Date(item.date)
            let dString = d.toDateString();
            let monthAndDay = dString.slice(4, 10);
            let year = dString.slice(11, 15);
            let title = item.content;

            if(d >= currentDate) {
                return <Event
                    displayEvent={this.eventOnClickHandler}
                    key={monthAndDay + year}
                    monthAndDay={monthAndDay}
                    year={year}
                    title={title}
                />;
            }
        });

        let eventModal;

        if(this.state.eventModalDisplay) {
            eventModal = <EventModal hideEvent={this.eventModalButtonOnClickHandler} monthAndDay={this.state.eventModalMonthAndDay} year={this.state.eventModalYear} title={this.state.eventModalTitle} />;
        } else {
            eventModal = null;
        }

        return (
            <div id="upcoming-events" className="bc-graph-app-row">
                <div className="events-labels">
                    <h2 className="upcoming-label">IMPORTANT SCHEDULED EVENTS</h2>
                </div>
                <div className="events-area">
                    <div className="events-timeline">
                        <div className="events-linebody"></div>
                        <div className="events-point"></div>
                    </div>
                    <div id="upcoming-events-line" className="events-line">
                        <Scrollbar>
                            {eventsArrayForDisplay}
                        </Scrollbar>
                        {eventModal}
                    </div>
                </div>
            </div>
        );
    }
}

export default Events;
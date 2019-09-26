import React, {Component} from 'react';

class Events extends Component {
    render() {
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
                    <div id="upcoming-events-line" className="events-line"></div>
                </div>
            </div>
        );
    }
}

export default Events;
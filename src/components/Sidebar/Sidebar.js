import React, {Component} from 'react';

class Sidebar extends Component {
    componentDidMount() {
        const candidatesData = require('../../data/candidates.json');

        function getFullName(item) {
            let fullname = [item.last_name];
            return fullname;
        }

        this.canidatesNames = candidatesData.candidates.map(getFullName);
    }

    render() {
        return (
            <div className="graph-sidebar">
                {this.canidatesNames}
            </div>
        );
    }
}

export default Sidebar;
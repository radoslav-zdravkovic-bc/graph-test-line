import React, {Component} from 'react';
import Candidate from './Candidate/Candidate';

class Sidebar extends Component {
    componentWillMount() {
        const candidatesData = require('../../data/candidates.json');

        function getFullName(item) {
            let fullname = [item.last_name];
            return fullname;
        }

        this.canidatesNames = candidatesData.candidates.map(getFullName);
    }

    render() {
        let output = this.canidatesNames;

        console.log(output);
        return (
            <div className="graph-sidebar">
                {output.map((candidateName) =>
                    <Candidate name={candidateName} key={candidateName} />
                    )}
            </div>
        );
    }
}

export default Sidebar;
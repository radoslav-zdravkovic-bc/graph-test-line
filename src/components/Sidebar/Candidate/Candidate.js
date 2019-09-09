import React, {Component} from 'react';

class Candidate extends Component {
    render() {
        return (
            <div className="cand-view">
                <div className="cand-main">
                    <div className="img-container">
                    </div>
                    <div className="cand-name">
                        {this.props.name}
                    </div>
                    <div className="marker"></div>
                </div>
            </div>
        );
    }
}

export default Candidate;
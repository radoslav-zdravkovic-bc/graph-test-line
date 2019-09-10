import React, {Component} from 'react';

class Candidate extends Component {
    render() {
        return (
            <div className="cand-view">
                <div className="cand-main">
                    <div className="img-container">
                        <img alt={this.props.name} src={require("../../../assets/images/candidates/" + this.props.name + ".jpg")}/>
                    </div>
                    <div className="cand-name">
                        {this.props.name}
                    </div>
                    <div className="marker" style={{backgroundColor: this.props.color}} ></div>
                </div>
            </div>
        );
    }
}

export default Candidate;
import React, {Component} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCandidates: this.props.candidatesList,
            rowCandidatesData: this.props.allCandidatesData,
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.candidateClickHandler = this.candidateClickHandler.bind(this);

        function getFullName(item) {
            let fullname = {fullName: item.name, color: item.color};
            return fullname;
        }

        let candidatesData = this.state.rowCandidatesData.data.map(getFullName);

        let output1 = candidatesData.filter((value) => {
            return this.state.selectedCandidates.indexOf(value.fullName) > -1;
        });

        let output2 = candidatesData.filter((value) => {
            return this.state.selectedCandidates.indexOf(value.fullName) <= -1;
        });

        this.output = [...output1, ...output2];
    }

    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }

    candidateClickHandler(candidate) {
        this.props.action(candidate);
    }

    componentDidUpdate() {
        if(this.state.selectedCandidates !== this.props.candidatesList) {
            this.setState({selectedCandidates: this.props.candidatesList});
        }
    }

    render() {
        let output = this.output;

        let settings = {
            vertical: true,
            arrows: false,
            speed: 500,
            slidesToScroll: 1,
            slidesToShow: 4,
            infinite: false,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1201,
                    settings: {
                        vertical: false,
                        slidesToScroll: 1,
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        vertical: false,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                    },
                },
            ]
        };

        const tmpList = [];
        for(let i = 0; i < output.length; i+=5){
            const tmpCandidats = [];
            for(let index = i; index < Math.min(output.length, i+5); index++){
                tmpCandidats.push (
                    <div className={"cand-view" +
                    ((this.state.selectedCandidates.indexOf(output[index].fullName) > -1) ? " selected" : "")}
                         value={output[index].fullName} key={output[index].fullName}
                         onClick={() => this.candidateClickHandler(output[index].fullName)}>
                        <div className="cand-main">
                            <div className="img-container">
                                <img alt={output[index].fullName}
                                     src={require("../../assets/images/candidates/" + output[index].fullName + ".jpg")}/>
                            </div>
                            <div className="cand-name">
                                {output[index].fullName}
                            </div>
                            <div className="marker"
                                 style={{backgroundColor: this.state.selectedCandidates.indexOf(output[index].fullName) > -1 ? output[index].color : "#fff"}}></div>
                        </div>
                    </div>
                );
            }
            tmpList.push(<div className="candidates-group">{tmpCandidats}</div>);
        }
        return (
            <div className="graph-sidebar" onMouseEnter={this.setSidebarHoverState} onMouseLeave={this.setSidebarHoverState}>
                <div className="cand-label">
                    <h4 className="bold">SELECT YOUR CANDIDATES</h4>
                </div>
                <div className="cand-prev slider-arrow" onClick={this.previous}></div>
                <Slider ref={c => this.slider = c} className="candidates" {...settings}>
                    {tmpList}
                </Slider>
                <div className="cand-next slider-arrow" onClick={this.next}></div>
            </div>
        );
    }
}

export default Sidebar;
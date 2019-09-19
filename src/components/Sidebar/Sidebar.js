import React, {Component} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarHover: false,
            selectedCandidates: this.props.candidatesList,
            rowCandidatesData: this.props.allCandidatesData
        };

        this.setSidebarHoverState = this.setSidebarHoverState.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.slide = this.slide.bind(this);
        this.candidateClickHandler = this.candidateClickHandler.bind(this);

        function getFullName(item) {
            let fullname = {fullName: item.last_name, color: item.color};
            return fullname;
        }

        let candidatesData = this.state.rowCandidatesData.candidates.map(getFullName);

        let output1 = candidatesData.filter((value) => {
            return this.state.selectedCandidates.indexOf(value.fullName) > -1;
        });

        let output2 = candidatesData.filter((value) => {
            return this.state.selectedCandidates.indexOf(value.fullName) <= -1;
        });

        this.output = [...output1, ...output2];
    }

    // Check if hovered over sidebar in order to prevent or enable scroll
    setSidebarHoverState() {
        let hoverState = this.state.sidebarHover;
        this.setState({
            sidebarHover: !hoverState
        });
    }

    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    slide(y){
        y > 0 ? (
            this.slider.slickPrev()
        ) : (
            this.slider.slickNext()
        )
    }
    candidateClickHandler(candidate) {
        this.props.action(candidate);
    }

    componentWillMount() {
        window.addEventListener('wheel', (e) => {
            if(this.state.sidebarHover) {
                this.slide(e.wheelDelta);
            }
        })
    }

    componentDidUpdate() {
        if(this.state.selectedCandidates !== this.props.candidatesList) {
            this.setState({selectedCandidates: this.props.candidatesList});
        }
    }

    render() {
        let output = this.output;

        var settings = {
            vertical: true,
            arrows: false,
            speed: 500,
            slidesToScroll: 5,
            slidesToShow: 4,
            infinite: true,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1201,
                    settings: {
                        vertical: false,
                        slidesToScroll: 5,
                        slidesToShow: 20,
                        infinite: true,
                    },
                },
            ]
        };
        return (
            <div className="graph-sidebar" onMouseEnter={this.setSidebarHoverState} onMouseLeave={this.setSidebarHoverState}>
                <div className="cand-label">
                    <h4 className="bold">SELECT YOUR CANDIDATES</h4>
                </div>
                <div className="cand-prev slider-arrow" onClick={this.previous}></div>
                <Slider ref={c => (this.slider = c)} className="candidates" {...settings}>
                    {output.map((candidateData) =>
                        <div className={"cand-view" +
                        ((this.state.selectedCandidates.indexOf(candidateData.fullName) > -1) ? " selected" : "")}
                             value={candidateData.fullName} key={candidateData.fullName}
                             onClick={() => this.candidateClickHandler(candidateData.fullName)}>
                            <div className="cand-main">
                                <div className="img-container">
                                    <img alt={candidateData.fullName} src={require("../../assets/images/candidates/" + candidateData.fullName + ".jpg")}/>
                                </div>
                                <div className="cand-name">
                                    {candidateData.fullName}
                                </div>
                                <div className="marker" style={{ backgroundColor: this.state.selectedCandidates.indexOf(candidateData.fullName) > -1 ? candidateData.color : "#fff" }} ></div>
                            </div>
                        </div>
                    )}
                </Slider>
                <div className="cand-next slider-arrow" onClick={this.next}></div>
            </div>
        );
    }
}

export default Sidebar;
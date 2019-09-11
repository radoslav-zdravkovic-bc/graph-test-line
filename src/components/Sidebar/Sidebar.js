import React, {Component} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {sidebarHover: false};
        this.setHoverState = this.setHoverState.bind(this);

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.slide = this.slide.bind(this);
    }

    setHoverState() {
        this.setState({
            sidebarHover: !this.state.sidebarHover
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

    componentWillMount() {
        window.addEventListener('wheel', (e) => {
            if(this.state.sidebarHover) {
                this.slide(e.wheelDelta);
            }
        })

        const candidatesData = require('../../data/candidates.json');

        function getFullName(item) {
            let fullname = {fullName: item.last_name, color: item.color};
            return fullname;
        }

        this.canidatesData = candidatesData.candidates.map(getFullName);
    }

    render() {
        let output = this.canidatesData;

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
                    breakpoint: 992,
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
            <div className="graph-sidebar" onMouseEnter={this.setHoverState} onMouseLeave={this.setHoverState}>
                <div className="cand-label">
                    <h4 className="bold">SELECT YOUR CANDIDATES</h4>
                </div>
                <div className="cand-prev slider-arrow" onClick={this.previous}></div>
                <Slider ref={c => (this.slider = c)} className="candidates" {...settings}>
                {output.map((candidateData) =>
                    <div className="cand-view">
                        <div className="cand-main">
                            <div className="img-container">
                                <img alt={candidateData.fullName} src={require("../../assets/images/candidates/" + candidateData.fullName + ".jpg")}/>
                            </div>
                            <div className="cand-name">
                                {candidateData.fullName}
                            </div>
                            <div className="marker" style={{backgroundColor: candidateData.fullName}} ></div>
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
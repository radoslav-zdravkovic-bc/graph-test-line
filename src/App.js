import React, {Component} from 'react';
import axios from 'axios';
import BarChart from './components/BarChart/BarChart';
import Sidebar from './components/Sidebar/Sidebar';
import _ from './../node_modules/lodash'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import './App.scss';


class App extends Component {

  constructor(props){
    super(props);
    const data = require('./components/BarChart/data.json');
    const source = _.cloneDeep(data);

    this.state = {
      candidatesArray: ["Donald Trump", "Kamala Harris", "Beto O'Rourke", "Joe Biden", "Bernie Sanders", "Peter Buttigieg", "Elizabeth Warren"],
      original: data, 
      source: source,
      width:  700,
      height: 500
    };

    this.filterResults = this.filterResults.bind(this)
    this.resetResults = this.resetResults.bind(this)
    this.addCandidate = this.addCandidate.bind(this)
  }

  addCandidate(candidate) {
      const candidateIndex = this.state.candidatesArray.indexOf(candidate);
      if(candidateIndex <= -1) {
          this.setState(prevState => ({
              candidatesArray: [...prevState.candidatesArray, candidate]
          }))
      } else {
          let candidatesArrayUpdated = [...this.state.candidatesArray];
          candidatesArrayUpdated.splice(candidateIndex, 1);
          this.setState({
              candidatesArray: candidatesArrayUpdated
          });
      }

      setTimeout(function(){console.log(this.state.candidatesArray)}.bind(this), 500);
  }

  filterResults(){
    // filter data, show last 5 data
    let tempdata = _.cloneDeep(this.state.original);
    const keepEl = 5;
    tempdata.data.forEach(d => {
      let length = d.coordinates.length;
      d.coordinates = d.coordinates.filter(el => el.a >= length-keepEl)
    });
    this.setState({
      source: tempdata
    });  
  };

  resetResults(){
    this.setState({
      source: _.cloneDeep(this.state.original)
    });  
  };

  updateDimensions() {
      let element = document.getElementById('graph');
      let positionInfo = element.getBoundingClientRect();
      let update_width  = positionInfo.width - 100;
      this.setState({ width: update_width/*, height: update_height*/ });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    return (
          <Container className="App">
            <button onClick={this.filterResults}>Show last 5 results</button>
            <button onClick={this.resetResults}>Show All results</button>
            <Row>
              <Sidebar action={this.addCandidate} candidatesList={this.state.candidatesArray}/>
              <BarChart
                  data={this.state.source.data}
                  width={this.state.width}
                  height={this.state.height}
              />
            </Row>
          </Container>
    );
  }
}

export default App;

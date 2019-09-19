import React, {Component} from 'react';
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
    const selectedCandidatesDataInit = ["Donald Trump", "Kamala Harris", "Beto O'Rourke", "Joe Biden", "Bernie Sanders", "Peter Buttigieg", "Elizabeth Warren"];
    const initData = require('./data/candidates.json');

    this.state = {
      selectedCandidatesArray: selectedCandidatesDataInit,
      allCandidatesData: initData,
      selectedCandidatesData: this.setSelectedCandidatesData(selectedCandidatesDataInit, initData),
      original: data,
      source: source,
      width:  100,
      height: 500
    };

    this.filterResults = this.filterResults.bind(this)
    this.resetResults = this.resetResults.bind(this)
    this.addCandidate = this.addCandidate.bind(this)
    this.setSelectedCandidatesData = this.setSelectedCandidatesData.bind(this)
  }

  addCandidate(candidate) {
      const candidateIndex = this.state.selectedCandidatesArray.indexOf(candidate);
      if(candidateIndex <= -1) {
          let candidatesArrayUpdated = [...this.state.selectedCandidatesArray, candidate];
          const candidatesArrayUpdatedData = this.setSelectedCandidatesData(candidatesArrayUpdated, this.state.allCandidatesData);
          this.setState({
              selectedCandidatesArray: candidatesArrayUpdated,
              selectedCandidatesData: candidatesArrayUpdatedData
          })
      } else {
          let candidatesArrayUpdated = [...this.state.selectedCandidatesArray];
          candidatesArrayUpdated.splice(candidateIndex, 1);
          const candidatesArrayUpdatedData = this.setSelectedCandidatesData(candidatesArrayUpdated, this.state.allCandidatesData);
          this.setState({
              selectedCandidatesArray: candidatesArrayUpdated,
              selectedCandidatesData: candidatesArrayUpdatedData
          });
      }
  }

  setSelectedCandidatesData(selArray, data) {
      let candidatesData = data.candidates.filter(function(item) {
          return selArray.includes(item.last_name);
      });

      return candidatesData;
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
      let update_width  = positionInfo.width - 50;
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
              <Sidebar
                  action={this.addCandidate}
                  candidatesList={this.state.selectedCandidatesArray}
                  allCandidatesData={this.state.allCandidatesData}
              />
              <BarChart
                  action={this.addCandidate}
                  data={this.state.source.data}
                  width={this.state.width}
                  height={this.state.height}
                  selectedCandidatesData={this.state.selectedCandidatesData}
              />
            </Row>
          </Container>
    );
  }
}

export default App;

import React, {Component} from 'react';
import BarChart from './components/BarChart';
import _ from './../node_modules/lodash'
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    const data = require('./components/data.json');
    const source = _.cloneDeep(data);
    this.state = {
      original: data, 
      source: source,
      width:  700,
      height: 500
    };
    this.filterResults = this.filterResults.bind(this)
    this.resetResults = this.resetResults.bind(this)
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
      let update_width  = window.innerWidth-100;
      //let update_height = Math.round(update_width/4.4);
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
      <div className="App">
        <button onClick={this.filterResults}>Show last 5 results</button>
        <button onClick={this.resetResults}>Show All results</button>
        <BarChart 
          data={this.state.source.data} 
          width={this.state.width} 
          height={this.state.height} 
        />
      </div>
    );
  }
}

export default App;

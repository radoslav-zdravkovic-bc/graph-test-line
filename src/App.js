import React, {Component} from 'react';
import BarChart from './components/BarChart';
import './App.css';


class App extends Component {

  constructor(){
    super();
    const data = require('./components/data.json');
    //this.state = data;

    // filter data, show last 10 data
    let tempdata = data;
    const keepEl = 3
    tempdata.data.forEach(d => {
      let length = d.coordinates.length;
      d.coordinates = d.coordinates.filter(el => el.a >= length-keepEl)
    });
    //console.log(this.state.data, tempdata)
    
    this.state = tempdata;


  }

  render() {    
    return (
      <div className="App">
        <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import BarChart from './components/BarChart';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    // data: [12, 5, 6, 6, 9, 10, 15, 22, 18, 6, 9],
  //   data: [
  //     {
  //       "coordinates": [
  //         {a: 1, b: 3},
  //         {a: 2, b: 6},
  //         {a: 3, b: 2},
  //         {a: 4, b: 12},
  //         {a: 5, b: 8}
  //       ],
  //       "color": "red"
  //     },{
  //       "coordinates": [
  //         {a: 1, b: 6},
  //         {a: 2, b: 5},
  //         {a: 3, b: 2},
  //         {a: 4, b: 4},
  //         {a: 5, b: 6}
  //       ],
  //       "color": "blue"
  //     }
  //   ],
  //   width: 700,
  //   height: 500,
  //   id: 'root'
  // }

  data: [
      {
        "coordinates": [
          {a: 1, b: 3},
          {a: 2, b: 6},
          {a: 3, b: 3},
          {a: 4, b: 12},
          {a: 5, b: 8}
        ],
        "color": "red",
        "name": "Radoslav"
      },{
        "coordinates": [
          {a: 1, b: 6},
          {a: 2, b: 5},
          {a: 3, b: 2},
          {a: 3.5, b: 5.5},
          {a: 5, b: 6}
        ],
        "color": "blue",
        "name": "Toni"
      }
    ],
    width: 700,
    height: 500,
    id: 'root'
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

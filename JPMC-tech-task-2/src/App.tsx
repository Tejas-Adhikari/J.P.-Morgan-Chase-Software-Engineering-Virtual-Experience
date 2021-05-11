import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  //First you’ll need to add the `showGraph` property in the IState interface defined in App.tsx. It should be of the type` boolean

  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      //Next, in the constructor of the App component, you should define that the initial state of the App not to show the graph yet. This is because we want the graph to show when the user clicks ‘Start Streaming Data’. That means you should set `showGraph` property of the App’s state to `false` in the constructor
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
     //To ensure that the graph doesn’t render until a user clicks the ‘Start Streaming’ button, you should also edit the`renderGraph` method of the App. In there, you must add a condition to only render the graph when the state’s `showGraph` property of the App’s state is `true`.
    if(this.state.showGraph){      
      
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
           data: serverResponds,
          showGraph:true,
         });

    });
    x++;
    if(x > 1000){
      clearInterval(interval);
    }
  }, 100);
      // Update the state by creating a new array of data that consists of
      // Previous data in the state and the new data from server
  }


  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

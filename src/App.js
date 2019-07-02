import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import { Segment } from 'semantic-ui-react';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';

import './App.css';
import store from './store';

// import PositionSelect from "./components/PositionSelect";
// import ChecklistPuesto from './components/Checklist/ChecklisPuesto';
// import PNCPuesto from './components/PNC/PNCPuesto';

import CreateChecklist from './components/CreateChecklist';
import DisplayChecklist from './components/DisplayChecklist';
import DisplayAnswers from './components/DisplayAnswers';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{height: '100vh', width: '100vw', background: "#cbcbcb"}}>
        <Router>
          <Switch>
          <Route exact path="/" component={CreateChecklist} />
          <Route exact path="/view" component={DisplayChecklist} />
          <Route exact path="/results" component={DisplayAnswers} />
          </Switch>
        </Router>
        </div>
      </Provider>
    );
  }
}

export default App;

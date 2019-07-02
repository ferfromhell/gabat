import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import LevelSelect from './LevelSelect';
import ChecklistTable from './ChecklistTable';

class PNCPuesto extends Component {
  render() {
    return (
      <Segment.Group>
        <Segment>
          <LevelSelect />
        </Segment>
        <Segment>
          <ChecklistTable />
        </Segment>
      </Segment.Group>
    )
  }
}
export default  PNCPuesto;
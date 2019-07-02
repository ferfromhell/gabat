import React, { Component } from 'react';

import CategoriaSelect from './CategoriaSelect';
import ActivityInput from './ActivityInput';
import ChecklistTable from './ChecklistTable';
import { Segment } from 'semantic-ui-react';

class ChecklisPuesto extends Component {
  render() {
    return (
      <Segment.Group>
      <Segment>
        <CategoriaSelect />
      </Segment>
      <Segment>
        <ActivityInput />
      </Segment>
      <Segment>
        <ChecklistTable />
      </Segment>
      </Segment.Group>
    )
  }
}
export default ChecklisPuesto;
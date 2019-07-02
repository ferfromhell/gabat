import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment,Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PositionSelect from "./PositionSelect";

import ChecklistPuesto from './Checklist/ChecklisPuesto';
import PNCPuesto from './PNC/PNCPuesto';

import { showModal } from '../actions/checklisActions';

class CreateChecklist extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }
  
  handleClose = () => {
    this.setState({ isOpen: false });
    window.location.reload();
    // this.props.showModal({Succes:false});
  }

  render() {
    return (
      <div>
        <Modal
          open={this.props.checklist.saved.Success}
          basic
          size='small'
          onClose={this.handleClose}
          header='Checklist guardada!'
          content='Tu checklist fue salvada con exito'
          actions={[{ key: 'OK', content: 'OK', positive: true }]}
        />
        <Segment.Group raised>
          <Segment>
            <PositionSelect />
          </Segment>
          <Segment>
            <h1>Checklist puesto</h1>
            <ChecklistPuesto />
          </Segment>
          <Segment>
            <h1>PNC puesto</h1>
            <PNCPuesto />
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}

CreateChecklist.propTypes = {
  showModal: PropTypes.func.isRequired,
  checklist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  checklist: state.checklist
})

export default connect(mapStateToProps,{showModal})(CreateChecklist);
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment,Table, Button, Modal} from 'semantic-ui-react';

import PositionSelectDisplay from './displayChecklist/PositionSelect';
import {getChecklist, saveTableDisplay} from '../actions/displayActions';
import {getChecklistPNC,saveAnswerPNC} from '../actions/pncActions';

import RowItem from './displayChecklist/RowItem';
import RowItemPNC from './displayChecklist/RowItemPNC';


class DisplayChecklist extends Component {
  constructor(props){
    super(props);
    this.state = {
      puesto: '',
      isOpen: false
    }
  }
  shouldComponentUpdate= () =>{
    const newPuesto = this.props.display.puestoSelect;
    let res;
    res=this.state.puesto===newPuesto?false:true;
    return res;
  }
  saveTable = async() => {
    var rows = this.props.display.rows;
    var rowsPNC = this.props.pnc.rowsPNC;
    let puesto = this.props.display.puestoSelect
    // console.log(rowsPNC);
    const newTable= {
      puesto,
      rows
    }
    const newTablePNC= {
      puesto,
      rowsPNC
    }
    // console.log(newTablePNC);
    await this.props.saveTableDisplay(newTable);
    await this.props.saveAnswerPNC(newTablePNC);
  }
  handleClose = () => {
    this.setState({ isOpen: false });
    window.location.reload();
    // this.props.showModal({Succes:false});
  }
  render() {
    const { rows } = this.props.display;
    const { rowsPNC } = this.props.pnc;
    return (
      <div>
        <Modal
          open={this.props.display.saved.Success}
          basic
          size='small'
          onClose={this.handleClose}
          header='Checklist guardada!'
          content='Tu checklist fue salvada con exito'
          actions={[{ key: 'OK', content: 'OK', positive: true }]}
        />
        <Segment.Group raised>
          <Segment>
            <PositionSelectDisplay />
          </Segment>
          <Segment>
            <h1>Checklist puesto</h1>
            <Table celled striped fixed color="blue">
              <Table.Body>
                {rows.map((row,i) => <RowItem key={i} row={row} index={i}/>)}    
              </Table.Body>
            </Table>
            {/* {rows.length >0?
              <Button 
                icon='save' 
                onClick={this.saveTable}
                positive
              />:null} */}
          </Segment>
          <Segment>
            <h1>Checklist riesgos</h1>
            <Table celled striped fixed color="blue">
              <Table.Body>
              {rowsPNC.map((row,i) => <RowItemPNC key={i} row={row} index={i}/>)}    
              </Table.Body>
            </Table>
          </Segment>
          {rowsPNC.length >0?
              <Button 
                icon='save' 
                onClick={this.saveTable}
                positive
              />:null}
        </Segment.Group>
      </div>
    )
  }
}

DisplayChecklist.propTypes = {
  getChecklist: PropTypes.func.isRequired,
  getChecklistPNC: PropTypes.func.isRequired,
  saveTableDisplay: PropTypes.func.isRequired,
  saveAnswerPNC: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  display: state.display,
  pnc: state.pnc
})

export default connect(mapStateToProps,{getChecklist, saveTableDisplay,getChecklistPNC, saveAnswerPNC})(DisplayChecklist);
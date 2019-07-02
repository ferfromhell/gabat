import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Modal, Icon } from 'semantic-ui-react';
import { addRow, saveTable} from '../../actions/checklisActions';

import RowItem from './RowItem';

class ChecklistTable extends Component {
  state = { open: false }
  saveTable = async() => {
    var rows = this.props.checklist.rows;
    //console.log(rows);
    const newTable= {
      puesto: this.props.checklist.puestoSelect,
      rows
    }
    // console.log(newTable);
    await this.props.saveTable(newTable);
    console.log(this.props.checklist.saved.Succes);
  }
  close = () => this.setState({ open: false })
  render() {
    const {rows} = this.props.checklist;
    const {open} = this.state;
    return (
      <div>
      <Modal
        open={open}
        onClose={this.close}
      >
        <Modal.Header>Checklist guardado en BD!</Modal.Header>
        <Modal.Content>El checklist a sido salvado exitosamente.</Modal.Content>
        <Button color='green' onClick={this.close}>
          <Icon name='checkmark'/> Ok
        </Button>
      </Modal>  
      <Table celled striped fixed color="blue">
        <Table.Body>
          {rows.map((row,i) => <RowItem key={i} row={row} index={i}/>)}    
        </Table.Body>
      </Table>
      {rows.length >0?
        <Button 
          icon='save' 
          onClick={this.saveTable}
        />:null}
      </div>
      // <div>
      //   {/* {rows.length>0? console.log(rows): null} */}
      //   {rows.map((row,index) => <RowItem key={index} data={row}/>)}
      // </div>
    )
  }
}

ChecklistTable.propTypes = {
  addRow: PropTypes.func.isRequired,
  saveTable: PropTypes.func.isRequired,
  checklist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  checklist: state.checklist
})

export default connect (mapStateToProps,{addRow,saveTable})(ChecklistTable);
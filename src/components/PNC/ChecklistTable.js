import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { saveTablePNC } from '../../actions/pncActions';

import RowItem from './RowItem';
// const RowItem = (key) => {
//   // console.log(key.row)
//   return (
//     <Table.Row>
//         <Table.Cell>
//           {key.row}     
//         </Table.Cell>
//       </Table.Row>
//   )
// }
class ChecklistTable extends Component {
  state = { open: false }
  saveTable = async() => {
    var rows = this.props.pnc.allQs;
    //console.log(rows);
    const newTable= {
      puesto: this.props.checklist.puestoSelect,
      rows
    }
    // console.log(newTable);
    await this.props.saveTablePNC(newTable);
    //console.log(this.props.checklist.saved.Succes);
  }
  // close = () => this.setState({ open: false })
  render() {
    const {allQs} = this.props.pnc;
    return (
      <div>
        <Table celled striped fixed color="blue">
        <Table.Body>
          {allQs.map((q,i) => {
            return (
              <RowItem key={i} row={q} index={i}/>
            )
          })}    
        </Table.Body>
      </Table>
      {allQs.length >0?
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
  // addRow: PropTypes.func.isRequired,
  saveTablePNC: PropTypes.func.isRequired,
  // checklist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  pnc: state.pnc,
  checklist: state.checklist
})

export default connect (mapStateToProps,{saveTablePNC})(ChecklistTable);
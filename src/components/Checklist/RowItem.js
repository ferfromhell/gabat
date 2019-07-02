import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Select, Button, Input } from 'semantic-ui-react';
import { addExtraRow,deleteRow,updateRow, updateRowInput, updateRowInputCat} from '../../actions/checklisActions';


class RowItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      rows: this.props.checklist.rows,
      response: '',
      input:''
    }
  }
  deleteRow = (i) => {
    var rows = this.props.checklist.rows;
    console.log(rows);
    rows.splice(i, 1);
    this.setState({rows});
    this.props.deleteRow(rows);
  }
  addExtraRow = (i) => {
    var rows = this.props.checklist.rows;
    //console.log(rows);
    rows.splice( i+1, 0, {activityInput: 'Nueva actividad', response:'' ,type:'activity'} );
    //console.log(i);
    this.setState({rows});
    this.props.addExtraRow(rows);
  }
  setResponse = (e, {value}) => {
    const i=this.props;
    e.preventDefault();
    // console.log(value);
    this.setState({response: value});
    const data = {
      value,
      i
    }
    this.props.updateRow(data); 
  }
  setInput = (e, {value}) => {
    const i=this.props;
    e.preventDefault();
    // console.log(value);
    this.setState({input: value});
    const data = {
      value,
      i
    }
    this.props.updateRowInput(data); 
  }
  setInputCategoria = (e, {value}) => {
    const i=this.props;
    e.preventDefault();
    // console.log(value);
    this.setState({input: value});
    const data = {
      value,
      i
    }
    this.props.updateRowInputCat(data); 
  }
  render() {
    const {row,index} = this.props;
    const responseOptions= [
      {key:"CCN",value:"Radio",text:"C/CN"},
      {key:"Numero",value:"Number",text:"Numero"},
      {key:"Date",value:"Date",text:"Fecha"},
      {key:"Text",value:"Text",text:"Texto"},
    ];
    
    // console.log(row);
    return (
      row.type === 'activity'?
      <Table.Row>
        <Table.Cell width={6}>
          <Input 
            defaultValue={row.activityInput}
            style={{width:"90%",padding: "1px"}}
            onChange={this.setInput.bind()}
          />  
        </Table.Cell>
        <Table.Cell width={4}>
          <Select
            placeholder="tipo de respuesta"
            options={responseOptions}
            onChange={this.setResponse.bind()}
            style={{width:"100%",margin:"1em auto", zIndex:'1'}}
          />
        </Table.Cell>
        {/* <Table.Cell width={2}>
          <Input 
              defaultValue={row.fromTime}
              style={{width:"90%",padding: "1px"}}
              onChange={this.setInput.bind()}
              type = "time"
            />  
            :
            <Input 
              defaultValue={row.fromTime}
              style={{width:"90%",padding: "1px"}}
              onChange={this.setInput.bind()}
              type = "time"
            />  
        </Table.Cell> */}
        <Table.Cell width={2}>
          <Button 
            icon='delete'
            onClick={this.deleteRow.bind(this, index)}
          />
          <Button 
            icon='add'
            onClick={this.addExtraRow.bind(this, index)} 
          />
        </Table.Cell>
      </Table.Row>:
      <Table.Row>
        <Table.Cell>
          {row.editable === true?
            <Input 
            defaultValue={row.categorySelect}
            style={{width:"90%",padding: "1px"}}
            onChange={this.setInputCategoria.bind()}
          />:
          row.categorySelect}
        </Table.Cell>
      </Table.Row>
    )
  }
}

RowItem.propTypes = {
  addExtraRow: PropTypes.func.isRequired,
  updateRow: PropTypes.func.isRequired,
  updateRowInput: PropTypes.func.isRequired,
  updateRowInputCat: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  checklist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  checklist: state.checklist
})

export default connect (mapStateToProps,{addExtraRow,deleteRow, updateRow, updateRowInput, updateRowInputCat})(RowItem);
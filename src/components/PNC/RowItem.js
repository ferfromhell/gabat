import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Select } from 'semantic-ui-react';
import {updateRowPNC} from "../../actions/pncActions"

class RowItem extends Component {
  // constructor(props){
  //   super(props);
  // }
  setResponse = (e, {value}) => {
    const i=this.props;
    e.preventDefault();
    // console.log(value);
    this.setState({response: value});
    const data = {
      value,
      i
    }
    this.props.updateRowPNC(data); 
  }
  render(){
    const {row} = this.props;
    const responseOptions= [
      {key:"CCN",value:"Radio",text:"C/CN"},
      {key:"Numero",value:"Number",text:"Numero"},
      {key:"Date",value:"Date",text:"Fecha"},
      {key:"Text",value:"Text",text:"Texto"},
    ];
    console.log(row);
    return (
      <Table.Row>
        <Table.Cell>
        {row.activityInput}
        </Table.Cell>    
        <Table.Cell width={5}>
          <Select
            placeholder="tipo de respuesta"
            options={responseOptions}
            onChange={this.setResponse.bind()}
            style={{width:"100%",margin:"1em auto", zIndex:'1'}}
          />
        </Table.Cell>   
      </Table.Row>
    )
  }
}

RowItem.propTypes = {
  // addExtraRow: PropTypes.func.isRequired,
  updateRowPNC: PropTypes.func.isRequired,
  // updateRowInput: PropTypes.func.isRequired,
  // updateRowInputCat: PropTypes.func.isRequired,
  // deleteRow: PropTypes.func.isRequired,
  // checklist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  pnc: state.pnc
})

export default connect (mapStateToProps,{updateRowPNC})(RowItem);
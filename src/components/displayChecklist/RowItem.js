import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Select, Input } from 'semantic-ui-react';

import { updateRowDisplay, updateRowInput} from '../../actions/displayActions';


class RowItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      rows: this.props.display.rows,
      answer: '',
      input:''
    }
  }
  setAnswer = (e, {value}) => {
    const i=this.props;
    e.preventDefault();
    console.log(value);
    this.setState({answer: value});
    const data = {
      value,
      i
    }
    this.props.updateRowDisplay(data); 
  }
  // setInput = (e, {value}) => {
  //   const i=this.props;
  //   e.preventDefault();
  //   this.setState({input: value});
  //   const data = {
  //     value,
  //     i
  //   }
  //   // this.props.updateRowInput(data); 
  // }
  render() {
    const {row} = this.props;
    const responseOptions= [
      {key:"C",value:"C",text:"C"},
      {key:"NC",value:"NC",text:"NC"},
    ];
    
    // console.log(row);
    return (
      row.type === 'activity'?
      <Table.Row>
        <Table.Cell width={8}>
          {row.activityInput}
        </Table.Cell>
        <Table.Cell width={5}>
          {row.response !== 'Radio'?
            <Input 
              type={row.response} 
              onChange={this.setAnswer.bind()}
            />:
            <Select 
              placeholder="Selecciona respuesta" 
              options={responseOptions} 
              onChange={this.setAnswer.bind()}
              style={{width:"100%",margin:"1em auto"}}
            />}
        </Table.Cell>
      </Table.Row>:
      <Table.Row>
        <Table.Cell>
          {row.categorySelect}
        </Table.Cell>
      </Table.Row>
    )
  }
}

RowItem.propTypes = {
  updateRowDisplay: PropTypes.func.isRequired,
  updateRowInput: PropTypes.func.isRequired,
  // checklist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  display: state.display
})

export default connect (mapStateToProps,{ updateRowDisplay, updateRowInput})(RowItem);
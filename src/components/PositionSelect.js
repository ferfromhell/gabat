import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'semantic-ui-react';

import {getPuestos, addPuesto, getCategorias} from '../actions/checklisActions';

class PositionSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      puestoSelect: '',
      isDisbled: false
    }
  }
  componentDidMount= () =>{
    this.props.getPuestos();
    // console.log(this.props);
  }
  onChangePuesto = (e, {value}) => {
    e.preventDefault();
    this.setState({puestoSelect: value});
    this.setState({isDisabled: true}); 
    this.props.addPuesto(value);
    this.props.getCategorias(value);
  }
  render() {
    const { puestos } = this.props.checklist;
    return (
      <Select 
        placeholder="Selecciona un puesto" 
        options={puestos} 
        onChange={this.onChangePuesto}
        disabled={this.state.isDisbled}
        style={{width:"100%",margin:"1em auto"}}
      />
    )
  }
}

PositionSelect.propTypes = {
  getPuestos: PropTypes.func.isRequired,
  getCategorias: PropTypes.func.isRequired,
  addPuesto: PropTypes.func.isRequired,
  checklist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  checklist: state.checklist
})


export default connect (mapStateToProps,{getPuestos, addPuesto, getCategorias})(PositionSelect);
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'semantic-ui-react';

import {getPuestos, addPuesto, getChecklist} from '../../actions/displayActions';
import { getChecklistPNC} from '../../actions/pncActions';
class PositionSelectDisplay extends Component {
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
    this.props.getChecklist(value);
    this.props.getChecklistPNC(value);
  }
  render() {
    const { puestos } = this.props.display;
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

PositionSelectDisplay.propTypes = {
  getPuestos: PropTypes.func.isRequired,
  addPuesto: PropTypes.func.isRequired,
  getChecklist: PropTypes.func.isRequired,
  getChecklistPNC: PropTypes.func.isRequired,
  display: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  display: state.display
})


export default connect (mapStateToProps,{getPuestos, addPuesto, getChecklist, getChecklistPNC})(PositionSelectDisplay);
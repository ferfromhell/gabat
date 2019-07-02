import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form,Button,Select } from 'semantic-ui-react';

import {getCategorias, addRow} from '../../actions/checklisActions';

class CategoriaSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      categorySelect: '',
      editable: ''
    }
  }
  componentDidMount= () =>{
    this.props.getCategorias(this.props.checklist.puestoSelect);
    // console.log(this.props);
  }
  onChangeCategory = (e, {value}) => {
    e.preventDefault();
    const editableField = value ==="OTRAS"?true:false;
    this.setState({editable:editableField});
    this.setState({categorySelect: value}); 
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const newRow = {
      categorySelect: this.state.categorySelect,
      type: 'category',
      editable: this.state.editable
    }
    this.props.addRow(newRow);
  }
  render() {
    const { categorias } = this.props.checklist;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group inline>
        <Form.Field width={14}>
          <label>Categoria: </label>
          <Select 
            placeholder="Selecciona una categoria" 
            options={categorias} 
            onChange={this.onChangeCategory}
            style={{width:"100%",margin:"1em auto"}}/>
        </Form.Field>
        <Button type='submit'>Agregar</Button>
        </Form.Group>
      </Form>
      
    )
  }
}

CategoriaSelect.propTypes = {
  getCategorias: PropTypes.func.isRequired,
  addRow: PropTypes.func.isRequired,
  checklist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  checklist: state.checklist
})


export default connect (mapStateToProps,{getCategorias, addRow})(CategoriaSelect);
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form,Button, Input } from 'semantic-ui-react';

import { addRow} from '../../actions/checklisActions';

class ActivityInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      activityInput: '',
      response: '',
      type: 'activity'
    }
  }
  componentDidMount= () =>{
    // TODO: getrows in roder to add rows of new activities
  }
  onChange = e => {
    this.setState({ activityInput: e.target.value });
    // console.log(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newRow = {
      activityInput: this.state.activityInput,
      response: '',
      type: this.state.type,
      editable: ''
    }
    this.props.addRow(newRow);
    this.setState({activityInput:''});
  }
  render() {
    const { activityInput } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group inline>
          <Form.Field width={14}>
            <label>Actividad: </label>
            <Input 
              name = "activityInput"
              placeholder='Activity...'
              value= {activityInput} 
              onChange={this.onChange}/>
          </Form.Field>
          <Button type='submit'>Agregar</Button>
        </Form.Group>
      </Form>
      
    )
  }
}

ActivityInput.propTypes = {
  addRow: PropTypes.func.isRequired,
  checklist: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  checklist: state.checklist
})


export default connect (mapStateToProps,{addRow})(ActivityInput);
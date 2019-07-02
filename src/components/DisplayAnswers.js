import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment,Table} from 'semantic-ui-react';

import PositionSelectDisplay from './displayChecklist/PositionSelect';



class DisplayAnswers extends Component {
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
  render() {
    return (
      <div>
        <Segment.Group raised>
          <Segment>
            <PositionSelectDisplay />
          </Segment>
          <Segment>
            <h1>Respuestas</h1>
            <Table celled striped fixed color="blue">
              <Table.Body>
                {/* {rows.map((row,i) => <RowItem key={i} row={row} index={i}/>)}     */}
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}

DisplayAnswers.propTypes = {

}
const mapStateToProps = state => ({
  display: state.display
})


export default connect(mapStateToProps,{})(DisplayAnswers);
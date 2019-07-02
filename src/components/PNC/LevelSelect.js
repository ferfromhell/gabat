import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form,Select,List, Button } from 'semantic-ui-react';

import {getLevels, setSelect, setQs} from '../../actions/pncActions';

class LevelSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
      levelOpt: [],
      pncChecklist: {}
    }
  }
  componentDidMount= () =>{
    this.props.getLevels(0);
  }
  setOptions = (opt = []) => {
    const selectOptions =  Object.values(opt)
    return selectOptions.map((o) => ({
        key: o.Id,
        text: o.Nombre,
        value: o.Id,
    }))
  }
  filterByParent = (opt = [],parentId = 0,level = 1) => {
    const selectOptions =  Object.values(opt)
    const result = selectOptions.filter(op => op.ParentId ===parentId && op.Level === level)
    return result
  }
  onChangeLevel = (e, {value,name,select}) => {
    e.preventDefault();
    console.log(value,name);
    this.newLevel(value,name);
    //Set object of object to draw table
  }
  newLevel = (parentId,name) => {
    let level= parseInt(name.slice(-1))+1;
    let oldLevels= this.state.levelOpt;
    let filtered = this.setOptions(this.filterByParent(this.props.pnc.allLevels,parentId,level));
    
    //Get last id from filtered array
    let lastChild = filtered[filtered.length-1].key;
    //set next level
    let nextLevel = level+1;
    
    //if response length >0  is a Selec else is List
    let nexFilter = this.setOptions(this.filterByParent(this.props.pnc.allLevels,lastChild,nextLevel));  
    let isSelect = nexFilter.length>0?true:false
    oldLevels[level]={
      level,
      options:filtered,
      parentId,
      isSelect
    }
    for(let i=level+1;i<oldLevels.length;i++){
      oldLevels[i]=null;
    }
    // allLevels[level].push()
    this.setState({levelOpt:oldLevels});
    this.props.setSelect(oldLevels);

    

  }
  addExtraRow = (index, text) => {
    const newRow = {
      activityInput: text,
      index,
      response: ''
    }
    this.props.setQs(newRow)
  }
  render() {
    const {levelsSelect} = this.props.pnc;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group inline>
          <Form.Field width={14}>
            <label>Level 1: </label>
            <Select 
              name='level1'
              placeholder="Selecciona una categoria" 
              options={this.setOptions(this.filterByParent(this.props.pnc.allLevels))} 
              onChange={this.onChangeLevel}
              style={{width:"100%",margin:"1em auto",display:"block"}}/>
          </Form.Field>
        </Form.Group>
        {levelsSelect.map((level,i) => {
                if(level){
                  // const levelNum=level.level;
                //console.log(levelNum);
                return level.isSelect === true?
                  <Select 
                    key={i}
                    placeholder='Selecciona una opcion'
                    name={'level'+level.level}
                    options={level.options} 
                    onChange={this.onChangeLevel}
                    style={{width:"100%",margin:"1em auto", display:"block"}}
                  />:
                  <List divided relaxed key={i}>
                    {level.options.map((opt,i)=>{
                      // console.log(opt)
                      return <List.Item key={i}>
                                <Button 
                                  icon='add'
                                  compact
                                  size='mini'
                                  color='green'
                                  onClick={this.addExtraRow.bind(this, i, opt.text)} 
                                />
                                {opt.text}
                              </List.Item>
                    })}
                  </List>
                }else{
                  return null
                }
              })
        }
      </Form>
    )
  }
}

LevelSelect.propTypes = {
  getLevels: PropTypes.func.isRequired,
  setSelect: PropTypes.func.isRequired,
  setQs: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  pnc: state.pnc
})
export default connect(mapStateToProps,{getLevels,setSelect, setQs})(LevelSelect);
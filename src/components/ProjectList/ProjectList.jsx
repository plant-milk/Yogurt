import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

import ProjectEditor from '../ProjectEditor/ProjectEditor';

export default class projectList extends React.Component {

  constructor() {
    super();
    this.state = {
      isEditing:false
    };
  }

  selectProject (id) {
    this.props.fetchEntries({project:id});
    this.props.fetchProject({_id:id});
  }

  openModal () {
    this.setState({isEditing: true});
  }

  render() {
    const projects = this.props.projects || [];
    const state = this.state;
    let id = "";
    if(this.props.project){
      id = this.props.project._id;
    }
    return (
      <nav className="nav-group">
        <h5 className="nav-group-title">Projects</h5>
        {projects.map((item) => {
          return id === item._id ?
            <span className="nav-group-item active">{item.name}<button className="btn btn-default pull-right"><i className="icon icon-pencil"></i></button>
            </span>
            :
            <span className="nav-group-item" onClick={()=>this.selectProject.call(this,item._id)}>
              {item.name}<button className="btn btn-default pull-right"><i className="icon icon-pencil"></i></button>
            </span>
        })}
        <span className="nav-group-item"><button className="btn btn-default pull-right" onClick={()=>this.openModal.call(this)}>Add</button></span>
        <Modal isOpen={state.isEditing}>
          <ProjectEditor />
        </Modal>
      </nav>);
  }
}


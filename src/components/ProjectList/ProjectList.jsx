import React, { Component, PropTypes } from 'react'

export default class projectList extends React.Component {

  selectProject (id) {
    this.props.fetchEntries({project:id});
    this.props.fetchProject({_id:id});
  }

  render() {
    const projects = this.props.projects || [];
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
      </nav>);
  }
}


import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Preview from '../Preview/Preview';

export default class Project extends React.Component {

  constructor() {
    super();
    this.state = {
      projectName: '',
      projectEditingId: '',
      showProjectField: false
    }
  }

  openProject(item) {
    this.props.setProject(item);
    this.props.changeMode('docs');
  }

  inputProjectName(projectName) {
    this.setState({projectName});
  }

  updateProject() {
    this.props.updateProject({
      id: this.state.projectEditingId,
      title: this.state.projectName,
      order: 1
    });
    this.setState({
      projectEditingId: ''
    });
  }

  editProject(project) {
    this.setState({
      projectEditingId: project.id,
      projectName: project.title
    });
  }

  addProject() {
    this.props.addProject({
      title: this.state.projectName,
      id: this._getUniqId(),
      order: 1
    });
    this.setState({
      showProjectField: false
    });
  }

  showProjectField() {
    this.setState({
      showProjectField: true
    });
  }

  removeProject(project) {
    this.props.removeProject(project);
  }

  _getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }

  render() {
    const showProjectField = this.state.showProjectField;

    return(
      <div>
        <header className="header">
          <div className="logo is-small is-center">[Yogurt Logo]</div>
        </header>

        <main className="main">
          <div className="content">
            <div className="section is-center">
              <div className="inner">
              <h1>Welcome to Yogurt</h1>
              <p className="ygtProjectText">Select the project card and start creating the document.</p>
              {this.props && this.props.projects &&
                <div className="grid is-col-medium-2">
                {this.props.projects.map(item => (
                  <div>
                    <div className="card is-fit">
                      {this.state.projectEditingId === item.id ?
                      <div className="field">
                        <input autoFocus className="input" type="text" placeholder="Project name" defaultValue={item.title} onInput={(e) => {this.inputProjectName(e.target.value)}}/>
                        <a className="button is-small" onClick={this.updateProject.bind(this)}>Save</a>
                      </div>
                      :
                      <h2><i className="fa fa-book"></i> {item.title}</h2>
                      }
                      <p><i className="fa fa-folder-o"></i> Category: 2<br/>
                          <i className="fa fa-file-o"></i> Page: 5<br/>
                          <i className="fa fa-clock-o"></i> Last update: 2017/09/22</p>
                      <p>
                        <button className="button is-small" onClick={(e) => {e.preventDefault();this.openProject(item)}}><i className="fa fa-arrow-right"></i> Open</button>
                        <button className="button is-small is-white" onClick={this.editProject.bind(this,item)}><i className="fa fa-pencil"></i> Rename</button>
                        <button className="button is-small is-white" onClick={(e) => {e.preventDefault();this.removeProject(item)}}><i className="fa fa-trash"></i> Remove</button>
                      </p>
                    </div>
                  </div>
                ))}
                  <div>
                    <div className="card is-clickable is-fit is-skeleton is-center">
                      <a href="#" onClick={this.showProjectField.bind(this)}>
                        {!showProjectField &&
                          <div>
                            <h2><i className="fa fa-book"></i> NEW PROJECT</h2>
                            <p>Click this card to add a new project.</p>
                          </div>
                        }
                        {showProjectField &&
                          <div className="field">
                            <input autoFocus className="input" type="text" placeholder="Project name" onInput={(e) => {this.inputProjectName(e.target.value)}}/>
                            <a className="button is-small" onClick={this.addProject.bind(this)}>Add</a>
                          </div>
                        }
                      </a>
                    </div>
                  </div>
                </div>
              }
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

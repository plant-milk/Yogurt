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
        <main className="main">
          <a href="https://github.com/plant-milk/Yogurt" style={{position: 'absolute', top: 0, right: 0, border: 0, zIndex:10}}><img src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" /></a>
          <div className="content">
            <div className="section is-center">
              <div className="inner">
              <div className="ygtLogo"><img src="./logo.svg" alt="Yogurt" width="100" /></div>
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
                      <hr/>
                      <p>
                        <button className="button is-small" onClick={(e) => {e.preventDefault();this.openProject(item)}}><i className="fa fa-arrow-right"></i> Open</button>
                        <button className="button is-small is-white" onClick={this.editProject.bind(this,item)}><i className="fa fa-pencil"></i> Rename</button>
                        <button className="button is-small is-white" onClick={(e) => {e.preventDefault();this.removeProject(item)}}><i className="fa fa-trash"></i> Remove</button>
                      </p>
                    </div>
                  </div>
                ))}
                <div>
                  <div className="card is-clickable is-row-fit is-skeleton is-center">
                    <div onClick={this.showProjectField.bind(this)}>
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
                    </div>
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

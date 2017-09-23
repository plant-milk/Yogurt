import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './Project.scss';
import Preview from '../Preview/Preview';

export default class Project extends React.Component {

  constructor() {
    super();
    this.state = {
      projectName: '',
      projectEditingId: ''
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
      projectName: project.name
    });
  }

  addProject() {
    this.props.addProject({
      title: this.state.projectName,
      id: this._getUniqId(),
      order: 1
    });
  }

  _getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }

  render() {
    return(
      <div>
        <header className="header is-small is-black">
          <div className="logo is-small is-center">Projects</div>
        </header>

        <main className="main">
          <div className="content">
            <div className="section is-center">
              <h1>Welcome to Yogurt</h1>
              <p className="ygtProjectText">Select the project card and start creating the document.</p>
              {this.props && this.props.projects &&
                <div className="grid is-col-medium-3">
                {this.props.projects.map(item => (
                  <div>
                    <div className="card is-clickable is-fit">
                      <a>
                        {this.state.projectEditingId === item.id ?
                        <div className="field">
                          <input className="input" type="text" placeholder="Project name" defaultValue={item.title} onInput={(e) => {this.inputProjectName(e.target.value)}}/>
                          <a className="button is-small" onClick={this.updateProject.bind(this)}>RENAME</a>
                        </div>
                        :
                        <h2 onClick={this.editProject.bind(this,item)}>{item.title}</h2>
                        }
                        <p><i className="fa fa-clock-o"></i> 2017/09/22</p>
                        <button className="button" onClick={(e) => {e.preventDefault();this.openProject(item)}}>編集</button>
                      </a>
                    </div>
                  </div>
                ))}
                  <div>
                    <div className="card is-clickable is-fit is-skeleton is-center">
                      <a>
                        <div className="field">
                          <input className="input" type="text" placeholder="Project name" onInput={(e) => {this.inputProjectName(e.target.value)}}/>
                          <a className="button is-small" onClick={this.addProject.bind(this)}>ADD</a>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

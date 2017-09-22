import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import * as Actions from '../actions';
import Modal from 'react-modal';
import Project from '../components/Project/Project';
import Docs from '../components/Docs/Docs';
import Editor from '../components/Editor/Editor';

import {sampleEntry, sampleProject, sampleCategory} from './sampleVariables.js';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      mode: 'project'
    }
  }

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('yogurt'));
    if (storage) {
      this.props.actions.resotore(storage);
    } else {
      this.props.actions.addProject(sampleProject);
      this.props.actions.addCategory(sampleCategory);
      this.props.actions.addEntry(sampleEntry);
    }
  }

  render() {
    const props = this.props;
    const mode = props.mode;
    const projects = props.projects;
    const project = props.project;
    const projectId = project && project.id ? project.id : null;
    const actions = props.actions;
    const categories = props.categories.filter(item => item.projectId === projectId);
    const entries = props.entries.filter(item => item.projectId === projectId);
    const entry = props.entry;
    return (
      <div>
        {mode === 'project' && <Project projects={projects} {...actions}/>}
        {mode === 'docs' && <Docs entries={entries} categories={categories} project={project} {...actions}/>}
        {mode === 'editor' && <Editor entry={entry} {...actions}/>}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

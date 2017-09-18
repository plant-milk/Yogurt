import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import * as Actions from '../actions';
import Modal from 'react-modal';
import ProjectList from '../components/ProjectList/ProjectList';
import EntryList from '../components/EntryList/EntryList';
import Preview from '../components/Preview/Preview';
import Editor from '../components/Editor/Editor';

class App extends React.Component {
  render() {
    const props = this.props;
    const style = {
      paddingTop:'10px',
      paddingLeft:'10px'
    }
    return (
      <div className="window">
        <header className="toolbar toolbar-header">
          <h1 className="title">Yogurt</h1>
        </header>
        <div className="window-content">
          <div className="pane-group">
            <div className="pane pane-sm sidebar">
              <ProjectList project={props.project} projects={props.projects} fetchEntries={props.fetchEntries} fetchProject={props.fetchProject}/>
            </div>
            <div className="pane-one-third">
              <EntryList entries={props.entries} project={props.project} entry={props.entry} fetchEntry={props.fetchEntry} addNewEntry={props.addNewEntry}/>
            </div>
            <div className="pane">
              <nav className="nav-group">
            	  <div className="nav-group-title"> 
                    {props.entry && props.entry._id ?
                      <div className="btn-group pull-right">
                        <button className="btn btn-default" onClick={()=>this.removeEntry.call(this)}>削除</button>
                        <button className="btn btn-default" onClick={()=>this.openEditDialog.call(this)}>変更</button>
                      </div>
                      : null
                    }
                </div>
              </nav>
              <Preview entry={props.entry} />
              <Modal isOpen={props.isEditing}>
                <Editor entry={props.entry} closeEditDialog={props.closeEditDialog} saveEntry={props.saveEntry}/>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }

  removeEntry () {
    this.props.removeEntry({_id:this.props.entry._id});
  }

  openEditDialog () {
    this.props.openEditDialog();
  }

  setProjects (self) {
    self.props.fetchProjects();
  }

  dispatchEvent (name) {
    if (document.createEvent){
      var evn = document.createEvent("HTMLEvents");
      evn.obj = {};
      evn.initEvent(name, true, false);
      document.dispatchEvent(evn)
    }
  }

  addListener (name, listener) {
    if (document.addEventListener){
      document.addEventListener(name, listener, false);
    }
  }


  componentDidMount () {

  }

}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

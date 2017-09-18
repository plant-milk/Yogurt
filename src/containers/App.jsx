import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import * as Actions from '../actions';
import Modal from 'react-modal';
import Project from '../components/Project/Project';
import Docs from '../components/Docs/Docs';
import Editor from '../components/Editor/Editor';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      mode: 'project'
    }
  }

  componentWillReceiveProps(props) {
    if (props.mode) {
      this.setState({
        mode: props.mode
      })
    }
  }

  componentDidMount() {

  }

  render() {
    const props = this.props;
    const mode = this.state;

    return (
      <div>
        {mode === 'project' && <Project {...props}/>}
        {mode === 'docs' && <Docs {...props}/>}
        {mode === 'editor' && <Editor {...props}/>}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

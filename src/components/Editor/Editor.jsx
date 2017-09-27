import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import Preview from '../Preview/Preview';
import Textarea from 'react-textarea-autosize';

import './Editor.scss';

const getTitle = require('get-title-markdown');

export default class Editor extends React.Component {

  constructor() {
    super();
    this.state = {
      entry:null
    };
  }

  componentWillMount() {
    this.setState({entry:this.props.entry})
  }

  componentWillReceiveProps(props) {
    this.setState({
        entry:props.entry
    });
  }

  handleChange(event) {
    const markdown = event.target.value;
    const title = getTitle(markdown);
    const entry = Object.assign({},this.state.entry,{markdown,title});
    this.setState({
        entry:entry
    });
  }

  saveEntry() {
    this.props.updateEntry(this.state.entry);
    this.props.changeMode('docs')
  }

  render() {
    const entry = this.state.entry;

    return(
      <div>
        <div className="ygtPreviewEditButton">
          <button className="button is-small is-white" href="#" onClick={(e) => {e.preventDefault(); this.props.changeMode('docs')}}><i className="fa fa-angle-left"></i> BACK</button>
          <button className="button is-small" href="#" onClick={this.saveEntry.bind(this)}><i className="fa fa-floppy-o"></i> SAVE</button>
        </div>
        <div className="ygtMarkdown">
          <Textarea className="input is-textarea" placeholder="# Section title" defaultValue={entry.markdown} onChange={this.handleChange.bind(this)}>
          </Textarea>
        </div>
      </div>
    );
  }
}

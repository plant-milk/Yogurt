import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import Preview from '../Preview/Preview';
import './Editor.scss';

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
    const entry = Object.assign({},this.state.entry,{markdown:event.target.value});
    this.setState({
        entry:entry
    });
  }

  render() {
    const entry = this.state.entry;

    return(
      <div>
        <header className="header is-small">
          <div className="logo is-small">Yogurt</div>
          <div className="menu">
            <a className="button is-small" href="#">SAVE</a>
            <a className="button is-small is-white" href="#">BACK</a>
          </div>
        </header>

          <main className="main">
            <div className="preview">
              <div className="section">
                <div className="inner">
                    <Preview entry={entry} />
                </div>
              </div>
            </div>

            <div className="markdown">
              <textarea className="input is-textarea" defaultValue={entry.markdown} onChange={this.handleChange.bind(this)}></textarea>
            </div>
          </main>
      </div>
    );
  }
}

import React from 'react';
import { SmartBlock, GlobalStyle, Image, Extensions } from 'smartblock';

Extensions.push(new Image({}));

const getTitle = require('get-title-markdown');

export default class Editor extends React.Component {

  constructor() {
    super();
    this.state = {
      entry: null
    };
  }

  componentWillMount() {
    this.setState({ entry: this.props.entry });
  }

  componentWillReceiveProps(props) {
    this.setState({
      entry: props.entry
    });
  }

  handleChange(markdown) {
    const title = getTitle(markdown);
    const entry = Object.assign({}, this.state.entry, { markdown, title });
    this.setState({
      entry
    });
  }

  updateFileName(event) {
    const fileName = event.target.value;
    const entry = Object.assign({}, this.state.entry, { fileName });
    this.setState({
      entry
    });
  }

  saveEntry() {
    this.props.updateEntry(this.state.entry);
    this.props.changeMode('docs');
  }

  render() {
    const entry = this.state.entry;

    return (
      <section className="section ygtEntrySection">
        <div className="inner ygtEditArea pulldown">
          <div className="ygtFileName">
            <input placeholder="ファイル名" className="input" onChange={this.updateFileName.bind(this)} defaultValue={entry.fileName} />
          </div>
          <div className="ygtMarkdown">
            {/* <Textarea autoFocus className="input is-textarea" placeholder="# Section title" defaultValue={entry.markdown} onChange={this.handleChange.bind(this)}>
            </Textarea> */}
            <GlobalStyle />
            <SmartBlock
              extensions={Extensions}
              markdown={entry.markdown}
              onChange={({ markdown }) => {
                this.handleChange(markdown);
              }}
            />
          </div>
          <div className="ygtPreviewEditButton">
            <button className="button is-small is-white" href="#" onClick={(e) => { e.preventDefault(); this.props.changeMode('docs'); }}><i className="fa fa-arrow-left" /> Back</button>
            <button className="button is-small" href="#" onClick={this.saveEntry.bind(this)}><i className="fa fa-floppy-o" /> Save</button>
          </div>
        </div>
      </section>
    );
  }
}

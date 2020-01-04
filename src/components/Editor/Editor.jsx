import React from 'react';
import DatePicker from 'react-datepicker';
import { SmartBlock, GlobalStyle, Image, Extensions } from 'smartblock';
import packager from '../Docs/packager';

Extensions.push(new Image({}));


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
    const entry = Object.assign({}, this.state.entry, { markdown });
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

  updateDate(date) {
    const entry = Object.assign({}, this.state.entry, { date });
    this.setState({
      entry
    });
  }

  write() {
    const { category, project } = this.props;
    const { entry } = this.state;
    const { remote } = window.require('electron');
    const electronFs = remote.require('fs');
    const html = packager(entry, category);
    const { directory } = project;
    if (entry.fileName) {
      electronFs.writeFileSync(`${directory}/${entry.fileName}`, html, 'utf8');
    }
  }

  removeFile(entry) {
    const { project } = this.props;
    const { remote } = window.require('electron');
    const electronFs = remote.require('fs');
    const { directory } = project;
    if (!entry.fileName) {
      return;
    }
    electronFs.unlinkSync(`${directory}/${entry.fileName}`);
  }

  saveEntry() {
    this.props.changeMode('docs');
    if (this.props.project && this.props.project.directory) {
      this.removeFile(this.props.entry); // 以前の記事を削除
      this.write();
    }
    this.props.updateEntry(this.state.entry);
  }

  titleChange(title) {
    const entry = Object.assign({}, this.state.entry, { title });
    this.setState({
      entry
    });
  }

  render() {
    const entry = this.state.entry;

    return (
      <section className="section ygtEntrySection">
        <div className="inner ygtEditArea pulldown">
          <div className="ygtFileName">
            <DatePicker
              className="input margin-right-mini"
              selected={entry.date instanceof Date ?
              entry.date : typeof entry.date === 'string' ?
              new Date(entry.date) : new Date()}
              onChange={this.updateDate.bind(this)}
              dateFormat="yyyy-MM-dd"
            />
            <input placeholder="ファイル名" className="input" onChange={this.updateFileName.bind(this)} defaultValue={entry.fileName} />
          </div>
          <div className="ygtMarkdown">
            {/* <Textarea autoFocus className="input is-textarea" placeholder="# Section title" defaultValue={entry.markdown} onChange={this.handleChange.bind(this)}>
            </Textarea> */}
            <GlobalStyle />
            <SmartBlock
              showTitle
              titleText={entry.title}
              extensions={Extensions}
              markdown={entry.markdown}
              onChange={({ markdown }) => {
                this.handleChange(markdown.replace(/<br>/g, '<br/>'));
              }}
              onTitleChange={(title) => {
                this.titleChange(title);
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

import React, { Component, PropTypes } from 'react';
import Markdown from 'react-remarkable';
import moment from 'moment';
import hljs from 'highlight.js';
import './default.css';
import './tomorrow.css';

const option = {
  html: true,        // Enable HTML tags in source
  xhtmlOut: false,        // Use '/' to close single tags (<br />)
  breaks: false,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-',  // CSS language prefix for fenced blocks
  linkify: true,         // autoconvert URL-like texts to links
  linkTarget: '',           // set target to open link in

  // Enable some language-neutral replacements + quotes beautification
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if input not changed
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }
};

export default class Preview extends React.Component {
  render() {
    const { entry } = this.props;
    return (
      <div className="ygtPreviewWrap">
        <div className="ygtDateWrapper">
          <span className="ygtDate">{moment(entry.date).format('YYYY-MM-DD')}</span>
          <span className="ygtFilename">{entry.fileName}</span>
        </div>
        <h1 style={{ marginBottom: '20px' }}>{entry.title}</h1>
        {entry && entry.markdown ? <Markdown source={entry.markdown} options={option} /> : null}
      </div>
    );
  }
}

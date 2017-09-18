import React, { Component, PropTypes } from 'react';
import style from './Preview.scss';
import Markdown from 'react-remarkable';
import hljs from 'highlight.js';
import './default.css';
import './tomorrow.css';

const option = {
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      true,         // autoconvert URL-like texts to links
  linkTarget:   '',           // set target to open link in

  // Enable some language-neutral replacements + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if input not changed
  highlight: function (str, lang) {
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
}

export default class Preview extends React.Component {
    render () {
        const entry = this.props.entry;
        return (
            <div className={style.previewWrap}>
                {entry && entry.markdown ? <Markdown source={entry.markdown} options={option}/> : null}
            </div>
        )
    }
}
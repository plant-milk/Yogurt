import React, { Component, PropTypes } from 'react';
<<<<<<< HEAD
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './Preview.scss';
=======
import style from './Preview.scss';
import Markdown from 'react-remarkable';
import hljs from 'highlight.js';
// import './default.css';
// import './tomorrow.css';

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
>>>>>>> origin/feature/new-ui

export default class Preview extends React.Component {
  render() {
    return(
      <div>
        <header className="header is-small is-sticky has-menu">
          <div>
            <div className="logo is-medium"><a href="./">UNY <small>Beta</small></a></div>
          </div>
          <form className="hide-on-small-screen hide-on-medium-screen" action="#" style="margin-right:auto;margin-left:2rem">
            <input className="input" type="text" placeholder="Search" />
          </form>
          <nav className="menu">
            <a href="index.html">Feature</a>
            <a href="docs.html" className="is-current">Document</a>
            <a href="#">Theme</a>
            <a href="#">GitHub</a>
            <a href="#" className="button is-small">Download</a>
          </nav>
          <button className="button is-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </header>


        <main className="main has-sidebar">

          <div className="sidebar is-sticky">
            <div className="sidebar-inner">
              <div className="type-h3">Guide</div>
              <div className="tree">
                <ul>
                  <li><a href="#">Introduction</a></li>
                  <li><a href="#">Download</a></li>
                  <li><a href="#">Usgae</a></li>
                  <li className="is-parent is-current"><a href="#">Components</a>
                    <ul>
                      <li><a href="#">Header</a></li>
                      <li><a href="#">Footer</a></li>
                      <li><a href="#">Layout</a></li>
                      <li><a href="#">Menu</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Download</a></li>
                  <li><a href="#">Usgae</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="content">
            <section className="section">
              <div className="inner is-small">
                // Content
                <h2>Page title</h2>
                <h3>Sub title</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quod?</p>
              </div>
            </section>
          </div>

        </main>


        <footer className="footer">
          <div>
            <div className="logo is-medium">UNY <small>beta</small></div>
            <p>A modern CSS framework. <br />UNY is provided with <a href="#">MIT license.</a> Made by @kokushin &hearts; OSS</p>
            <small className="copyright">&copy; 2017 UNY</small>
          </div>
          <div>
            <p><a href="#">Pagetop</a></p>
          </div>
        </footer>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react';
// import DatePicker from 'react-datepicker';
// import TagsInput from 'react-tagsinput'
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './Docs.scss';

export default class Docs extends React.Component {
  render() {
    return(
      <div>
        <header className="header is-small is-sticky has-menu">
          <div>
            <div className="logo is-medium"><a href="./">UNY <small>Beta</small></a></div>
          </div>
          <form className="hide-on-small-screen hide-on-medium-screen" action="#" style={{marginRight:'auto',marginLeft:'2rem'}}>
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
                {/*Content*/}
                <h2>Page title</h2>
                <h3>Sub title</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quod?</p>
              </div>
            </section>
          </div>

        </main>
      </div>
    );
  }
}

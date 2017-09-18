import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './Project.scss';
import Preview from '../Preview/Preview';

export default class Project extends React.Component {
  render() {
    return(
      <div>
        <header className="header is-small">
          <div className="logo is-small">Yogurt</div>
          <div className="menu">
            <a className="button is-small" href="#">NEW PROJECT</a>
          </div>
        </header>

        <main className="main">
          <div className="content">
            <div className="section">
              <div className="grid is-col-medium-3">

                <div>
                  <div className="card">
                    <a href="./ygt_preview.html">
                      <h2>Project1</h2>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, molestiae?</p>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

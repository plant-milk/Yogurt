import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './Project.scss';
import Preview from '../Preview/Preview';

export default class Project extends React.Component {

  constructor() {
    super();
  }

  openProject(item) {
    this.props.setProject(item.id);
    this.props.changeMode('docs');
  }

  render() {
    return(
      <div>
        <header className="header is-small is-black">
          <div className="logo is-small is-center">Projects</div>
        </header>

        <main className="main">
          <div className="content">
            <div className="section">
              {this.props && this.props.projects &&
                <div className="grid is-col-medium-3">
                {this.props.projects.map(item => (
                  <div>
                    <div className="card is-clickable is-fit">
                      <a href="#" onClick={(e) => {e.preventDefault();this.openProject(item)}}>
                        <h2>{item.title}</h2>
                        <p><i className="fa fa-clock-o"></i> 2017/09/22</p>
                      </a>
                    </div>
                  </div>
                ))}
                  <div>
                    <div className="card is-clickable is-fit is-skeleton is-center">
                      <a href="#">
                        <h3>+ ADD NEW PROJECT</h3>
                      </a>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

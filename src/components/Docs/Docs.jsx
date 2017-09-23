import React, { Component, PropTypes } from 'react';
import Preview from '../Preview/Preview';
import classNames from 'classnames';

import './Docs.scss';

export default class Docs extends React.Component {

  constructor() {
    super();
    this.state = {
      categoryName: '',
      entry: null
    }
  }

  componentDidReceiveProps() {
    if (this.props.entries) {
      this.props.entries.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        }
        return -1;
      });
    }

    if (this.props.categories) {
      this.props.categories.sort((a, b) => {
        if (a.order > b.order) {
          return 1;
        }
        return -1;
      })

      this.setState({
        category: categories[0],
        entry: null
      })
    }

  }

  getCategoryList() {
    if(!this.props.entries || !this.props.categories) {
      return [];
    }
    const entryList = [...this.props.entries];
    const categories = [...this.props.categories];
    const list = [];
    categories.forEach((category) => {
      const entries = [];
      const id = category.id;
      entryList.forEach((entry) => {
        if(entry.categoryId === id) {
          entries.push(entry);
        }
      });
      list.push(Object.assign({}, category, {entries}))
    });
    return list;
  }

  editEntry(entry) {
    this.props.setEntry(entry);
    this.props.changeMode('editor');
  }

  setEntry(entry) {
    this.setState({entry});
  }

  removeEntry(entry) {
    this.props.removeEntry(entry);
  }

  addNewEntry(projectId, categoryId) {
    const id = this._getUniqId();
    this.props.setEntry({projectId, categoryId, title:'', id, markdown: ''});
    this.props.changeMode('editor');
  }

  _getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }

  inputCategoryName(categoryName) {
    this.setState({categoryName});
  }

  addCategory() {
    const name = this.state.categoryName;
    const projectId = this.props.project.id;
    const order = 2;
    const id = this._getUniqId();
    this.props.addCategory({
      name,
      projectId,
      order,
      id
    });
  }

  removeCategory(category) {
    this.props.removeCategory(category);
  }

  render() {
    const list = this.getCategoryList();
    const category = this.state.category;
    const entry = this.state.entry;
    const categories = this.props.categories;
    const project = this.props.project;
    const projectId = project.id;
    const projectTitle = project.title;
    let categoryId = null;
    if (category && category.id) {
      categoryId = category.id;
    } else if (categories && categories[0] && categories[0].id) {
      categoryId = categories[0].id;
    }
    return(
      <div>
        <header className="header is-small is-black">
          <div className="menu">
            <a className="button is-small is-white" href="#" onClick={(e) => {e.preventDefault(); this.props.changeMode('project')}}><i className="fa fa-angle-left"></i> PROJECTS</a>
          </div>
          <div className="logo is-small">Preview</div>
          <div className="menu">
            <a className="button is-small" href="#"><i className="fa fa-download"></i> DOWNLOAD</a>
          </div>
        </header>

        <header className="header is-small">
          <div className="logo is-small"><a href="./">{projectTitle}</a></div>
        </header>

        <main className="main has-sidebar">

          <div className="sidebar">
            <div className="sidebar-inner">
              {list.map(category =>
                <div style={{marginBottom:'2rem'}}>
                  <div className="type-h3">{category.name}
                    <button className="button is-small is-tag is-white" style={{marginLeft:'.5rem'}} onClick={this.removeCategory.bind(this,category)}><i className="fa fa-times"></i> Remove</button>
                  </div>
                  <div className="tree">
                    <ul>
                      {category.entries.map(item =>
                      <li className={classNames({'is-current':entry && entry.id === item.id})}><a href="#" onClick={(e) => {e.preventDefault();this.setEntry(item)}}>{item.title}</a></li>
                      )}
                      <li>
                        <div className="card is-clickable is-skeleton is-center is-full" style={{maxWidth: '100%'}}>
                          <a href="#" onClick={(e) => {e.preventDefault();this.addNewEntry(projectId, category.id)}} style={{padding: '0'}}>
                            <h3>+ ADD Entry</h3>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <div className="card is-skeleton is-center is-full" style={{maxWidth: '100%'}}>
                <div className="field">
                  <input className="input" type="text" placeholder="Category name" onInput={(e) => {this.inputCategoryName(e.target.value)}}/>
                  <a className="button is-small" onClick={this.addCategory.bind(this)}>ADD</a>
                </div>
              </div>

            </div>
          </div>

          <div className="content">
            {list.map(category => (
              <div>
                {category.entries.map(item => 
                  entry && entry.id === item.id ?
                    <section className="section">
                      <div className="inner is-small">
                        <p>category: {category.name}</p>
                        <div className="ygtPreviewEditButton">
                          <button className="button is-small is-white" onClick={() => {this.removeEntry(item)}}><i className="fa fa-times"></i> REMOVE</button>
                          <button className="button is-small" onClick={() => {this.editEntry(item)}}><i className="fa fa-pencil"></i> EDIT</button>
                        </div>
                        <Preview entry={item} />
                      </div>
                    </section>
                    : null
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
}

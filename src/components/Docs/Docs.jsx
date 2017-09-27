import React, { Component, PropTypes } from 'react';
import Preview from '../Preview/Preview';
import packager from './packager';
import './Docs.scss';

import classNames from 'classnames';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default class Docs extends React.Component {

  constructor() {
    super();
    this.state = {
      categoryName: '',
      categoryEditingId: '',
      entryName: '',
      entry: null,
      mode: 'edit'
    }
  }

  componentDidMount () {
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
    }

    const list = this.getCategoryList();
    if (list && list[0] && list[0].entries && list[0].entries[0] && !this.state.entry) {
      this.setState({
        entry: list[0].entries[0]
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

  inputEntryName(entryName) {
    this.setState({entryName});
  }

  addNewEntry(projectId, categoryId) {
    const id = this._getUniqId();
    const title = this.state.entryName;
    const markdown = `# ${title}`;
    this.props.updateEntry({projectId, categoryId, title, id, markdown});
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

  editCategory(category) {
    this.setState({
      categoryEditingId: category.id,
      categoryName: category.name
    })
  }

  updateCategory(category) {
    this.props.updateCategory(Object.assign({}, category,{
      name: this.state.categoryName
    }));
    this.setState({
      categoryEditingId: ''
    });
  }

  changeMode(mode) {
    this.setState({mode});
  }

  downloadDocsAsZip() {
    const list = this.getCategoryList();
    const project = this.props.project;
    const zip = new JSZip();
    list.forEach((item) => {
      item.entries.forEach((entry) => {
        const html = packager(list, project, entry);
        zip.file(`${entry.title}.html`, html);
      });
    });
    zip.generateAsync({
      type: "blob"
    }).then((content) => {
      FileSaver.saveAs(content, `${project.title}.zip`);
    });
  }

  render() {
    const list = this.getCategoryList();
    const category = this.state.category;
    const entry = this.state.entry;
    const categories = this.props.categories;
    const project = this.props.project;
    const projectId = project ? project.id : '';
    const projectTitle = project ? project.title : '';
    const categoryEditingId = this.state.categoryEditingId;
    const mode = this.state.mode;

    return(
      <div>
        <header className="header is-small is-black">
          <div className="menu">
            <a className="button is-small is-white" href="#" onClick={(e) => {e.preventDefault(); this.props.changeMode('project')}}><i className="fa fa-angle-left"></i> PROJECTS</a>
          </div>
          <div className="logo is-small">Preview</div>
          <div className="menu">
            <button className="button is-small" onClick={this.downloadDocsAsZip.bind(this)}><i className="fa fa-download"></i> DOWNLOAD</button>
          </div>
        </header>

        <header className="header is-small">
          <div className="logo is-small"><a href="./">{projectTitle}</a></div>
          {mode === 'edit' &&
            <div class="menu">
              <a className="button is-small" href="#" onClick={this.changeMode.bind(this,'preview')}>Preview</a>
            </div>
          }
          {mode === 'preview' &&
            <div class="menu">
              <a className="button is-small" href="#" onClick={this.changeMode.bind(this,'edit')}>Edit</a>
            </div>
          }
        </header>

        <main className="main has-sidebar">

          <div className="sidebar">
            <div className="sidebar-inner">
              {list.map(category =>
                <div style={{marginBottom:'2rem'}}>
                  <div className="type-h3">
                    {categoryEditingId === category.id ?
                    <div className="field">
                      <input className="input" type="text" placeholder="Category name" defaultValue={this.state.categoryName} onInput={(e) => {this.inputCategoryName(e.target.value)}}/>
                      <a className="button is-small" onClick={this.updateCategory.bind(this,category)}>Rename</a>
                    </div>
                    :
                    <div>
                      {mode === 'edit' ?
                        <span onClick={this.editCategory.bind(this,category)}>{category.name}
                          <button className="button is-small is-tag is-white" style={{marginLeft:'.5rem'}} onClick={this.removeCategory.bind(this,category)}><i className="fa fa-times"></i> Remove</button>
                        </span>
                      : <span>{category.name}</span>}
                    </div>
                    }
                  </div>
                  <div className="tree">
                    <ul>
                      {category.entries.map(item =>
                      <li className={classNames({'is-current':entry && entry.id === item.id})}><a href="#" onClick={(e) => {e.preventDefault();this.setEntry(item)}}>{item.title}</a></li>
                      )}
                      {mode === 'edit' &&
                      <li>
                        <div className="card is-clickable is-skeleton is-center is-full" style={{maxWidth: '100%'}}>
                          <div className="field" style={{padding: '0'}}>
                            <input className="input" type="text" placeholder="entry name" onInput={(e) => {this.inputEntryName(e.target.value)}}/>
                            <a className="button is-small" onClick={(e) => {e.preventDefault();this.addNewEntry(projectId, category.id)}}>ADD</a>
                          </div>
                        </div>
                      </li>
                      }
                    </ul>
                  </div>
                </div>
              )}
              {mode === 'edit' &&
              <div className="card is-skeleton is-center is-full" style={{maxWidth: '100%'}}>
                <div className="field">
                  <input className="input" type="text" placeholder="Category name" onInput={(e) => {this.inputCategoryName(e.target.value)}}/>
                  <a className="button is-small" onClick={this.addCategory.bind(this)}>ADD</a>
                </div>
              </div>
              }
            </div>
          </div>

          <div className="content">
            {list.map(category => (
              <div>
                {category.entries.map(item => 
                  entry && entry.id === item.id ?
                    <section className="section">
                      <div className="inner is-small">
                        {this.props.editor ?
                        <div>
                          {this.props.editor}
                        </div>
                        :
                        <div>
                          {mode === 'edit' && 
                          <div className="ygtPreviewEditButton">
                            <button className="button is-small is-white" onClick={() => {this.removeEntry(item)}}><i className="fa fa-times"></i> REMOVE</button>
                            <button className="button is-small" onClick={() => {this.editEntry(item)}}><i className="fa fa-pencil"></i> EDIT</button>
                          </div>
                          }
                          <Preview entry={item} />
                        </div>
                        }
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

import React, { Component, PropTypes } from 'react';
import Preview from '../Preview/Preview';
import packager from './packager';

import classNames from 'classnames';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default class Docs extends React.Component {

  constructor() {
    super();
    this.state = {
      categoryName: '',
      categoryEditingId: '',
      categoryAddEntryId: '',
      showCategoryField: false,
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
    this.props.changeMode('docs');
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
    this.setState({
      categoryAddEntryId: ''
    })
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
    this.setState({
      showCategoryField: false
    })
  }

  showCategoryField() {
    this.setState({
      showCategoryField: true
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

  showEntryField(category) {
    this.setState({
      categoryAddEntryId: category.id
    });
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
    const categoryAddEntryId = this.state.categoryAddEntryId;
    const showCategoryField = this.state.showCategoryField;
    const mode = this.state.mode;

    return(
      <div>
        <div className="header">
          <button className="button is-small is-white" onClick={(e) => {e.preventDefault(); this.props.changeMode('project')}}><i className="fa fa-arrow-left"></i> Projects</button>
          <div>
            {mode === 'edit' &&
              <button className="button is-small is-white" onClick={this.changeMode.bind(this,'preview')}><i className="fa fa-eye"></i> Preview</button>
            }
            {mode === 'preview' &&
              <button className="button is-small is-white" onClick={this.changeMode.bind(this,'edit')}><i className="fa fa-eye-slash"></i> Stop preview</button>
            }
            <button className="button is-small" onClick={this.downloadDocsAsZip.bind(this)}><i className="fa fa-download"></i> Download</button>
          </div>
        </div>

        {mode === 'edit' &&
        <header className="header is-small">
          <div className="logo is-small"><a href="./"><i className="fa fa-book"></i> {projectTitle}</a></div>
        </header>
        }
        {mode === 'preview' &&
        <header className="header is-small">
          <div className="logo is-small"><a href="./">{projectTitle}</a></div>
          <button className="button is-burger hide-on-medium hide-on-large offcanvas-open">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </header>
        }

        {mode === 'preview' &&
        <div className="offcanvas">
          <div className="offcanvas-overlay offcanvas-close"></div>
          <div className="offcanvas-content">
            <button className="button is-close offcanvas-close">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="inner">
              {list.map(category =>
                <div>
                  <div className="type-h3">{category.name}</div>
                  <div className="tree">
                    <ul>
                      {category.entries.map(item =>
                      <li className={classNames({'is-current':entry && entry.id === item.id})}>
                        <a href="#" onClick={(e) => {e.preventDefault();this.setEntry(item)}}>{item.title}</a>
                      </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        }

        <main className="main">

          <div className="sidebar hide-on-small">
            <div className="inner">
              {list.map(category =>
                <div style={{marginBottom:'3rem'}}>
                  <div className="type-h3">
                    {categoryEditingId === category.id ?
                    <div className="field">
                      <input autoFocus className="input" type="text" placeholder="Category name" defaultValue={this.state.categoryName} onInput={(e) => {this.inputCategoryName(e.target.value)}}/>
                      <a className="button is-small" onClick={this.updateCategory.bind(this,category)}>Rename</a>
                    </div>
                    :
                    <div>
                      {mode === 'edit' ?
                        <div className="ygtEditArea ygtEditArea--small pulldown"><i className="fa fa-folder-o"></i> {category.name}
                          <div className="ygtCategoryEditButton pulldown-content">
                            <button className="button is-list" onClick={this.showEntryField.bind(this,category)}><i className="fa fa-file-o"></i> New Entry</button>
                            <button className="button is-list" onClick={this.editCategory.bind(this,category)}><i className="fa fa-pencil"></i> Rename</button>
                            <button className="button is-list" onClick={this.removeCategory.bind(this,category)}><i className="fa fa-trash"></i> Remove</button>
                          </div>
                        </div>
                      : <div>{category.name}</div>}
                    </div>
                    }
                  </div>
                  <div className="tree">
                    <ul>
                      {category.entries.map(item =>
                      <li className={classNames({'is-current':entry && entry.id === item.id})}>
                        {mode === 'edit' ?
                          <a href="#" onClick={(e) => {e.preventDefault();this.setEntry(item)}}><i className="fa fa-file-o"></i> {item.title}</a>
                          :
                          <a href="#" onClick={(e) => {e.preventDefault();this.setEntry(item)}}>{item.title}</a>
                        }
                      </li>
                      )}
                      {mode === 'edit' && categoryAddEntryId === category.id &&
                      <li>
                        <div className="field" style={{marginTop: '1rem'}}>
                          <input autoFocus className="input" type="text" placeholder="Entry name" onInput={(e) => {this.inputEntryName(e.target.value)}}/>
                          <a className="button is-small" onClick={(e) => {e.preventDefault();this.addNewEntry(projectId, category.id)}}>Add</a>
                        </div>
                      </li>
                      }
                    </ul>
                  </div>
                </div>
              )}
              {mode === 'edit' &&
              <div>
                {!showCategoryField &&
                <div className="card is-clickable is-skeleton is-center is-full">
                  <div onClick={this.showCategoryField.bind(this)}>
                    <div>
                      <p><strong><i className="fa fa-folder-o"></i> NEW CATEGORY</strong></p>
                      <p className="type-small">Click this card to add a new category.</p>
                    </div>
                  </div>
                </div>
                }
                {showCategoryField &&
                  <div className="field">
                    <input autoFocus className="input" type="text" placeholder="Category name" onInput={(e) => {this.inputCategoryName(e.target.value)}}/>
                    <a className="button is-small" onClick={this.addCategory.bind(this)}>Add</a>
                  </div>
                }
              </div>
              }
            </div>
          </div>

          <div className="content">
            {list.map(category => (
              <div>
                {category.entries.map(item =>
                  entry && entry.id === item.id ?
                  <div>
                    {this.props.editor ?
                    <div>
                      {this.props.editor}
                    </div>
                    :
                    <div>
                      {mode === 'edit' &&
                      <section className="section ygtEntrySection">
                        <div className="inner ygtEditArea pulldown">
                          <div className="ygtEntryEditButton pulldown-content">
                            <button className="button is-list" onClick={() => {this.editEntry(item)}}><i className="fa fa-pencil"></i> Edit</button>
                            <button className="button is-list" onClick={() => {this.removeEntry(item)}}><i className="fa fa-trash"></i> Remove</button>
                          </div>
                          <Preview entry={item} />
                        </div>
                      </section>
                      }
                      {mode === 'preview' &&
                        <section className="section">
                          <div className="inner">
                            <Preview entry={item} />
                          </div>
                        </section>
                      }
                    </div>
                    }
                  </div>
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

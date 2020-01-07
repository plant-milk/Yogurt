import React from 'react';
import Switch from 'react-switch';
import moment from 'moment';
import Filetree from './filetree';
import Preview from '../Preview/Preview';
import packager from '../../utils/packager';

import classNames from 'classnames';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import makeFileName from './makeFileName';
import * as YamlFront from 'yaml-front-matter';

export default class Docs extends React.Component {

  constructor(props) {
    super();
    this.state = {
      categoryName: '',
      categoryEditingId: '',
      categoryAddEntryId: '',
      showCategoryField: false,
      entryName: '',
      entry: null,
      mode: 'edit',
      project: props.project
    };
  }

  componentDidMount() {
    if (this.state.project && this.state.project.directory) {
      this.openDirectory();
    }

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
      });
    }

    const list = this.getCategoryList();
    if (list && list[0] && list[0].entries && list[0].entries[0] && !this.state.entry) {
      this.setState({
        entry: list[0].entries[0]
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props.project) {
      this.setState({
        project: props.project
      });
    }
  }

  changePeriodical(checked) {
    const project = this.state.project;
    const id = project ? project.id : '';

    this.props.updateProject({
      id,
      periodicallyUpdate: checked
    });
    this.setState({
      project: Object.assign({}, this.props.project, {
        id, periodicallyUpdate: checked
      })
    });
  }

  updateDirectory(id, directory) {
    this.props.updateProject({
      id,
      directory
    });
    this.setState({
      project: Object.assign({}, this.props.project, {
        id, directory
      })
    }, () => {
      this.openDirectory();
    });
  }

  openDirectory() {
    const projectId = this.state.project.id;
    const filetree = new Filetree(this.state.project.directory);
    filetree.build();

    if (!filetree.items.length) {
      return;
    }

    this.props.removeEntriesByProjectId(projectId);
    this.props.removeCategoriesByProjectId(projectId);

    const categoryMap = new Map();
    const entries = [];

    filetree.items.forEach((item) => {
      if (item.items && item.items.length) {
        return;
      }
      const id = this._getUniqId();
      let categoryId = this._getUniqId();
      const { remote } = window.require('electron');
      const electronFs = remote.require('fs');
      const content = electronFs.readFileSync(item.path, 'utf8');
      const attrs = YamlFront.loadFront(content);

      if (!categoryMap.has(attrs.category)) {
        categoryMap.set(attrs.category, categoryId);
      } else {
        categoryId = categoryMap.get(attrs.category);
      }

      entries.push({
        projectId,
        categoryId,
        title: attrs.title,
        id,
        markdown: attrs.__content,
        date: attrs.date,
        fileName: item.name
      });
    });

    const categories = [];
    categoryMap.forEach((id, name) => {
      categories.push({
        id,
        name,
        projectId
      });
    });
    this.props.addEntries(entries);
    this.props.addCategories(categories);
  }

  getCategoryList() {
    if (!this.props.entries || !this.props.categories) {
      return [];
    }
    const entryList = [...this.props.entries];
    const categories = [...this.props.categories];
    const list = [];
    categories.forEach((category) => {
      const entries = [];
      const id = category.id;
      entryList.forEach((entry) => {
        if (entry.categoryId === id) {
          entries.push(entry);
        }
      });
      list.push(Object.assign({}, category, { entries }));
    });
    return list;
  }

  editEntry(entry) {
    this.props.setEntry(entry);
    this.props.changeMode('editor');
  }

  setEntry(entry) {
    this.setState({ entry });
    this.props.changeMode('docs');
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

  removeEntry(entry) {
    if (!confirm('記事を本当に削除しますか？')) {
      return;
    }
    this.props.removeEntry(entry);
    if (this.state.project && this.state.project.directory) {
      this.removeFile(entry);
    }
  }

  inputEntryName(entryName) {
    this.setState({ entryName });
  }

  addNewEntry(projectId, categoryId) {
    const id = this._getUniqId();
    const title = this.state.entryName;
    const markdown = `# ${title}`;
    const date = new Date();
    this.props.updateEntry({ projectId, categoryId, title, id, markdown, date, fileName: `${moment().format('YYYY-MM-DD-HH-ii-ss')}.mdx` });
    this.setState({
      categoryAddEntryId: ''
    });
  }

  _getUniqId() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  }

  inputCategoryName(categoryName) {
    this.setState({ categoryName });
  }

  addCategory() {
    const name = this.state.categoryName;
    const projectId = this.state.project.id;
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
    });
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
    });
  }

  showEntryField(category) {
    this.setState({
      categoryAddEntryId: category.id
    });
  }

  updateCategory(category) {
    this.props.updateCategory(Object.assign({}, category, {
      name: this.state.categoryName
    }));
    this.setState({
      categoryEditingId: ''
    });
  }

  changeMode(mode) {
    this.setState({ mode });
  }

  downloadDocsAsZip() {
    const list = this.getCategoryList();
    const project = this.state.project;
    const categories = this.props.categories;
    const entries = this.props.entries;
    const zip = new JSZip();
    list.forEach((item) => {
      item.entries.forEach((entry) => {
        const category = categories.find((category) => {
          if (entry.categoryId === category.id) {
            return true;
          }
          return false;
        });
        const html = packager(entry, category);
        const fileName = entry.fileName ? entry.fileName : `${makeFileName(entry.title)}.html`;
        zip.file(fileName, html);
      });
    });
    zip.file('setting.json', JSON.stringify({
      project,
      categories,
      entries
    }));
    zip.generateAsync({
      type: 'blob'
    }).then((content) => {
      FileSaver.saveAs(content, `${project.title}.zip`);
    });
  }

  importSetting(e) {
    const project = this.state.project;
    const id = project.id;
    const files = e.target.files;
    const fr = new FileReader();
    fr.onload = (e) => {
      const result = JSON.parse(e.target.result);
      this.props.removeEntriesByProjectId(id);
      this.props.removeCategoriesByProjectId(id);
      this.props.addEntries(result.entries);
      this.props.addCategories(result.categories);
      this.props.updateProject(result.project);
    };
    fr.readAsText(files.item(0));
  }

  render() {
    const list = this.getCategoryList();
    const category = this.state.category;
    const entry = this.state.entry;
    const categories = this.props.categories;
    const project = this.state.project;
    const projectId = project ? project.id : '';
    const projectTitle = project ? project.title : '';
    const projectDirectory = project ? project.directory : '';
    const categoryEditingId = this.state.categoryEditingId;
    const categoryAddEntryId = this.state.categoryAddEntryId;
    const showCategoryField = this.state.showCategoryField;
    const mode = this.state.mode;


    return (
      <div>
        <div className="header">
          <button className="button is-small is-white" onClick={(e) => { e.preventDefault(); this.props.changeMode('project'); }}><i className="fa fa-arrow-left" /> Projects</button>
          <div>
            {mode === 'edit' &&
              <button className="button is-small is-white" onClick={this.changeMode.bind(this, 'preview')}><i className="fa fa-eye" /> Preview</button>
            }
            {mode === 'preview' &&
              <button className="button is-small is-white" onClick={this.changeMode.bind(this, 'edit')}><i className="fa fa-eye-slash" /> Stop preview</button>
            }
            {/* <label htmlFor="import" className="button is-small is-white">
              Import
              <input type="file" onChange={(e) => { this.importSetting(e); }} style={{ display: 'none' }} />
            </label> */}
            <button
              className="button is-small is-white" onClick={() => {
                const { remote } = window.require('electron');
                const { dialog } = remote;
                dialog.showOpenDialog({ properties: ['openDirectory'] }).then((directory) => {
                  if (directory && directory.filePaths[0]) {
                    this.updateDirectory(projectId, directory.filePaths[0]);
                  }
                });
              }}
            >
              フォルダを開く
            </button>
            <button className="button is-small" onClick={this.downloadDocsAsZip.bind(this)}><i className="fa fa-download" /> Download</button>
          </div>
        </div>

        {mode === 'edit' &&
        <header className="header is-small">
          <div className="logo is-small"><a href="./"><i className="fa fa-book" /> {projectTitle}</a></div>
          <div>
            <Switch
              onChange={this.changePeriodical.bind(this)}
              checked={project.periodicallyUpdate}
            />
            <span style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: '5px' }}>自動保存する</span>
          </div>
          {projectDirectory}
        </header>
        }
        {mode === 'preview' &&
        <header className="header is-small">
          <div className="logo is-small"><a href="./">{projectTitle}</a></div>
          <button className="button is-burger hide-on-medium hide-on-large offcanvas-open">
            <span />
            <span />
            <span />
          </button>
        </header>
        }

        {mode === 'preview' &&
        <div className="offcanvas">
          <div className="offcanvas-overlay offcanvas-close" />
          <div className="offcanvas-content">
            <button className="button is-close offcanvas-close">
              <span />
              <span />
              <span />
            </button>
            <div className="inner">
              {list.map(category =>
                <div>
                  <div className="type-h3">{category.name}</div>
                  <div className="tree">
                    <ul>
                      {category.entries.map(item =>
                        <li className={classNames({ 'is-current': entry && entry.id === item.id })}>
                          <a href="#" onClick={(e) => { e.preventDefault(); this.setEntry(item); }}>{item.title}</a>
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
                <div style={{ marginBottom: '3rem' }}>
                  <div className="type-h3">
                    {categoryEditingId === category.id ?
                      <div className="field">
                        <input autoFocus className="input" type="text" placeholder="Category name" defaultValue={this.state.categoryName} onInput={(e) => { this.inputCategoryName(e.target.value); }} />
                        <a className="button is-small" onClick={this.updateCategory.bind(this, category)}>Rename</a>
                      </div>
                    :
                      <div>
                        {mode === 'edit' ?
                          <div className="ygtEditArea ygtEditArea--small pulldown"><i className="fa fa-folder-o" /> {category.name}
                            <div className="ygtCategoryEditButton pulldown-content">
                              <button className="button is-list" onClick={this.showEntryField.bind(this, category)}><i className="fa fa-file-o" /> New Entry</button>
                              <button className="button is-list" onClick={this.editCategory.bind(this, category)}><i className="fa fa-pencil" /> Rename</button>
                              <button className="button is-list" onClick={this.removeCategory.bind(this, category)}><i className="fa fa-trash" /> Remove</button>
                            </div>
                          </div>
                      : <div>{category.name}</div>}
                      </div>
                    }
                  </div>
                  <div className="tree">
                    <ul>
                      {category.entries.map(item =>
                        <li className={classNames({ 'is-current': entry && entry.id === item.id })}>
                          {mode === 'edit' ?
                            <a href="#" onClick={(e) => { e.preventDefault(); this.setEntry(item); }}><i className="fa fa-file-o" /> {item.title}</a>
                          :
                            <a href="#" onClick={(e) => { e.preventDefault(); this.setEntry(item); }}>{item.title}</a>
                        }
                        </li>
                      )}
                      {mode === 'edit' && categoryAddEntryId === category.id &&
                      <li>
                        <div className="field" style={{ marginTop: '1rem' }}>
                          <input autoFocus className="input" type="text" placeholder="Entry name" onInput={(e) => { this.inputEntryName(e.target.value); }} />
                          <a className="button is-small" onClick={(e) => { e.preventDefault(); this.addNewEntry(projectId, category.id); }}>Add</a>
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
                      <p><strong><i className="fa fa-folder-o" /> NEW CATEGORY</strong></p>
                      <p className="type-small">Click this card to add a new category.</p>
                    </div>
                  </div>
                </div>
                }
                {showCategoryField &&
                  <div className="field">
                    <input autoFocus className="input" type="text" placeholder="Category name" onInput={(e) => { this.inputCategoryName(e.target.value); }} />
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
                                <button className="button is-list" onClick={() => { this.editEntry(item); }}><i className="fa fa-pencil" /> Edit</button>
                                <button className="button is-list" onClick={() => { this.removeEntry(item); }}><i className="fa fa-trash" /> Remove</button>
                              </div>
                              <Preview entry={item} project={project} />
                            </div>
                          </section>
                      }
                          {mode === 'preview' &&
                          <section className="section">
                            <div className="inner">
                              <Preview entry={item} project={project} />
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

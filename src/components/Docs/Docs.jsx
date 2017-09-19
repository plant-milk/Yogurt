import React, { Component, PropTypes } from 'react';
import Preview from '../Preview/Preview';

import './Docs.scss';

export default class Docs extends React.Component {

  constructor() {
    super();
    this.state = {
      entry: null,
      category: null
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
      entryList.forEach((entry) => {
        if(entry.categoryId = category.id) {
          entries.push(entry);
        }
      });
      list.push(Object.assign({},category, {
        entries:entries
      }))
    });
    return list;
  }

  getEntryListByCategory(id) {
    return this.props.entries.filter(entry => entry.categoryId === id);
  }

  setEntry(entry) {
    this.setState({
      entry: entry,
      category: null
    })
  }

  editEntry(entry) {
    console.log(entry);
    this.props.setEntry(entry);
    this.props.changeMode('editor');
  }

  setCategory(category) {
    this.setState({
      category: category,
      entry: null
    })
  }

  render() {
    const list = this.getCategoryList();
    const entry = this.state.entry;
    const category = this.state.category;
    const categories = this.props.categories;
    let entryList = [];
    if (category && category.id) {
      entryList = this.getEntryListByCategory(category.id);
    } else if (categories && categories[0] && categories[0].id) {
      entryList = this.getEntryListByCategory(categories[0].id);
    }
    return(
      <div>
        <header className="header is-small is-black">
          <div className="logo is-small">Preview</div>
          <div className="menu">
            <a className="button is-small" href="#">Donwload ZIP</a>
          </div>
        </header>

        <header className="header is-small">
          <div className="logo is-small"><a href="./">Project Name</a></div>
        </header>

        <main className="main has-sidebar">

          <div className="sidebar is-sticky">
            <div className="sidebar-inner">
              {list.map(category =>
                <div>
                  <div className="type-h3" onClick={this.setCategory.bind(this,category)}>{category.name}</div>
                  <div className="tree">
                    <ul>
                      {category.entries.map(item =>
                      <li><a href="#" onClick={(e) => {e.preventDefault();this.setEntry(item)}}>{item.title}</a></li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              </div>
          </div>

          <div className="content">
            <section className="section">
              <div className="inner is-small">
                {entry ? 
                <div>
                  <div className="previewEditButton">
                    <button className="button is-small" onClick={() => {this.editEntry(entry)}}>EDIT</button>
                  </div>
                  <Preview entry={entry} /> 
                </div>
                : 
                entryList.map(item => 
                  <div> 
                    <div className="previewEditButton">
                      <button className="button is-small" onClick={() => {this.editEntry(item)}}>EDIT</button>
                    </div> 
                    <Preview entry={item} />
                  </div>)
                }
              </div>
            </section>
          </div>

        </main>
      </div>
    );
  }
}

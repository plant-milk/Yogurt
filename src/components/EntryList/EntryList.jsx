import React, { Component, PropTypes } from 'react';


export default class EntryList extends React.Component {

  fetchEntry(id){
    this.props.fetchEntry({_id:id});
  }

  render() {
    let id = "";
    if(this.props.entry){
      id = this.props.entry._id;
    }
    const entries = this.props.entries || [];
    return (
        <nav className="nav-group">
            <h5 className="nav-group-title">
                Entries
                {this.props.project ? 
                    <button className="btn btn-default" onClick={()=>{this.props.addNewEntry(this.props.project._id)}} style={{float:'right'}}>作成</button>
                    : null
                }
            </h5>
            <table className="table">
            <thead>
                <tr>
                    <th>date</th>
                    <th>title</th>
                </tr>
            </thead>
            <tbody>
                {entries.map(item => {
                    return id === item._id ?
                    <tr className="active">
                        <td>{item.date}</td>
                        <td>{item.title}</td>
                    </tr>
                    :
                    <tr onClick={()=>this.fetchEntry.call(this,item._id)}>
                        <td>{item.date}</td>
                        <td>{item.title}</td>
                    </tr>
                })}               
            </tbody>
            </table>
        </nav>
    );
  }
}

 

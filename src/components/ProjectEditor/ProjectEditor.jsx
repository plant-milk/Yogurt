import React, { Component, PropTypes } from 'react';

export default class Editor extends React.Component {

    constructor() {
        super();
        this.state = {
            entry: {

            }
        };
    }

    titleChanged () {

    }

    saveProject () {

    }

    closeDialog () {
        
    }
    
    render() {
        const entry = this.state.entry;
        return( 
            <div className="window">
                <div className="window-content">     
                    <div className="Cell -6of12">
                        <label>プロジェクト名</label>
                        <input className="form-control" type="text" defaultValue={entry.title} onChange={this.titleChanged.bind(this)}/>
                    </div>
                </div>
                <div className="toolbar toolbar-footer">
                    <div className="toolbar-actions">
                        {entry._id ? 
                            <button onClick={this.saveProject.bind(this)} className="btn btn-primary pull-right">Save</button>
                            :
                            <button onClick={this.saveProject.bind(this)} className="btn btn-primary pull-right">Add New</button>
                        }
                        <button onClick={this.closeDialog.bind(this)} className="btn btn-default pull-right">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}
import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './Editor.scss'; 
import Preview from '../Preview/Preview';

export default class Editor extends React.Component {

    constructor() {
        super();
        this.state = {
            entry:null
        };
    }

    componentWillMount() {
        this.setState({entry:this.props.entry})
    }

    componentWillReceiveProps(props) {
        this.setState({
            entry:props.entry
        });
    }

    handleChange(event) {
        const entry = Object.assign({},this.state.entry,{markdown:event.target.value});
        this.setState({
            entry:entry
        });
    }

    filenameChanged(event) {
        const entry = Object.assign({},this.state.entry,{filename:event.target.value});
        this.setState({
            entry:entry
        });      
    }

    titleChanged(event) {
        const entry = Object.assign({},this.state.entry,{title:event.target.value});
        this.setState({
            entry:entry
        })
    }

    dateChanged(date) {
        const entry = Object.assign({},this.state.entry,{date:date.format('YYYY-MM-DD')});
        this.setState({
            entry:entry
        });
    }

    tagChanged(tags) {
        const entry = Object.assign({},this.state.entry,{tags:tags});
        this.setState({
            entry:entry
        });
    }

    closeEditDialog() {
        this.props.closeEditDialog();
    }

    saveEntry() {
        this.props.saveEntry(this.state.entry);
    }
    
    render() {
        const entry = this.state.entry;
        return( 
            <div className="window">
                <div className="window-content">     
                    <div className="pane-group">
                        <div className="pane">
                            {entry ? <Preview entry={entry} /> : null}
                        </div>
                        <div className="pane">
                            <div className="pane-horizontal-group">
                                <div className="pane-horizontal pane-horizontal-meta">
                                    <div className="Grid">
                                        <div className="Cell -6of12">
                                            <label>タイトル</label>
                                            <input className="form-control" type="text" defaultValue={entry.title} onChange={this.titleChanged.bind(this)}/>
                                        </div>
                                        <div className="Cell -6of12">
                                            <label>ファイル名</label>
                                            <input className="form-control" type="text" defaultValue={entry.filename} onChange={this.filenameChanged.bind(this)}/>
                                        </div>
                                        <div className="Cell -6of12">
                                            <label>日付</label>
                                            <div>
                                                <DatePicker className="form-control" selected={moment(entry.date)} dateFormat="YYYY-MM-DD" onChange={this.dateChanged.bind(this)}/>
                                            </div>
                                        </div>
                                        <div className="Cell -6of12">
                                            <label>タグ</label>
                                            <TagsInput className="form-control" value={entry.tags} onChange={this.tagChanged.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="pane-horizontal pane-horizontal-markdown">
                                    <textarea className="form-control yogurt-markdown-textarea" defaultValue={entry.markdown} onChange={this.handleChange.bind(this)}></textarea>
                                </div> 
                            </div>                   
                        </div>
                    </div>
                </div>
                <div className="toolbar toolbar-footer">
                    <div className="toolbar-actions">
                        {entry._id ? 
                            <button onClick={this.saveEntry.bind(this)} className="btn btn-primary pull-right">Save</button>
                            :
                            <button onClick={this.saveEntry.bind(this)} className="btn btn-primary pull-right">Add New</button>
                        }
                        <button onClick={this.closeEditDialog.bind(this)} className="btn btn-default pull-right">Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}
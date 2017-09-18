import * as types from '../constants/ActionTypes';
import nedb from 'nedb';
import moment from 'moment';

const initialState = {
  dir:{},
  db:{},
  projects:[],
  entries:[],
  entry:null,
  project:null,
  isEditing:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SETDIR:
      return Object.assign({}, state, { dir: action.dir });
    case types.SETDB:
      const dir = state.dir;
      const db = {};
      let entries = new nedb({
        filename: `${dir.dbDir}/entries.db`
      });
      let settings = new nedb({
        filename: `${dir.dbDir}/settings.db`
      });
      let projects = new nedb({
        filename: `${dir.dbDir}/projects.db`
      });
      entries.loadDatabase();
      settings.loadDatabase();
      projects.loadDatabase();
      db.entries = entries;
      db.settings = settings;
      db.projects = projects;
      return Object.assign({}, state, { db: db });
    case types.SETPROJECTS:
      return Object.assign({}, state, { projects: action.docs })
    case types.SETENTRIES:
      return Object.assign({}, state, { entries: action.docs })
    case types.SETENTRY:
      return Object.assign({}, state, { entry: action.doc })
    case types.SETPROJECT:
      return Object.assign({}, state, { project: action.doc })
    case types.OPENEDITDIALOG:
      return Object.assign({}, state, {isEditing:true})
    case types.CLOSEEDITDIALOG:
      return Object.assign({}, state, {isEditing:false})
    case types.ADDNEWENTRY:
      return Object.assign({}, state, {
        isEditing:true,
        entry:{
          title:'Untitled',
          filename:'untitled.html',
          date:moment().format('YYYY-MM-DD'),
          tags:[],
          markdown:'',
          project:action.id
        }
      });
    default:
      return state;
  }
};


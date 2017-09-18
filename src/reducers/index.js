import * as types from '../constants/ActionTypes';
import moment from 'moment';

const initialState = {
  projects:[],
  entries:[],
  entry:null,
  project:null,
  isEditing:false
};

export default (state = initialState, action) => {
  switch (action.type) {
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
      return Object.assign({}, state, {});
    default:
      return state;
  }
};


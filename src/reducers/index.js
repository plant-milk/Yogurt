import * as types from '../constants/ActionTypes';
import moment from 'moment';

const initialState = {
  projects:[],
  entries:[],
  categories:[],
  mode:'project',
  entry:null,
  project:null,
  isEditing:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADDENTRY:
      return Object.assign({}, state, { entries: [...state.entries, action.entry] })
    case types.ADDPROJECT:
      return Object.assign({}, state, { projects: [...state.projects, action.project] })
    case types.ADDCATEGORY:
      return Object.assign({}, state, { categories: [...state.categories, action.category] })
    case types.CHANGEMODE:
      return Object.assign({}, state, { mode: action.mode} )
    default:
      return state;
  }
};


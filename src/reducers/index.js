import * as types from '../constants/ActionTypes';
import moment from 'moment';

const initialState = {
  projects:[],
  entries:[],
  categories:[],
  mode:'project',
  entry:null,
  projectId:null
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
      return Object.assign({}, state, { mode: action.mode })
    case types.SETPROJECT:
      return Object.assign({}, state, { projectId: action.id })
    case types.SETENTRY:
      return Object.assign({}, state, { entry: action.entry })
    case types.UPDATEENTRY:
      const index = state.entries.findIndex((entry) => entry.id === action.entry.id);
      return Object.assign({}, state, {
        entries: [...state.entries.slice(0, index), action.entry, ...state.entries.slice(index + 1)],
        entry: action.entry
      })
    default:
      return state;
  }
};


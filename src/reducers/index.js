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
      return Object.assign({}, state, { project: action.project })
    case types.SETENTRY:
      return Object.assign({}, state, { entry: action.entry })
    case types.UPDATEENTRY:
      const index = state.entries.findIndex((entry) => entry.id === action.entry.id);
      if (index >= 0) {
        return Object.assign({}, state, {
          entries: [...state.entries.slice(0, index), action.entry, ...state.entries.slice(index + 1)],
          entry: action.entry
        })
      } else {
        return Object.assign({}, state, { 
          entries: [...state.entries, action.entry],
          entry: action.entry
        });
      }
    case types.UPDATECATEGORY:
      const categoryIndex = state.categories.findIndex((category) => category.id === action.category.id);
      if (categoryIndex >= 0) {
        return Object.assign({}, state, {
          categories: [...state.categories.slice(0, categoryIndex), action.category, ...state.categories.slice(categoryIndex + 1)],
        }) 
      } else {
        return state;
      }
    case types.UPDATEPROJECT:
      const projectIndex = state.projects.findIndex((project) => project.id === action.project.id);
      if (projectIndex >= 0) {
        return Object.assign({}, state, {
          projects: [...state.projects.slice(0, projectIndex), action.project, ...state.projects.slice(projectIndex + 1)]
        })
      } else {
        return state;
      }
    case types.REMOVEPROJECT:
      const removeProjectIndex = state.projects.findIndex((project) => project.id === action.project.id);
      return Object.assign({}, state, {
        projects: [...state.projects.slice(0, removeProjectIndex), ...state.projects.slice(removeProjectIndex + 1)]
      });
    case types.REMOVECATEGORY:
      const removeCategoryIndex = state.categories.findIndex((category) => category.id === action.category.id);
      return Object.assign({}, state, {
        categories: [...state.categories.slice(0, removeCategoryIndex), ...state.categories.slice(removeCategoryIndex + 1)]
      });
    case types.REMOVEENTRY:
      const removeIndex = state.entries.findIndex((entry) => entry.id === action.entry.id);
      return Object.assign({}, state, {
        entries: [...state.entries.slice(0, removeIndex), ...state.entries.slice(removeIndex + 1)]
      }) 
    case types.REMOVEENTRIESBYPROJECTID:
      return Object.assign({}, state, {
        entries: state.entries.filter((item) => item.projectId !== action.id)
      });
    case types.REMOVECATEGORIESBYPROJECTID:
      return Object.assign({}, state, {
        categories: state.categories.filter((item) => item.projectId !== action.id)
      });
    case types.RESTORE:
      return Object.assign({}, state, action.data)
    default:
      return state;
  }
};


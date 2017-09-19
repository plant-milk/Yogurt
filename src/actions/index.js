import * as types from '../constants/ActionTypes';

export const addEntry = (entry) => ({ type: types.ADDENTRY, entry: entry });

export const addProject = (project) => ({ type: types.ADDPROJECT, project: project });

export const addCategory = (category) => ({ type: types.ADDCATEGORY, category: category });

export const changeMode = (mode) => ({type: types.CHANGEMODE, mode: mode});

export const setProject = (id) => ({type: types.SETPROJECT, id: id});

export const setEntry = (entry) => ({type: types.SETENTRY, entry: entry});
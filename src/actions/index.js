import * as types from '../constants/ActionTypes';

export const addEntry = (entry) => ({ type: types.ADDENTRY, entry: entry });

export const addProject = (project) => ({ type: types.ADDPROJECT, project: project });

export const addCategory = (category) => ({ type: types.ADDCATEGORY, category: category });

export const changeMode = (mode) => ({type: types.CHANGEMODE, mode: mode});

export const setProject = (id) => ({type: types.SETPROJECT, id: id});

export const setEntry = (entry) => ({type: types.SETENTRY, entry: entry});

export const removeEntry = (entry) => ({type: types.REMOVEENTRY, entry: entry});

export const updateEntry = (entry) => ({type: types.UPDATEENTRY, entry: entry});

export const resotore = (data) => ({type: types.RESTORE, data: data});

export const removeCategory = (category) => ({ type: types.REMOVECATEGORY, category: category });
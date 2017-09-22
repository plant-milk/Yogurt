import * as types from '../constants/ActionTypes';

export const addEntry = (entry) => ({ type: types.ADDENTRY, entry });

export const setEntry = (entry) => ({type: types.SETENTRY, entry});

export const removeEntry = (entry) => ({type: types.REMOVEENTRY, entry});

export const updateEntry = (entry) => ({type: types.UPDATEENTRY, entry});

export const addProject = (project) => ({ type: types.ADDPROJECT, project});

export const setProject = (project) => ({type: types.SETPROJECT, project});

export const addCategory = (category) => ({ type: types.ADDCATEGORY, category });

export const removeCategory = (category) => ({ type: types.REMOVECATEGORY, category: category });

export const changeMode = (mode) => ({type: types.CHANGEMODE, mode});

export const resotore = (data) => ({type: types.RESTORE, data});
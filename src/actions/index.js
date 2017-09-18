import * as types from '../constants/ActionTypes';

export const increment = () => ({ type: types.INCREMENT });

export const decrement = () => ({ type: types.DECREMENT });

export const rename = (name) => ({ type: types.RENAME, name: name });

export const setdb = () => ({ type: types.SETDB });

export const setdir = (dir) => ({ type: types.SETDIR, dir: dir });

export const fetchProjects = () => ({ type: types.FETCHPROJECTS });

export const fetchProject = (option) => ({type: types.FETCHPROJECT, option: option });

export const fetchEntries = (option) => ({ type: types.FETCHENTRIES, option: option });

export const setProjects = (docs) => ({ type: types.SETPROJECTS, docs: docs });

export const setEntries = (docs) => ({ type: types.SETENTRIES, docs: docs });

export const fetchEntry = (option) => ({ type: types.FETCHENTRY, option:option });

export const setEntry = (doc) => ({ type: types.SETENTRY, doc:doc });

export const setProject = (doc) => ({ type: types.SETPROJECT, doc:doc });

export const openEditDialog = () => ({type: types.OPENEDITDIALOG});

export const closeEditDialog = () => ({type: types.CLOSEEDITDIALOG});

export const saveEntry = (entry) => ({type: types.SAVEENTRY, entry: entry});

export const addNewEntry = (id) => ({type: types.ADDNEWENTRY, id: id});

export const removeEntry = (option) => ({type: types.REMOVEENTRY, option: option});
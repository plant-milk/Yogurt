import { call, put, takeEvery, select } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes';
import { setProjects, setEntries, setEntry, setProject } from "../actions";


const pullDocs = (db,option) => {
    return new Promise ((resolve,reject) => {
        db.find(option,(err,docs) =>{
            resolve(docs);
        })
    });
}

const pullDoc = (db,option) => {
  return new Promise ((resolve, reject) => {
    db.findOne(option,(err,doc) => {
      resolve(doc);
    });
  });
}

const removeDoc = (db,option) => {
  return new Promise ((resolve, reject) => {
    db.remove(option,(err,doc) => {
      resolve(doc);
    });
  });
}

const updateDocs = (db, item, option) => {
  return new Promise ((resolve, reject) => {
    db.update(option, item, {upsert:true},(err,docs) => {
      resolve(docs);
    })
  });
}

function* fetchProjects() {
  const state = yield select();
  const projects = state.db.projects;
  const docs = yield call (pullDocs,projects,{});
  yield put(setProjects(docs));
}

function* fetchEntries(action) {
  const state = yield select();
  const entries = state.db.entries;
  const docs = yield call (pullDocs,entries,action.option);
  yield put(setEntries(docs));   
}

function* fetchEntry(action) {
  const state = yield select();
  const entries = state.db.entries;
  const doc = yield call (pullDoc,entries,action.option);
  yield put(setEntry(doc));
}

function* fetchProject(action) {
  const state = yield select();
  const projects = state.db.projects;
  const doc = yield call (pullDoc,projects,action.option);
  yield put(setProject(doc));
}

function* saveEntry(action) {
  const state = yield select();
  const entries = state.db.entries;
  const entry = action.entry;
  const status = yield call (updateDocs,entries,entry,{_id:entry._id});
  if(status){
    const doc = yield call (pullDoc,entries,{_id:entry._id});
    const docs = yield call (pullDocs,entries,{project:state.project._id});
    yield put(setEntry(doc));
    yield put(setEntries(docs));
  }
}

function* removeEntry(action) {
  const state = yield select();
  const entries = state.db.entries;
  const status = yield call (removeDoc,entries,action.option);
  const docs = yield call (pullDocs,entries,{project:state.project._id});
  yield put(setEntries(docs));
}

export default function* rootSaga() {
  yield takeEvery(types.FETCHPROJECTS, fetchProjects);
  yield takeEvery(types.FETCHENTRIES, fetchEntries);
  yield takeEvery(types.FETCHENTRY, fetchEntry);
  yield takeEvery(types.SAVEENTRY, saveEntry);
  yield takeEvery(types.REMOVEENTRY, removeEntry);
  yield takeEvery(types.FETCHPROJECT, fetchProject);
}
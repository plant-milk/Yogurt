import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Editor from '../src/components/Editor/Editor';
import Docs from '../src/components/Docs/Docs';
import Project from '../src/components/Project/Project';
import Preview from '../src/components/Preview/Preview';
import {entries, projects, categories} from './variables';

const style = {
  width: '100vw',
  height: '100vh',
  border: '0px',
  margin: '0px',
  padding: '0px'
}

storiesOf('Page', module)
  .add('Editor', () => <Editor entry={entries[0]}/>)
  .add('Docs', () => <Docs entries={entries} categories={categories}/>)
  .add('Project', () => <Project projects={projects}/>);

storiesOf('Components', module)
  .add('Preview', () => <Preview entry={entries[0]}/>);

storiesOf('Site', module)
  .add('Site', () => <iframe src="http://localhost:8080/webpack-dev-server/" style={style} />)
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Editor from '../src/components/Editor/Editor';
import Docs from '../src/components/Docs/Docs';
import Project from '../src/components/Project/Project';
import Preview from '../src/components/Preview/Preview';
import {entries, projects, categories} from './variables';

storiesOf('Page', module)
  .add('Editor', () => <Editor entry={entries[0]}/>)
  .add('Docs', () => <Docs entries={entries} categories={categories}/>)
  .add('Project', () => <Project projects={projects}/>);

storiesOf('Components', module)
  .add('Preview', () => <Preview entry={entries[0]}/>);


import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Editor from '../src/components/Editor/Editor';
import Docs from '../src/components/Docs/Docs';
import Project from '../src/components/Project/Project';
import Preview from '../src/components/Preview/Preview';

const projects = [
  {title:'Hoge',desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum repudiandae porro illum, praesentium est officia ad. Minima natus optio sit vitae, velit id fugit quis suscipit nulla quam quos, esse?', id:1},
  {title:'Hoge2',desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum repudiandae porro illum, praesentium est officia ad. Minima natus optio sit vitae, velit id fugit quis suscipit nulla quam quos, esse?',id:2}
]

const entry = {
  markdown: `
# Title

## Heading1
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur sint fugit adipisci ratione culpa ab porro veritatis atque, vel et quidem nobis modi! Labore quod voluptas dolorem quisquam alias, sit.

- hoge
- hoge2

  `
}

storiesOf('Page', module)
  .add('Editor', () => <Editor />)
  .add('Docs', () => <Docs />)
  .add('Project', () => <Project projects={projects}/>);

storiesOf('Components', module)
  .add('Preview', () => <Preview entry={entry}/>);


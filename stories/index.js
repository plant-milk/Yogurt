import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import Editor from '../src/components/Editor/Editor';
import Docs from '../src/components/Docs/Docs';
import Project from '../src/components/Project/Project';

const projects = [
  {title:'Hoge',desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum repudiandae porro illum, praesentium est officia ad. Minima natus optio sit vitae, velit id fugit quis suscipit nulla quam quos, esse?', id:1},
  {title:'Hoge2',desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum repudiandae porro illum, praesentium est officia ad. Minima natus optio sit vitae, velit id fugit quis suscipit nulla quam quos, esse?',id:2}
]

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Page', module)
  .add('Editor', () => <Editor />)
  .add('Docs', () => <Docs />)
  .add('Project', () => <Project projects={projects}/>);


import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import Editor from '../src/components/Editor/Editor';
import Preview from '../src/components/Preview/Preview';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Page', module)
  .add('Editor', () => <Editor />)
  .add('Preview', () => <Preview />);


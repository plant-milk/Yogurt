const builder = require('electron-builder');

builder.build({
  config: {
    'appId': 'Yogurt',
    'win': {
      'target': {
        'target': 'zip',
        'arch': [
          'x64',
          'ia32',
        ]
      }
    }
  }
});
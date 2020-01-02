const builder = require('electron-builder');

builder.build({
  config: {
    appId: 'Yogurt',
    mac: {
      target: 'zip',
    }
  }
});

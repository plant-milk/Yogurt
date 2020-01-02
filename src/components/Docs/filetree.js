export default class FileTree {
  constructor(path, name = null) {
    this.path = path;
    this.name = name;
    this.items = [];
  }

  build() {
    this.items = FileTree.readDir(this.path);
  }

  static readDir(path) {
    const remote = window.require('electron').remote;
    const electronFs = remote.require('fs');
    const fileArray = [];

    electronFs.readdirSync(path).forEach((file) => {
      const fileInfo = new FileTree(`${path}/${file}`, file);

      const stat = electronFs.statSync(fileInfo.path);

      if (stat.isDirectory()) {
        fileInfo.items = FileTree.readDir(fileInfo.path);
      }

      fileArray.push(fileInfo);
    });

    return fileArray;
  }
}

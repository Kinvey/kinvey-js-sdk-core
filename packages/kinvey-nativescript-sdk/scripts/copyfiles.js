/* eslint-disable */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

try {
  // Copy travis.yml
  fs.copySync(path.join(__dirname, '../.travis.yml'), path.join(__dirname, '../dist/.travis.yml'));

  // Copy package.json
  const pkg = require('../package.json');
  delete pkg.private;
  delete pkg.devDependencies;
  delete pkg.scripts;
  fs.writeFileSync(path.join(__dirname, '../dist/package.json'), JSON.stringify(pkg, null, 2));

  // Copy LICENSE
  fs.copySync(path.join(__dirname, '../LICENSE'), path.join(__dirname, '../dist/LICENSE'));

  // Copy README
  fs.copySync(path.join(__dirname, '../README.md'), path.join(__dirname, '../dist/README.md'));

  // Copy kinvey.d.ts
  fs.copySync(path.join(__dirname, '../src/kinvey.d.ts'), path.join(__dirname, '../dist/kinvey.d.ts'));
}
catch (error) {
  console.error(error);
  process.exit(1);
}

import {readFileSync} from 'fs';
import {join} from 'path';
import {packageDirectorySync} from 'pkg-dir';

const getPkg = () => {
  const globalDir = packageDirectorySync();
  return JSON.parse(readFileSync(join(globalDir, 'package.json')).toString())
}

export default getPkg
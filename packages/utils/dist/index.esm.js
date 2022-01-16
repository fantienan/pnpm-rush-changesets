import require$$0 from 'path';
import require$$1 from 'url';
import require$$2 from 'resolve-cwd';
import require$$3 from 'pkg-dir';
import log from 'npmlog';
export { default as log } from 'npmlog';

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

const path = require$$0;
const {fileURLToPath} = require$$1;
const resolveCwd = require$$2;
const pkgDir = require$$3;

var importLocal = filename => {
	const normalizedFilename = filename.startsWith('file://') ? fileURLToPath(filename) : filename;
	const globalDir = pkgDir.sync(path.dirname(normalizedFilename));
	const relativePath = path.relative(globalDir, normalizedFilename);
	const pkg = commonjsRequire(path.join(globalDir, 'package.json'));
	const localFile = resolveCwd.silent(path.join(pkg.name, relativePath));
	const localNodeModules = path.join(process.cwd(), 'node_modules');

	const filenameInLocalNodeModules = !path.relative(localNodeModules, normalizedFilename).startsWith('..') &&
		// On Windows, if `localNodeModules` and `normalizedFilename` are on different partitions, `path.relative()` returns the value of `normalizedFilename`, resulting in `filenameInLocalNodeModules` incorrectly becoming `true`.
		path.parse(localNodeModules).root === path.parse(normalizedFilename).root;

	// Use `path.relative()` to detect local package installation,
	// because __filename's case is inconsistent on Windows
	// Can use `===` when targeting Node.js 8
	// See https://github.com/nodejs/node/issues/6624
	return !filenameInLocalNodeModules && localFile && path.relative(localFile, normalizedFilename) !== '' && commonjsRequire(localFile);
};

// @ts-ignore
// 判断debug模式
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
// 添加自定义命令
log.addLevel('success', 2000, { fg: 'green', bold: true });
// 修改前缀
log.heading = '@forestar/cli';

export { importLocal };

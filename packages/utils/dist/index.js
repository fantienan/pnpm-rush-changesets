'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0 = require('path');
var require$$1 = require('url');
var require$$2 = require('resolve-cwd');
var require$$3 = require('pkg-dir');
var log = require('npmlog');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var log__default = /*#__PURE__*/_interopDefaultLegacy(log);

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

const path = require$$0__default["default"];
const {fileURLToPath} = require$$1__default["default"];
const resolveCwd = require$$2__default["default"];
const pkgDir = require$$3__default["default"];

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
log__default["default"].level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
// 添加自定义命令
log__default["default"].addLevel('success', 2000, { fg: 'green', bold: true });
// 修改前缀
log__default["default"].heading = '@forestar/cli';

Object.defineProperty(exports, 'log', {
	enumerable: true,
	get: function () { return log__default["default"]; }
});
exports.importLocal = importLocal;

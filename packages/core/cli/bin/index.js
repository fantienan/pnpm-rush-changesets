#! /usr/bin/env node
const { importLocal, log } = require('@forestar/utils');

if (importLocal(__filename)) {
  log.info('cli', '正在使用 @forestar/cli 本地版本');
} else {
  require('../src')(process.argv.slice(2));
}

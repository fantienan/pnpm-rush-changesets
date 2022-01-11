#! /usr/bin/env node
import importLocal from 'import-local';
import log from '@forestar/log';
import core from '../lib';

if (importLocal(__filename)) {
  log.info('cli', '正在使用 zelda-cli本地版本');
} else {
  core(process.argv.slice(2));
}

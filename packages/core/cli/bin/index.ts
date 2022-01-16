#! /usr/bin/env node
import { importLocal, log } from '@forestar/utils';
import core from '../lib';

if (importLocal(__filename)) {
  log.info('cli', '正在使用 @forestar/cli 本地版本');
} else {
  core(process.argv.slice(2));
}

import semver from 'semver';
import colors from 'colors';
import rootCheck from 'root-check';
import homedir from '@stdlib/os-homedir';
import minimist from 'minimist';
import dotenv from 'dotenv';
import {pathExistsSync} from 'path-exists';
import { log, getPkg } from '@forestar/utils';
import { LOWEST_NODE_VERSION } from './const';
import type { CoreParams } from './types';

const pkg = getPkg()
// 检查脚手架版本
const checkPkgVersion = () => {
  log.info('cli', pkg.version)
}
// 检查node版本
const checkNodeVersion = () => {
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(colors.red(`当前node版本：${process.version}, node版本不能低于${LOWEST_NODE_VERSION}`))
  }
}
// 检查root启动，自动降级策略
const checkRoot = () => {
  rootCheck()
}
// 检查用户主目录
const checkUserHome = () => {
  const userHome = homedir()
  if (!userHome || !pathExistsSync(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在！'))
  }
  console.log()
}
// 检查入参
const checkInputArgs = () => {
  const args = minimist(process.argv.slice(2))
  process.env.LOG_LEVEL = args.debug ? 'verbose' : 'info'
  log.level = process.env.LOG_LEVEL
}
// 检查环境变量
const checkEnv = () => {
  const config = dotenv.config({})
  log.verbose('环境变量', config as any)
}
// 执行准备
const prepare = async () => {
  checkPkgVersion()
  checkNodeVersion()
  checkRoot()
  checkUserHome()
  checkInputArgs()
  checkEnv()
}
// 注册命令
const registerCommand = () => {}

const core = async (params?: CoreParams) => {
  try {
    await prepare()
    registerCommand()
  } catch (e) {
    log.error("error", (e as Error).message)
  }
};

export default core;

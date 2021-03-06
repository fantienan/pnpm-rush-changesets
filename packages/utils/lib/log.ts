import log from 'npmlog';

// 判断debug模式设置level
log.level = process.env.LOG_LEVEL || 'info';
// 添加自定义命令
log.addLevel('success', 2000, { fg: 'green', bold: true });
// 修改前缀
log.heading = '@forestar/cli';

export default log

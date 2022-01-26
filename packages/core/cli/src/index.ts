import { log } from '@forestar/utils';
import type { CoreParams } from './types';

const core = (params?: CoreParams) => {
  log.info('__filename', __filename);
  log.info('params', params);
};

export default core;

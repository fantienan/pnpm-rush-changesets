import { log } from '@forestar/utils';
import type { CoreParams } from './types';

const core = (params?: CoreParams) => {
  log.info('__filename', __filename);
};

export default core;

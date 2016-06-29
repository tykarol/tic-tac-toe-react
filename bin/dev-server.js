import config from '../config';

const paths = config.get('utils_paths');

require(paths.src('dev-server'));

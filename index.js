import BatchRename from './src/BatchRename';
import Logger from './src/Logger';

try {
  (new BatchRename()).execute('./series');
} catch (error) {
  (new Logger()).error(error);
}

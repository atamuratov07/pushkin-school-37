import * as migration_20260319_105757_init from './20260319_105757_init';
import * as migration_20260319_174834_populate from './20260319_174834_populate';

export const migrations = [
  {
    up: migration_20260319_105757_init.up,
    down: migration_20260319_105757_init.down,
    name: '20260319_105757_init',
  },
  {
    up: migration_20260319_174834_populate.up,
    down: migration_20260319_174834_populate.down,
    name: '20260319_174834_populate'
  },
];

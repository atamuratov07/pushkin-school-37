import * as migration_20260319_105757_init from './20260319_105757_init';
import * as migration_20260326_064219_populate from './20260326_064219_populate';

export const migrations = [
  {
    up: migration_20260319_105757_init.up,
    down: migration_20260319_105757_init.down,
    name: '20260319_105757_init',
  },
  {
    up: migration_20260326_064219_populate.up,
    down: migration_20260326_064219_populate.down,
    name: '20260326_064219_populate'
  },
];

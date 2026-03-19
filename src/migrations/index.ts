import * as migration_20260319_105757_init from './20260319_105757_init.ts';

export const migrations = [
  {
    up: migration_20260319_105757_init.up,
    down: migration_20260319_105757_init.down,
    name: '20260319_105757_init'
  },
];

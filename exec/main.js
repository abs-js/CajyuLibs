import { execSync } from 'child_process';

export const CayjuLib = {
  exec: (command) => {
    try {
      return execSync(command, { encoding: 'utf-8' }).trim();
    } catch (e) {
      throw new Error('Exec failed: ' + e.message);
    }
  }
};

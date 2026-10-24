import fs from 'fs';

export const CayjuLib = {
  readFile: (path) => fs.readFileSync(path, 'utf-8'),
  writeFile: (path, content) => fs.writeFileSync(path, content),
  exists: (path) => fs.existsSync(path)
};

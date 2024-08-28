import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'public', 'mockData.json');


export const readDataFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        return reject('Failed to read data');
      }
      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (err) {
        reject('Failed to parse JSON');
      }
    });
  });
};

export const writeDataToFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        return reject('Failed to write data');
      }
      resolve();
    });
  });
};
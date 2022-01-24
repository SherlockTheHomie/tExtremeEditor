import { openDB } from 'idb';

const initdb = async () =>
  openDB('textreme', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('textreme')) {
        console.log('textreme database already exists');
        return;
      }
      db.createObjectStore('textreme', { keyPath: "id" });
      console.log('textreme database created');
    },
  });


export const getDb = async () => {
  console.log('GET from the database');
  const textremeDb = await openDB('textreme', 1);
  const tx = textremeDb.transaction('textreme', 'readonly');
  const store = tx.objectStore('textreme');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;  
};


export const putDb = async (content) => {
  console.log('PUT to the database');
  const textremeDb = await openDB('textreme', 1);
  const tx = textremeDb.transaction('textreme', 'readwrite');
  const store = tx.objectStore('textreme');
  const request = store.put({ id: 1, id: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

initdb();

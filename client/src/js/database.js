import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Jate DB already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Jate DB created');
    },
  });

export const putDb = async (content) => {
  try {
    console.log(content);
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ content: content, id: 1 })

    const result = await request;
    console.log('Data saved to the DB', result);
  }
  catch {
    console.error('Put to the DB failed')
  }
};

export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();

    const result = await request;
    console.log('result.value', result[0].content);
    return result[0].content;
  }
  catch {
    console.error('Get from the DB failed')
  }
}

initdb();
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
    const jateDb = await openDB('jate', 1)

    const tx = jateDb.transaction('jate', 'readwrite')

    const store = tx.objectStore('jate')

    const req = store.add({content: content})

    const res = await req
    console.log('Data saved.', res)

  } catch (error) {
    console.log(error)
  }
}

export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1)

    const tx = jateDb.transaction('jate', 'readonly')

    const store = tx.objectStore('jate')

    const req = store.getAll()

    const res = await req
    console.log('Got items.', res)

    return res
  } catch (error) {
    console.log(error)
  }
}

initdb();

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

    const req = store.put({ id: 1, value: content })

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

    const req = store.get(1)

    const res = await req
    if (res) console.log('Got items.', res)

    return res?.value
  } catch (error) {
    console.log(error)
  }
}

initdb();

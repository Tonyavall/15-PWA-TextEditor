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
    const contactDb = await openDB('jate', 1)

    const tx = contactDb.transaction('contact', 'readwrite')

    const store = tx.objectStore('contact')

    const req = store.add(content)

    const res = await req
    console.log('Data saved.', res)

  } catch (error) {
    console.log(error)
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();

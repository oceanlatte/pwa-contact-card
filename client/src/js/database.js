import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initDb = async () =>
  openDB('contact_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contacts')) {
        console.log('contacts store already exists');
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
      console.log('contacts store created');
    }
});

// connect to DB
export const getDb = async () => {
  console.log('GET ALL from the database.')
  const contactDb = await openDB('contact_db', 1);
  const tx = contactDb.transaction('contacts', 'readonly');
  const store = tx.objectStore('contacts');
  const request = store.getAll();

  const result = await request;
  console.log('result.value:', result);
  return result;
};

// POST functionality
export const postDb = async (name, email, phone, profile) => {
  console.log('POST to the database');
  const contactDb = await openDB('contact_db', 1);
  const tx = contactDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const request = store.add({ name: name, email: email, phone: phone, profile: profile });

  // confirmation of the requst
  const result = await request;
  console.log('🚀 Data saved to the database!', result);
};

// DELETE functionality
export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const contactDb = await openDB('contact_db', 1);
  const tx = contactDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');
  const request = store.delete(id);

  // Get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

// UPDATE functionality
export const editDb = async (id, name, email, phone, profile) => {
  console.log('PUT to the database');
  const contactDb = await openDB('contact_db', 1);
  const tx = contactDb.transaction('contacts', 'readwrite');
  const store = tx.objectStore('contacts');

  const request = store.put({ name: name, email: email, phone: phone, profile: profile })
  const result = await request;
  console.log('🚀 Data saved to the database!', result);
}
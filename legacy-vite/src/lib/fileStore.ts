
const DB_NAME = 'WarSubmissionDB';
const STORE_NAME = 'files';
const DB_VERSION = 1;

export const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME); // Key is the file index
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
};

export const storeStartFiles = async (files: File[]): Promise<void> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        // Clear old first
        store.clear();

        files.forEach((file, index) => {
            store.put(file, index);
        });

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
};

export const getStoredFiles = async (): Promise<File[]> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            // result is array of files
            resolve(request.result as File[]);
        };

        request.onerror = () => reject(request.error);
    });
};

export const clearStoredFiles = async (): Promise<void> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
};

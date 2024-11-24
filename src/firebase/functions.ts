import { ChangeEvent } from "react";
import { app } from "./config";
import { FirebaseAppSettings } from "firebase/app";
import { Data } from "../@types";

import {
  getDownloadURL,
  getStorage,
  ref as refStore,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Database as DatabaseTypes,
  getDatabase,
  onValue,
  ref,
  set,
} from "firebase/database";

export default class Database {
  private app: FirebaseAppSettings;
  private database: DatabaseTypes;
  constructor() {
    this.app = app;
    this.database = getDatabase();
  }

  store() {
    const storage = getStorage();

    function shower(file: ChangeEvent, fn: (r: string) => void) {
      const inputElement = file.target as HTMLInputElement;

      if (inputElement.files && inputElement.files[0]) {
        const fileData = inputElement.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.onload = () => {
          if (typeof reader.result === "string") fn(reader.result);
        };
      }
    }

    function add(file: File, path: string) {
      return new Promise((resolve) => {
        if (!file) return resolve("file not found");

        const img = refStore(storage, path);

        const uploadTask = uploadBytesResumable(img, file);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      });
    }

    function get(name: string, fn: (s: string) => void) {
      const imgRefStoreerence = refStore(storage, name);
      getDownloadURL(imgRefStoreerence)
        .then((url) => fn(url))
        .catch((err) => console.log(err));
    }

    return { add, get, shower };
  }

  readDb(path: string): Promise<Data[] | string> {
    return new Promise((resolve, reject) => {
      const dbReference = ref(this.database, path);
      onValue(dbReference, (snapshot) => {
        if (snapshot.val() === null) return reject("no data found");
        const data = Object.values(snapshot.val());
        resolve(data as Data[]);
      });
    });
  }

  writeDb(data: Data, path: string): Promise<boolean | string> {
    return new Promise((resolve, reject) => {
      const uid = crypto.randomUUID();
      const db = getDatabase();

      set(ref(db, path + uid), {
        ...data,
        uid,
      })
        .then(() => resolve(true))
        .catch((err) => reject(err));
    });
  }
}

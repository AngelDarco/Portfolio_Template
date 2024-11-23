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
  ref,
  set,
} from "firebase/database";

export default class Database {
  app: FirebaseAppSettings;
  database: DatabaseTypes;
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

    function add(file: File, fn: (s: string) => void) {
      const dataFile = file.files[0];
      if (!file) return;

      const img = refStore(storage, "/tunning-store/" + dataFile.name);

      const uploadTask = uploadBytesResumable(img, dataFile);
      getDownloadURL(uploadTask.snapshot.refStore).then((downloadURL) => {
        fn(downloadURL);
      });
    }

    function get(name: string, fn: (s: string) => void) {
      const imgRefStoreerence = refStore(storage, name);
      getDownloadURL(imgRefStoreerence)
        .then((url) => {
          fn(url);
        })
        .catch((err) => console.log(err));
    }

    return { add, get, shower };
  }

  readDb() {}

  writeDb(data: Data) {
    const uid = crypto.randomUUID();
    const db = getDatabase();
    set(ref(db, uid), {
      ...data,
      uid,
    });
  }
}

import { app } from "./config";
import { FirebaseAppSettings } from "firebase/app";
import type { FormData } from "../@types";

import {
  Database as DatabaseTypes,
  getDatabase,
  onValue,
  ref,
  update,
} from "firebase/database";

export default class RealTimeDB {
  private app: FirebaseAppSettings;
  private database: DatabaseTypes;
  constructor() {
    this.app = app;
    this.database = getDatabase();
  }

  read(path: string): Promise<FormData[] | string> {
    return new Promise((resolve, reject) => {
      const dbReference = ref(this.database, path);
      onValue(dbReference, (snapshot) => {
        if (snapshot.val() === null) return reject("no data found");
        const data = Object.values(snapshot.val());
        resolve(data as FormData[]);
      });
    });
  }

  async write(
    data: FormData,
    path: string,
    uid: string
  ): Promise<boolean | string> {
    return new Promise((resolve, reject) => {
      const db = getDatabase();
      update(ref(db, `${path}/${uid}`), {
        ...data,
        uid,
      })
        .then(() => resolve(true))
        .catch((err) => reject(err));
    });
  }
}

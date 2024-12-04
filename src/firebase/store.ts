import { ChangeEvent } from "react";
import { app } from "./config";
import { FirebaseAppSettings } from "firebase/app";

import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref as refStore,
  uploadBytesResumable,
} from "firebase/storage";

export default class Store {
  private app: FirebaseAppSettings = app;
  private static storage: FirebaseStorage = getStorage();
  static uuid = crypto.randomUUID();
  static viewer(file: ChangeEvent, fn: (r: string) => void) {
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

  static add(file: File, path: string) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve("file not found");
      const img = refStore(Store.storage, `${path}/${Store.uuid}`);

      const uploadTask = uploadBytesResumable(img, file);

      uploadTask.on(
        "state_changed",
        () => {},
        () => {},
        async () =>
          await getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => resolve(downloadURL))
            .catch((err) => reject({ message: err }))
      );
    });
  }

  static get(path: string, fn: (s: string) => void) {
    const imgRefStoreerence = refStore(Store.storage, path);
    if (imgRefStoreerence.name === "") throw new Error("no image found");
    getDownloadURL(imgRefStoreerence)
      .then((url) => fn(url))
      .catch((err) => console.log(err));
  }
}

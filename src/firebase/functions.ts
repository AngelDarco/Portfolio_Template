import { FirebaseAppSettings } from "firebase/app";
import { app } from "./config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default class Database {
  app: FirebaseAppSettings;

  constructor() {
    this.app = app;
  }

  store() {
    const storage = getStorage();

    function add(file: File, fn: (s: string) => void) {
      const dataFile = file.files[0];
      if (!file) return;

      const img = ref(storage, "/tunning-store/" + dataFile.name);

      const uploadTask = uploadBytesResumable(img, dataFile);
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        fn(downloadURL);
      });
    }

    function get(name: string, fn: (s: string) => void) {
      const imgReference = ref(storage, name);
      getDownloadURL(imgReference)
        .then((url) => {
          fn(url);
        })
        .catch((err) => console.log(err));
    }

    return { add, get };
  }
}

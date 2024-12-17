import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Database from "../firebase/realtime-db";
import { useParams } from "wouter";
import Notify from "../utils/Notify";
import { ToastContainer } from "react-toastify";
import UuidChecker from "../utils/UuidChecker";
import Store from "../firebase/store";
// import type { Data } from "../@types";

type FormData = {
  uid: string;
  img: string | File;
  categorie: string;
};

export default function Admin() {
  const db = new Database();

  const uid = useParams().uid;
  const section = useParams().section;

  const PATH_DB = `${section}/${uid}`;
  const DEFAULT_LOCAL_IMG = "/image_2.png";

  const [img, setImg] = useState(DEFAULT_LOCAL_IMG);
  const [data, setData] = useState<FormData>();

  useEffect(() => {
    if (!UuidChecker.isValid(uid)) return;
    Store.get(PATH_DB, setImg);
    db.read(PATH_DB)
      .then((data) => {
        Object.values(data).forEach((value) => {
          if (value.uid === uid) setData(value);
        });
      })
      .catch((err) => Notify.error(err));
    // eslint-disable-next-line
  }, []);

  const handlerFile = (file: ChangeEvent) => {
    Store.viewer(file, setImg);
  };

  function formValidation(e: FormEvent): FormData | undefined {
    const form = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(form.entries());
    const data: { [key: string]: FormDataEntryValue } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value === "" || (value as File).name === "") {
        Notify.error(`${key} is required`);
        return;
      }
      data[key] = (value as string).toLocaleLowerCase();
    });
    if (Object.values(data).length === Object.values(formData).length)
      return data as FormData;
  }

  const handlerUpdate = async (e: FormEvent) => {
    e.preventDefault();
    Notify.promise(
      (async () => {
        const data = formValidation(e);
        if (!data) return;

        if (data.img instanceof File) {
          const PATH_STORAGE = `${section}`;
          const img = await Store.add(data.img, PATH_STORAGE);

          if (typeof img === "string")
            return db
              .write({ ...data, img }, PATH_STORAGE, Store.uuid)
              .then(() => {
                (e.target as HTMLFormElement).reset();
                setImg(DEFAULT_LOCAL_IMG);
              })
              .catch((err) => Notify.error(err.message));
        }

        const PATH_DB = section;
        if (PATH_DB && uid && data)
          db.write(data, PATH_DB, uid)
            .then(() => {
              (e.target as HTMLFormElement).reset();
              setImg(DEFAULT_LOCAL_IMG);
            })
            .catch((err) => Notify.error(err.message));
      })(),
      "updating..."
    );
  };

  return (
    <section className="flex w-full flex-col gap-4">
      <h1 className="text-3xl text-center text-white">Admin board</h1>

      <main className="flex h-full gap-4">
        <div className="w-full">
          <img className="w-auto" src={img} alt="" />
        </div>

        <form
          onSubmit={handlerUpdate}
          className="flex flex-col h-full gap-4 w-full [&>label>input]:rounded-md [&>label>input]:p-1 [&>label]:h-9 [&>label>input]:h-full "
        >
          <input
            type="file"
            name="img"
            accept="image/jpg, image/jpeg, image/png, image/webp"
            onChange={handlerFile}
            disabled={uid === "add" ? false : true}
          />
          <label htmlFor="categorie">
            <input
              type="text"
              name="categorie"
              placeholder="Categorie"
              defaultValue={data && data.categorie}
            />
          </label>
          <button>{!uid ? "Update" : "Add"}</button>
        </form>
      </main>
      <ToastContainer />
    </section>
  );
}

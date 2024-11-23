import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Database from "../firebase/functions";
import { Data } from "../@types";
import { useParams } from "wouter";
import Notify from "../utils/notify";
import { ToastContainer } from "react-toastify";

export default function Admin() {
  const db = new Database();
  const { get, shower } = db.store();

  const uid = useParams().uid;

  const defaultLocalImg = "image_02.png";
  const defaultDbImg = "/tunning-store/girl.jpg";

  const [img, setImg] = useState(defaultLocalImg);

  useEffect(() => {
    get(defaultDbImg, setImg);
    // eslint-disable-next-line
  }, []);

  const handlerFile = (file: ChangeEvent) => {
    shower(file, setImg);
  };

  function formValidation(e: FormEvent) {
    const form = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(form.entries());

    const data: Data = {};

    const res = Object.entries(formData).map(([key, value]) => {
      if (value === "" || (key === "image" && (value as File).name === ""))
        return Notify.error(`${key} is required`);

      data[key] = value;
    });

    if (res.length === Object.values(data).length) return data;
  }

  const handlerUpdate = (e: FormEvent) => {
    e.preventDefault();
    const data = formValidation(e);
    if (!data) return;

    console.log(data);
    // if (typeof uid === "string" && uid !== "add") {
    // }
  };

  return (
    <section className="flex w-full flex-col gap-4  h-screen border">
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
            name="image"
            accept="image/jpg"
            onChange={handlerFile}
            disabled={uid === "add" ? false : true}
          />
          <label htmlFor="name">
            <input type="text" name="name" id="name" placeholder="Name" />
          </label>
          <label htmlFor="email">
            <input type="email" name="email" id="email" placeholder="Email" />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </label>
          <button>Update</button>
        </form>
      </main>
      <ToastContainer />
    </section>
  );
}

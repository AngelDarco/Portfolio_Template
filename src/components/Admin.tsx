import { ChangeEvent, useEffect, useState } from "react";
import Database from "../firebase/functions";

export default function Admin() {
  const db = new Database();

  const [img, setImg] = useState("image_02.png");

  const { add, get } = db.store();
  useEffect(() => {
    get("/tunning-store/girl.jpg", setImg);
  }, []);

  const handlerFile = (file: ChangeEvent) => {
    const inputElement = file.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      const fileData = inputElement.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileData);
      reader.onload = () => {
        if (typeof reader.result === "string") setImg(reader.result);
      };
    }
  };

  return (
    <main className="flex flex-col gap-4 min-h-dvh">
      <h1 className="text-3xl text-white">Admin board</h1>

      <div className="w-60">
        <img className="w-full" src={img} alt="" />
      </div>

      <div>
        <input
          type="file"
          name="search"
          accept="image/jpg"
          onChange={handlerFile}
        />
      </div>

      <form className="flex flex-col gap-4">
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
      </form>
    </main>
  );
}

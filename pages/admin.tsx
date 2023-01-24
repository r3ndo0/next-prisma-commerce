import axios from "axios";
import { GetServerSideProps, type NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import getUser from "@/db/getUser";

const admin: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth", {
        username,
        password,
      });
      if (res.status === 200) {
        router.push("/admindashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-sky-300">
        <form
          onSubmit={submitHandler}
          className="flex h-[50vh] w-[40vw] flex-col items-center justify-center rounded-xl bg-sky-800"
        >
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 h-12 w-64  rounded px-2"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 h-12 w-64 rounded px-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-amber-200 py-2 px-20 font-bold text-gray-900"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default admin;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await getUser(req, res);
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/admindashboard",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};

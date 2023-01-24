import { BsSearch } from "react-icons/bs";
import Image from "next/image";
function Navbar() {
  return (
    <div className=" flex h-16 w-screen items-center justify-around bg-sky-600 text-gray-900">
      <h1 className="text-2xl font-bold text-rose-800">r3ndo0</h1>
      <div className="flex items-center gap-2">
        <input
          placeholder="Search ..."
          className="h-[36px]  w-[30vw] rounded-lg p-2"
        />
        <div className="rounded bg-white p-[6px] duration-300 ease-in-out hover:bg-gray-900 hover:text-white">
          <BsSearch size={20} />
        </div>
      </div>
      <div className=" hidden items-center justify-center gap-8 sm:flex">
        <button>
          <Image src={"/cart.png"} width={40} height={40} alt="cart" />
        </button>
        <button className="rounded-lg bg-amber-400 py-2 px-8 font-bold text-gray-800">
          Log In
        </button>
      </div>
    </div>
  );
}
export default Navbar;

export default function Sidebar() {
  const liClass =
    "py-2 px-4 bg-sky-400 rounded-xl w-full my-2 text-lg font-bold text-gray-800";
  return (
    <div>
      <ul className="flex flex-col justify-center items-start">
        <li className={liClass}>Products</li>
        <li className={liClass}>Orders</li>
        <li className={liClass}>Images</li>
        <li className={liClass}>Categories</li>
        <li className={liClass}>Brands</li>
        <li className={liClass}>Customers</li>
      </ul>
    </div>
  );
}

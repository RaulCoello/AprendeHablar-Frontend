import { AiFillCaretRight, AiFillSetting } from "react-icons/ai";
import Cookies from "universal-cookie";

export default function Config({ adminMode }) {
  const cookies = new Cookies();

  // guardar la cookie con !mode
  const SaveCookie = () => {
    cookies.set("adminMode", !adminMode, { path: "/" });
    //router.reload();
    window.location.reload();
  };
  return (
    <>
      {adminMode ? (
        <button
          onClick={() => SaveCookie()}
          className="fixed cursor-pointer bottom-8 right-8 z-40 rounded-full bg-red-500 p-4 border-8 text-white border-red-800 "
        >
          <AiFillCaretRight className="text-3xl" />
        </button>
      ) : (
        <button
          onClick={() => SaveCookie()}
          className="fixed cursor-pointer bottom-8 right-8 z-40 rounded-full bg-red-500 p-4 border-8 text-white border-red-800 "
        >
          <AiFillSetting className="text-3xl" />
        </button>
      )}
    </>
  );
}

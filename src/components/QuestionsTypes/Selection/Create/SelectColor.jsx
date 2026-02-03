import { useState } from "react";
import { AiTwotoneSave } from "react-icons/ai";

/* PARA EL SELECTOR DE COLORES */
import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";
export default function SelectColor({ close, colorset, actualColor }) {
  const [color, setColor] = useState(actualColor || "#fb923c");
  const handleColor = (value, type) => {
    //console.log(value.toHexString());
    setColor(value.toHexString());
    //console.log(type);
  };
  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 ">
      <div className="w-auto ">
        <div className="bg-white  rounded-xl animate-fade-in">
          <div className=" h-full w-full p-4">
            <div className="flex flex-col mb-2">
              <button
                onClick={() => close()}
                className="self-end bg-red-500 text-white font-bold p-2 rounded-full cursor-pointer"
              >
                X
              </button>
            </div>
            {/* COLOR PICKER */}
            <div className="w-full  mx-auto content-center items-center text-center justify-center">
              <ColorPicker
                onChange={handleColor}
                defaultValue={color}
                value={color}
                className="mx-auto w-full"
              />
            </div>
            {/* MOSTRAR EL VALOR  DEL COLOR Y EL BOTON DE GUARDAR */}
            <div className="flex flex-row w-full gap-3 p-2">
              <input
                className="p-2 rounded-2xl bg-slate-100"
                type="text"
                value={color}
                disabled
                readOnly
              />
              <button
                onClick={() => colorset(color)}
                className="p-3 cursor-pointer bg-lime-600 rounded-3xl font-semibold text-white self-end"
              >
                <AiTwotoneSave className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

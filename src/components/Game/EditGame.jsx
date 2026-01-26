import { useState, useRef } from "react";
import { AiTwotoneSave, AiOutlineUpload, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Loader from "../Layout/Loader";
/* PARA EL SELECTOR DE COLORES */
import ColorPicker from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";
export default function EditGame({ game, cerrar, recargar }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiMedia = process.env.NEXT_PUBLIC_API_MEDIA;
  const [loader, setLoader] = useState(false);
  const [gameData, setGameData] = useState({
    game_id: game.id ? game.id : 0,
    image: game.image ? game.image : "",
  });

  const [titulo, setTitulo] = useState(game.title ? game.title : "");
  const [color, setColor] = useState(game.color ? game.color : "#ffffff");
  const handleColor = (value, type) => {
    //console.log(value.toHexString());
    setColor(value.toHexString());
    //console.log(type);
  };
  //imagen
  const fileInputRef = useRef(null);
  //img preview
  const [fileP, setFileP] = useState();
  const [fileE, setFileE] = useState(null);

  const ImagePreview = (e) => {
    try {
      setFileP(URL.createObjectURL(e.target.files[0]));
      const selectedFile = e.target.files[0];
      //setFile(selectedFile);
      setFileE(selectedFile);
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };

  const handleSubmit = async () => {
    try {
      //aqui va el fetch para subir el juego
      setLoader(true);
      const form = new FormData();
      form.set("image", fileE);
      form.set("title", titulo);
      form.set("color", color);
      // AQUI UTILIZAR AXIOS PARA ENVIAR EL FORM
      const result = await axios.post(
        `${apiUrl}/games/${gameData.game_id}/`,
        form,
        {
          /*
        headers: {
          "Content-Type": "application/json",
        }, */
          withCredentials: false,
        },
      );
      // se comenta el Content-Type porque si se lo coloca se envia como JSON y no como FormData
      //console.log(result);
      setLoader(false);
      recargar();
    } catch (error) {
      setLoader(false);
      console.log(error);
      alert("Hubo un error ");
    }
  };

  // funcion para eliminar el jeugo
  const HandleDelete = async () => {
    try {
      setLoader(true);
      // AQUI UTILIZAR AXIOS PARA ENVIAR EL FORM
      const result = await axios.delete(
        `${apiUrl}/games/${gameData.game_id}/`,
        {},
        {
          /*
        headers: {
          "Content-Type": "application/json",
        }, */
          withCredentials: false,
        },
      );
      //console.log(result);
      setLoader(false);
      recargar();
    } catch (error) {
      setLoader(false);
      console.log(error);
      alert("Hubo un error ");
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/20  backdrop-blur-sm flex justify-center items-center z-50 ">
        <div className="w-[120vh] ">
          <div className="bg-white p-3  rounded-3xl animate-fade-in">
            <div className=" h-full w-full flex flex-col p-4">
              {loader && <Loader />}
              <div className="flex flex-row">
                <h1 className=" flex-1 text-3xl font-semibold text-lime-800 ">
                  Editar Juego
                </h1>
                <button
                  onClick={cerrar}
                  className="p-2 font-bold text-2xl cursor-pointer"
                >
                  X
                </button>
              </div>
              {/* FORMULARIO PARA CREAR EL JOGO SKERE */}
              <div>
                {/* hacer un div que se divida en dos partes */}
                <div className="grid grid-cols-2 gap-3 p-4">
                  {/* parte izquierda para el titulo y color */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="titulo" className="font-bold">
                      Titulo del Juego:
                    </label>
                    <input
                      id="titulo"
                      type="text"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      required
                      className="border-2 border-lime-800 rounded-2xl p-2 text-black"
                      placeholder="Titulo del juego"
                      maxLength={40}
                    />
                    <label htmlFor="titulo" className="font-bold">
                      Color:
                    </label>

                    <div className="w-full mx-auto content-center items-center text-center justify-center">
                      <ColorPicker
                        onChange={handleColor}
                        defaultValue={color}
                        value={color}
                        className="mx-auto w-full"
                      />
                    </div>
                  </div>
                  {/* parte derecha para la imagen  */}
                  <div>
                    <div className="mx-auto bg-transparent mb-2 w-2/5 text-center items-center">
                      <input
                        type="file"
                        id="fileInput"
                        onChange={ImagePreview}
                        accept="image/png, .jpeg"
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <button
                        className=" flex rounded-xl mx-auto bg-lime-600 text-center w-full p-4 cursor-pointer"
                        onClick={handleButtonClick}
                      >
                        <p className="font-bold text-white">Subir Foto</p>
                        <AiOutlineUpload
                          size="25px"
                          color="white"
                          className="mx-auto font-bold"
                        />
                      </button>
                    </div>
                    {/*   <Lottie animationData={anim} className="w-32 mx-auto" /> */}
                    {!fileP ? (
                      gameData.image && (
                        <img
                          className="mt-3 h-64 w-64  mx-auto"
                          src={`${apiMedia}/${gameData.image}`}
                          alt="Next.js logo"
                          width={200}
                          height={20}
                        />
                      )
                    ) : (
                      <img
                        src={fileP}
                        alt="Imagen"
                        className="mt-3 h-64 w-64  mx-auto"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-1">
                    <button
                      className="p-3 cursor-pointer bg-red-600 rounded-3xl font-semibold text-white self-end"
                      onClick={() => HandleDelete()}
                    >
                      <AiFillDelete className="text-3xl" />
                    </button>
                  </div>
                  <button
                    className="p-3 cursor-pointer bg-lime-600 rounded-3xl font-semibold text-white self-end"
                    onClick={() => handleSubmit()}
                  >
                    <AiTwotoneSave className="text-3xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

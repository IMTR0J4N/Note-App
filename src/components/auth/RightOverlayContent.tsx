import { Dispatch, SetStateAction } from "react";

export const RightOverlayContent = ({ isAnimated, setIsAnimated }: { isAnimated: SetStateAction<boolean>, setIsAnimated: Dispatch<SetStateAction<boolean>> }) => {
    return (
      <div className="p-8 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Vous n'avez pas de compte ?
        </h1>
  
        <h5 className="text-xl text-white">Commencez en quelques clics.</h5>
        <div className="mt-16">
          <button
            className="py-3 px-6 bg-transparent rounded-full text-center text-white font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
            onClick={(e) => {
              setIsAnimated(!isAnimated);
            }}
          >
            Créer un compte
          </button>
        </div>
      </div>
    );
  };
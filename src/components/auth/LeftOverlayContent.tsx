import { Dispatch, SetStateAction } from "react";

export const LeftOverlayContent = ({ isAnimated, setIsAnimated }: { isAnimated: SetStateAction<boolean>, setIsAnimated: Dispatch<SetStateAction<boolean>> }) => {
    return (
      <div className="p-8 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Vous avez déjà un compte ?
        </h1>
  
        <h5 className="text-xl text-white">Connectez-vous avec un email et mot de passe.</h5>
        <div className="mt-16">
          <button
            className="py-3 px-6 bg-transparent rounded-full text-center text-white text-xl font-bold uppercase ring-2 ring-white active:scale-110 transition-transform ease-in"
            onClick={(e) => {
              setIsAnimated(!isAnimated);
            }}
          >
            Se Connecter
          </button>
        </div>
      </div>
    );
  };
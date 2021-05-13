import { createContext, ReactNode, useState } from "react";

export interface Plates{
   imagem: string;
   titulo: string;
   descricao: string;
   preco: string;
   isAvaliable: boolean;
 }

 interface PlatesContextData{
  plates: Plates[];
  addPlates: (plates: Plates) => void;
  editPlates: (plates: Plates) => void;
  isOpenModal: boolean,
  openModal: () => void;
  closeModal: () => void;
 }

 interface PlatesProviderProps{
  children: ReactNode;
}

export const PlatesContext = createContext({} as PlatesContextData);
export function ProductProvider({ children} : PlatesProviderProps) {
  const [plates, setPlates] = useState<Plates[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  function addPlates(plate: Plates){
      if(plates)
        setPlates([
          ...plates,
          plate
        ]);
      else
        setPlates(plates);
  }

  function editPlates(plates: Plates){

  }
  function openModal(){
    console.log('passou');
    setIsOpenModal(true);
  }
  function closeModal(){
    setIsOpenModal(false);
  }

  return (
    <PlatesContext.Provider value={{plates, addPlates, editPlates, isOpenModal, openModal, closeModal}}>
          {children}
      </PlatesContext.Provider>
  );
}
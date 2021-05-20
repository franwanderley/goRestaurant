import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface Plates{
   _id: string;
   image: string;
   title: string;
   description: string;
   price: string;
   isAvaliable: boolean;
 }

 interface PlatesContextData{
  plates: Plates[];
  plateEdit: Plates;
  isOpenModal: boolean,
  setPlates: Dispatch<SetStateAction<Plates[]>>;
  addPlates: (plate: Plates) => void;
  editPlates: (plate: Plates) => void;
  deletePlates: (plate: Plates) => void;
  openModal: () => void;
  closeModal: () => void;
  changePlateEdit: (plate : Plates) => void;
 }

 interface PlatesProviderProps{
  children: ReactNode;
  platesApi: Plates[];
}

export const PlatesContext = createContext({} as PlatesContextData);
export function PlatesProvider({ children, platesApi} : PlatesProviderProps) {
  const [plates, setPlates] = useState<Plates[]>(platesApi ?? undefined);
  const [plateEdit, setPlateEdit] = useState<Plates>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  function changePlateEdit(plate: Plates){
    setPlateEdit(plate);
  }

  function addPlates(plate: Plates){
      if(plates)
        setPlates([
          ...plates,
          plate
        ]);
      else
        setPlates(plates);
  }

  function editPlates(plate: Plates){
    //1 parte excluir
    const newPlates = plates.filter(p => p.title !== plate.title);
    //2 parte adiciona
    setPlates([
      ...newPlates,
      plate
    ]);
  }
  function deletePlates(plate: Plates){
    const newPlates = plates.filter(p => p.title !== plate.title);
    setPlates(newPlates);
  }

  function openModal(){
    console.log('passou');
    setIsOpenModal(true);
  }
  function closeModal(){
    setIsOpenModal(false);
  }

  return (
    <PlatesContext.Provider value={{plates, setPlates,plateEdit, changePlateEdit, addPlates, editPlates,deletePlates, isOpenModal, openModal, closeModal}}>
          {children}
      </PlatesContext.Provider>
  );
}
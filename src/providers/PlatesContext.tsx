import { createContext, ReactNode, useState } from "react";
import { Modal } from "../components/Modal";
import { api } from "../services/api";

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

  async function addPlates(plate: Plates){
 
    if(!plate){
      throw new Error('Prato vazio');
    }

    //Salvar no banco de dados
    await api({
      method: "POST",
      url: "plates",
      data: plate,
    })
    .then(res => res.data)
    .catch(err => {
      throw new Error(err);
    });

    //Salvar no context
    if(plates)
      setPlates([
        ...plates,
        plate
      ]);
    else
      setPlates(plates);
  }

  async function editPlates(plate: Plates){
    if(! plate)
      throw new Error('Plato Vazio!');
     
    await api({
      method: 'PUT',
      url: `plates/${plate._id}`,
      data: plate
    })
    .then(res => res.data)
    .catch(err => { throw new Error(err) });

    //1 parte excluir
    const newPlates = plates.filter(p => p.title !== plate.title);
    newPlates.push(plate);
    newPlates.sort((a,b) => {
      if(a._id < b._id)
        return -1;
      return 1;
    });
    //2 parte adiciona
     setPlates(newPlates);
  }
  async function deletePlates(plate: Plates){
    const idDelete = await api({
      method: 'DELETE',
      url: `plates/${plate._id}`
    })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
      return null;
    })

    const newPlates = plates.filter(p => p.title !== plate.title);
    setPlates(newPlates);

    if(!idDelete)
      throw new Error('Não foi possivel apagar o plato!');
  }

  function openModal(){
    setIsOpenModal(true);
  }
  function closeModal(){
    setIsOpenModal(false);
  }

  return (
    <PlatesContext.Provider value={{plates,plateEdit, changePlateEdit, addPlates, editPlates,deletePlates, isOpenModal, openModal, closeModal}}>
          {isOpenModal && <Modal/>}
          {children}
      </PlatesContext.Provider>
  );
}
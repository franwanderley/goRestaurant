import { FormEvent, useContext, useState } from 'react';
import { FiCheckSquare, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { Plates, PlatesContext} from '../providers/PlatesContext';
import styles from '../styles/modal.module.css';

export function Modal(){
   const {
      closeModal, plateEdit, changePlateEdit,editPlates, addPlates
   } = useContext(PlatesContext);

   const [image, setImage] = useState(plateEdit?.image);
   const [title, setTitle] = useState(plateEdit?.title);
   const [price, setPrice] = useState<number>(Number(plateEdit?.price));
   const [description, setDescription] = useState(plateEdit?.description);

   function handleSubmit(form : FormEvent){
      form.preventDefault();
      closeModal();
      changePlateEdit(null);
      const plate = {
         image,
         title,
         price: price.toLocaleString(),
         description, 
         isAvaliable: true
      } as Plates;
      try{
         if(plateEdit){
            plate._id = plateEdit._id;
            editPlates(plate);
            Swal.fire('Plato Editado com Sucesso', '', 'success');
         }else{
            addPlates(plate);
            Swal.fire('Plato Salvo com Sucesso', '', 'success');
         }
      }catch(err){
         console.log(err);
         Swal.fire('Não foi possivel salvar este Plato', '', 'error');
      }
   }

   function handleCloseModal(){
      closeModal();
      changePlateEdit(null);
   }
   return (
      <div className={styles.overlay}>
         <div className={styles.container}>
            <button
               className={styles.btnclose}
               onClick={handleCloseModal}
            >
               <FiX/>
            </button>
            <h3>Novo Prato</h3>
            <form onSubmit={handleSubmit}>
               <div className={styles.form}>
                  <label htmlFor="url">URL da imagem</label>
                  <input 
                     type="text" id="uri"
                     required
                     value={image} 
                     placeholder="Cole o link aqui"
                     onChange={e => setImage(e.target.value)}
                  />
                  <div className={styles.juntos}>
                     <div className={styles.divnome}>
                        <label htmlFor="nome">Nome do Prato</label>
                        <input 
                           type="text" id="nome"
                           value={title} 
                           required 
                           placeholder="Ex: Moda Italiana"
                           onChange={e => setTitle(e.target.value)}
                        />
                     </div>
                     <div className={styles.divpreco}>
                        <label htmlFor="preco">Preço</label>
                        <input 
                           type="number"
                           required
                           value={price} 
                           id="preco"
                           onChange={e => setPrice(Number(e.target.value))}
                           />
                     </div>
                  </div>
                  <label htmlFor="descricao">Descrição</label>
                  <textarea 
                     className={styles.descricao}
                     value={description}
                     required id="descricao" 
                     onChange={e => setDescription(e.target.value)}
                  />
                  <button type="submit">
                     <div className={styles.textbutton}>
                        Adicionar Prato
                     </div>
                     <div className={styles.iconbutton}>
                        <FiCheckSquare/>
                     </div>
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
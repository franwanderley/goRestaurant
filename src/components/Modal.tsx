import { FormEvent, useContext, useState } from 'react';
import { FiCheckSquare, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { Plates, PlatesContext} from '../providers/PlatesContext';
import styles from '../styles/modal.module.css';

export function Modal(){
   const {
      closeModal, isOpenModal, plateEdit, changePlateEdit,editPlates, addPlates
   } = useContext(PlatesContext);
   const [imagem, setImagem] = useState(plateEdit?.image || '');
   const [nome, setNome] = useState(plateEdit?.title || '');
   const [preco, setPreco] = useState<number>(plateEdit && Number(plateEdit.price));
   const [descricao, setDescricao] = useState(plateEdit?.description || '');

   function handleSubmit(form : FormEvent){
      form.preventDefault();
      closeModal();
      changePlateEdit(undefined);
      const plate = {
         image: imagem,
         title: nome,
         price: preco.toLocaleString(), 
         description: descricao, 
         isAvaliable: true
      } as Plates;
      if(plateEdit){
         editPlates(plate);
         Swal.fire('Plato Editado com Sucesso', '', 'success');
      }else{
         addPlates(plate);
         Swal.fire('Plato Salvo com Sucesso', '', 'success');
      }
   }

   function handleCloseModal(){
      closeModal();
      changePlateEdit(undefined);
   }
   if(isOpenModal) return (
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
                     value={imagem} 
                     placeholder="Cole o link aqui"
                     onChange={e => setImagem(e.target.value)}
                  />
                  <div className={styles.juntos}>
                     <div className={styles.divnome}>
                        <label htmlFor="nome">Nome do Prato</label>
                        <input 
                           type="text" id="nome"
                           value={nome} 
                           required 
                           placeholder="Ex: Moda Italiana"
                           onChange={e => setNome(e.target.value)}
                        />
                     </div>
                     <div className={styles.divpreco}>
                        <label htmlFor="preco">Preço</label>
                        <input 
                           type="number"
                           required
                           value={preco} 
                           id="preco"
                           onChange={e => setPreco(Number(e.target.value))}
                           />
                     </div>
                  </div>
                  <label htmlFor="descricao">Descrição</label>
                  <textarea 
                     className={styles.descricao}
                     value={descricao}
                     required id="descricao" 
                     onChange={e => setDescricao(e.target.value)}
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
   else return (
      <div style={{display: 'none'}}></div>
   );
}
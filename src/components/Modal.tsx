import { FormEvent, useContext, useState } from 'react';
import { FiCheckSquare, FiX } from 'react-icons/fi';
import { Plates, PlatesContext} from '../providers/PlatesContext';
import styles from '../styles/modal.module.css';

export function Modal(){
   const {closeModal, addPlates} = useContext(PlatesContext);
   const [imagem, setImagem] = useState<string>();
   const [nome, setNome] = useState<string>();
   const [preco, setPreco] = useState<number>();
   const [descricao, setDescricao] = useState<string>();

   function handleSubmit(form : FormEvent){
      form.preventDefault();
      closeModal();
      const plate = {
         imagem,
         titulo: nome,
         preco: preco.toLocaleString(), 
         descricao, 
         isAvaliable: true
      } as Plates;
      addPlates(plate);
   }

   return (
      <div className={styles.overlay}>
         <div className={styles.container}>
            <button
               className={styles.btnclose}
               onClick={() => closeModal()}
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
                     placeholder="Cole o link aqui"
                     onChange={e => setImagem(e.target.value)}
                  />
                  <div className={styles.juntos}>
                     <div className={styles.divnome}>
                        <label htmlFor="nome">Nome do Prato</label>
                        <input 
                           type="text" id="nome" 
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
                           id="preco"
                           onChange={e => setPreco(Number(e.target.value))}
                           />
                     </div>
                  </div>
                  <label htmlFor="descricao">Descrição</label>
                  <textarea 
                     className={styles.descricao}
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
}
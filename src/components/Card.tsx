import { useContext, useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import Swal from 'sweetalert2';

import styles from '../styles/card.module.css';
import { Plates, PlatesContext } from '../providers/PlatesContext';

interface CardProps{
   data : Plates;
}

export function Card({data} : CardProps){
   const { editPlates,deletePlates, openModal, changePlateEdit } = useContext(PlatesContext);
   const [isAvailable, setIsAvailable] = useState(data.isAvaliable);

   function handleAvaliable(){
      setIsAvailable(oldValue => !oldValue);
      data.isAvaliable = !data.isAvaliable;
      editPlates(data);
   }
   function handleEdit(){
      changePlateEdit(data);
      openModal();
   }
   async function handleDelete(){
      if(data.isAvaliable){
         await Swal.fire('Erro!', 'Não é possivel apagar um prato disponivel!', 'error');
         return ;
      }

      await Swal.fire({
         title: 'Você tem certeza?',
         text: 'Você quer apagar esse prato?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Sim',
         cancelButtonText: 'Não'
       }).then(async (result) => {
         if (result.isConfirmed) {
           deletePlates(data);
           await Swal.fire(
             'Deleted!',
             'Seu prato foi apagado.',
             'success'
           )
         } else if (result.dismiss === Swal.DismissReason.cancel) {
           await Swal.fire(
             'Cancelled',
             'Seu prato foi salvo',
             'error'
           )
         }
       })
   }

   return (

      <div className={
         `${styles.container} ${!isAvailable && styles.opacity}`
      }>
         <div className={styles.image}>
            <img 
               src={data.image}
               className={styles.plates} 
               alt={data.title} 
            />
         </div>
         <div className={styles.details}>
            <h3>{data.title}</h3>
            <p>
               {data.description}
            </p>
            <p className={styles.price}>R$ {data.price}</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.divbutton}>
               <button onClick={handleEdit}>
                  <FiEdit3/>
               </button>
               <button onClick={handleDelete}><FiTrash/></button>
            </div>
            <div className={styles.divcheckbox}>
               <label htmlFor="disponivel">
                  {isAvailable ? 'Disponivel' : 'Indisponivel'}
               </label>
               <input 
                  type="checkbox"
                  checked={isAvailable} 
                  onChange={handleAvaliable} 
                  className={!isAvailable ? styles.indisponivel : styles.disponivel} 
                  id="disponivel" />
            </div>
         </div>
      </div>
   );
}
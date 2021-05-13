import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import styles from '../styles/card.module.css';
import Image from 'next/image';
import { Plates } from '../providers/PlatesContext';

interface CardProps{
   data : Plates;
}

export function Card({data} : CardProps){
   const [isAvailable, setIsAvailable] = useState(data.isAvaliable);
   return (

      <div className={styles.container}>
         <div className={styles.image}>
            <Image 
            src={data.imagem} 
            alt={data.titulo} 
            width="60px" height="40px" 
            layout="responsive"/>
         </div>
         <div className={styles.details}>
            <h3>{data.titulo}</h3>
            <p>
               {data.descricao}
            </p>
            <p className={styles.price}>R$ {data.preco}</p>
         </div>
         <div className={styles.footer}>
            <div className={styles.divbutton}>
               <button><FiEdit3/></button>
               <button><FiTrash/></button>
            </div>
            <div className={styles.divcheckbox}>
               <label htmlFor="disponivel">
                  {isAvailable ? 'Disponivel' : 'Indisponivel'}
               </label>
               <input 
                  type="checkbox"
                  checked={isAvailable} 
                  onChange={() => setIsAvailable(oldValue => !oldValue)} 
                  className={styles.disponivel} 
                  id="disponivel" />
            </div>
         </div>
      </div>
   );
}
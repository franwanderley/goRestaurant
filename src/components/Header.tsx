import styles from '../styles/header.module.css';
import { FiPlusSquare } from 'react-icons/fi';
import { useContext } from 'react';
import { PlatesContext } from '../providers/PlatesContext';

export function Header(){
   const { openModal } = useContext(PlatesContext);

   return (
      <div className={styles.container}>
         <div className={styles.heading}>
            <img src="goRestaurant.png" alt="Logo da Pagina GoRestaurant"/>
            <div style={{flexDirection: 'column'}}>
               <h1 className={styles.title}>GoRestaurant</h1>
               <p>Comida Italiana, sim</p>
            </div>
         </div>
         <div className={styles.options}>
            <button onClick={() => openModal()}>
               <div className={styles.textbutton}>
                  Novo Prato
               </div>
               <div className={styles.iconbutton}>
                  <FiPlusSquare/>
               </div>
            </button>
         </div>
      </div>
   );
};
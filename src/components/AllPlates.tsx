import { useContext } from "react";
import { PlatesContext } from "../providers/PlatesContext";
import styles from '../styles/Home.module.css';
import { Card } from "./Card";

export function AllPlates(){
   const {plates} = useContext(PlatesContext);
   console.log(plates);
   if(plates !== [])
      return (
         <>
            { plates.map(p => (
               <div key={p?._id} className={styles.card}> 
               <Card data={p}/> 
               </div>
            ))}
         </>
      );
   else
      return (
         <h3 style={{marginTop: '15%', color: 'var(--title)'}}>
            Nenhum Prato Cadastrado!
         </h3>   
      ); 
}
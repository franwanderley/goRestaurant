import { useContext } from 'react';
import { Card } from '../components/Card'
import { Header } from '../components/Header'
import { Modal } from '../components/Modal';
import { Plates, PlatesContext } from '../providers/PlatesContext'
import styles from '../styles/Home.module.css'


export default function Home() {
  const { isOpenModal } = useContext(PlatesContext);
  const card = {
    imagem: '/Ao-Molho.png',
    titulo: 'Ao Molho',
    descricao: 'Macarrão ao molho branco, fughi e cheiro verde das montanhas.',
    preco: '19,99',
    isAvaliable: true,
  } as Plates;

  return (
    <div className={styles.container}>
      {isOpenModal && (<Modal/>)}
      <Header/>
      <main className={styles.main}>
        <div style={{width: '30%'}}> 
          <Card data={card}/>
        </div>
        <div style={{width: '30%'}}> 
          <Card data={card}/>
        </div>
        <div style={{width: '30%'}}> 
          <Card data={card}/>
        </div>
        <div style={{width: '30%'}}> 
          <Card data={card}/>
        </div>
        <div style={{width: '30%'}}> 
          <Card data={card}/>
        </div>
        <div style={{width: '30%'}}> 
          <Card data={card}/>
        </div>
      </main>
    </div>
  )
}

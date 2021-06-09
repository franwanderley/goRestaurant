import { useContext, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { Header } from '../components/Header'
import { Modal } from '../components/Modal';
import { Plates, PlatesProvider } from '../providers/PlatesContext'
import styles from '../styles/Home.module.css'
import {api} from '../services/api';
import { AllPlates } from '../components/AllPlates';
import Swal from 'sweetalert2';

interface HomeProps{
  plates: Plates[] | null;
}

export default function Home({plates}: HomeProps ) {
  
  useEffect(() => {
    if(!plates)
      Swal.fire('Deu erro!');
  }, []);

  return (
    <PlatesProvider platesApi={plates}>
      <div className={styles.container}>
        <Header/>
        <main className={styles.main}>
          <AllPlates/>
        </main>
      </div>
    </PlatesProvider>
  )
}

export const getStaticProps : GetStaticProps = async () => {
  const plates = await api.get('plates')
  .then(res => res.data as Plates[])
  .catch(() => null);

  return {
    props: {
      plates
    }
  }
}

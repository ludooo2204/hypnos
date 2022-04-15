import { Alert } from '@mui/material';
import React, { useEffect } from 'react'
import styles from "./Home.module.css";

const Home = () => {
// useEffect(() => {
//  alert("fermer navbar on click")
// }, [])

  return (
    <div className={styles.fondEcran}>
        <div className={styles.citation}>"Aimer, c'est dire je t'aime sans parler..."</div>
        <div className={styles.logoHypnos}></div>
    </div>
  )
}

export default Home
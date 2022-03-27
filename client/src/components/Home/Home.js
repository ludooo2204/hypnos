import React from 'react'
import styles from "./Home.module.css";

const Home = () => {
  console.log(window.location.pathname)
  return (
    <div className={styles.fondEcran}>
        <div className={styles.citation}>"Aimer, c'est dire je t'aime sans parler..."</div>
        <div className={styles.logoHypnos}></div>
    </div>
  )
}

export default Home
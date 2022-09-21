import type { NextPage } from 'next'
import { HeroElement } from '../components/home'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout location="Home" title="Home">
      <div className={styles.home}>
        <div>Home</div>
        <HeroElement />
      </div>
    </Layout>
  )
}

export default Home

import React, { useState } from 'react'
import Layout from '../components/layout'
import styles from '../styles/Movies.module.css'

export default function Movies() {
  // const [results, setResults] = useState<any[]>([])
  // const [fetching, setFetching] = useState(false)

  return (
    <Layout title="Movies" location="Movies">
      <div className={styles.movies}></div>
    </Layout>
  )
}

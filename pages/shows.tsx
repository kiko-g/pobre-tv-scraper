import React, { useState } from 'react'
import Layout from '../components/layout'
import { Form, Results } from '../components/shows'
import styles from '../styles/Shows.module.css'

export default function Shows() {
  const [results, setResults] = useState<any[]>([])
  const [fetching, setFetching] = useState(false)

  return (
    <Layout title="Shows" location="Shows">
      <div className={styles.shows}>
        <Form resultsHook={[results, setResults]} fetchingHook={[fetching, setFetching]} />
        <Results resultsHook={[results, setResults]} fetchingHook={[fetching, setFetching]} />
      </div>
    </Layout>
  )
}

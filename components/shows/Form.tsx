import axios from 'axios'
import * as cheerio from 'cheerio'
import React, { useState } from 'react'
import Suggestions from './Suggestions';
import { ExclamationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Season, Series } from '../../@types'

type Props = {
  resultsHook: [string[][], React.Dispatch<React.SetStateAction<string[][]>>]
  fetchingHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function Form({ resultsHook, fetchingHook }: Props) {
  const [tvShowLink, setTvShowLink] = useState('')
  const [, setResults] = resultsHook
  const [error, setError] = useState(false)
  const [fetching, setFetching] = fetchingHook

  const validateLink = () => {
    if (!tvShowLink.includes('pobre') && !tvShowLink.includes('tvshow')) {
      setError(true)
      setTimeout(() => setError(false), 5000)
      return false
    }

    setError(false)
    return true
  }

  const scrapePobreTv = () => {
    if (!validateLink()) return

    setFetching(true)

    const seasonUrls: string[] = [tvShowLink]
    const seasonEpisodesUrls: string[][] = []

    let seriesName: string = ''
    const seriesUrl = tvShowLink
    const seriesSeasons: Season[] = []

    axios
      .get(tvShowLink, { responseEncoding: 'binary' })
      .then((response) => {
        const $ = cheerio.load(response.data.toString('latin1'))
        const target = $('#seasonsList')

        seriesName = $('section > h1').text()
        $(target)
          .find('.item')
          .each((i, e) => {
            const url = $(e).attr('href') || ''
            seasonUrls.push(url)
          })
      })
      .then(async () => {
        for (let i = 0; i < seasonUrls.length; i++) {
          const seasonUrl = seasonUrls[i]
          const episodesUrls: string[] = []

          await axios.get(seasonUrl).then((response) => {
            const $ = cheerio.load(response.data)
            const target = $('#episodesList')
            $(target)
              .find('a')
              .each((i, e) => {
                const episodeUrl = $(e).attr('href') || ''
                episodesUrls.push(episodeUrl)
              })

            if (episodesUrls.length !== 0) {
              seasonEpisodesUrls.push(episodesUrls)
            }
          })
        }
      })
      .then(() => {
        console.log(seasonEpisodesUrls)
      })
      .then(() => {
        const series: Series = {
          url: seriesUrl,
          name: seriesName,
          seasons: [],
        }
        setResults(seasonEpisodesUrls)
        setFetching(false)
      })
      .catch(function (e) {
        console.warn(e)
      })
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded bg-lightest px-4 pt-4 pb-4 font-normal dark:bg-dark">
      {/* Form */}
      <div className="w-full">
        <label htmlFor="website" className="text block font-medium">
          <a href="https://pobre.tv" className="hover:underline">
            PobreTV
          </a>{' '}
          link to tvshow
        </label>
        <div className="mt-1 flex w-full rounded-none">
          <span
            className="hidden items-center rounded-none rounded-l border 
              border-slate-500 bg-slate-500 px-3 text-white lg:inline-flex"
          >
            https://
          </span>
          <input
            type="search"
            name="website"
            id="website"
            placeholder="wwwN.pobre.wtf/tvshows/tt1234567"
            value={tvShowLink}
            onChange={(e) => setTvShowLink(e.target.value)}
            className="block w-full flex-1 rounded-l border-y border-transparent 
            bg-lightish px-3 py-2 dark:bg-darkish lg:rounded-none"
          />
          <button
            type="submit"
            onClick={scrapePobreTv}
            disabled={tvShowLink === ''}
            className="inline-flex items-center justify-center rounded-none rounded-r border 
              border-primary bg-primary py-2 px-3 text-white shadow transition 
              enabled:hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="w-full">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ExclamationCircleIcon className="inline-flex h-[1.2rem] w-auto text-red-500" />
            <span>
              Provided link does not correspond to a tvshow on{' '}
              <a href="https://pobre.tv" className="text-blue-500 hover:underline">
                PobreTV
              </a>
              .
            </span>
          </div>
        </div>
      )}

      {/* Suggestions */}
      <Suggestions setTvShowLink={setTvShowLink} />
    </div>
  )
}

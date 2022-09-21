import React from 'react'
import Skeleton from './Skeleton'
import { ClipboardIcon, ArrowDownOnSquareIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

type Props = {
  resultsHook: [string[][], React.Dispatch<React.SetStateAction<string[][]>>]
  fetchingHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function Results({ resultsHook, fetchingHook }: Props) {
  const [results] = resultsHook
  const [fetching] = fetchingHook

  return fetching ? (
    <div className="flex w-full flex-col gap-8 rounded bg-lightest py-6 px-6 dark:bg-dark lg:flex-row">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={`skeleton-${index}`} />
        ))}
    </div>
  ) : (
    <div className="flex w-full flex-col gap-4 rounded bg-lightest py-6 px-6 dark:bg-dark">
      {results.length === 0 ? (
        <span>No results found yet.</span>
      ) : (
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:flex-wrap">
          {results.map((season, seasonIdx) => (
            <div key={`season-${seasonIdx}`}>
              <h2 className="mb-2 text-3xl font-bold tracking-wide">Season {seasonIdx + 1}</h2>
              <ul>
                {season.map((episode, episodeIdx) => (
                  <li key={`episode-${seasonIdx}-${episodeIdx}`} className="flex items-center justify-start gap-x-3">
                    <a href={episode} target="_blank" rel="noreferrer" className="font-normal hover:underline">
                      <span>Episode {episodeIdx + 1}</span>
                    </a>
                    <div className="flex items-center justify-center gap-x-1 text-teal-700 dark:text-teal-600">
                      <button className="hover:opacity-80">
                        <ClipboardIcon className="h-[1.1rem] w-[1.1rem]" />
                      </button>

                      <button className="hover:opacity-80">
                        <ArrowTopRightOnSquareIcon className="h-[1.1rem] w-[1.1rem]" />
                      </button>

                      <button className="hover:opacity-80">
                        <ArrowDownOnSquareIcon className="h-[1.1rem] w-[1.1rem]" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

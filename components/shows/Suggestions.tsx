import React, { useState } from 'react'
import classNames from 'classnames'
import suggestions from '../../data/shows.json'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { Show } from '../../@types'

type Props = {
  setTvShowLink: React.Dispatch<React.SetStateAction<string>>
}

export default function Suggestions({ setTvShowLink }: Props) {
  const limit = 5
  const [more, setMore] = useState(false)
  const [search, setSearch] = useState('')

  return suggestions.length > 0 ? (
    <>
      <div className="mt-1 flex w-full rounded-md shadow-sm">
        <input
          type="text"
          value={search}
          id="suggestion-search"
          name="suggestion-search"
          placeholder="Search TV Show name"
          className="w-full rounded bg-lightish px-3 py-2 dark:bg-darkish"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-col gap-x-2 lg:flex-row">
        <div className="flex flex-col items-start gap-2 pb-4 lg:flex-row lg:items-center lg:overflow-scroll">
          {suggestions
            .filter(
              (show: Show) =>
                show.name.toLowerCase().replace(/\s+/g, '').includes(search.toLowerCase().replace(/\s+/g, '')) ||
                show.shorthand.toLowerCase().replace(/\s+/g, '').includes(search.toLowerCase().replace(/\s+/g, ''))
            )
            .slice(0, more ? suggestions.length : limit)
            .map((show: Show, showIdx: number) => (
              <button
                key={`suggestion-${showIdx}`}
                onClick={() => setTvShowLink(show.url)}
                title={`Paste "${show.name}" (${show.shorthand}) into search bar`}
                className="rounded bg-primary px-2 py-1.5 text-sm text-white 
                  shadow transition hover:opacity-80"
              >
                <span className="whitespace-nowrap">{show.name}</span>
              </button>
            ))}
        </div>

        <button
          onClick={() => setMore(more ? false : true)}
          className={classNames(
            more ? 'bg-rose-700' : 'bg-teal-700',
            'mt-0 h-min w-min rounded px-2 py-1.5 text-sm text-white shadow transition hover:opacity-80 lg:w-auto'
          )}
        >
          {more ? <MinusCircleIcon className="h-5 w-5" /> : <PlusCircleIcon className="h-5 w-5" />}
        </button>
      </div>
    </>
  ) : null
}

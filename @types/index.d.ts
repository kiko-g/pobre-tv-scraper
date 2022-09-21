export type Series = {
  url: string
  name: string
  seasons: Season[]
}

export type Season = {
  tag: number | 'Special'
  episodes: Episode[]
}

export type Episode = {
  url: string
  download: string
}

export type Show = {
  name: string
  shorthand: string
  url: string
}

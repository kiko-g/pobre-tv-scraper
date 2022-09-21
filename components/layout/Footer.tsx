import { GithubIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from '../svgs'
import { GlobeAltIcon, InboxIcon } from '@heroicons/react/24/outline'

type Social = {
  label: string
  url: string
  icon: any
}

const socials: Social[] = [
  { label: 'Github', url: 'https://github.com/kiko-g', icon: GithubIcon },
  { label: 'Website', url: 'https://instagram.com/kikogoncalves_', icon: InstagramIcon },
  { label: 'Twitter', url: 'https://twitter.com/kikogoncalves_', icon: TwitterIcon },
  { label: 'Linkedin', url: 'https://linkedin.com/in/kikogoncalves', icon: LinkedinIcon },
  { label: 'Instagram', url: 'https://instagram.com/kikogoncalves_', icon: GlobeAltIcon },
  { label: 'Email', url: 'mailto:kikojpgoncalves@gmail.com', icon: InboxIcon },
]

export default function Footer() {
  return (
    <footer className="mt-8 bg-lightNavy px-2 py-2 transition dark:bg-darkest md:px-3 md:py-4">
      <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0">
        <ul className="mt-4 flex items-center justify-center space-x-4 sm:mt-0">
          {socials.map((social, socialIdx) => (
            <li key={`footer-social-${socialIdx}`}>
              <a
                className="inline-flex items-center justify-center text-sm transition hover:opacity-80"
                href={social.url}
                target="_blank"
                rel="noreferrer"
              >
                <social.icon className="hover:-trangray-y-1 h-8 w-8 rounded text-white transition hover:opacity-80" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center justify-center text-base text-white dark:text-gray-300 sm:text-center lg:items-end">
          <p>
            © 2022{' '}
            <a
              href="https://www.kikogoncalves.com"
              rel="noreferrer"
              target="_blank"
              className="hover:text-blue-300 hover:underline"
            >
              Francisco Gonçalves
            </a>
            ™
          </p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

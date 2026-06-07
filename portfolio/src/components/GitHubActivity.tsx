import { useEffect, useState } from 'react'
import { FaGithub, FaSpinner } from 'react-icons/fa'
import { GitHubCalendar } from 'react-github-calendar'

type GitHubUser = {
  login: string
  public_repos: number
  followers: number
  following: number
  avatar_url: string
  profile_url: string
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Aun-shahid')
        if (!response.ok) throw new Error('Failed to fetch GitHub data')
        
        const user = await response.json()
        setData({
          login: user.login,
          public_repos: user.public_repos,
          followers: user.followers,
          following: user.following,
          avatar_url: user.avatar_url,
          profile_url: user.html_url,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading GitHub data')
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-6 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
        <FaSpinner className="animate-spin" />
        <span className="text-sm font-medium">Loading GitHub activity...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-300/20 dark:bg-red-300/10 dark:text-red-200">
        {error}
      </div>
    )
  }

  if (!data) return null

  return (
    <a
      href={data.profile_url}
      target="_blank"
      rel="noreferrer"
      className="block w-full min-w-0 max-w-full space-y-4 overflow-hidden rounded-lg border border-slate-200 bg-white p-4 text-center transition hover:border-teal-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-teal-300/60 sm:p-5"
    >
      <div className="flex flex-col items-center gap-3">
        <img
          src={data.avatar_url}
          alt={data.login}
          className="h-10 w-10 rounded-full border border-slate-200 dark:border-white/10"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">
              GitHub Contributions
            </h3>
            <FaGithub className="text-slate-600 dark:text-slate-400" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            @{data.login}
          </p>
        </div>
      </div>

      <div className="github-calendar-scroll -mx-1 w-full max-w-full overflow-x-auto pb-3 sm:mx-0">
        <div className="github-calendar-frame align-top">
          <GitHubCalendar
            username="Aun-shahid"
            year={2026}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4 dark:border-white/10">
        <div className="text-center">
          <p className="text-base font-extrabold text-teal-700 dark:text-teal-300">
            {data.public_repos}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Repos</p>
        </div>
        <div className="text-center">
          <p className="text-base font-extrabold text-teal-700 dark:text-teal-300">
            {data.followers}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-base font-extrabold text-teal-700 dark:text-teal-300">
            {data.following}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">Following</p>
        </div>
      </div>
    </a>
  )
}

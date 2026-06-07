import { useState, useEffect } from 'react'
import { FaEye, FaHeart } from 'react-icons/fa'
import { portfolioInsightsService, type Appreciation } from '../services/firebase'

export default function PortfolioInsights() {
  const [views, setViews] = useState(0)
  const [appreciations, setAppreciations] = useState<Appreciation[]>([])
  const [showNameModal, setShowNameModal] = useState(false)
  const [name, setName] = useState('')
  const [isAppreciated, setIsAppreciated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Generate browser fingerprint for deduplication
  const getBrowserFingerprint = () => {
    const ua = navigator.userAgent
    const screenRes = `${window.screen.width}x${window.screen.height}`
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return btoa(`${ua}|${screenRes}|${tz}`).substring(0, 16)
  }

  useEffect(() => {
    const setupListeners = async () => {
      try {
        setIsLoading(true)

        // Check if user has already viewed today
        const lastViewDate = localStorage.getItem('portfolioLastViewDate')
        const today = new Date().toDateString()
        
        if (lastViewDate !== today) {
          // New day, increment view count on Firebase
          await portfolioInsightsService.incrementViews()
          localStorage.setItem('portfolioLastViewDate', today)
        }

        // Set up real-time listener for views
        const unsubscribeViews = portfolioInsightsService.onViewsChange((viewCount) => {
          setViews(viewCount)
        })

        // Set up real-time listener for appreciations
        const unsubscribeAppreciations = portfolioInsightsService.onAppreciationsChange((appreciationList) => {
          setAppreciations(appreciationList)

          // Check if current browser has already appreciated
          const fingerprint = getBrowserFingerprint()
          const hasAppreciated = appreciationList.some((a) => a.fingerprint === fingerprint)
          setIsAppreciated(hasAppreciated)
        })

        setIsLoading(false)

        // Cleanup listeners on unmount
        return () => {
          unsubscribeViews()
          unsubscribeAppreciations()
        }
      } catch (err) {
        setError('Failed to connect to Firebase. Using local data only.')
        setIsLoading(false)
        console.error('Firebase setup error:', err)
      }
    }

    setupListeners()
  }, [])

  const handleAppreciate = () => {
    if (!isAppreciated) {
      setShowNameModal(true)
    }
  }

  const submitAppreciation = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prevent double submission
    if (isAppreciated) {
      setShowNameModal(false)
      return
    }
    
    const fingerprint = getBrowserFingerprint()
    const appreciation: Appreciation = {
      name: name || 'Anonymous',
      fingerprint: fingerprint,
      timestamp: new Date().toISOString(),
    }
    
    try {
      await portfolioInsightsService.addAppreciation(appreciation)
      setIsAppreciated(true)
      setName('')
      setShowNameModal(false)
    } catch (err) {
      setError('Failed to save appreciation. Please try again.')
      console.error('Error saving appreciation:', err)
    }
  }

  if (error) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-200">
        {error}
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <FaEye className="text-lg text-teal-700 dark:text-teal-300" />
            <h3 className="font-extrabold text-slate-950 dark:text-white">Total Views</h3>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-teal-700 dark:text-teal-300">
            {isLoading ? '—' : views.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            {isLoading ? 'Loading...' : 'Unique visits to this portfolio'}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <FaHeart className="text-lg text-red-500 dark:text-pink-400" />
            <h3 className="font-extrabold text-slate-950 dark:text-white">Appreciation Count</h3>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-red-500 dark:text-pink-400">
            {isLoading ? '—' : appreciations.length}
          </p>
          <button
            onClick={handleAppreciate}
            disabled={isAppreciated}
            className={`mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-extrabold transition ${
              isAppreciated
                ? 'cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
                : 'bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-pink-400/10 dark:text-pink-300 dark:hover:bg-pink-400/20'
            }`}
          >
            <FaHeart className="text-xs" />
            {isAppreciated ? 'Already appreciated' : 'Show appreciation'}
          </button>
        </div>
      </div>

      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-slate-950 dark:text-white">
            <h2 className="text-lg font-extrabold">Thank you for the appreciation! 🎉</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Enter your name (optional) so I know who appreciated this.
            </p>
            
            <form onSubmit={submitAppreciation} className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Your name (or leave blank for Anonymous)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:border-teal-300 focus:outline-none focus:ring-1 focus:ring-teal-300 dark:border-white/10 dark:bg-slate-900 dark:placeholder-slate-500 dark:focus:border-teal-300 dark:focus:ring-teal-300"
                autoFocus
              />
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setName('')
                    setShowNameModal(false)
                  }}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-950 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-extrabold text-white transition hover:bg-red-600 dark:bg-pink-500 dark:hover:bg-pink-600"
                >
                  Send Appreciation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

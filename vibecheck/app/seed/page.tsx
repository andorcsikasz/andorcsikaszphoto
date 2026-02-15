'use client'

import { useState } from 'react'

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [email, setEmail] = useState('me@example.com')
  const [name, setName] = useState('Me')

  const handleSeed = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/seed/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({
        error: 'Failed to seed events',
        details: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Seed Demo Events</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This will create 12 demo events:
          <br />
          • 4 events created by you
          <br />
          • 8 events where you are invited
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                placeholder="Your Name"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSeed}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating events...' : 'Create Demo Events'}
        </button>

        {result && (
          <div className={`mt-6 p-6 rounded-lg ${result.error ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
            {result.error ? (
              <div>
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Error</h3>
                <p className="text-red-600 dark:text-red-300">{result.error}</p>
                {result.details && (
                  <p className="text-sm text-red-500 dark:text-red-400 mt-2">{result.details}</p>
                )}
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Success!</h3>
                <p className="text-green-600 dark:text-green-300 mb-4">{result.message}</p>
                {result.summary && (
                  <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <p>• Events created by you: {result.summary.eventsCreatedByMe}</p>
                    <p>• Events where you&apos;re invited: {result.summary.eventsInvitedTo}</p>
                    <p>• Total events: {result.summary.totalEvents}</p>
                  </div>
                )}
                {result.created && result.created.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2">Created items:</p>
                    <ul className="text-sm space-y-1 max-h-60 overflow-y-auto">
                      {result.created.map((item: string, idx: number) => (
                        <li key={idx} className="text-green-700 dark:text-green-300">
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.errors && result.errors.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">Errors:</p>
                    <ul className="text-sm space-y-1">
                      {result.errors.map((error: string, idx: number) => (
                        <li key={idx} className="text-red-600 dark:text-red-400">
                          ✗ {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}




'use client'

import { useState, useEffect } from 'react'

// Exam data with detailed syllabus
const exams = [
  {
    id: 1,
    name: 'Yoga',
    date: new Date('2026-03-07T10:30:00'),
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-700',
    icon: '🧘',
    syllabus: {
      'Book 1 - Introduction to Yoga': ['Chapter 1: Meaning & Definitions', 'Chapter 2: Historical Development', 'Chapter 3: Schools of Yoga', 'Chapter 4: Yogic Practices', 'Chapter 5: Surya Namaskar'],
      'Book 2 - Yoga for Wellness': ['Chapter 1: Yoga & Health', 'Chapter 2: Yogic Kriyas', 'Chapter 3: Pranayama & Meditation']
    }
  },
  {
    id: 2,
    name: 'English',
    date: new Date('2026-03-12T10:30:00'),
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-700',
    icon: '📖',
    syllabus: {
      'Flamingo - Prose': ['The Last Lesson', 'Lost Spring', 'Deep Water', 'The Rattrap', 'Indigo', 'Poets and Pancakes', 'The Interview', 'Going Places'],
      'Flamingo - Poetry': ['My Mother at Sixty-Six', 'Keeping Quiet', 'A Thing of Beauty', 'A Roadside Stand', 'Aunt Jennifer\'s Tigers'],
      'Vistas': ['The Third Level', 'The Tiger King', 'Journey to the End of the Earth', 'The Enemy', 'On the Face of It', 'Memories of Childhood'],
      'Grammar & Writing': ['Reading Comprehension', 'Creative Writing', 'Letter Writing', 'Article/Report Writing']
    }
  },
  {
    id: 3,
    name: 'Economics',
    date: new Date('2026-03-18T10:30:00'),
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    textColor: 'text-green-700',
    icon: '📊',
    syllabus: {
      'Macroeconomics': ['National Income & Related Aggregates', 'Money and Banking', 'Determination of Income & Employment', 'Government Budget & Economy', 'Foreign Exchange Rate', 'Balance of Payments'],
      'Indian Economic Development': ['Development Experience (1947-90)', 'Economic Reforms since 1991', 'Current Challenges', 'Comparative Development', 'Sustainable Development', 'India & Pakistan/China Comparison']
    }
  },
  {
    id: 4,
    name: 'IP',
    date: new Date('2026-03-25T10:30:00'),
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    textColor: 'text-orange-700',
    icon: '💻',
    syllabus: {
      'Data Handling (Pandas)': ['Series in Pandas', 'DataFrame Operations', 'Data Import/Export', 'Data Visualization'],
      'Database Query (SQL)': ['SQL Commands', 'Functions in SQL', 'Joins', 'Group By & Having'],
      'Computer Networks': ['Network Concepts', 'Types of Networks', 'Network Devices', 'Protocols'],
      'Societal Impacts': ['Digital Divide', 'Cyber Security', 'E-Waste', 'IT Laws']
    }
  },
  {
    id: 5,
    name: 'Business',
    date: new Date('2026-03-28T10:30:00'),
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-300',
    textColor: 'text-rose-700',
    icon: '💼',
    syllabus: {
      'Principles of Management': ['Nature & Significance of Management', 'Principles of Management', 'Business Environment', 'Planning'],
      'Functions of Management': ['Organising', 'Staffing', 'Directing', 'Controlling'],
      'Business Finance': ['Financial Management', 'Financial Markets'],
      'Marketing': ['Marketing Management', 'Consumer Protection']
    }
  }
]

// Study gaps between exams
const studyGaps = [
  { from: 'Yoga', to: 'English', days: 5, topics: 19, perDay: 3.8 },
  { from: 'English', to: 'Economics', days: 6, topics: 12, perDay: 2 },
  { from: 'Economics', to: 'IP', days: 7, topics: 16, perDay: 2.3 },
  { from: 'IP', to: 'Business', days: 3, topics: 12, perDay: 4 }
]

const motivationalQuotes = [
  "Success is the sum of small efforts repeated day in and day out! 🌟",
  "The gap between exams is your golden opportunity - use it wisely! 💪",
  "Every chapter you study today is a mark you earn tomorrow! 📚",
  "Dreams don't work unless you do! ⭐",
  "Your future self will thank you for the effort you put in today! 🎯"
]

// Storage key for localStorage
const STORAGE_KEY = 'nitu_study_dashboard_completed'

// Helper to load saved progress from localStorage
const loadSavedProgress = (): Set<string> => {
  if (typeof window === 'undefined') return new Set()
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return new Set(JSON.parse(saved))
    } catch (e) {
      return new Set()
    }
  }
  return new Set()
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null)
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(loadSavedProgress)
  const [showWarning, setShowWarning] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length)
    }, 8000)
    return () => clearInterval(quoteTimer)
  }, [])

  const getTimeRemaining = (targetDate: Date) => {
    const total = targetDate.getTime() - currentTime.getTime()
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((total % (1000 * 60)) / 1000)
    return { total, days, hours, minutes, seconds }
  }

  const getNextExam = () => {
    const now = currentTime.getTime()
    for (const exam of exams) {
      if (exam.date.getTime() > now) {
        return exam
      }
    }
    return exams[exams.length - 1]
  }

  const getTotalTopics = (syllabus: Record<string, string[]>) => {
    return Object.values(syllabus).reduce((acc, topics) => acc + topics.length, 0)
  }

  const toggleTopic = (topicId: string) => {
    const newCompleted = new Set(completedTopics)
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId)
    } else {
      newCompleted.add(topicId)
    }
    setCompletedTopics(newCompleted)
    // Save to localstorage
    localstorage.setItem(STORAGE_KEY, JSON.stringify([...newCompleted]))
  }

  // Reset all progress
  const resetProgress = () => {
    setCompletedTopics(new Set())
    localStorage.removeItem(STORAGE_KEY)
  }

  const nextExam = getNextExam()
  const daysUntilFirstExam = getTimeRemaining(exams[0].date).days

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-8">
          <div className="inline-block animate-pulse mb-2">
            <span className="text-5xl">👋</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent mb-4">
            Hello Nitu!
          </h1>
          <p className="text-slate-300 text-lg mb-4">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            <span className="mx-2">|</span>
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-4 max-w-2xl mx-auto border border-amber-400/30">
            <p className="text-amber-200 text-lg font-medium animate-fade-in">
              {motivationalQuotes[quoteIndex]}
            </p>
          </div>
        </header>

        {/* URGENT WARNING BANNER */}
        {showWarning && (
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <button 
              onClick={() => setShowWarning(false)}
              className="absolute top-2 right-4 text-white/60 hover:text-white text-2xl"
            >
              ×
            </button>
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl animate-bounce">⚠️</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">REALITY CHECK!</h2>
                  <p className="text-red-100 text-lg">This is NOT a vacation - these are STUDY GAPS!</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {studyGaps.map((gap, idx) => (
                  <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                    <p className="text-white/70 text-sm">{gap.from} → {gap.to}</p>
                    <p className="text-3xl font-bold text-white">{gap.days}</p>
                    <p className="text-white/70 text-sm">days only!</p>
                    <p className="text-yellow-300 font-semibold text-sm mt-1">{gap.perDay.toFixed(1)} topics/day</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Next Exam Countdown */}
        <div className="bg-gradient-to-r from-indigo-600/80 to-purple-600/80 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-indigo-200 text-lg mb-1">⏰ NEXT EXAM IN</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {nextExam.icon} {nextExam.name}
              </h2>
              <p className="text-indigo-200">
                {nextExam.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex gap-3 md:gap-4">
              {(() => {
                const time = getTimeRemaining(nextExam.date)
                return (
                  <>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[80px]">
                      <p className="text-4xl md:text-5xl font-bold text-white">{time.days}</p>
                      <p className="text-indigo-200 text-sm">Days</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[80px]">
                      <p className="text-4xl md:text-5xl font-bold text-white">{time.hours}</p>
                      <p className="text-indigo-200 text-sm">Hours</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[80px]">
                      <p className="text-4xl md:text-5xl font-bold text-white">{time.minutes}</p>
                      <p className="text-indigo-200 text-sm">Minutes</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[80px]">
                      <p className="text-4xl md:text-5xl font-bold text-white">{time.seconds}</p>
                      <p className="text-indigo-200 text-sm">Seconds</p>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>

        {/* All Exams Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {exams.map((exam) => {
            const time = getTimeRemaining(exam.date)
            const isPast = time.total < 0
            const isNext = nextExam.id === exam.id
            
            return (
              <div 
                key={exam.id}
                className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  isNext ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-slate-900 scale-105' : ''
                } ${isPast ? 'opacity-50' : ''}`}
              >
                <div className={`bg-gradient-to-br ${exam.color} p-5 h-full`}>
                  {isNext && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                      NEXT
                    </div>
                  )}
                  {isPast && (
                    <div className="absolute top-2 right-2 bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full">
                      ✓ DONE
                    </div>
                  )}
                  <div className="text-4xl mb-2">{exam.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{exam.name}</h3>
                  <p className="text-white/80 text-sm">
                    {exam.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  {!isPast && (
                    <p className="text-white/90 font-bold text-2xl mt-2">
                      {time.days}d {time.hours}h
                    </p>
                  )}
                  <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-white/80 transition-all duration-1000"
                      style={{ 
                        width: `${Math.min(100, Math.max(0, 100 - (time.total / (1000 * 60 * 60 * 24 * 30)) * 100))}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Study Gap Analysis */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">📚</span>
            Study Gap Analysis - Your Strategic Advantage!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyGaps.map((gap, idx) => {
              const fromExam = exams.find(e => e.name === gap.from)
              const toExam = exams.find(e => e.name === gap.to)
              const urgencyLevel = gap.perDay >= 4 ? 'high' : gap.perDay >= 3 ? 'medium' : 'low'
              const urgencyColors = {
                high: 'from-red-500 to-orange-500',
                medium: 'from-yellow-500 to-amber-500',
                low: 'from-green-500 to-emerald-500'
              }
              
              return (
                <div key={idx} className="bg-slate-700/50 rounded-2xl p-5 border border-slate-600">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{fromExam?.icon}</span>
                      <span className="text-white">→</span>
                      <span className="text-2xl">{toExam?.icon}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${urgencyColors[urgencyLevel]}`}>
                      {urgencyLevel.toUpperCase()} URGENCY
                    </span>
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-white">{gap.days}</p>
                    <p className="text-slate-400">Study Days</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>Topics to Cover:</span>
                      <span className="font-bold text-white">{gap.topics}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Topics/Day Needed:</span>
                      <span className="font-bold text-yellow-400">{gap.perDay.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Study Hours/Day:</span>
                      <span className="font-bold text-cyan-400">{Math.ceil(gap.perDay * 1.5)}h</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detailed Syllabus Tracker */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">✅</span>
            Syllabus Progress Tracker
          </h2>
          <div className="space-y-4">
            {exams.map((exam) => {
              const totalTopics = getTotalTopics(exam.syllabus)
              const completedCount = Object.entries(exam.syllabus).flatMap(([section, topics]) => 
                topics.filter(t => completedTopics.has(`${exam.name}-${section}-${t}`))
              ).length
              const progress = (completedCount / totalTopics) * 100
              const isExpanded = expandedSubject === exam.id
              
              return (
                <div key={exam.id} className={`bg-gradient-to-r ${exam.color} rounded-2xl overflow-hidden`}>
                  <button
                    onClick={() => setExpandedSubject(isExpanded ? null : exam.id)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{exam.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{exam.name}</h3>
                        <p className="text-white/80">{completedCount}/{totalTopics} topics completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-white/30 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-white transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-bold">{Math.round(progress)}%</span>
                      <span className="text-2xl text-white/70">{isExpanded ? '▼' : '▶'}</span>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="bg-slate-900/50 p-5">
                      {Object.entries(exam.syllabus).map(([section, topics]) => (
                        <div key={section} className="mb-6 last:mb-0">
                          <h4 className="text-white font-semibold mb-3 text-lg">{section}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {topics.map((topic) => {
                              const topicId = `${exam.name}-${section}-${topic}`
                              const isCompleted = completedTopics.has(topicId)
                              
                              return (
                                <button
                                  key={topic}
                                  onClick={() => toggleTopic(topicId)}
                                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                                    isCompleted 
                                      ? 'bg-green-500/30 border-green-400' 
                                      : 'bg-slate-700/50 hover:bg-slate-700 border-slate-600'
                                  } border text-left`}
                                >
                                  <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    isCompleted ? 'bg-green-500' : 'bg-slate-600'
                                  }`}>
                                    {isCompleted ? '✓' : ''}
                                  </span>
                                  <span className={`${isCompleted ? 'text-green-300 line-through' : 'text-slate-200'}`}>
                                    {topic}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Study Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Daily Study Plan */}
          <div className="bg-gradient-to-br from-cyan-600/80 to-blue-600/80 backdrop-blur-sm rounded-3xl p-6 border border-cyan-400/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Daily Study Plan Suggestion
            </h2>
            <div className="space-y-3">
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-cyan-100 text-sm">Morning (6 AM - 12 PM)</p>
                <p className="text-white font-semibold">New Topics - Fresh Mind! 📖</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-cyan-100 text-sm">Afternoon (2 PM - 5 PM)</p>
                <p className="text-white font-semibold">Practice & Revision ✍️</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-cyan-100 text-sm">Evening (7 PM - 10 PM)</p>
                <p className="text-white font-semibold">Previous Year Questions 📄</p>
              </div>
            </div>
          </div>

          {/* Motivation & Reality Check */}
          <div className="bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-sm rounded-3xl p-6 border border-purple-400/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Remember These Points!
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-yellow-300">★</span>
                <span>Every gap day is a chance to score <strong className="text-yellow-300">10+ marks</strong> more!</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-yellow-300">★</span>
                <span>Consistent 6-8 hours daily can transform your results!</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-yellow-300">★</span>
                <span>Board exams are once in a lifetime - make them count!</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-yellow-300">★</span>
                <span>Your future college admission depends on THESE marks!</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <span className="text-yellow-300">★</span>
                <span>3 days before Business exam = Intensive revision mode! 🔥</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 border border-slate-700">
          <div classname="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Your Board Exam Journey Stats
            </h2>
            <button 
              onClick={resetProgress}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm border boreder-red-500/30 transition-colors"
            >
              🗑️ Reset Progress
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-yellow-400">{exams.length}</p>
              <p className="text-slate-400">Total Exams</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-cyan-400">{exams.reduce((acc, e) => acc + getTotalTopics(e.syllabus), 0)}</p>
              <p className="text-slate-400">Total Topics</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-green-400">{completedTopics.size}</p>
              <p className="text-slate-400">Completed</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-pink-400">{Math.round((completedTopics.size / exams.reduce((acc, e) => acc + getTotalTopics(e.syllabus), 0)) * 100)}%</p>
              <p className="text-slate-400">Progress</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-slate-400">
          <p>Made with 💜 for Nitu | CBSE Class 12 Board Exams 2026</p>
          <p className="text-sm mt-2">Remember: Every hour counts. You've got this! 💪</p>
        </footer>
      </div>
    </div>
  )
}

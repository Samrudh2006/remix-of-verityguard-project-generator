import React from 'react';

function Leaderboard() {
  const topUsers = [
    {
      id: 1,
      name: 'Sarah Chen',
      initials: 'SC',
      rank: 1,
      points: 12450,
      badge: 'Verified Guardian',
      badgeColor: 'text-cyan-400',
      trophy: '🏆',
      avatar: 'bg-gradient-to-br from-cyan-400 to-blue-500'
    },
    {
      id: 2,
      name: 'Alex Kumar',
      initials: 'AK',
      rank: 2,
      points: 10200,
      badge: 'Platinum',
      badgeColor: 'text-purple-400',
      trophy: '🥈',
      avatar: 'bg-gradient-to-br from-purple-400 to-pink-500'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      initials: 'MG',
      rank: 3,
      points: 8750,
      badge: 'Platinum',
      badgeColor: 'text-purple-400',
      trophy: '🥉',
      avatar: 'bg-gradient-to-br from-pink-400 to-red-500'
    },
    {
      id: 4,
      name: 'John Doe',
      initials: 'JD',
      rank: 4,
      points: 7250,
      badge: 'Gold',
      badgeColor: 'text-yellow-400',
      trophy: '',
      avatar: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      initials: 'EW',
      rank: 5,
      points: 6100,
      badge: 'Gold',
      badgeColor: 'text-yellow-400',
      trophy: '',
      avatar: 'bg-gradient-to-br from-green-400 to-teal-500'
    },
  ];

  return (
    <section id="leaderboard" className="py-20 px-4 bg-gradient-to-b from-dark to-dark-light">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
            <span className="text-purple-400 font-semibold">📈 TOP CONTRIBUTORS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Top <span className="gradient-text">Verifiers</span>
          </h2>
          <p className="text-gray-400">leaderboard.subtitle</p>
        </div>

        {/* Leaderboard Cards */}
        <div className="space-y-4">
          {topUsers.map((user, index) => (
            <div
              key={user.id}
              className="leaderboard-card glass-card p-6 hover:scale-102 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                {/* Left: Rank, Avatar, Name */}
                <div className="flex items-center gap-4">
                  {/* Trophy/Rank */}
                  <div className="w-12 text-center">
                    {user.trophy ? (
                      <span className="text-3xl">{user.trophy}</span>
                    ) : (
                      <span className="text-2xl font-bold text-primary">#{user.rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className={`w-16 h-16 rounded-full ${user.avatar} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {user.initials}
                  </div>

                  {/* Name & Badge */}
                  <div>
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className={`text-sm ${user.badgeColor} font-semibold`}>{user.badge}</p>
                  </div>
                </div>

                {/* Right: Points & Trophy Icon */}
                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">{user.points.toLocaleString()}</div>
                    <div className="text-sm text-gray-400">POINTS</div>
                  </div>
                  <div className="text-3xl">
                    {index === 0 && '🏆'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index >= 3 && '🏅'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Leaderboard Button */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-gradient-to-r from-primary to-cyan-500 text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;

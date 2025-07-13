import React from 'react';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState<'slack' | 'tasks' | 'settings'>('slack');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CR</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Claudia Code Review
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">v0.1.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'slack' as const, name: 'Slack Posts', icon: '💬' },
              { id: 'tasks' as const, name: 'Review Tasks', icon: '📋' },
              { id: 'settings' as const, name: 'Settings', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'slack' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-12">
              <div className="text-4xl mb-4">💬</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Slack Integration
              </h2>
              <p className="text-gray-600 mb-6">
                Configure your Slack workspace to fetch reminder posts for code reviews.
              </p>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-yellow-400">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        Setup Required
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>Please configure your Slack integration in the Settings tab.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📋</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Code Review Tasks
              </h2>
              <p className="text-gray-600 mb-6">
                Manage and execute code reviews with parallel Claude Code sessions.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-600">
                  No tasks available. Add reminder reactions to Slack posts to create tasks.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Settings
            </h2>
            
            <div className="space-y-8">
              {/* Slack Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  🔌 Slack Integration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bot Token
                    </label>
                    <input
                      type="password"
                      placeholder="xoxb-your-slack-bot-token"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Required permissions: channels:read, channels:history, users:read, reactions:read
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Reminder Reactions
                    </label>
                    <input
                      type="text"
                      placeholder="alarm_clock,memo,eyes"
                      defaultValue="alarm_clock,memo,eyes"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Emoji names that indicate posts should be reviewed (comma-separated)
                    </p>
                  </div>
                </div>
              </div>

              {/* Claude Code Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  🤖 Claude Code Integration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Claude Code Path
                    </label>
                    <input
                      type="text"
                      placeholder="/usr/local/bin/claude"
                      defaultValue="claude"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Custom Review Command
                    </label>
                    <input
                      type="text"
                      placeholder="/pwe-review"
                      defaultValue="/pwe-review"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Max Parallel Sessions
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="5"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

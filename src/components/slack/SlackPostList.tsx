import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Button } from '@/components/ui/button';
import { SlackPost } from '@/types';
import { formatDate, truncateText, extractGitHubPrInfo } from '@/lib/utils';

export function SlackPostList() {
  const [posts, setPosts] = useState<SlackPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPosts = await invoke<SlackPost[]>('fetch_reminder_posts');
      setPosts(fetchedPosts);
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (post: SlackPost) => {
    try {
      await invoke('create_task_from_post', { post });
      alert('Task created successfully!');
    } catch (err) {
      alert(`Failed to create task: ${err}`);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
        <span className="ml-2">Loading Slack posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error loading posts</h3>
        <p className="text-red-600 text-sm mt-1">{error}</p>
        <Button onClick={fetchPosts} className="mt-3" size="sm">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Slack Reminder Posts</h2>
        <Button onClick={fetchPosts}>🔄 Refresh</Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No reminder posts found</p>
          <p className="text-sm text-gray-400 mt-2">
            Add reminder reactions (⏰, 📝, 👀) to Slack posts to see them here
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {posts.map((post) => {
              const prInfo = post.prUrl ? extractGitHubPrInfo(post.prUrl) : null;
              
              return (
                <li key={post.id}>
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {post.authorName} in #{post.channelName}
                        </p>
                        <div className="flex items-center space-x-2">
                          {post.hasReminderReaction && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              ⏰ Reminder
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-500">
                        {truncateText(post.content, 150)}
                      </p>
                      
                      {post.prUrl && (
                        <div className="mt-2">
                          <a 
                            href={post.prUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-500"
                          >
                            📎 {prInfo ? `${prInfo.owner}/${prInfo.repo}#${prInfo.number}` : post.prUrl}
                          </a>
                        </div>
                      )}
                      
                      <p className="mt-1 text-xs text-gray-400">
                        {formatDate(post.timestamp)}
                      </p>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      {post.prUrl ? (
                        <Button
                          onClick={() => createTask(post)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          📋 Create Task
                        </Button>
                      ) : (
                        <Button
                          disabled
                          size="sm"
                          variant="outline"
                          className="text-gray-400"
                        >
                          No PR URL
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

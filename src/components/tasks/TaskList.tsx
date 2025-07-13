import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { Button } from '@/components/ui/button';
import { ReviewTask } from '@/types';
import { formatDate, getStatusColor, getStatusIcon, extractGitHubPrInfo } from '@/lib/utils';

export function TaskList() {
  const [tasks, setTasks] = useState<ReviewTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTasks = await invoke<ReviewTask[]>('get_review_tasks');
      setTasks(fetchedTasks);
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  const startReview = async (taskId: number) => {
    try {
      await invoke('start_review_task', { taskId });
      await fetchTasks(); // Refresh to show updated status
    } catch (err) {
      alert(`Failed to start review: ${err}`);
    }
  };

  const viewResult = async (taskId: number) => {
    try {
      const output = await invoke<string>('get_review_result', { taskId });
      // TODO: Open modal or new window to show output
      console.log('Review output:', output);
    } catch (err) {
      alert(`Failed to get result: ${err}`);
    }
  };

  const deleteTask = async (taskId: number) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    try {
      await invoke('delete_review_task', { taskId });
      await fetchTasks();
    } catch (err) {
      alert(`Failed to delete task: ${err}`);
    }
  };

  useEffect(() => {
    fetchTasks();
    
    // Set up interval to refresh tasks status
    const interval = setInterval(fetchTasks, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
        <span className="ml-2">Loading tasks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-medium">Error loading tasks</h3>
        <p className="text-red-600 text-sm mt-1">{error}</p>
        <Button onClick={fetchTasks} className="mt-3" size="sm">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Code Review Tasks</h2>
        <div className="flex items-center space-x-2">
          {isLoading && <div className="spinner"></div>}
          <Button onClick={fetchTasks}>🔄 Refresh</Button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No review tasks found</p>
          <p className="text-sm text-gray-400 mt-2">
            Create tasks from Slack posts to start reviewing
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {tasks.map((task) => {
              const prInfo = task.prUrl ? extractGitHubPrInfo(task.prUrl) : null;
              
              return (
                <li key={task.id}>
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Review request from {task.authorName}
                        </p>
                        <span className={`status-indicator ${getStatusColor(task.reviewStatus)}`}>
                          {getStatusIcon(task.reviewStatus)} {task.reviewStatus.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="mt-1 text-sm text-gray-500">
                        {task.postContent.substring(0, 100)}...
                      </p>
                      
                      {task.prUrl && (
                        <div className="mt-2">
                          <a 
                            href={task.prUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-500"
                          >
                            📎 {prInfo ? `${prInfo.owner}/${prInfo.repo}#${prInfo.number}` : task.prUrl}
                          </a>
                        </div>
                      )}
                      
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-400">
                        <span>Created: {formatDate(task.createdAt)}</span>
                        {task.completedAt && (
                          <span>Completed: {formatDate(task.completedAt)}</span>
                        )}
                        {task.tmuxSessionId && (
                          <span>Session: {task.tmuxSessionId}</span>
                        )}
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                      {task.reviewStatus === 'pending' && task.prUrl && (
                        <Button
                          onClick={() => startReview(task.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          🚀 Start Review
                        </Button>
                      )}
                      
                      {task.reviewStatus === 'running' && (
                        <Button
                          disabled
                          size="sm"
                          variant="outline"
                        >
                          ⏳ Running...
                        </Button>
                      )}
                      
                      {task.reviewStatus === 'completed' && (
                        <Button
                          onClick={() => viewResult(task.id)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          📄 View Result
                        </Button>
                      )}
                      
                      <Button
                        onClick={() => deleteTask(task.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        🗑️
                      </Button>
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

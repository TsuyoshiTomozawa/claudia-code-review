// Core types for Claudia Code Review application

// Slack integration types
export interface SlackPost {
  id: string;
  messageId: string;
  channelId: string;
  channelName: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
  reactions: SlackReaction[];
  hasReminderReaction: boolean;
}

export interface SlackReaction {
  name: string;
  count: number;
  users: string[];
}

export interface SlackChannel {
  id: string;
  name: string;
  isPrivate: boolean;
  memberCount: number;
}

export interface SlackUser {
  id: string;
  name: string;
  displayName: string;
  avatarUrl?: string;
}

// Review task types
export interface ReviewTask {
  id: number;
  slackPostId: string;
  slackChannelId: string;
  slackMessageTs: string;
  authorName: string;
  postContent: string;
  prUrl?: string;
  prTitle?: string;
  prNumber?: number;
  repositoryOwner?: string;
  repositoryName?: string;
  isSelectedForReview: boolean;
  reviewStatus: ReviewStatus;
  tmuxSessionId?: string;
  processId?: number;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  errorMessage?: string;
}

export type ReviewStatus = 
  | 'pending'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled';

// tmux session management types
export interface TmuxSession {
  id: string;
  sessionName: string;
  taskId: number;
  prUrl: string;
  status: TmuxSessionStatus;
  startedAt: string;
  completedAt?: string;
  output?: string;
  errorOutput?: string;
}

export type TmuxSessionStatus = 
  | 'starting'
  | 'running'
  | 'completed'
  | 'failed'
  | 'killed';

// Application settings types
export interface AppSettings {
  slack: SlackSettings;
  claudeCode: ClaudeCodeSettings;
  ui: UISettings;
}

export interface SlackSettings {
  botToken?: string;
  workspaceId?: string;
  reminderReactions: string[];
  channelIds: string[];
  userId?: string;
}

export interface ClaudeCodeSettings {
  executablePath: string;
  customCommand: string;
  maxParallelSessions: number;
  timeoutMinutes: number;
  workingDirectory?: string;
}

export interface UISettings {
  theme: 'light' | 'dark';
  refreshInterval: number;
  showNotifications: boolean;
  autoRefresh: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// GitHub integration types (for future use)
export interface GitHubPR {
  number: number;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  filesUrl: string;
  repository: GitHubRepository;
  status: 'open' | 'closed' | 'merged';
}

export interface GitHubRepository {
  owner: string;
  name: string;
  fullName: string;
  url: string;
  isPrivate: boolean;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: string;
  timestamp: string;
}

// Component prop types
export interface TaskListProps {
  tasks: ReviewTask[];
  onStartReview: (taskId: number) => Promise<void>;
  onCancelReview: (taskId: number) => Promise<void>;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

export interface SlackPostListProps {
  posts: SlackPost[];
  onToggleSelection: (postId: string, selected: boolean) => Promise<void>;
  onCreateTask: (postId: string) => Promise<void>;
  onRefresh: () => Promise<void>;
  isLoading: boolean;
}

export interface SettingsProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => Promise<void>;
  onTestSlackConnection: () => Promise<boolean>;
  onTestClaudeCode: () => Promise<boolean>;
  isLoading: boolean;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Constants
export const REVIEW_STATUSES = {
  PENDING: 'pending' as const,
  RUNNING: 'running' as const,
  COMPLETED: 'completed' as const,
  FAILED: 'failed' as const,
  CANCELLED: 'cancelled' as const,
};

export const DEFAULT_SETTINGS: AppSettings = {
  slack: {
    reminderReactions: ['alarm_clock', 'memo', 'eyes'],
    channelIds: [],
  },
  claudeCode: {
    executablePath: 'claude',
    customCommand: '/pwe-review',
    maxParallelSessions: 5,
    timeoutMinutes: 30,
  },
  ui: {
    theme: 'light',
    refreshInterval: 30000, // 30 seconds
    showNotifications: true,
    autoRefresh: true,
  },
};

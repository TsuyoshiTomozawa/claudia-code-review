// Core types for Claudia Code Review application

export interface SlackPost {
  id: string;
  messageId: string;
  channelId: string;
  channelName: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
  hasReminderReaction: boolean;
  reactions?: SlackReaction[];
  prUrl?: string;
  prTitle?: string;
}

export interface SlackReaction {
  name: string;
  count: number;
  users: string[];
}

export interface ReviewTask {
  id: number;
  slackPostId: string;
  slackChannelId: string;
  slackMessageTs: string;
  authorName: string;
  postContent: string;
  prUrl?: string;
  prTitle?: string;
  isSelectedForReview: boolean;
  reviewStatus: ReviewStatus;
  tmuxSessionId?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export type ReviewStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface ReviewSession {
  id: string;
  sessionName: string;
  taskId: number;
  prUrl: string;
  status: ReviewStatus;
  startedAt: string;
  completedAt?: string;
  output?: string;
  errorMessage?: string;
}

export interface AppSettings {
  slack: SlackSettings;
  claudeCode: ClaudeCodeSettings;
  reminder: ReminderSettings;
}

export interface SlackSettings {
  token?: string;
  workspaceId?: string;
  userId?: string;
  channels: string[];
}

export interface ClaudeCodeSettings {
  executablePath: string;
  customCommand: string;
  maxParallelSessions: number;
  timeoutMinutes: number;
}

export interface ReminderSettings {
  enabledReactions: string[];
  autoRefreshInterval: number;
  notificationsEnabled: boolean;
}

export interface TaskStatusUpdate {
  taskId: number;
  newStatus: ReviewStatus;
  sessionId?: string;
  output?: string;
  errorMessage?: string;
}

export interface GitHubPR {
  url: string;
  number: number;
  title: string;
  owner: string;
  repo: string;
  author: string;
  branch: string;
  baseBranch: string;
  state: 'open' | 'closed' | 'merged';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SlackApiResponse {
  ok: boolean;
  messages?: SlackMessage[];
  error?: string;
}

export interface SlackMessage {
  type: string;
  ts: string;
  user: string;
  text: string;
  reactions?: SlackReaction[];
  thread_ts?: string;
}

// UI Component Props types
export interface StatusBadgeProps {
  status: ReviewStatus;
  className?: string;
}

export interface TaskCardProps {
  task: ReviewTask;
  onStartReview: (taskId: number) => void;
  onViewResult: (taskId: number) => void;
  onCancelReview: (taskId: number) => void;
}

export interface ReviewOutputProps {
  output: string;
  isLoading: boolean;
  error?: string;
}

// Store types (Zustand)
export interface SlackStore {
  posts: SlackPost[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  toggleReminderSelection: (postId: string) => Promise<void>;
}

export interface TaskStore {
  tasks: ReviewTask[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTaskFromPost: (post: SlackPost) => Promise<void>;
  updateTaskStatus: (taskId: number, status: ReviewStatus) => void;
  deleteTask: (taskId: number) => Promise<void>;
}

export interface ReviewStore {
  sessions: ReviewSession[];
  isLoading: boolean;
  error: string | null;
  startReview: (taskId: number) => Promise<string>;
  getSessionStatus: (sessionId: string) => Promise<ReviewStatus>;
  getSessionOutput: (sessionId: string) => Promise<string>;
  cancelSession: (sessionId: string) => Promise<void>;
  refreshSessions: () => Promise<void>;
}

export interface SettingsStore {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
  loadSettings: () => Promise<void>;
  saveSettings: (settings: Partial<AppSettings>) => Promise<void>;
  testSlackConnection: () => Promise<boolean>;
  testClaudeCodePath: () => Promise<boolean>;
}

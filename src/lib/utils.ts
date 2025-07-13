import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

export function extractGitHubPrInfo(url: string) {
  const match = url.match(/github\.com\/(\w+)\/(\w+)\/pull\/(\d+)/);
  if (!match) return null;
  
  return {
    owner: match[1],
    repo: match[2],
    number: parseInt(match[3]),
    url: url,
  };
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-gray-100 text-gray-800';
    case 'running':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'cancelled':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getStatusIcon(status: string): string {
  switch (status) {
    case 'pending':
      return '⏸️';
    case 'running':
      return '🔄';
    case 'completed':
      return '✅';
    case 'failed':
      return '❌';
    case 'cancelled':
      return '⏹️';
    default:
      return '❓';
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function validateSlackToken(token: string): boolean {
  return token.startsWith('xoxb-') && token.length > 20;
}

export function validateGitHubUrl(url: string): boolean {
  return /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/pull\/\d+/.test(url);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function formatDuration(start: string, end?: string): string {
  const startTime = new Date(start);
  const endTime = end ? new Date(end) : new Date();
  const diffMs = endTime.getTime() - startTime.getTime();
  
  const minutes = Math.floor(diffMs / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const COLORS = {
  primary: '#3B82F6',
  secondary: '#60A5FA',
  lightBlue: '#DBEAFE',
  white: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
};

export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const REGISTRATION_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
};

export const COMPETITION_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  ENDED: 'ENDED',
  CANCELLED: 'CANCELLED',
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  ADMIN_PAGE_SIZE: 10,
  CHAT_PAGE_SIZE: 20,
};

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'new' },
  { label: 'Oldest', value: 'old' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Ending Soon', value: 'ending' },
];

export const CATEGORY_OPTIONS = [
  'Programming',
  'Design',
  'Writing',
  'Photography',
  'Video',
  'Music',
  'Business',
  'Science',
  'Art',
  'Other',
];

export const TOAST_DURATION = 3000;
export const DEBOUNCE_DELAY = 300;

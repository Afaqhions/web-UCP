export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const truncateText = (text, length) => {
  return text && text.length > length ? text.substring(0, length) + '...' : text;
};

export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

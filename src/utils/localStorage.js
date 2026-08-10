export function getStorageItem(key, fallbackValue = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return false;
  }

  return true;
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    return false;
  }

  return true;
}

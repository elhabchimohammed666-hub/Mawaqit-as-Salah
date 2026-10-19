import { useEffect, useState } from 'react';

const KEY = 'mawaqit-settings';

const defaults = {
  method: 3,
  school: 0,
  location: null,
};

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(settings));
  }, [settings]);

  return { settings, setSettings };
}

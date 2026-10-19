import { useEffect, useState } from 'react';
import { formatRemaining } from '../lib/prayer';

export function useCountdown(targetDate) {
  const [remaining, setRemaining] = useState({ hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    if (!targetDate) return undefined;

    const tick = () => setRemaining(formatRemaining(targetDate.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return remaining;
}

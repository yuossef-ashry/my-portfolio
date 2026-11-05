export function setProgress(setLoading: (value: number) => void) {
  let percent = 0;
  let interval: ReturnType<typeof setInterval>;

  const startSlowProgress = () => {
    interval = setInterval(() => {
      percent = Math.min(percent + Math.round(Math.random()), 92);
      setLoading(percent);
      if (percent >= 92) clearInterval(interval);
    }, 2000);
  };

  interval = setInterval(() => {
    if (percent < 50) {
      percent = Math.min(percent + Math.round(Math.random() * 5), 50);
      setLoading(percent);
      return;
    }

    clearInterval(interval);
    startSlowProgress();
  }, 100);

  return {
    loaded: () =>
      new Promise<number>((resolve) => {
        clearInterval(interval);
        interval = setInterval(() => {
          percent = Math.min(percent + 1, 100);
          setLoading(percent);
          if (percent >= 100) {
            clearInterval(interval);
            resolve(percent);
          }
        }, 2);
      }),
    clear: () => {
      clearInterval(interval);
      setLoading(100);
    },
    cancel: () => clearInterval(interval),
  };
}

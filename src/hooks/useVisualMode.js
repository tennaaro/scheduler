import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (mode, replace = false) {
    // case where we want to be able to go back twice
    if (replace) {
      // create copy of history array
      let replaceHistory = [...history]
      // set last value of array to the mode
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory((prev) => replaceHistory)
      setMode(mode)
    } else {
      setHistory((prev) => [...prev, mode])
      setMode(mode)
    }
  }
  function back () {
    if (history.length > 1) {
      // delete last entry on array
      history.pop()
      // set mode to previous entry
      setMode(history[history.length-1])
    }
  }

  return { mode, transition, back };
}


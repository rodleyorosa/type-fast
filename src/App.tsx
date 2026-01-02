import { useCallback, useEffect, useMemo, useState } from "react";
import { useFetchQuote } from "./hooks/useFetchQuote";
import type { Quote } from "./types";

const App = () => {
  const { data, isLoading } = useFetchQuote<Quote>(
    "https://thequoteshub.com/api/random"
  );
  const [inputValue, setInputValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isStarted, setIsStarted] = useState(false);

  const quote = useMemo(() => {
    return (
      data?.text ?? "React is a JavaScript library for building interfaces."
    );
  }, [data?.text]);

  const wpm = useMemo(() => {
    const timeElapsed = 60 - timeLeft;
    if (timeElapsed === 0) return 0;

    const correctChars = inputValue.split("").filter((char, index) => {
      return char === quote[index];
    }).length;

    const words = correctChars / 5;
    const minutes = timeElapsed / 60;

    return Math.round(words / minutes);
  }, [inputValue, quote, timeLeft]);

  const accuracy = useMemo(() => {
    if (inputValue.length === 0) return 100;

    const correctChars = inputValue.split("").filter((char, index) => {
      return char === quote[index];
    }).length;

    return Math.round((correctChars / inputValue.length) * 100);
  }, [inputValue, quote]);

  const stringColorMapping = useMemo(() => {
    return quote.split("").map((char, index) => {
      let charColor = "";

      if (inputValue && inputValue[index]) {
        charColor =
          inputValue[index] === char ? "text-green-500" : "text-red-500";
      }

      return (
        <span key={index} className={charColor}>
          {char}
        </span>
      );
    });
  }, [quote, inputValue]);

  const isCompleted = useMemo(() => {
    return inputValue === quote || timeLeft === 0;
  }, [inputValue, quote, timeLeft]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setIsStarted(true);
      setInputValue(e.target.value);
    },
    []
  );

  const resetTime = useCallback(() => {
    setTimeLeft(60);
    setIsStarted(false);
    setInputValue("");
  }, []);

  useEffect(() => {
    if (!isStarted || isCompleted) return;

    const interval = setInterval(() => {
      setTimeLeft((time) => (time > 0 ? time - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isCompleted]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col m-auto gap-4 w-1/2">
        <div className="text-center">
          <h1 className="text-4xl font-bold">TypeFast</h1>
          <p className="text-gray-400 text-sm mt-2 font-light tracking-wide">
            Test your typing speed
          </p>
        </div>
        <div className="flex space-x-4 grid grid-flow-col justify-stretch text-center">
          <div className="flex flex-col bg-white shadow-sm rounded-md py-4">
            <p className="text-xl font-bold">{timeLeft}s</p>
            <p className="text-gray-400 text-sm">Time</p>
          </div>
          <div className="flex flex-col bg-white shadow-sm rounded-md py-4">
            <p className="text-xl font-bold text-blue-600">{wpm}</p>
            <p className="text-gray-400 text-sm">WPM</p>
          </div>
          <div className="flex flex-col bg-white shadow-sm rounded-md py-4">
            <p className="text-xl font-bold text-green-600">{accuracy}%</p>
            <p className="text-gray-400 text-sm">Accuracy</p>
          </div>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-md min-h-32 flex items-center justify-center">
          {isLoading ? (
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          ) : (
            <p className="text-xl text-gray-400">{stringColorMapping}</p>
          )}
        </div>

        <div className="bg-white p-6 shadow-sm rounded-md">
          <textarea
            value={inputValue}
            disabled={isCompleted}
            placeholder="Start typing here..."
            className="border border-gray-300 rounded-md w-full p-4 outline-none"
            onChange={handleOnChange}
          ></textarea>
        </div>

        {isCompleted && (
          <div className="flex flex-col gap-2 bg-green-100 border border-green-200 p-6 shadow-sm rounded-md text-center">
            <h2 className="font-bold text-xl text-green-800">
              Test Completed!
            </h2>
            <p>
              <span className="font-bold">{wpm}</span> WPM
            </p>
            <p>
              <span className="font-bold">{accuracy}%</span> Accuracy
            </p>
          </div>
        )}

        <button
          onClick={resetTime}
          className="bg-blue-600 text-white p-3 rounded-md font-semibold cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;

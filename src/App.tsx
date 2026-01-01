import { useCallback, useMemo, useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  // todo: replace with random string generator
  const stringToCopy = "React is a JavaScript library for building interfaces.";
  const stringToCopyArray = useMemo(
    () => stringToCopy.split(""),
    [stringToCopy]
  );

  const stringColorMapping = useMemo(() => {
    return stringToCopyArray.map((char, index) => {
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
  }, [stringToCopyArray, inputValue]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col m-auto gap-4 min-w-1/3">
        <div className="text-center">
          <h1 className="text-4xl font-bold">TypeFast</h1>
          <p className="text-gray-400 text-sm mt-2 font-light tracking-wide">
            Test your typing speed
          </p>
        </div>
        <div className="flex space-x-4 grid grid-flow-col justify-stretch text-center">
          <div className="flex flex-col bg-white shadow-sm rounded-md py-4">
            <p className="text-xl font-bold">60s</p>
            <p className="text-gray-400 text-sm">Time</p>
          </div>
          <div className="flex flex-col bg-white shadow-sm rounded-md py-4">
            <p className="text-xl font-bold text-blue-600">0</p>
            <p className="text-gray-400 text-sm">WPM</p>
          </div>
          <div className="flex flex-col bg-white shadow-sm rounded-md py-4">
            <p className="text-xl font-bold text-green-600">100%</p>
            <p className="text-gray-400 text-sm">Accuracy</p>
          </div>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-md">
          <p className="text-xl text-gray-400">{stringColorMapping}</p>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-md">
          <textarea
            name=""
            id=""
            placeholder="Start typing here..."
            className="border border-gray-300 rounded-md w-full p-4 outline-none"
            onChange={handleOnChange}
          ></textarea>
        </div>

        <button className="bg-blue-600 text-white p-3 rounded-md font-semibold cursor-pointer">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;

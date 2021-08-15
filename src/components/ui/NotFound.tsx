import { useCallback } from "react";

function sample<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const NotFound = () => {
  const getEmoji = useCallback(() => {
    return sample([
      "🤷🏻‍♀️",
      "🤷",
      "🤷‍♂️",
      "🤷‍♀️",
      "🤷🏼‍♀️",
      "🤷🏽‍♀️",
      "🤷🏾‍♀️",
      "🤷🏿‍♀️",
      "🤷🏻",
      "🤷🏼",
      "🤷🏽",
      "🤷🏾",
      "🤷🏿",
      "🤷🏻‍♂️",
      "🤷🏼‍♂️",
      "🤷🏽‍♂️",
      "🤷🏾‍♂️",
      "🤷🏿‍♂️",
    ]);
  }, []);

  return (
    <div className="p-8 my-16 col-span-3 text-center">
      <p className="text-8xl">{getEmoji()}</p>
      <h1 className="text-4xl font-bold">Not Found</h1>
    </div>
  );
};

export default NotFound;

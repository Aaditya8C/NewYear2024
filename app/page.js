"use client";
import { useEffect, useRef, useState } from "react";
import * as animationData from "../public/helicopter.json";
import Lottie from "react-lottie";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import classNames from "classnames";

export default function Home() {
  const { width, height } = useWindowSize();
  const [text, setText] = useState("");
  const [year, setYear] = useState(2023);
  const [yearDigit, setYearDigit] = useState(4);
  const [isNewYear, setIsNewYear] = useState(false);
  const [moveClass, setMoveClass] = useState("");
                                                                                                                                                                    const happyNewYearText = "Happy New Year !!!!";
  const [audio, setAudio] = useState(null)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //Initialized here because while building it gives error on server side
  useEffect(() => {
    setAudio(new Audio("/jamalkadu.mp3"))
  }, []);

  useEffect(() => {
    // Waiting to load the audio object
    setTimeout(() => {
      audio.play();
    }, 10);
  }, [moveClass])
  

  const prepareText = () => {
    let index = 0;
    const interval = setInterval(() => {
      setText(happyNewYearText.slice(0, index + 1));
      index++;
      if (index === happyNewYearText.length) clearInterval(interval);
    }, 100);
  };

  const celebrate = () => {
    prepareText();
    setMoveClass("animate-move");
    setIsNewYear(true);
    setTimeout(() => {
      setYear(2024);
      setYearDigit(3);
      playAudio();
    }, 2870);


    setTimeout(() => {
      setYearDigit(5);
    }, 5500);
  };



  return (
    <div className="main animate relative bg-[#22092C]">
      {isNewYear && (
        <Confetti width={width} height={height} numberOfPieces={400} />
      )}
      <div className="flex w-full h-full justify-center items-center flex-col gap-4">
        <p className="text-5xl text-orange-400 font-semibold">Welcome {year}</p>
        <p className="text-4xl text-orange-400 font-semibold">{text}</p>
        <button
          onClick={celebrate}
          className="text-white text-2xl px-4 py-2 hover:bg-orange-500 transition-all duration-200 font-semibold bg-orange-400 rounded-full"
        >
          Celebrate
        </button>
      </div>
      <div
        className={classNames(
          "absolute right-0 top-1/2 flex flex-col items-center justify-center",
          moveClass
        )}
      >
        <Lottie options={defaultOptions} width={80} height={80} />
        <div className="border-r-2 border-orange-400 h-6 relative" />
        <div className="text-center absolute bottom-0 top-24">
          <p className="text-5xl text-orange-400 font-semibold">{yearDigit}</p>
        </div>
      </div>
    </div>
  );
}

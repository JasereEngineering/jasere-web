import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import image from "../assets/images/scrambled-dark.svg";

import { shuffleArray } from "../helpers/misc";
import { RootState, AppDispatch } from "../store";
import { updateTrivia } from "../store/features/game";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";

const scrambledMap = [
  "right-[1.375rem] top-[3rem]",
  "left-[0rem] top-[0rem]",
  "left-[3.75rem] top-[1.25rem]",
  "left-[45%] top-[4rem]",
  "right-[6.25rem] top-[0rem]",
  "left-[5.875rem] bottom-[0rem]",
  "right-[4.375rem] top-[0rem]",
  "right-[2rem] bottom-0",
  "left-[50%] top-[0.625rem]",
  "left-[1.25rem] top-[4.375rem]",
];

const ScrambledWordsGame = () => {
  const navigate = useNavigate();
  const { gameSession } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { gameName, trivia, currentTrivia } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [word, setWord] = useState("zendaya".toUpperCase());
  // const [word, setWord] = useState(trivia[currentTrivia].answer.toUpperCase());
  // const [hurray, setHurray] = useState<any>(null);
  const [seconds, setSeconds] = useState(60);
  const [scrambled, setScrambled] = useState(shuffleArray(word.split("")));
  const [selectedLetter, setSelectedLetter] = useState<{
    letter: string;
    index: number;
  } | null>(null);
  const [result, setResult] = useState(
    Array(word.length).fill({ letter: "", index: null })
  );
  const socket = io(`${process.env.REACT_APP_BASE_URL}/game`);

  const renderTime = () => (
    <div className="flex flex-col justify-center items-center">
      <span className="font-lal text-[2rem] text-white text-center leading-[3.125rem] tracking-[-0.15px] relative top-[0.25rem]">
        {seconds}
      </span>
      <span className="font-lex text-[0.5rem] text-white text-center leading-[0.625rem] tracking-[-0.15px] relative bottom-[0.75rem]">
        seconds
      </span>
    </div>
  );

  const handleLetterClick = (letter: string, index: number) => {
    if (!seconds) return;
    setSelectedLetter({ letter, index });
    const resultIndex = result.findIndex((item) => item.index === null);
    const newResult = [...result];
    const newScrambled = [...scrambled];
    console.log({ resultIndex, result });

    newResult[resultIndex] = { letter, index };
    setResult(newResult);

    newScrambled[index] = "";
    setScrambled(newScrambled);

    setSelectedLetter(null);
  };

  const handleSpaceClick = (
    item: { letter: string; index: number },
    index: number
  ) => {
    if (item.index !== null) {
      const newResult = [...result];
      const newScrambled = [...scrambled];

      newScrambled[item.index] = item.letter;
      setScrambled(newScrambled);

      newResult[index] = { letter: "", index: null };
      setResult(newResult);
    }
  };

  const getRandomPosition = () => {
    const container = document.querySelector(".scrambled-container")!;
    const containerRect = container.getBoundingClientRect();
    const letters = container.querySelectorAll(".scrambled-letter");
    const letterSize = 150;

    let x: number, y: number, overlapping;

    do {
      x = Math.random() * (containerRect.width - letterSize);
      y = Math.random() * (containerRect.height - letterSize);
      overlapping = Array.from(letters).some((letter) => {
        const rect = letter.getBoundingClientRect();
        return !(
          rect.right < x ||
          rect.left > x + letterSize ||
          rect.bottom < y ||
          rect.top > y + letterSize
        );
      });
    } while (overlapping);

    return { x, y };
  };

  const displayScrambledLetters = () => {
    const container = document.querySelector(".scrambled-container")!;
    const scrambled = word.split("");

    scrambled.forEach((letter, i) => {
      const div = document.createElement("div");
      div.textContent = letter;
      div.classList.add(
        "scrambled-letter",
        "absolute",
        "text-white",
        "font-lal",
        "text-[3.5rem]",
        "leading-[5.625rem]",
        "tracking-[-0.3px]",
        "uppercase",
        "random-rotate"
      );
      const position = getRandomPosition();
      div.style.left = `${position.x}px`;
      div.style.top = `${position.y}px`;
      div.style.setProperty(
        "--random-deg",
        `${Math.floor(Math.random() * 61) - 30}`
      );
      div.addEventListener("click", () => handleLetterClick(letter, i));
      container.appendChild(div);
    });
  };

  // const handleSubmit = () => {
  //   if (scrambled.join("")) return toast.error("incomplete solution");

  //   const solution = result
  //     .map((item) => item.letter)
  //     .join("")
  //     .toLowerCase();
  //   if (solution !== word.toLowerCase()) {
  //     setHurray(false);
  //     setScrambled(shuffleArray(word.split("")));
  //     setResult(Array(word.length).fill({ letter: "", index: null }));
  //     socket.emit("poll", {
  //       game_session_id: gameSession,
  //       selected_answer: solution,
  //       transition: currentTrivia + 1,
  //       trivia_id: trivia[currentTrivia].id,
  //       is_correct: false,
  //       player_name: username,
  //     });
  //   } else {
  //     setHurray(true);
  //     socket.emit("poll", {
  //       game_session_id: gameSession,
  //       selected_answer: solution,
  //       transition: currentTrivia + 1,
  //       trivia_id: trivia[currentTrivia].id,
  //       is_correct: true,
  //       player_name: username,
  //     });
  //     setTimeout(() => {
  //       dispatch(updateTrivia(currentTrivia));
  //     }, 1000);
  //   }
  // };

  // useEffect(() => {
  //   let intervalId: any;
  //   if (seconds) {
  //     intervalId = setInterval(() => {
  //       if (seconds > 0) {
  //         setSeconds(seconds - 1);
  //       }
  //     }, 1000);
  //   } else {
  //     navigate(
  //       ROUTES.PLAY.LEADERBOARD_FOR("scrambed-words", gameSession as string)
  //     );
  //   }

  //   return () => clearInterval(intervalId);
  // }, [seconds, gameSession, navigate]);

  // useEffect(() => {
  //   const gameCompleted = trivia.every((item) => item.completed);
  //   if (gameCompleted)
  //     navigate(
  //       ROUTES.PLAY.LEADERBOARD_FOR("scrambled-words", gameSession as string)
  //     );

  //   setWord(trivia[currentTrivia].answer.toUpperCase());
  // }, [currentTrivia, gameSession, navigate]);

  // useEffect(() => {
  //   setHurray(null);
  //   setScrambled(shuffleArray(word.split("")));
  //   setResult(Array(word.length).fill({ letter: "", index: null }));
  // }, [word]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[8rem]">
      <div className="flex flex-col items-center px-[1.125rem]">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px]">
          SCRAMBLED WORDS
        </h1>
        <p className="font-lex font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[1.625rem]">
          Celebrities | Noobie
        </p>
        <div className="flex justify-center items-center mb-[2.875rem]">
          <CountdownCircleTimer
            isPlaying={seconds > 0}
            duration={60}
            colors="#FF9B9D"
            trailColor="#4F4F4F"
            size={63}
            strokeWidth={4}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <div className="rounded-[10px] aspect-video relative min-h-[10.125rem] mb-3">
          <img src={image} alt="" className="w-full h-full" />
          <div className="rounded-[10px] p-[0.625rem] absolute top-0 left-0 right-0 bottom-0 bg-transparent">
            <div className="w-full h-full relative scrambled-container">
              {/* {scrambled.map((letter, i) => (
                <div
                  key={i}
                  className="scrambled-letter absolute text-white font-lal text-[3.5rem] leading-[5.625rem] tracking-[-0.3px] uppercase random-rotate"
                  style={{
                    rotate: `${Math.floor(Math.random() * 61) - 30}deg`,
                  }}
                  onClick={() => handleLetterClick(letter, i)}
                >
                  {letter}
                </div>
              ))} */}
            </div>
          </div>
        </div>
        <div className="bg-green rounded-[26px] py-1 px-5 font-lal text-[1.063rem] text-center leading-[1.688rem] tracking-[-0.26px] mb-4">
          Your answer is correct
        </div>
        <div className="rounded-[10px] border border-white h-[3.125rem] w-full flex justify-center items-center text-center gap-x-[0.125rem] mb-3">
          {result.some((r) => r.index) ? (
            result.map((item, i) => (
              <span
                key={i}
                className="font-lal text-[2rem] leading-[3.125rem] tracking-[-0.15px]"
                onClick={() => handleSpaceClick(item, i)}
              >
                {item.letter}
              </span>
            ))
          ) : (
            <span className="font-lex text-[#D0D0D0] text-[0.813rem] leading-[1.016rem] tracking-[-0.15px]">
              Tap a letter to enter
            </span>
          )}
        </div>
        <div className="bg-pink rounded-[24px] py-[0.625rem] px-2 font-lex font-medium text-[0.625rem] text-center leading-[0.781rem] tracking-[-0.12px]">
          HINT: Critically acclaimed superhero girlfriend
        </div>
      </div>
      <button className="capitalize h-[6.25rem] bg-white font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center w-full">
        Tap here to start
      </button>
      {/* <div className="grow pb-[2.5rem] px-[1.875rem] flex flex-col lg:hidden">
        <div className="rounded-[6px] bg-orange border border-white w-[10rem] h-[3rem] font-black text-[1rem] flex items-center justify-center shadow-inner uppercase px-2 overflow-x-auto no-scrollbar">
          {gameName}
        </div>
        <div className="grow flex flex-col justify-center">
          <h1 className="text-center text-orange text-[2.25rem] font-black">
            MOVIE STARS
          </h1>
          <h3
            className={`text-center text-[1rem] font-black ${
              hurray !== null ? "mb-[3.75rem]" : "mb-[2.875rem]"
            }`}
          >
            SCRAMBLED WORDS
          </h3>
          {seconds ? (
            <div
              className={`flex justify-center ${
                hurray !== null ? "mb-4" : "mb-12"
              }`}
            >
              <CountdownCircleTimer
                isPlaying={seconds > 0}
                duration={60}
                colors="#F28C0D"
                size={120}
                strokeWidth={1}
                onComplete={() => ({ shouldRepeat: true, delay: 1 })}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
          ) : null}
          {hurray !== null ? (
            <div className="flex justify-center items-center mb-4">
              <span className="font-semibold text-[1.5rem]">
                {hurray ? "Hurray!!!" : "Try again"}
              </span>
              <img src={correct} alt="correct" />
            </div>
          ) : null}
          <div className="bg-gradient-to-r from-[#DEDEDE] to-violet p-0.5 rounded-[6px] mb-[1.125rem] w-full">
            <div className="rounded-[4px] bg-gradient-to-r from-[#1E1E1E] to-[#18365E] px-4 pb-4 pt-1">
              <div
                className={`flex justify-center items-center gap-x-1.5 mb-4 overflow-x-auto no-scrollbar`}
              >
                {scrambled.map((letter, i) => (
                  <div
                    key={i}
                    className={`text-[#FFF7ED] text-[3rem] font-black cursor-pointer ${
                      scrambled.length > 7 ? "text-[2.25rem]" : ""
                    } ${selectedLetter?.index === i ? "opacity-50" : ""}`}
                    onClick={() => handleLetterClick(letter, i)}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center gap-x-[0.375rem]">
                {result.map((item, i) => (
                  <div
                    key={i}
                    // className="bg-[#0F2026] border border-white flex justify-center items-center text-[1.3rem] font-black grow h-[46px] cursor-pointer"
                    className="bg-[#0F2026] border border-white flex justify-center items-center text-[1.3rem] font-black grow aspect-square cursor-pointer"
                    onClick={() => handleSpaceClick(item, i)}
                  >
                    {item.letter}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-[1rem] mb-5 uppercase">
            HINT: {trivia[currentTrivia].question}
          </h2>
          <Button
            text={trivia.every((item) => item.completed) ? "NEXT" : "SUBMIT"}
            className="border border-violet !bg-inherit !p-4 !font-extrabold"
            onClick={handleSubmit}
          />
        </div>
      </div> */}
    </AppLayout>
  );
};

export default ScrambledWordsGame;

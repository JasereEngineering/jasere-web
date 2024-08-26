import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";

import image from "../assets/images/scrambled-dark.jpg";

import { shuffleArray } from "../helpers/misc";
import { RootState, AppDispatch } from "../store";
import { updateTrivia } from "../store/features/game";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";

const ScrambledWordsGame = ({ socket }: { socket: Socket }) => {
  const navigate = useNavigate();
  const { gameSession } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { trivia, currentTrivia } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [word, setWord] = useState(trivia[currentTrivia]?.answer.toUpperCase());
  const [hurray, setHurray] = useState<any>(null);
  const [seconds, setSeconds] = useState(60);
  const [prevAnswerTime, setPrevAnswerTime] = useState(60);
  const [scrambled, setScrambled] = useState(shuffleArray(word.split("")));
  const [result, setResult] = useState(
    Array(word.length).fill({ letter: "", index: null })
  );

  const degreeMap = useMemo(
    () =>
      shuffleArray(
        Array(word.length)
          .fill("")
          .map((i) => `${Math.floor(Math.random() * 61) - 30}`)
      ),
    [word.length]
  );
  const scrambledMap = useMemo(
    () =>
      shuffleArray([
        "right-[1.375rem] top-[3rem]",
        "left-[0rem] top-[0rem]",
        "left-[3.75rem] top-[1.25rem]",
        "left-[45%] top-[4rem]",
        "right-[6.75rem] top-[0rem]",
        "left-[5.875rem] bottom-[0rem]",
        "right-[4.375rem] top-[0rem]",
        "right-[2rem] bottom-0",
        "left-[40%] top-[0.625rem]",
        "left-[1.25rem] top-[4.375rem]",
        "left-[65%] bottom-0",
        "left-[18%] bottom-[-1.25rem]",
      ]),
    []
  );

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
    const resultIndex = result.findIndex((item) => item.index === null);
    const newResult = [...result];
    const newScrambled = [...scrambled];

    newResult[resultIndex] = { letter, index };
    setResult(newResult);

    newScrambled[index] = "";
    setScrambled(newScrambled);
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

  const handleSubmit = () => {
    if (scrambled.join("")) return toast.error("incomplete solution");

    const solution = result
      .map((item) => item.letter)
      .join("")
      .toLowerCase();
    const is_correct = solution === word.toLowerCase();
    setHurray(is_correct);
    // setScrambled(shuffleArray(word.split("")));
    // setResult(Array(word.length).fill({ letter: "", index: null }));
    socket.emit("poll-answer", {
      game_session_id: gameSession,
      player_name: username,
      info: {
        selected_answer: solution,
        transition: currentTrivia + 1,
        trivia_id: trivia[currentTrivia].id,
        is_correct,
        time_to_answer: prevAnswerTime - seconds,
      },
    });
    setPrevAnswerTime(seconds);
    setTimeout(() => {
      dispatch(updateTrivia(currentTrivia));
    }, 1000);
  };

  useEffect(() => {
    let intervalId: any;
    if (seconds) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      navigate(
        ROUTES.PLAY.LEADERBOARD_FOR("scrambed-words", gameSession as string)
      );
    }

    return () => clearInterval(intervalId);
  }, [seconds, gameSession, navigate]);

  useEffect(() => {
    const gameCompleted = trivia.every((item) => item.completed);
    if (gameCompleted)
      navigate(
        ROUTES.PLAY.LEADERBOARD_FOR("scrambled-words", gameSession as string)
      );

    setWord(trivia[currentTrivia].answer.toUpperCase());
    // eslint-disable-next-line
  }, [currentTrivia, gameSession, navigate]);

  useEffect(() => {
    setHurray(null);
    setScrambled(shuffleArray(word.split("")));
    setResult(Array(word.length).fill({ letter: "", index: null }));
  }, [word]);

  return (
    <AppLayout className="font-lal flex flex-col justify-between pt-[8rem]">
      <div className="flex flex-col items-center px-[1.125rem]">
        <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px]">
          SCRAMBLED WORDS
        </h1>
        <p className="font-inter font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[1.625rem]">
          Celebrities | Noobie
        </p>
        <div className="flex justify-center items-center mb-6">
          <CountdownCircleTimer
            isPlaying={seconds > 0}
            duration={60}
            colors="#FF9B9D"
            trailColor="#4F4F4F"
            size={63}
            strokeWidth={4}
            onComplete={() => ({ shouldRepeat: false })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <h4 className="text-pink text-center font-lal text-[1.25rem] leading-[1.959rem] tracking-[-0.15px] mb-4">
          {trivia[currentTrivia].question}
        </h4>
        {hurray === null ? (
          <div className="rounded-[10px] aspect-video relative min-h-[10.125rem] mb-3">
            <img src={image} alt="" className="w-full h-full rounded-[10px]" />
            <div className="absolute inset-0 bg-[#393939] opacity-75"></div>
            <div className="rounded-[10px] p-[0.625rem] absolute top-0 left-0 right-0 bottom-0 bg-transparent">
              <div className="w-full h-full relative scrambled-container">
                {scrambled.map((letter, i) => (
                  <div
                    key={i}
                    className={`absolute text-white font-lal text-[3.5rem] leading-[5.625rem] tracking-[-0.3px] uppercase ${scrambledMap[i]}`}
                    style={{
                      rotate: `${degreeMap[i]}deg`,
                    }}
                    onClick={() => handleLetterClick(letter, i)}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        {hurray !== null ? (
          <div
            className={`rounded-[26px] py-1 px-5 font-lal text-[1.063rem] text-center leading-[1.688rem] tracking-[-0.26px] mb-4 ${
              hurray ? "bg-green" : "bg-red"
            }`}
          >
            {hurray ? "Your answer is correct!" : "Oops! Wrong answer!"}
          </div>
        ) : null}
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
            <span className="font-inter text-[#D0D0D0] text-[0.813rem] leading-[1.016rem] tracking-[-0.15px]">
              Tap a letter to enter
            </span>
          )}
        </div>
        {trivia[currentTrivia].hint ? (
          <div className="bg-[#3D3C3C] rounded-[24px] py-[0.625rem] px-2 font-inter font-medium text-[0.625rem] text-center leading-[0.781rem] tracking-[-0.12px]">
            HINT: {trivia[currentTrivia].hint}
          </div>
        ) : null}
      </div>
      <button
        className="capitalize h-[6.25rem] bg-[#2CB553] font-lal text-white text-[1.5rem] leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center w-full"
        onClick={handleSubmit}
      >
        {trivia.every((item) => item.completed) ? "Next" : "Submit Answer"}
      </button>
    </AppLayout>
  );
};

export default ScrambledWordsGame;

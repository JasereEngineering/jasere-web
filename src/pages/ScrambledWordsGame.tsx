import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Socket } from "socket.io-client";

import AppLayout from "../components/layouts/AppLayout";

import backspace from "../assets/images/backspace.svg";

import { fillScrambled, shuffleArray } from "../helpers/misc";
import { RootState, AppDispatch } from "../store";
import { updateTrivia } from "../store/features/game";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";

const ScrambledWordsGame = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const { gameSession } = useParams();
  const [searchParams] = useSearchParams();

  const notCreator = searchParams.get("player");

  const dispatch = useDispatch<AppDispatch>();
  //const { trivia, currentTrivia, difficulty, categoryName, time } =
  const { trivia, currentTrivia, time } = useSelector<RootState>(
    ({ game }) => game,
  ) as GameState;
  const { username, id } = useSelector<RootState>(
    ({ auth }) => auth,
  ) as AuthState;

  const [word, setWord] = useState(trivia[currentTrivia]?.answer.toUpperCase());
  const [hurray, setHurray] = useState<any>(null);
  const [seconds, setSeconds] = useState(() => {
    const savedTime = localStorage.getItem(`remaining-time-${gameSession}`);
    return savedTime ? Number(savedTime) : time;
  });
  const [prevAnswerTime, setPrevAnswerTime] = useState(time);
  const [scrambled, setScrambled] = useState<
    { letter: string; selected: boolean }[]
  >(
    shuffleArray(
      fillScrambled(word)
        .split("")
        .map((l: string) => ({ letter: l, selected: false })),
    ),
  );
  const [result, setResult] = useState(
    Array(word.length).fill({ letter: "", index: null }),
  );

  // const degreeMap = useMemo(
  //   () =>
  //     shuffleArray(
  //       Array(word.length)
  //         .fill("")
  //         .map((i) => `${Math.floor(Math.random() * 61) - 30}`)
  //     ),
  //   [word.length]
  // );
  // const scrambledMap = useMemo(
  //   () =>
  //     shuffleArray([
  //       "right-[1.375rem] top-[3rem]",
  //       "left-[0rem] top-[0rem]",
  //       "left-[3.75rem] top-[1.25rem]",
  //       "left-[45%] top-[4rem]",
  //       "right-[6.75rem] top-[0rem]",
  //       "left-[5.875rem] bottom-[0rem]",
  //       "right-[4.375rem] top-[0rem]",
  //       "right-[2rem] bottom-0",
  //       "left-[40%] top-[0.625rem]",
  //       "left-[1.25rem] top-[4.375rem]",
  //       "left-[65%] bottom-0",
  //       "left-[18%] bottom-[-1.25rem]",
  //     ]),
  //   []
  // );

  // const renderTime = () => (
  //   <div className="flex flex-col justify-center items-center">
  //     <span className="font-lal text-[2rem] text-white text-center leading-[3.125rem] tracking-[-0.15px] relative top-[0.25rem]">
  //       {seconds}
  //     </span>
  //     <span className="font-lex text-[0.5rem] text-white text-center leading-[0.625rem] tracking-[-0.15px] relative bottom-[0.75rem]">
  //       seconds
  //     </span>
  //   </div>
  // );

  const handleLetterClick = (
    l: { letter: string; selected: boolean },
    index: number,
  ) => {
    if (!seconds) return;
    if (l.selected) return;
    const resultIndex = result.findIndex((item) => item.index === null);
    const newResult = [...result];
    const newScrambled = [...scrambled];

    newResult[resultIndex] = { letter: l.letter, index };
    setResult(newResult);

    newScrambled[index] = { ...newScrambled[index], selected: true };
    setScrambled(newScrambled);
  };

  const handleSpaceClick = (
    item: { letter: string; index: number },
    index: number,
  ) => {
    if (item.index !== null) {
      const newResult = [...result];
      const newScrambled = [...scrambled];

      newScrambled[item.index] = {
        ...newScrambled[item.index],
        selected: false,
      };
      setScrambled(newScrambled);

      newResult[index] = { letter: "", index: null };
      setResult(newResult);
    }
  };

  const handleBackspace = () => {
    const lastItem = [...result].reverse().find((i) => i.index !== null);
    const lastItemIndex =
      result.length -
      1 -
      result
        .slice()
        .reverse()
        .findIndex((i) => i.index !== null);
    if (!lastItem) return;

    const newResult = [...result];
    const newScrambled = [...scrambled];

    newScrambled[lastItem.index] = {
      ...newScrambled[lastItem.index],
      selected: false,
    };
    setScrambled(newScrambled);

    newResult[lastItemIndex] = { letter: "", index: null };
    setResult(newResult);
  };

  const handleSubmit = (skip?: boolean) => {
    const solution = skip
      ? ""
      : result
          .map((item) => item.letter)
          .join("")
          .toLowerCase();
    const is_correct = solution === word.toLowerCase();
    if (!skip) setHurray(is_correct);
    socket?.emit("poll-answer", {
      game_session_id: gameSession,
      player_name: username,
      user_id: id,
      info: {
        selected_answer: solution,
        transition: currentTrivia + 1,
        trivia_id: trivia[currentTrivia].id,
        is_correct,
        time_to_answer: prevAnswerTime - seconds,
      },
    });
    setPrevAnswerTime(seconds);
    setTimeout(
      () => {
        dispatch(updateTrivia(currentTrivia));
      },
      skip ? 1 : 1000,
    );
  };

  useEffect(() => {
    let intervalId: any;
    if (seconds) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => {
            const newSeconds = prevSeconds - 1;
            localStorage.setItem(
              `remaining-time-${gameSession}`,
              newSeconds.toString(),
            );
            return newSeconds;
          });
        }
      }, 1000);
    } else {
      navigate(
        ROUTES.PLAY.LEADERBOARD_FOR(
          "scrambed-words",
          gameSession as string,
          !!notCreator,
        ),
      );
    }

    return () => clearInterval(intervalId);
  }, [seconds, gameSession, navigate, notCreator]);

  useEffect(() => {
    const gameCompleted = trivia.every((item) => item.completed);
    if (gameCompleted)
      navigate(
        ROUTES.PLAY.LEADERBOARD_FOR(
          "scrambled-words",
          gameSession as string,
          !!notCreator,
        ),
      );

    setWord(trivia[currentTrivia].answer.toUpperCase());
    // eslint-disable-next-line
  }, [currentTrivia, gameSession, navigate, notCreator]);

  useEffect(() => {
    setHurray(null);
    setScrambled(
      shuffleArray(
        fillScrambled(word)
          .split("")
          .map((l: string) => ({ letter: l, selected: false })),
      ),
    );
    setResult(Array(word.length).fill({ letter: "", index: null }));
  }, [word]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(`remaining-time-${gameSession}`);
    };
  }, [gameSession]);

  return (
    <AppLayout className="font-lal flex flex-col pt-[8rem]">
      <div className="flex flex-col items-center px-[1.125rem] pb-[8rem]">
        {/* <h1 className="text-[1.875rem] text-center leading-[2.979rem] tracking-[-0.25px]">
          SCRAMBLED WORDS
        </h1>
        <p className="font-inter font-medium text-[1rem] text-center leading-[1.25rem] tracking-[-0.18px] mb-[1.625rem] capitalize">
          {categoryName} | {difficulty}
        </p> */}
        {/* <div className="flex justify-center items-center mb-[1.125rem]">
          <CountdownCircleTimer
            isPlaying={seconds > 0}
            duration={time}
            colors="#FF9B9D"
            trailColor="#4F4F4F"
            size={63}
            strokeWidth={4}
            onComplete={() => ({ shouldRepeat: false })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div> */}
        <h4 className="px-[1.094rem] py-2.5 bg-pink rounded-[22px] text-center text-[1.25rem] leading-[1.959rem] tracking-[-0.15px] mb-2.5">
          {trivia[currentTrivia].question}
        </h4>
        <div className="bg-[#3D3C3C] rounded-[24px] py-[0.625rem] px-2 font-inter font-medium text-[0.625rem] text-center leading-[0.781rem] tracking-[-0.12px] mb-3">
          HINT: {trivia[currentTrivia].hint || "No hint"}
        </div>

        <div className="w-full bg-white rounded-[3px] h-[0.25rem] m-6">
          <div
            className="lemon-countdown bg-[#CE0F15] h-[0.25rem] rounded-[3px] transition-all ease-linear duration-1000"
            style={{ width: `${(seconds / time) * 100}%` }}
          ></div>
        </div>

        {/* {hurray === null ? (
          <div className="rounded-[10px] aspect-video relative min-h-[10.125rem] mb-3">
            <img
              loading="lazy"
              src={image}
              alt=""
              className="w-full h-full rounded-[10px]"
            />
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
        ) : null} */}
        <div
          className={`rounded-[10px] border border-white h-[3.125rem] w-full flex justify-center items-center text-center gap-x-[0.125rem] mb-[1.625rem] ${
            hurray ? "border-2 bg-green" : ""
          } ${
            hurray === false ? "border-2 border-[#E9564D] bg-[#E9564D]" : ""
          }`}
        >
          {result.some((r) => r.index) ? (
            result.map((item, i) => (
              <span
                key={i}
                className={`font-lal text-[2rem] leading-[3.125rem] tracking-[-0.15px] ${
                  [true, false].includes(hurray)
                    ? "font-inter text-[1rem] leading-[1.21rem] tracking-[3px]"
                    : ""
                }`}
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
        <div className="grid grid-cols-5 gap-x-[1.375rem] gap-y-6 mb-6">
          {scrambled.map((l, i) => (
            <div
              key={i}
              className={`bg-white text-black text-[1.5rem] leading-[2.351rem] tracking-[-0.27px] uppercase rounded-[5px] flex justify-center items-center w-[1.832rem] h-[2.414rem] ${
                l.selected ? "opacity-25" : "opacity-100"
              }`}
              onClick={() => handleLetterClick(l, i)}
            >
              {l.letter}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between items-center">
          <div
            className="bg-[#3D3C3C] rounded-[26px] py-[0.563rem] px-[1.188rem] font-inter font-semibold text-[0.983rem] leading-[1.188rem] tracking-[-0.13px]"
            onClick={() => handleSubmit(true)}
          >
            SKIP
          </div>
          <div
            className="bg-[#3D3C3C] rounded-[26px] py-[0.531rem] px-[1.188rem]"
            onClick={handleBackspace}
          >
            <img loading="lazy" src={backspace} alt="backspace" />
          </div>
        </div>
      </div>
      <button
        className="capitalize h-[6.25rem] bg-white font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center w-full fixed bottom-0 left-0 right-0"
        onClick={() => handleSubmit()}
      >
        {trivia.every((item) => item.completed) ? "NEXT" : "SUBMIT"}
      </button>
    </AppLayout>
  );
};

export default ScrambledWordsGame;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";

import correct from "../assets/images/correct.svg";

import { shuffleArray } from "../helpers/misc";
import { RootState, AppDispatch } from "../store";
import { updateTrivia } from "../store/features/game";
import { AuthState, GameState } from "../types";
import * as ROUTES from "../routes";

const ScrambledWordsGame = () => {
  const navigate = useNavigate();
  const { gameSession } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { gameName, trivia, currentTrivia } = useSelector<RootState>(
    ({ game }) => game
  ) as GameState;
  const { username } = useSelector<RootState>(({ auth }) => auth) as AuthState;

  const [word, setWord] = useState(trivia[currentTrivia].answer.toUpperCase());
  const [hurray, setHurray] = useState<any>(null);
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
    <span className="font-lato font-black text-[4.688rem] lg:text-[11.688rem]">
      {seconds}
    </span>
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

  const handleSubmit = () => {
    if (scrambled.join("")) return toast.error("incomplete solution");

    const solution = result
      .map((item) => item.letter)
      .join("")
      .toLowerCase();
    if (solution !== word.toLowerCase()) {
      setHurray(false);
      setScrambled(shuffleArray(word.split("")));
      setResult(Array(word.length).fill({ letter: "", index: null }));
      socket.emit("poll", {
        game_session_id: gameSession,
        selected_answer: solution,
        transition: currentTrivia + 1,
        trivia_id: trivia[currentTrivia].id,
        is_correct: false,
        player_name: username,
      });
    } else {
      setHurray(true);
      socket.emit("poll", {
        game_session_id: gameSession,
        selected_answer: solution,
        transition: currentTrivia + 1,
        trivia_id: trivia[currentTrivia].id,
        is_correct: true,
        player_name: username,
      });
      setTimeout(() => {
        dispatch(updateTrivia(currentTrivia));
      }, 1000);
    }
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
  }, [currentTrivia, gameSession, navigate]);

  useEffect(() => {
    setHurray(null);
    setScrambled(shuffleArray(word.split("")));
    setResult(Array(word.length).fill({ letter: "", index: null }));
  }, [word]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <AppLayout
      className="font-lato flex flex-col"
      navClassName="mb-6 md:mb-[5rem]"
    >
      <div className="grow pb-[2.5rem] px-[1.875rem] flex flex-col lg:hidden">
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
          {/* <h2 className="font-black text-[1rem] mb-5 tracking-[0.25rem] uppercase"> */}
          <h2 className="text-[1rem] mb-5 uppercase">
            HINT: {trivia[currentTrivia].question}
          </h2>
          <Button
            text={trivia.every((item) => item.completed) ? "NEXT" : "SUBMIT"}
            className="border border-violet !bg-inherit !p-4 !font-extrabold"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div className="grow pb-15 px-[3.75rem] hidden lg:flex flex-col overflow-x-auto no-scrollbar">
        <h1 className="font-black text-[5.625rem] text-orange text-center">
          MOVIE STARS
        </h1>
        <h3 className="font-black text-[1.75rem] text-center mb-[5.313rem]">
          SCRAMBLED WORDS
        </h3>
        <div className="flex items-center">
          <div className="grow flex flex-col mr-5">
            <div className="bg-[#FFFFFF30] border border-[#AFAFAF] p-[3.75rem] rounded-[25px] mb-5">
              {hurray !== null ? (
                <div className="flex justify-center items-center">
                  <span className="font-semibold text-[2.5rem] uppercase">
                    {hurray ? "Hurray!!!" : "Try again"}
                  </span>
                  <img src={correct} alt="correct" className="ml-2" />
                </div>
              ) : null}
              <div className="flex justify-center items-center gap-x-5 mb-4 overflow-x-auto no-scrollbar">
                {scrambled.map((letter, i) => (
                  <div
                    key={i}
                    className="text-[#FFF7ED] text-[8rem] font-black cursor-pointer"
                    onClick={() => handleLetterClick(letter, i)}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center gap-x-5">
                {result.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#0F2026] border border-white flex justify-center items-center text-[2.5rem] font-black w-[7.063rem] h-[7.063rem] cursor-pointer"
                    onClick={() => handleSpaceClick(item, i)}
                  >
                    {item.letter}
                  </div>
                ))}
              </div>
            </div>
            <h2 className="text-[1.75rem] font-black uppercase">
              HINT: {trivia[currentTrivia].question}
            </h2>
          </div>
          <div className="flex flex-col items-center w-[30%]">
            {seconds ? (
              <>
                <h4 className="mb-6 font-black text-[2.75rem]">COUNTDOWN</h4>
                <div className="flex justify-center mb-[3.25rem]">
                  <CountdownCircleTimer
                    isPlaying={seconds > 0}
                    duration={60}
                    colors="#F28C0D"
                    size={250}
                    strokeWidth={1}
                    onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                  >
                    {renderTime}
                  </CountdownCircleTimer>
                </div>
              </>
            ) : null}
            <Button
              text={trivia.every((item) => item.completed) ? "NEXT" : "SUBMIT"}
              className="border border-white !bg-inherit !p-4 !font-black shadow-inner max-w-[21.25rem]"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ScrambledWordsGame;

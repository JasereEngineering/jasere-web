import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";

import AppLayout from "../../../components/layouts/AppLayout";

import { RootState, AppDispatch } from "../../../store";
import { updateTrivia } from "../../../store/features/game";
import { AuthState, GameState } from "../../../types";
import * as ROUTES from "../../../routes";
import CorrectGameButton from "../../../components/forms/CorrectGameButton";
import { colorMap } from "../../../helpers/misc";
import AudioPlayer from "../../../components/misc/AudioPlayer";
import LazyLoadImageWithPlaceholder from "../../../components/misc/LazyLoadImageWithPlaceholder";
import audioPlayImage from "../../../assets/images/mynaui-play-solid.svg";
import audioPauseImage from "../../../assets/images/basil_pause-solid.svg";

const CorrectGame = ({ socket }: { socket: Socket | null }) => {
  const navigate = useNavigate();
  const { gameSession,gameTitle } = useParams();
  const [searchParams] = useSearchParams();

  const notCreator = searchParams.get("player");

  const dispatch = useDispatch<AppDispatch>();
  const { trivia, currentTrivia, time } =
    useSelector<RootState>(({ game }) => game) as GameState;
  const { username, id } = useSelector<RootState>(
    ({ auth }) => auth
  ) as AuthState;

  

  const [loaded, setLoaded] = useState(false);
  const [word, setWord] = useState(trivia[currentTrivia]?.answer.toUpperCase());
  const [hurray, setHurray] = useState<any>(null);
  const [index,setIndex] = useState<any>(null);
  const [seconds, setSeconds] = useState(() => {
    const savedTime = localStorage.getItem(`remaining-time-${gameSession}`);
    return savedTime ? Number(savedTime) : time;
  });
  const [prevAnswerTime, setPrevAnswerTime] = useState(time);

  
  const questionType = (trivia[currentTrivia].question_type || "").toLowerCase()
  const conditionTimer = (seconds > 0) &&  (  ( questionType === "text" ) || (loaded === true && (questionType !== "text"))  )
  //console.log( `Seconds - ${seconds} ConditionTimer - ${conditionTimer} - Question Type: ${questionType} ` );
  
  const handleSubmit = (selected_answer:string,skip?:boolean,index?:number) => {
    const is_correct = selected_answer === word.toLowerCase();
    if (!skip){
      setIndex( index );
      setHurray(is_correct);
    }
    socket?.emit("poll-answer", {
      game_session_id: gameSession,
      player_name: username,
      user_id: id,
      info: {
        selected_answer,
        transition: currentTrivia + 1,
        trivia_id: trivia[currentTrivia].id,
        is_correct,
        time_to_answer: prevAnswerTime - seconds,
      },
    });
    setPrevAnswerTime(seconds);
    setLoaded(false);
    setTimeout(
      () => {
        setIndex(null);
        dispatch(updateTrivia(currentTrivia));
      },
      skip ? 1 : 1000
    );
  };
    
  useEffect(() => {
    let intervalId: any;
    if ( seconds ) {
      intervalId = setInterval(() => {
        if (conditionTimer) {
          setSeconds((prevSeconds) => {
            const newSeconds = prevSeconds - 1;
            localStorage.setItem(
              `remaining-time-${gameSession}`,
              newSeconds.toString()
            );
            return newSeconds;
          });
        }
      }, 1000);
    } else {
      navigate(
        ROUTES.PLAY.LEADERBOARD_FOR(
          "correct",
          gameSession as string,
          !!notCreator
        )
      );
    }

    return () => clearInterval(intervalId);
  }, [seconds, gameSession, navigate, notCreator,conditionTimer]);
  
  useEffect(() => {
    const gameCompleted = trivia.every((item) => item.completed);
    if (gameCompleted)
      navigate(
        ROUTES.PLAY.LEADERBOARD_FOR(
          "correct",
          gameSession as string,
          !!notCreator
        )
      );

    setWord(trivia[currentTrivia].answer.toUpperCase());
    // eslint-disable-next-line
  }, [currentTrivia, gameSession, navigate, notCreator]);

  useEffect(() => {
    setHurray(null);
  }, [word]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(`remaining-time-${gameSession}`);
    };
  }, [gameSession]);




  // const loadAudioWithNoCors = async (audioUrl:string) => {
  //   try {
  //     if( !audioUrl ) return;
  //     // Fetch audio file with no-cors mode
  //     const response = await fetch(audioUrl, { mode: 'no-cors' });
  //     const blob = await response.blob();
  //     const audioBlobUrl = URL.createObjectURL(blob);

  //     // Load the audio into Wavesurfer
  //     //waveSurfer.load(audioBlobUrl);
  //     console.log( audioBlobUrl );

  //   } catch (error) {
  //     console.error('Error fetching audio file:', error);
  //   }
  // };
  
  // loadAudioWithNoCors(trivia[currentTrivia].asset_uri);



  return (
    <AppLayout className="font-lal flex flex-col pt-[3.1rem]" navClassName="h-1">
      <div className="flex flex-col items-center px-[1.125rem] pb-[8rem] mb-[20rem]">
        <h1 className="text-[1.875rem] text-center tracking-[-0.25px]">
          CORRECT!
        </h1>
        <h4 className={`px-[1.094rem] py-0.1 bg-[${
                    colorMap[gameTitle?.toLowerCase() as keyof typeof colorMap]
                  }] rounded-[22px] text-center text-[1.25rem] leading-[1.959rem] tracking-[-0.15px] mb-1.5`}>
          { conditionTimer && trivia[currentTrivia].question}
        </h4>
          {
                (trivia[currentTrivia].question_type || "").toLowerCase() === "image" && 
                (<div>
                  <LazyLoadImageWithPlaceholder 
                    src={trivia[currentTrivia].asset_uri} 
                    alt="" 
                    notifyParent={ setLoaded }  
                  />
                </div>)
          }
          {
                (trivia[currentTrivia].question_type || "").toLowerCase() === "audio" && 
                (<div className={`border-${ loaded ? 4:0 } border-white w-full rounded-[11px]`}>
                  <AudioPlayer 
                    sound={trivia[currentTrivia].asset_uri} 
                    height={66} 
                    notifyParent={setLoaded} 
                    audioPlayImage={audioPlayImage}   
                    audioPauseImage={audioPauseImage}
                  />
                </div>)
          }

<div className="w-full bg-white rounded-[3px] h-[0.25rem] m-6">
                <div
                  className="lemon-countdown bg-[#CE0F15] h-[0.25rem] rounded-[3px] transition-all ease-linear duration-1000"
                  style={{ width: `${(seconds / time) * 100}%` }}
                ></div>
              </div>

        
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 items-center w-full">
            {

                trivia[currentTrivia].options.map( ( option:string,i:number ) => (
                  <CorrectGameButton 
                    key={i} componentIndex={i} 
                    renderedIndex={index} 
                    text={option} 
                    hurray={hurray}
                    onClick={ ()=>{
                    handleSubmit(option.toLowerCase(),false,i)
                  }}/>

                ))
            }
          </div>
      </div>

      <button
        className="capitalize h-[2.25rem] bg-white font-lal text-[1.5rem] leading-[2.375rem] tracking-[-0.1px] text-black flex items-center justify-center w-full fixed bottom-0 left-0 right-0"
        onClick={ ()=>{
          handleSubmit( "",true, )
        }}
        >
         SKIP
      </button>
    </AppLayout>
  );
};

export default CorrectGame;

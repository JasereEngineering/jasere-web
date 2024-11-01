import WavesurferPlayer from '@wavesurfer/react'
import { CSSProperties, useState } from 'react'
import { PacmanLoader } from 'react-spinners'

const AudioPlayer = ( {sound,height,notifyParent,audioPlayImage,audioPauseImage}:{sound:any,height:number,notifyParent?:any,audioPlayImage?:string,audioPauseImage?:string} ) => {
  const [wavesurfer, setWavesurfer] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false);

  const onReady = (ws:any) => {
    setWavesurfer(ws)
    setIsPlaying(false);
    setLoaded( true );
    notifyParent(true);
  }
  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }
  const override: CSSProperties = {
    borderColor: "#FFFFFF",
    background: "transparent"
  };

  return (
    <div>
    {
        !loaded && (
            <div className="flex items-center justify-center">
                <PacmanLoader cssOverride={override} size={25} color="#FFFFFF" />
            </div>
          )
      }
      <div className="flex justify-between mr-3">

        {
            isPlaying ? (<img
                className="ml-3"
                alt=""
                src={audioPauseImage} 
                loading="lazy"
                style={{ display: loaded ? 'block':'none' }}
                onClick={onPlayPause}
                />):(
                    <img
                    className="ml-3"
                    alt=""
                    src={audioPlayImage} 
                    loading="lazy"
                    style={{ display: loaded ? 'block':'none' }}
                    onClick={onPlayPause}
                    />
                )
        }



      <div className='w-full pl-3'>
      <WavesurferPlayer
        height={height}
        waveColor="#093B65"
        url={ sound}
        onReady={onReady}
        autoplay={false}
        backend='MediaElement'
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        // fetchParams={
        //     {

        //         mode:'no-cors',
        //         cache:'no-cache',
        //         referrerPolicy:'same-origin',
        //         headers:{
        //             'Accept': 'audio/mpeg, audio/mp3'
        //         }
        //     }

        // }

      />
      </div>


      
    </div>
    </div>
  )
}

export default AudioPlayer;

import { CSSProperties, useEffect, useState } from 'react';
import { PacmanLoader } from 'react-spinners';

function LazyLoadImageWithPlaceholder({ src, alt,notifyParent }:{ src:string,alt:string,notifyParent:any }) {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  useEffect(() => {
    setImageSrc(`${src}`);
  }, [src]);  // Trigger this effect whenever the `src` prop changes
  const override: CSSProperties = {
    borderColor: "#FFFFFF",
    background: "transparent"
  };

  return (
    <div>
          {
            !loaded && ( 
              <div className="items-center text-center">
                <PacmanLoader cssOverride={override} size={25} color="#FFFFFF" />
                <label>Loading Image....</label>
              </div>

              )
          }
          <img
          className='w-[18.19rem] h-[18.19rem] object-cover rounded-[15px]'
              src={imageSrc}
              alt={alt}
              onError={ (err) => {
                console.log( `image error - ${err}` );
              }}
              onLoad={() => {
                console.log( "image loaded" );
                setLoaded(true);
                notifyParent(true);
              }}
              style={{ display: loaded ? 'block' : 'none' }}
              //{...props}  // Pass any other props like className, etc.
            />
</div>

  )
}

export default LazyLoadImageWithPlaceholder;

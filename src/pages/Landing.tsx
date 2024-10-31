import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layouts/AppLayout";
import Button from "../components/forms/Button";
// import landing from "../assets/images/landing.svg";
import dot from "../assets/images/dot.svg";


import * as ROUTES from "../routes";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <AppLayout className="pt-[7.625rem] px-[1.875rem] pb-[5.25rem] flex flex-col justify-between bg-[#F9E4C7]" landing={true}>
      

      <div className={`flex flex-col items-center grow bg-[url('https://storage.googleapis.com/jasere-assets/static/img/People%20asset.svg')] bg-center bg-no-repeat w-full`}>
        
    

        
        {/* <div className="grid h-full justify-between items-center w-full text-black mb-10 border border-black">

          <div className="col-start-1 border border-black">
            <img src={black_kite} loading="lazy" className="w-[4rem] h-full object-cover" />
          </div>
          <div className="col-start-2 border-1 ">
          <img src={yellow_kite} loading="lazy" className="mb-10 w-[4rem] h-full object-cover" />
          </div>
          <div className="col-start-1 border-1">
            <label>Test</label>
          </div>
          <div className="col-start-2 border-1">
            <label>Test</label>
          </div>
          <div className="col-start-1 border-1">
            <label>Test</label>
          </div>
          <div className="col-start-2 border-1">
            <label>Test</label>
          </div>

          <div className="col-start-1 border-1">
            <label>Test</label>
          </div>
          <div className="col-start-2 border-1">
            <label>Test</label>
          </div>
          <div className="col-start-1 border-1">
            <label>Test</label>
          </div>
          <div className="col-start-2 border-1">
            <label>Test</label>
          </div>


        </div> */}
        
      </div>
      <div>
        <p className="font-lat text-[1rem] font-thicker text-[#E96200] text-center leading-[1.094rem] tracking-[-0.4px] mt-3 mb-3">
          The best party games on mobile
        </p>
        <Button
          text="Let's Play!"
          className="rounded-[78px] mb-6 bg-[#E6A101] text-black z-index relative"
          onClick={() => navigate(ROUTES.PLAY.GET_STARTED)}
        />
        <div className="flex justify-center text-[#80A800] items-center gap-x-1.5 font-inter text-[0.875rem] leading-[1.059rem] tracking-[-0.4px] mb-8">
          <a href="/terms">Terms of use</a>
          <div className="bg-[#80A800]"><img loading="lazy" src={dot} alt="dot" /></div>
          <a href="/privacy">Privacy policy</a>
        </div>
      </div>
    </AppLayout>
  );
};

export default Landing;

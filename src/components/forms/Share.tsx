import whatsapp from "../../assets/images/whatsapp.svg";
import twitter from "../../assets/images/twitter.svg";
import snapchat from "../../assets/images/snapchat.svg";
import shareLink from "../../assets/images/shareLink.svg";
import instagram from "../../assets/images/instagram.svg";

const Share = () => {
  const handleShare = (option: string) => {
    console.log(`Sharing via ${option}`);
  };

  return (
    <div className="fixed bottom-0 left-0 h-[424px] w-full bg-[#1E1E1E] text-white rounded-t-[20px] shadow-lg z-50">
      <div className="flex items-center justify-center mt-[14px]">
        <div className="bg-[#D9D9D924] h-2 w-40 rounded-full" />
      </div>
      <h2 className="text-2xl my-6 text-center">Share to</h2>
      <div className="grid grid-cols-3 gap-x-6 gap-y-7 px-5">
        <button
          onClick={() => handleShare("WhatsApp")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg"
        >
          <img src={whatsapp} alt="WhatsApp" className="w-[40px] h-[40px]" />
          <span className="text-base">WhatsApp</span>
        </button>
        <button
          onClick={() => handleShare("Instagram")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg"
        >
          <img src={instagram} alt="Instagram" className="w-[40px] h-[40px]" />
          <span className="text-base">Instagram</span>
        </button>
        <button
          onClick={() => handleShare("Snapchat")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg"
        >
          <img src={snapchat} alt="Snapchat" className="w-[40px] h-[40px]" />
          <span className="text-base">Snapchat</span>
        </button>
        <button
          onClick={() => handleShare("X")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg"
        >
          <img src={twitter} alt="X" className="w-[40px] h-[40px]" />
          <span className="text-base">X</span>
        </button>
        <button
          onClick={() => handleShare("Link")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg"
        >
          <img src={shareLink} alt="Share Link" className="w-[40px] h-[40px]" />
          <span className="text-base">Share Link</span>
        </button>
      </div>
    </div>
  );
};

export default Share;

import whatsapp from "../../assets/images/whatsapp.svg";
import twitter from "../../assets/images/twitter.svg";
import snapchat from "../../assets/images/snapchat.svg";
import shareLink from "../../assets/images/shareLink.svg";
import instagram from "../../assets/images/instagram.svg";
import BottomModal from "../misc/BottomModal";

interface ShareProps {
  onClose: () => void;
  showModal: boolean;
}

const Share = ({ onClose, showModal }: ShareProps) => {
  const handleShare = (platform: string) => {
    onClose();
  };

  return (
    <BottomModal onClose={onClose} showModal={showModal}>
      <h2 className="text-2xl my-6 text-center text-white font-lal">
        Share to
      </h2>
      <div className="grid grid-cols-3 gap-x-6 gap-y-7 px-5 mb-6">
        <button
          onClick={() => handleShare("WhatsApp")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg hover:bg-[#3C3C3C] transition-colors"
        >
          <img src={whatsapp} alt="WhatsApp" className="w-[40px] h-[40px]" />
          <span className="text-base text-white">WhatsApp</span>
        </button>
        <button
          onClick={() => handleShare("Instagram")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg hover:bg-[#3C3C3C] transition-colors"
        >
          <img src={instagram} alt="Instagram" className="w-[40px] h-[40px]" />
          <span className="text-base text-white">Instagram</span>
        </button>
        <button
          onClick={() => handleShare("Snapchat")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg hover:bg-[#3C3C3C] transition-colors"
        >
          <img src={snapchat} alt="Snapchat" className="w-[40px] h-[40px]" />
          <span className="text-base text-white">Snapchat</span>
        </button>
        <button
          onClick={() => handleShare("X")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg hover:bg-[#3C3C3C] transition-colors"
        >
          <img src={twitter} alt="X" className="w-[40px] h-[40px]" />
          <span className="text-base text-white">X</span>
        </button>
        <button
          onClick={() => handleShare("Link")}
          className="flex flex-col items-center px-1 font-manjari text-[13px] py-3 gap-4 bg-[#2C2C2C] rounded-lg hover:bg-[#3C3C3C] transition-colors"
        >
          <img src={shareLink} alt="Share Link" className="w-[40px] h-[40px]" />
          <span className="text-base text-white">Share Link</span>
        </button>
      </div>
    </BottomModal>
  );
};

export default Share;

import { RxCross2 } from "react-icons/rx";
import { ImageSlider } from "../designers/ImageSlider";

const SponsorshipModal = ({ isOpen, onClose, title }) => {
    if (!isOpen) return null;
    const images = [
        "/dashboard/sp/1.png",
        "/dashboard/sp/2.png",
        "/dashboard/sp/3.png",
        "/dashboard/sp/4.png",
    ]
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-opacity-50 backdrop-blur-md"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-lg shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 cursor-pointer bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                    <RxCross2 />
                </button>

                <div className="mt-10">
                    <div className="flex items-center justify-between p-6 pb-4">
                        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                        <img
                            src="/dashboard/download.png"
                            alt="Download"
                            className="w-8 h-8 ml-4"
                        />
                    </div>

                    <div className="p-6">
                        <ImageSlider images={images} className="h-[300px] sm:h-[400px] lg:h-[500px] max-w-5xl w-full mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SponsorshipModal;
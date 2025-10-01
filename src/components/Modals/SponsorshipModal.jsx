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
                className="absolute inset-0 bg-opacity-50 2xl:bg-opacity-60 backdrop-blur-md 2xl:backdrop-blur-lg"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-lg 2xl:rounded-2xl shadow-2xl 2xl:shadow-3xl max-w-6xl 2xl:max-w-none w-full 2xl:w-[calc(100vw-8rem)] mx-4 2xl:mx-16 max-h-[90vh] 2xl:max-h-[92vh] overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 2xl:top-6 right-4 2xl:right-6 z-10 p-2 2xl:p-3 cursor-pointer bg-white rounded-full shadow-lg 2xl:shadow-xl hover:bg-gray-100 2xl:hover:bg-gray-200 hover:scale-105 transition-all duration-200"
                >
                    <RxCross2 className="w-4 h-4 2xl:w-8 2xl:h-8" />
                </button>

                <div className="mt-10 2xl:mt-12">
                    <div className="flex items-center justify-between p-6 2xl:p-10 pb-4 2xl:pb-6">
                        <h2 className="text-2xl 2xl:text-4xl font-bold text-gray-800">{title}</h2>
                        <button className="group hover:scale-105 transition-transform duration-200">
                            <img
                                src="/dashboard/download.png"
                                alt="Download"
                                className="w-8 h-8 2xl:w-12 2xl:h-12 ml-4 2xl:ml-6 group-hover:opacity-80 transition-opacity duration-200"
                            />
                        </button>
                    </div>

                    <div className="p-6 2xl:p-10 2xl:pt-6">
                        <ImageSlider 
                            images={images} 
                            className="h-[300px] sm:h-[400px] lg:h-[500px] 2xl:h-[calc(100vh-20rem)] max-w-5xl 2xl:max-w-none w-full mx-auto 2xl:rounded-xl" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SponsorshipModal;
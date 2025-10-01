"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = ({ images }) => {
  const [visibleImagesCount, setVisibleImagesCount] = useState(9);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayedImages = images.slice(0, visibleImagesCount);
  const hasMoreImages = visibleImagesCount < images.length;
  const showingAllImages =
    visibleImagesCount >= images.length && images.length > 9;

  const showMoreImages = () => {
    setVisibleImagesCount((prev) => prev + 6);
  };

  const showLessImages = () => {
    setVisibleImagesCount(9);
  };

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <>
      {images && images.length > 0 && (
        <div ref={ref} className="rounded-2xl mb-10">
          <div className="px-4 py-10 md:px-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }} // 👈 animate only once when 20% is visible
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="aspect-square overflow-hidden rounded-lg cursor-zoom-in"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={image || "/api/placeholder/300/300"}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>

            {(hasMoreImages || showingAllImages) && (
              <div className="text-center mt-6">
                {hasMoreImages ? (
                  <button
                    onClick={showMoreImages}
                    className="bg-[#e0ebd2] text-[#0d3d2d] px-8 py-3 font-medium cursor-pointer rounded-lg hover:bg-[#c5e6c5] transition-colors 2xl:text-2xl duration-200 w-full md:w-fit"
                  >
                    View more
                  </button>
                ) : (
                  <button
                    onClick={showLessImages}
                    className="bg-[#e0ebd2] text-[#0d3d2d] px-8 py-3 font-medium cursor-pointer rounded-lg hover:bg-[#c5e6c5] transition-colors 2xl:text-2xl duration-200 w-full md:w-fit"
                  >
                    View less
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            onClick={closeModal}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2"
            >
              <X size={32} />
            </motion.button>

            {/* Previous Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-2 bg-black bg-opacity-50 rounded-full"
            >
              <ChevronLeft size={32} />
            </motion.button>

            {/* Next Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-2 bg-black bg-opacity-50 rounded-full"
            >
              <ChevronRight size={32} />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex] || "/api/placeholder/800/800"}
                  alt={`Gallery ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;

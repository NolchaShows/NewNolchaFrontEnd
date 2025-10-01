import React, { useEffect, useState } from 'react'
import { DeckCard } from './Home/Card';
import { ImageSlider } from '../designers/ImageSlider';
import SponsorshipModal from '../Modals/SponsorshipModal';

const SponsorshipDecks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [screenSize, setScreenSize] = useState('large');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  
  const events = [
    { title: "Latest deck", image: "/dashboard/events/1.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Latest deck", image: "/dashboard/events/2.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Latest deck", image: "/dashboard/events/3.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Latest deck", image: "/dashboard/events/4.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Latest deck", image: "/dashboard/events/5.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Latest deck", image: "/dashboard/events/6.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Latest deck", image: "/dashboard/events/7.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Latest deck", image: "/dashboard/events/8.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Latest deck", image: "/dashboard/events/9.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Deck name", image: "/dashboard/events/1.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Latest deck", image: "/dashboard/events/2.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Deck name", image: "/dashboard/events/3.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Event deck", image: "/dashboard/events/4.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "New deck", image: "/dashboard/events/5.png", date: "Last updated: 15.05.2025, 15:37", },
    { title: "Demo deck", image: "/dashboard/events/6.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Sample deck", image: "/dashboard/events/7.png", date: "Last updated: 15.05.2025, 15:37" },
    { title: "Final deck", image: "/dashboard/events/9.png", date: "Last updated: 15.05.2025, 15:37" }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize('large');
      } else if (width >= 768) {
        setScreenSize('medium');
      } else {
        setScreenSize('small');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [screenSize]);

  const handleClick = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const getItemsPerPage = () => {
    switch (screenSize) {
      case 'large': return 9;
      case 'medium': return 6;
      case 'small': return 6;
      default: return 6;
    }
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  const showingStart = startIndex + 1;
  const showingEnd = Math.min(endIndex, events.length);
  const totalEvents = events.length;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center lg:justify-start gap-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors"
          disabled={currentPage === 1}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${currentPage === page
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 transition-colors"
          disabled={currentPage === totalPages}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 lg:p-6 min-h-screen md:bg-[#F4F4F4]">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 uppercase">Sponsorship decks</h1>
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {currentEvents.map((event, index) => (
            <DeckCard
              key={startIndex + index}
              date={event.date}
              title={event.title}
              image={event.image}
              onAction={handleClick}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-600">
            Showing {showingStart}-{showingEnd} from {totalEvents}
          </p>
          {renderPagination()}
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {currentEvents.map((event, index) => (
          <DeckCard
            key={startIndex + index}
            date={event.date}
            title={event.title}
            image={event.image}
            onAction={handleClick}
          />
        ))}

        <div className="flex flex-col items-center gap-4 mt-6">
          <p className="text-sm text-gray-600">
            Showing {showingStart}-{showingEnd} from {totalEvents}
          </p>
          {renderPagination()}
        </div>
      </div>
      <SponsorshipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      />

    </div>
  );
}

export default SponsorshipDecks
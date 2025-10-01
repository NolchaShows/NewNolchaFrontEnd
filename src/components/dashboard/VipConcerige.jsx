import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function VipConciergeTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const data = [
    { id: 1, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Going" },
    { id: 2, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Going" },
    { id: 3, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Going" },
    { id: 4, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Going" },
    { id: 5, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Pending" },
    { id: 6, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Pending" },
    { id: 7, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Not going" },
    { id: 8, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Not going" },
    { id: 9, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Pending" },
    { id: 10, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Not going" },
    { id: 11, name: "Jack Smith", hotel: "Marriott New york", host: "Patrick Taylor", date: "24.05.2025, 17:12", status: "Not going" },
  ];

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Going":
        return "bg-green-100 text-green-700 2xl:bg-green-200 2xl:text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 2xl:bg-yellow-200 2xl:text-yellow-800";
      case "Not going":
        return "bg-gray-100 text-gray-600 2xl:bg-gray-200 2xl:text-gray-700";
      default:
        return "bg-gray-100 text-gray-600 2xl:bg-gray-200 2xl:text-gray-700";
    }
  };

  const getAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&size=32`;
  };

  return (
    <div className="w-full bg-[#F4F4F4]">
      <div className="flex items-center justify-between p-4 md:p-6 2xl:p-8 border-b md:border-b-0">
        <h1 className="text-lg md:text-xl 2xl:text-2xl font-semibold text-gray-900">VIP CONCIERGE</h1>
        <div className="md:hidden"></div>
      </div>

      <div className="p-4 md:p-6 2xl:p-8 md:pt-0 2xl:pt-0">
        <div className="w-full overflow-x-auto custom-scrollbar" style={{maxWidth: '100%'}}>
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              height: 8px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #000000;
              border-radius: 10px;
            }
            
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #333333;
            }
            
            /* For Firefox */
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #000000 #f1f1f1;
            }
            
            /* 2xl specific scrollbar */
            @media (min-width: 1536px) {
              .custom-scrollbar::-webkit-scrollbar {
                height: 12px;
              }
            }
            
            /* Force scrollbar visibility */
            .custom-scrollbar {
              overflow-x: scroll !important;
            }
          `}</style>

          <div className="bg-white border border-gray-200 rounded-lg md:rounded-lg 2xl:rounded-xl shadow-sm 2xl:shadow-md" style={{minWidth: '1000px'}}>
            <table className="w-full" style={{minWidth: '1000px'}}>
              <thead className="bg-[#E2E2E2]">
                <tr>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[180px]">
                    VIP Guest
                  </th>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[180px]">
                    Hotel name
                  </th>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    Assigned host
                  </th>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[160px]">
                    Flight date
                  </th>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[120px]">
                    Status
                  </th>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[110px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 2xl:hover:bg-gray-100/50 transition-colors duration-150">
                    <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[180px]">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 2xl:h-10 2xl:w-10 rounded-full flex-shrink-0 ring-2 ring-offset-2 ring-offset-white ring-blue-100 2xl:ring-blue-200"
                          src={getAvatar(item.name)}
                          alt={item.name}
                        />
                        <div className="ml-3 2xl:ml-4 min-w-0 overflow-hidden">
                          <div className="text-sm 2xl:text-xl font-medium text-gray-900 truncate" title={item.name}>
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[180px] text-sm 2xl:text-xl text-gray-900">
                      <div className="truncate" title={item.hotel}>
                        {item.hotel}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[150px] text-sm 2xl:text-xl text-gray-900">
                      <div className="truncate" title={item.host}>
                        {item.host}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[160px] text-sm 2xl:text-xl text-gray-900">
                      <div className="truncate" title={item.date}>
                        {item.date}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[120px]">
                      <span className={`inline-flex px-2 2xl:px-3 py-1 2xl:py-1.5 text-xs 2xl:text-xl font-medium rounded-md 2xl:rounded-lg ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[110px] text-sm text-gray-500">
                      <button className="p-1 2xl:p-2 px-6 2xl:px-8 hover:bg-gray-100 2xl:hover:bg-gray-200 rounded 2xl:rounded-lg transition-colors duration-150 2xl:hover:scale-105">
                        <svg className="w-4 h-4 2xl:w-8 2xl:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="md:hidden mt-2 text-xs text-gray-500 text-center">
          ← Swipe to see all columns →
        </div>

        <div className="flex items-center justify-between mt-6 2xl:mt-8">
          <div className="hidden md:block text-sm 2xl:text-base text-gray-700">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, data.length)} from {data.length}
          </div>
          <div className="md:hidden"></div>

          <div className="w-full lg:w-auto flex items-center justify-center lg:justify-start gap-2 2xl:gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="p-2 2xl:p-3 border border-black rounded-full hover:bg-gray-100 2xl:hover:bg-gray-200 disabled:opacity-50 transition-all duration-150 2xl:hover:scale-105"
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="2xl:w-5 2xl:h-5">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 2xl:w-10 2xl:h-10 rounded-full text-sm 2xl:text-base font-medium transition-all duration-150 2xl:hover:scale-105 ${currentPage === pageNum
                    ? 'bg-black text-white shadow-md 2xl:shadow-lg'
                    : 'border border-gray-300 hover:bg-gray-50 2xl:hover:bg-gray-100'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="p-2 2xl:p-3 rounded-full hover:bg-gray-100 2xl:hover:bg-gray-200 border border-black disabled:opacity-50 transition-all duration-150 2xl:hover:scale-105"
              disabled={currentPage === totalPages}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="2xl:w-5 2xl:h-5">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
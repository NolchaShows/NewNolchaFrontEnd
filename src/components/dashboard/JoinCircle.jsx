import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function InnerCircleTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch("/api/join-inner-circle", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        
        // Handle different possible response structures
        const innerCircleData = Array.isArray(result) ? result : (result.data || result.members || []);
        
        setData(innerCircleData);
      } catch (err) {
        console.error("Error fetching inner circle data:", err);
        setError(err.message || "Failed to load inner circle data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return 'Invalid Date';
    }
  };

  const getAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=3b82f6&color=fff&size=32`;
  };

  const handleRetry = () => {
    setCurrentPage(1);
    // Re-trigger the useEffect by updating a dependency or calling fetchData directly
    window.location.reload(); // Simple approach, or you could extract fetchData to a separate function
  };

  if (isLoading) {
    return (
      <div className="w-full bg-[#F4F4F4] min-h-96 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-gray-600">Loading inner circle data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-[#F4F4F4] min-h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium">Error</div>
          <div className="text-gray-600 mt-1 mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F4F4F4]">
      <div className="flex items-center justify-between p-4 md:p-6 2xl:p-8 border-b md:border-b-0">
        <h1 className="text-lg md:text-xl 2xl:text-2xl font-semibold text-gray-900">INNER CIRCLE MEMBERS</h1>
        <div className="text-sm 2xl:text-base text-gray-600">
          Total: {data.length} members
        </div>
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
          
          <div className="bg-white border border-gray-200 rounded-lg md:rounded-lg 2xl:rounded-xl shadow-sm 2xl:shadow-md" style={{minWidth: '900px'}}>
            <table className="w-full" style={{minWidth: '900px'}}>
              <thead className="bg-[#E2E2E2]">
                <tr>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[200px]">
                    Full Name
                  </th>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    LinkedIn
                  </th>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[200px]">
                    Email
                  </th>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[200px]">
                    Message
                  </th>
                  <th className="px-4 md:px-6 2xl:px-8 py-3 2xl:py-6 text-left text-xs 2xl:text-xl font-medium text-gray-500 uppercase tracking-wider w-[150px]">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 md:px-6 2xl:px-8 py-8 2xl:py-12 text-center text-gray-500">
                      No inner circle members found
                    </td>
                  </tr>
                ) : (
                  currentData.map((item, index) => (
                    <tr key={item._id || item.id || index} className="hover:bg-gray-50 2xl:hover:bg-gray-100/50 transition-colors duration-150">
                      <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[200px]">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 2xl:h-10 2xl:w-10 rounded-full flex-shrink-0 ring-2 ring-offset-2 ring-offset-white ring-blue-100 2xl:ring-blue-200"
                            src={getAvatar(item.fullName || item.name || item.firstName)}
                            alt={item.fullName || 'User'}
                          />
                          <div className="ml-3 2xl:ml-4 min-w-0 overflow-hidden">
                            <div className="text-sm 2xl:text-xl font-medium text-gray-900 truncate">
                              {item.fullName || item.name || item.firstName || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[150px] text-sm 2xl:text-xl text-gray-900">
                        {item.linkedinOrWebsite || item.linkedin ? (
                          <a 
                            href={(item.linkedinOrWebsite || item.linkedin).startsWith('http') ? 
                              (item.linkedinOrWebsite || item.linkedin) : 
                              `https://${item.linkedinOrWebsite || item.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline truncate block"
                          >
                            View Profile
                          </a>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[200px] text-sm 2xl:text-xl text-gray-900">
                        <div className="truncate" title={item.email}>
                          {item.email || 'N/A'}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[200px] text-sm 2xl:text-xl text-gray-900">
                        <div className="truncate" title={item.message}>
                          {item.message || 'No message'}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 2xl:px-8 py-4 2xl:py-8 w-[150px] text-sm 2xl:text-xl text-gray-900">
                        <div className="truncate">
                          {formatDate(item.createdAt || item.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="md:hidden mt-2 text-xs text-gray-500 text-center">
          ← Swipe to see all columns →
        </div>

        {data.length > 0 && (
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
        )}
      </div>
    </div>
  );
}
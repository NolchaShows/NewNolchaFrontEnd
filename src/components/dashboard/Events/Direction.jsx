import React, { useEffect, useRef } from 'react';

const Direction = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const venue = {
    lat: 37.4419,
    lng: -122.1430,
    name: "Silicon Valley Expo Center"
  };
  
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        if (window.google && window.google.maps) {
          initializeMap();
        } else {
          existingScript.addEventListener('load', initializeMap);
        }
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAXwRNFksnxRXxiGVTLeQGaWOyJ7qJzH8M&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm">
              <div class="text-center">
                <p>Google Maps API key required</p>
              </div>
            </div>
          `;
        }
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: venue,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      new window.google.maps.Marker({
        position: venue,
        map: map,
        title: venue.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="36" viewBox="0 0 24 36" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z" fill="#EF4444"/>
              <circle cx="12" cy="12" r="6" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(24, 36),
          anchor: new window.google.maps.Point(12, 36)
        }
      });

      mapInstanceRef.current = map;
    };

    loadGoogleMaps();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="max-w-none w-full 2xl:min-h-[400px] mx-auto bg-white border border-gray-300 rounded-lg p-6 relative">

      <div className="flex justify-between items-start mb-6">
        <h1 className="text-xl font-bold 2xl:text-2xl text-gray-800">BTC CONFERENCE</h1>
        <button className="w-8 h-8 2xl:w-16 2xl:h-16 rounded flex items-center justify-center transition-colors">
          <img
            src="/dashboard/download.png"
            alt="Download"
            className="w-8 h-8 2xl:w-12 2xl:h-12"
          />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <img
            src="/dashboard/opt_2.png"
            alt="Calendar"
            className="w-5 h-5"
          />
          <div>
            <span className="text-sm font-semibold 2xl:text-xl text-gray-700">Date</span>
            <span className="text-sm text-gray-600 2xl:text-xl ml-2">September 22, 2025</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <img
            src="/dashboard/clock.png"
            alt="Clock"
            className="w-5 h-5"
          />
          <div>
            <span className="text-sm font-semibold 2xl:text-xl text-gray-700">Time</span>
            <span className="text-sm text-gray-600 2xl:text-xl ml-2">10:00 AM - 5:00 PM</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <img
            src="/dashboard/location.png"
            alt="Location"
            className="w-5 h-5"
          />
          <div>
            <span className="text-sm font-semibold 2xl:text-xl text-gray-700">Location</span>
            <span className="text-sm text-gray-600 2xl:text-xl ml-2">Silicon Valley Expo Center</span>
          </div>
        </div>
      </div>

      {/* Google Map Container */}
      <div className="bg-gray-100 rounded-lg h-40 2xl:h-70 mb-4 relative overflow-hidden">
        <div
          ref={mapRef}
          className="w-full h-full"
        >
          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm">
            Loading map...
          </div>
        </div>
      </div>

      <button className="w-full bg-[#E7F0D3] cursor-pointer text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-[#cad5b3] transition-colors">
        Get directions
      </button>
    </div>
  );
};

export default Direction;
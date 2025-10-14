import React from 'react';
import StyledHeading from './StyledHeading';

const EveningRecap = ({ year, title, videoUrl, paddingTop, isGoogleDrive = false }) => {
    // Helper function to convert Google Drive link to embed URL
    const getGoogleDriveEmbedUrl = (url) => {
        // Check if it's a Google Drive link
        if (url.includes('drive.google.com')) {
            // Extract file ID from various Google Drive URL formats
            let fileId = '';
            
            // Format: https://drive.google.com/file/d/FILE_ID/view
            if (url.includes('/file/d/')) {
                fileId = url.split('/file/d/')[1].split('/')[0];
            }
            // Format: https://drive.google.com/open?id=FILE_ID
            else if (url.includes('open?id=')) {
                fileId = url.split('open?id=')[1].split('&')[0];
            }
            
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        return url;
    };

    const embedUrl = isGoogleDrive || videoUrl.includes('drive.google.com') 
        ? getGoogleDriveEmbedUrl(videoUrl) 
        : videoUrl;
    
    const isGoogleDriveVideo = embedUrl.includes('drive.google.com');

    return (
        <div className={`pb-[70px] lg:pb-[150px] max-w-none w-full mx-auto bg-[#F4F4F4] ${paddingTop ? 'pt-[70px] lg:pt-[150px]' : ''}`}>
            {year && title && (
                <StyledHeading
                    firstPart={year}
                    secondPart={title}
                    strokeColor="#000000"
                    fillColor="#FEF991"
                    textColor="#000000"
                    className="mb-[22px] lg:mb-[40px] px-[22px] lg:px-12"
                    size="small"
                />
            )}
            {isGoogleDriveVideo ? (
                <iframe
                    src={embedUrl}
                    className="w-full h-[400px] md:h-[500px] lg:h-[700px] 2xl:h-[900px]"
                    allow="autoplay"
                    allowFullScreen
                ></iframe>
            ) : (
                <video
                    src={videoUrl}
                    className="w-full max-h-[700px] 2xl:max-h-[900px] object-cover"
                    controls
                    playsInline
                >
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default EveningRecap;


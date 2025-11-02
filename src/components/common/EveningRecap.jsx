import React from 'react';
import StyledHeading from './StyledHeading';
import SectionTitle from './SectionTitle';

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
        <div className="page-container-fluid bg-black">
            <SectionTitle className="text-white text-center">{title}</SectionTitle>
            {isGoogleDriveVideo ? (
                <iframe
                    src={embedUrl}
                    className="w-full h-[400px] lg:h-[700px] 2xl:h-[1200px]"
                    allow="autoplay"
                    allowFullScreen
                ></iframe>
            ) : (
                <video
                    src={videoUrl}
                    className="w-full h-[400px] lg:h-[700px] 2xl:h-[1200px] object-cover"
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


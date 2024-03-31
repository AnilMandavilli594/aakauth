import React from 'react';
import NavBar from '../components/NavBar.tsx';

function Home() {
  // Assuming the NavBar is fixed at the top and has a known height, for example, 60px.
  const navbarHeight = 60; // Adjust this value based on your actual NavBar height

  return (
    <div>
        <NavBar />
        {/* Background image container starts here, with a top padding of the NavBar's height */}
        <div style={{
          paddingTop: `${navbarHeight}px`, // Offset by the height of the NavBar
          backgroundImage: "url('https://media.licdn.com/dms/image/D4E12AQH1ObIeZhQzSw/article-cover_image-shrink_720_1280/0/1697372856341?e=1717632000&v=beta&t=6dXGwz1hjDDauB-ntyS4LkNUH0YDYt9B_uQzBDNdTt8')",
          height: `calc(100vh - ${navbarHeight}px)`, // Adjust height to take navbar into account
          backgroundPosition: 'center', // Center the background image
          backgroundRepeat: 'no-repeat', // Do not repeat the image
          backgroundSize: 'cover' // Cover the adjusted div area
        }}>
            {/* Content that goes over the background image */}
        </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Buffer } from 'buffer';
import { AiOutlinePauseCircle } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { HiOutlineStatusOffline } from 'react-icons/hi';
import '../styles/NowPlaying.css';


import soundbar from '../assets/images/soundbar.gif';


const API_URLS = {
  nowPlaying: 'https://api.spotify.com/v1/me/player/currently-playing',
  token: 'https://accounts.spotify.com/api/token'
};

const CLIENT_ID = '74f58c08f09842e4a038c338d877a54e';
const CLIENT_SECRET = 'e769676bd0d1487fb99bfa7008cf9c76';
const REFRESH_TOKEN = 'AQBITY5PNdJR3WVrZ6mKrz_vaYds0DlWI9FBlEzCNQ0hMnalRpceBuXbHFfvatUw7uivUyJrDrvGZ13XhKZh4Sfdo_0aMaSghQDxRANHz29cBl_U2rlaGE7N4H-PjLo7aQY';

const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const handleCardClick = (item) => {
  if (item && item.external_urls && item.external_urls.spotify) {
    window.open(item.external_urls.spotify, '_blank');
  } else {
    console.log("No Spotify URL available for this item.");
  }
};

const getAccessToken = async () => {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: REFRESH_TOKEN
  });

  const response = await fetch(API_URLS.token, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const data = await response.json();
  return data.access_token;
};

const fetchNowPlaying = async () => {
  try {
    const access_token = await getAccessToken();
    const response = await fetch(API_URLS.nowPlaying, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (response.status > 400) throw new Error('Unable to Fetch Song');
    if (response.status === 204) throw new Error('Currently Not Playing');

    return await response.json();
  } catch (error) {
    console.error('Error fetching currently playing song:', error);
    return { error: error.message };
  }
};

const NowPlaying = ({ isDarkMode }) => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const fetchNowPlayingMemoized = useMemo(() => fetchNowPlaying, []);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchNowPlayingMemoized();
      setNowPlaying(data);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [fetchNowPlayingMemoized]);

  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
        const titleWidth = titleElement.scrollWidth;
        const containerWidth = titleElement.clientWidth;
        const isOverflowing = titleWidth > containerWidth;
        setIsOverflowing(isOverflowing);

        if (isOverflowing) {
            const translationSpeed = 15;
            const translationPercentage = (titleWidth / containerWidth) * 100;
            const translationTime = translationPercentage / translationSpeed;
            const dynamicMarqueeKeyframes = `@keyframes marquee-animation {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-${translationPercentage}%); }
            }`;

            // Check if a style element already exists
            let styleElement = document.head.querySelector('#marquee-style');
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = 'marquee-style';
                document.head.appendChild(styleElement);
            }
            styleElement.innerHTML = dynamicMarqueeKeyframes;

            // Apply the animation with the calculated duration
            const animationKeyframes = `marquee-animation ${translationTime}s linear infinite`;
            titleElement.style.animation = animationKeyframes;

        } else {
            titleElement.style.animation = '';
        }
    }
}, [nowPlaying]);





  if (!nowPlaying) {
    return <div>Loading...</div>;
  }

  if (nowPlaying.error) {
    return <div>{nowPlaying.error}</div>;
  }

  const { is_playing, item, progress_ms } = nowPlaying;
  const playState = is_playing ? 'PLAY' : 'PAUSE';
  const duration_ms = item ? item.duration_ms : null;

  return (
    <div
      className={`nowPlayingCard ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      onClick={() => handleCardClick(item)}
    >
      <div className='nowPlayingImage'>
        <img src={item && item.album && item.album.images && item.album.images[0] ? item.album.images[0].url : ''} alt="Album" />
      </div>
      <div id='nowPlayingDetails'>
        <div ref={titleRef} className={`nowPlayingTitle ${isOverflowing ? 'marquee-content' : ''}`}>
          {nowPlaying && nowPlaying.item && nowPlaying.item.name}
        </div>
        <div className='nowPlayingArtist'>
          {item && item.artists && item.artists.map(artist => artist.name).join(', ')}
        </div>
        <div className='nowPlayingTime'>
          {progress_ms && duration_ms ? `${formatTime(progress_ms)} / ${formatTime(duration_ms)}` : ''}
        </div>
      </div>
      <div className='nowPlayingState'>
        {playState === 'PLAY' ? <img src={soundbar} alt="Now Playing" /> :
        playState === 'PAUSE' ? <AiOutlinePauseCircle size={40} /> :
        playState === 'OFFLINE' ? <HiOutlineStatusOffline size={40} /> :
        <BiErrorCircle size={40} />}
      </div>
    </div>
  );
};

export default NowPlaying;

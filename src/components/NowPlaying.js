import React, { useEffect, useState, useMemo, useRef } from "react";
import { Buffer } from "buffer";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { HiOutlineStatusOffline } from "react-icons/hi";
import "../styles/NowPlayingTall.css";

import soundbar from "../assets/images/soundbar.gif";
import defaultAlbum from "../assets/images/defaultAlbum.png";
import sleepingDog from "../assets/images/sleeping-dog.gif";

// Define API URLs and client credentials
const API_URLS = {
  nowPlaying: "https://api.spotify.com/v1/me/player/currently-playing",
  token: "https://accounts.spotify.com/api/token",
};

// Client credentials (replace these with secure server-side storage for production)
const CLIENT_ID = "74f58c08f09842e4a038c338d877a54e";
const CLIENT_SECRET = "e769676bd0d1487fb99bfa7008cf9c76";
const REFRESH_TOKEN =
  "AQBITY5PNdJR3WVrZ6mKrz_vaYds0DlWI9FBlEzCNQ0hMnalRpceBuXbHFfvatUw7uivUyJrDrvGZ13XhKZh4Sfdo_0aMaSghQDxRANHz29cBl_U2rlaGE7N4H-PjLo7aQY";

// Helper function to format time from milliseconds to `mm:ss`
const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

// Helper function to create a response structure
const createResponse = (overrides) => ({
  stopped: true,
  is_playing: false,
  item: null,
  progress_ms: 0,
  error: false,
  ...overrides,
});

// Centralized error handling and response normalization
const handleApiResponse = async (response) => {
  if (response.status === 204) {
    return createResponse();
  }
  if (response.status >= 400) {
    console.error(`Error fetching song, status code: ${response.status}`);
    return createResponse({ error: true });
  }
  try {
    const data = await response.json();
    return createResponse({ ...data, stopped: false, error: false });
  } catch (error) {
    console.error("Error parsing response:", error);
    return createResponse({ error: true });
  }
};

// Fetches a new access token if the current one is expired or missing
const fetchAccessToken = async (
  setAccessToken,
  setTokenExpiry,
  accessToken,
  tokenExpiry
) => {
  if (!accessToken || Date.now() >= tokenExpiry) {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    });

    const response = await fetch(API_URLS.token, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();
    setAccessToken(data.access_token);
    setTokenExpiry(Date.now() + data.expires_in * 1000); // expiry in ms
  }
};

// Fetches the currently playing song on Spotify
const fetchNowPlaying = async (
  accessToken,
  setAccessToken,
  setTokenExpiry,
  tokenExpiry
) => {
  await fetchAccessToken(
    setAccessToken,
    setTokenExpiry,
    accessToken,
    tokenExpiry
  );
  const response = await fetch(API_URLS.nowPlaying, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return handleApiResponse(response);
};

// Opens a Spotify link in a new tab
const handleCardClick = (item) => {
  if (item?.external_urls?.spotify) {
    window.open(item.external_urls.spotify, "_blank");
  } else {
    console.log("No Spotify URL available for this item.");
  }
};

const NowPlaying = ({ isDarkMode }) => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [tokenExpiry, setTokenExpiry] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const titleRef = useRef(null);

  // Memoized function to fetch the currently playing song
  const fetchNowPlayingMemoized = useMemo(
    () => () =>
      fetchNowPlaying(accessToken, setAccessToken, setTokenExpiry, tokenExpiry),
    [accessToken, tokenExpiry]
  );

  // Periodically fetch the currently playing song
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchNowPlayingMemoized();
      setNowPlaying(data);
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchNowPlayingMemoized]);

  // Applies marquee animation if the title is overflowing
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      const titleWidth = titleElement.scrollWidth;
      const containerWidth = titleElement.clientWidth;
      const isOverflowing = titleWidth > containerWidth;
      setIsOverflowing(isOverflowing);

      if (isOverflowing) {
        const translationSpeed = 10;
        const translationPercentage = (titleWidth / containerWidth) * 100;
        const translationTime = translationPercentage / translationSpeed;
        const dynamicMarqueeKeyframes = `@keyframes marquee-animation {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-${translationPercentage}%); }
        }`;

        let styleElement = document.head.querySelector("#marquee-style");
        if (!styleElement) {
          styleElement = document.createElement("style");
          styleElement.id = "marquee-style";
          document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = dynamicMarqueeKeyframes;

        const animationKeyframes = `marquee-animation ${translationTime}s linear infinite`;
        titleElement.style.animation = animationKeyframes;
      } else {
        titleElement.style.animation = "";
      }
    }
  }, [nowPlaying]);

  // Extracts and renders song data
  const { stopped, is_playing, item, progress_ms, error } = nowPlaying || {
    error: false,
    stopped: true,
    playState: false,
  };
  const playState = error
    ? "ERROR"
    : stopped
    ? "STOPPED"
    : is_playing
    ? "PLAY"
    : "PAUSE";
  const duration_ms = item?.duration_ms;

  return (
    <div
      className={`nowPlayingCard ${isDarkMode ? "dark-mode" : "light-mode"}`}
      onClick={() => handleCardClick(item)}
    >
      <div className="nowPlayingImage">
        {playState === "PLAY" || playState === "PAUSE" ? (
          <img
            src={item?.album?.images?.[0]?.url || defaultAlbum}
            alt="Album Art"
          />
        ) : (
          <img src={defaultAlbum} alt="Album Art" />
        )}
      </div>
      <div id="nowPlayingDetails">
        <div
          ref={titleRef}
          className={`nowPlayingTitle ${
            isOverflowing ? "marquee-content" : ""
          }`}
        >
          {playState === "PLAY" || playState === "PAUSE"
            ? item?.name
            : "Nick is Offline"}
        </div>
        <div className="nowPlayingArtist">
          {playState === "PLAY" || playState === "PAUSE"
            ? item?.artists?.map((artist) => artist.name).join(", ") || ""
            : ""}
        </div>
        <div className="nowPlayingTime">
          {playState === "PLAY" || playState === "PAUSE"
            ? `${formatTime(progress_ms)} / ${formatTime(duration_ms)}`
            : `${formatTime(0)} / ${formatTime(0)}`}
        </div>
      </div>
      <div className="nowPlayingState">
        {playState === "PLAY" ? (
          <img src={soundbar} alt="Now Playing" />
        ) : playState === "PAUSE" ? (
          <AiOutlinePauseCircle size={40} />
        ) : playState === "ERROR" ? (
          <BiErrorCircle size={40} />
        ) : (
          <img src={sleepingDog} className="dog" alt="Stopped" />
        )}
      </div>
    </div>
  );
};

export default NowPlaying;

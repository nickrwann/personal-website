import React, { useEffect, useState, useMemo, useRef } from "react";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { HiOutlineStatusOffline } from "react-icons/hi";
import "../styles/NowPlayingTall.css";

import soundbar from "../assets/images/soundbar.gif";
import defaultAlbum from "../assets/images/defaultAlbum.png";
import sleepingDog from "../assets/images/sleeping-dog.gif";

// Helper function to format time from milliseconds to `mm:ss`
const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

// Fetches the currently playing song on Spotify from the backend
const fetchNowPlaying = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/spotify/now-playing"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching now playing data:", error);
    return { error: true };
  }
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
  const [isOverflowing, setIsOverflowing] = useState(false);
  const titleRef = useRef(null);

  // Memoized function to fetch the currently playing song
  const fetchNowPlayingMemoized = useMemo(() => () => fetchNowPlaying(), []);

  // Fetch the currently playing song every 5 seconds
  useEffect(() => {
    const fetchInterval = setInterval(async () => {
      const data = await fetchNowPlayingMemoized();
      setNowPlaying((prev) => {
        if (!prev) {
          return data;
        }

        if (Math.abs(prev.progress_ms - data.progress_ms) < 5000) {
          data.progress_ms = Math.max(prev.progress_ms, data.progress_ms);
        }

        return {
          ...data,
          progress_ms: Math.min(data.progress_ms, data.item?.duration_ms),
        };
      });
    }, 2500);

    return () => clearInterval(fetchInterval);
  }, [fetchNowPlayingMemoized]);

  // Update the progress time every second
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setNowPlaying((prev) => {
        if (!prev || prev.error || prev.stopped || !prev.is_playing) {
          return prev;
        }

        const newProgressMs = prev.progress_ms + 1000;

        return { ...prev, progress_ms: newProgressMs };
      });
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

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
  const { stopped, is_playing, item, progress_ms, error, timestamp } =
    nowPlaying || {
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
  const adjustedProgressMs = Math.min(progress_ms, duration_ms);

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
            ? `${formatTime(adjustedProgressMs)} / ${formatTime(duration_ms)}`
            : `00:00 / 00:00`}
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

const NowPlayingBackend = NowPlaying;
export default NowPlayingBackend;

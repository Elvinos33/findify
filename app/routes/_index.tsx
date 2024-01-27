import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState, useRef } from "react";
import Header from "~/components/Header";
import { fetchTopTracks, fetchRecommendations } from "~/lib/FetchSpotify";
import { getHash } from "~/lib/getHash";
import AlbumCard from "~/components/AlbumCard";
import LoginButton from "~/components/LoginButton";
import { LikeButton, DislikeButton, PlayButton } from "~/components/Buttons";

export const meta: MetaFunction = () => {
  return [
    { title: "Findify" },
    { name: "description", content: "Discover your next favorite song!" },
  ];
};

export default function Index() {
  const [token, setToken] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);
  const [dislikedSongs, setDislikedSongs] = useState([]);
  const audioRef = useRef(null);
  const [recommendedSongs, setRecommendedSongs] = useState([
    {
      name: "Loading",
      albumCover:
        "https://clipground.com/images/image-placeholder-clipart-1.png",
      artists: ["Loading"],
      songUrl: "",
    },
    {
      name: "Loading",
      albumCover:
        "https://clipground.com/images/image-placeholder-clipart-1.png",
      artists: ["Loading"],
      songUrl: "",
    },
  ]);

  function swipe(direction: string) {
    if (direction === "left") {
      setDislikedSongs((current) => [...current, recommendedSongs[0]]);
    } else if (direction === "right") {
      setLikedSongs((current) => [...current, recommendedSongs[0]]);
    }

    if (recommendedSongs[0].songUrl !== "") {
      setRecommendedSongs((recommendedSongs) => recommendedSongs.slice(1));
    }
  }

  useEffect(() => {
    setToken(getHash());

    if (token.length > 0) {
      fetchTopTracks(token)
        .then((response) => {
          const songIds = response.items.map((song: any) => song.id);
          return fetchRecommendations(songIds, token);
        })
        .then((response) => {
          const tracks = response.tracks.map((song: any) => {
            console.log(song);
            return {
              name: song.name,
              artists: song.artists.map((artist: any) => artist.name),
              albumCover: song.album.images[1].url,
              songUrl: song.preview_url,
            };
          });
          setRecommendedSongs(tracks);
        })
        .catch((error) => {
          console.error("Request Error: ", error);
        });
    }
  }, [token]);

  useEffect(() => {
    console.log(
      "Effect triggered. Current first song URL:",
      recommendedSongs[0]?.songUrl
    );

    if (recommendedSongs[0]?.songUrl === null) {
      console.log("No song URL. Pausing and resetting audio.");
      audioRef.current.pause();
    }
  }, [recommendedSongs]);

  useEffect(() => {
    console.log(likedSongs);
  }, [likedSongs]);

  return (
    <main className="absolute inset-0 flex flex-col overflow-hidden">
      <Header token={token} />
      <div className="flex-1 flex items-center justify-center">
        {token.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <audio
                src={recommendedSongs[0].songUrl}
                ref={audioRef}
                autoPlay
                hidden
                loop
              />

              <DislikeButton click={swipe} />
              <div className="stack">
                <AlbumCard
                  recommendedSong={recommendedSongs[0]}
                  swipe={swipe}
                />
                <AlbumCard
                  recommendedSong={recommendedSongs[1]}
                  swipe={swipe}
                />
              </div>
              <LikeButton click={swipe} />
            </div>
            <div className="flex w-full space-x-4 items-center justify-center mt-2">
              <PlayButton
                audioRef={audioRef}
                click={() => {
                  const audio = audioRef.current;
                  if (audio) {
                    audio.paused ? audio.play() : audio.pause();
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center flex-col gap-6">
            <p className="w-full text-center font-bold">
              Please log in with a Spotify Premium account to continue.
            </p>
            <LoginButton />
          </div>
        )}
      </div>
    </main>
  );
}

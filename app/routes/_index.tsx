import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import Header from "~/components/Header";
import { fetchWebApi } from "~/lib/FetchSpotify";
import { getHash } from "~/lib/getHash";
import AlbumCard from "~/components/AlbumCard";
import LoginButton from "~/components/LoginButton";

export const meta: MetaFunction = () => {
  return [
    { title: "Findify" },
    { name: "description", content: "Discover your next favorite song!" },
  ];
};

export default function Index() {
  const [token, setToken] = useState("");
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  useEffect(() => {
    setToken(getHash());

    if (token.length < 0) {
      fetchWebApi(
        "v1/me/top/tracks?time_range=short_term&limit=5",
        "GET",
        token
      )
        .then((response) => {
          const songIds = response.items.map((song: any) => {
            return song.id;
          });

          return fetchWebApi(
            `v1/recommendations?limit=100&seed_tracks=${songIds.join(",")}`,
            "GET",
            token
          );
        })

        .then((response) => {
          console.log(response);
          setRecommendedSongs(response.tracks);
        })

        .catch((error) => {
          console.error("Request Error: ", error);
        });
    }
  }, [token]);

  return (
    <div className="absolute inset-0 flex flex-col">
      <Header token={token} />
      <div className="flex-1 flex items-center justify-center">
        {token.length > 0 ? (
          <div>
            <AlbumCard />
          </div>
        ) : (
          <div className="flex items-center flex-col gap-6">
            <p className="w-full text-center font-bold">
              Please log into a Spotify Premium account to continue.
            </p>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
}

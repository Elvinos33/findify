import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import Header from "~/components/Header";
import { fetchWebApi } from "~/lib/FetchSpotify";
import { getHash } from "~/lib/getHash";

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
  }, []);

  if (token.length > 0) {
    fetchWebApi(
      "v1/me/top/tracks?time_range=short_term&limit=5",
      "GET",
      token
    ).then((response) => {
      const songIds = response.items.map((song) => {
        return song.id;
      });
      fetchWebApi(
        `v1/recommendations?limit=5&seed_tracks=${songIds.join(",")}`,
        "GET",
        token
      ).then((response) => {
        setRecommendedSongs(response.tracks);
      });
    });
  }

  return (
    <div className="absolute inset-0">
      <Header token={token} />
      {recommendedSongs.map((song) => (
        <p>{song}</p>
      ))}
    </div>
  );
}

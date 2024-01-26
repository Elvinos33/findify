// Spotify API interaction functions

export const fetchTopTracks = async (token: string) => {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top tracks");
  }

  return await response.json();
};

export const fetchRecommendations = async (
  seedTracks: Array<string>,
  token: string
) => {
  const response = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=100&seed_tracks=${seedTracks.join(
      ","
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  return await response.json();
};

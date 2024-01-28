import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function LoginButton() {
  const CLIENT_ID = "901b9923d3af486787ab5660a9d71058";
  const REDIRECT_URI = "https://findify.elvin.codes/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <Link
      className="btn rounded-full hover:outline-green-500 hover:outline hover:outline-2"
      to={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}
    >
      <p>Login with Spotify</p>
      <Icon icon={"logos:spotify-icon"} className="text-lg" />
    </Link>
  );
}

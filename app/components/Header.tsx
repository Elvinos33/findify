import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react";

interface HeaderProps {
  token: string;
}

export default function Header(props: HeaderProps) {
  const CLIENT_ID = "901b9923d3af486787ab5660a9d71058";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <header className="w-full flex justify-end p-3">
      {props.token.length > 0 && (
        <button className="btn btn-circle hover:outline hover:outline-green-500 hover:outline-offset-1 hover:outline-2">
          <Icon icon={"mdi:account"} className=" text-xl text-green-600" />
        </button>
      )}
    </header>
  );
}

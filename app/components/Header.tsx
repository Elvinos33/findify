import { Icon } from "@iconify/react";

interface HeaderProps {
  token: string;
}

export default function Header(props: HeaderProps) {
  return (
    <header className="w-full flex p-3">
      <button className="btn invisible btn-circle hover:outline hover:outline-green-500 hover:outline-offset-1 hover:outline-2">
        <Icon icon={"mdi:account"} className=" text-xl text-green-600" />
      </button>
      <h1 className="font-bold text-2xl flex-1 text-center">Findify</h1>
      {props.token.length > 0 && (
        <button className="btn btn-circle hover:outline hover:outline-green-500 hover:outline-offset-1 hover:outline-2">
          <Icon icon={"mdi:account"} className=" text-xl text-green-600" />
        </button>
      )}
    </header>
  );
}

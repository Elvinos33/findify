import Draggable from "react-draggable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface AlbumProps {
  recommendedSong: recommendedSong;
  swipe: (direction: string) => void;
}

type recommendedSong = {
  name: string;
  artists: Array<any>;
  albumCover: string;
};

export default function AlbumCard(props: AlbumProps) {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;

    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });

    setRotation(rotation + ui.deltaX / 20);
    setIsDragging(true);
  };

  function handleStop() {
    if (deltaPosition.x >= 150) {
      props.swipe("right");
    } else if (deltaPosition.x <= -150) {
      props.swipe("left");
    }

    setIsDragging(false);
    setRotation(0);
    setDeltaPosition({ x: 0, y: 0 });
  }

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <Draggable
        axis="x"
        onStop={handleStop}
        onDrag={handleDrag}
        position={{ x: 0, y: 0 }}
      >
        <div className="bg-gradient-to-r from-red-500/15 via-primary-content to-green-500/15 bg-primary-content card shadow-lg space-y-3 p-5 w-[340px] text-clip">
          <figure className="rounded-none">
            <img
              draggable={false}
              src={props.recommendedSong.albumCover}
              height={300}
              width={300}
              alt="Currents"
            />
          </figure>
          <div>
            <h2 className="card-title line-clamp-1">
              {props.recommendedSong.name}
            </h2>
            <div className="flex gap-2 line-clamp-1">
              <h3 className="opacity-75">{props.recommendedSong.artists[0]}</h3>
              <h3 className="opacity-75">
                {props.recommendedSong.artists[1] || ""}
              </h3>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

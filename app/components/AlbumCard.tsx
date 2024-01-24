import Draggable from "react-draggable";
import { useEffect, useState } from "react";

interface AlbumProps {
  name: string;
  artists: Array<any>;
  albumCover: string;
  swipe: () => void;
}

export default function AlbumCard(props: AlbumProps) {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [dislikedSongs, setDislikedSongs] = useState([]);

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;

    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });

    setRotation(rotation + ui.deltaX / 20);
    setIsDragging(true);
  };

  useEffect(() => {
    console.log(likedSongs);
  }, [likedSongs]);

  useEffect(() => {
    console.log(dislikedSongs);
  }, [dislikedSongs]);

  function handleStop() {
    if (deltaPosition.x >= 150) {
      setLikedSongs([...likedSongs, props]);
      props.swipe();
    } else if (deltaPosition.x <= -150) {
      setDislikedSongs([...dislikedSongs, props]);
      props.swipe();
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
        <div className="card bg-primary-content shadow-lg space-y-3 p-5 w-[340px] text-clip">
          <figure className="rounded-none">
            <img
              draggable={false}
              src={props.albumCover}
              height={300}
              width={300}
              alt="Currents"
            />
          </figure>
          <div>
            <h2 className="card-title line-clamp-1">{props.name}</h2>
            <div className="flex gap-2 line-clamp-1">
              <h3 className="opacity-75">{props.artists[0]}</h3>
              <h3 className="opacity-75">{props.artists[1] || ""}</h3>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

interface SwipeProps {
  click: (direction: string) => void;
}

interface PlayProps {
  click: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export function DislikeButton(props: SwipeProps) {
  return (
    <button
      onClick={() => props.click("left")}
      className={`invisible md:visible btn btn-circle bg-primary-content transition duration-[200ms] hover:bg-red-500 group`}
    >
      <Icon
        icon="ph:x"
        className={`text-red-500 text-3xl group-hover:text-primary-content`}
      />
    </button>
  );
}

export function LikeButton(props: SwipeProps) {
  return (
    <button
      onClick={() => props.click("right")}
      className="invisible md:visible btn btn-circle bg-primary-content transition duration-[200ms] hover:bg-green-500 group"
    >
      <Icon
        icon="prime:heart-fill"
        className={`text-green-500 text-3xl group-hover:text-primary-content`}
      />
    </button>
  );
}

export function PlayButton(props: PlayProps) {
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    const audio = props.audioRef.current;

    const handlePlay = () => setIsPaused(false);
    const handlePause = () => setIsPaused(true);

    if (audio) {
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);

      // Initial sync with audio's state
      setIsPaused(audio.paused);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
      }
    };
  }, [props.audioRef]);

  return (
    <button
      onClick={props.click}
      className="btn btn-lg bg-primary-content btn-circle transition duration-[200ms] hover:invert"
    >
      {!isPaused ? (
        <Icon icon={"ph:pause-fill"} className="text-4xl" />
      ) : (
        <Icon icon={"ph:play-fill"} className="text-4xl" />
      )}
    </button>
  );
}

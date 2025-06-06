import Artplayer from 'artplayer';
import { Events } from 'artplayer/types/events';
import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

type ArtPlayerEventMap = {
  [K in keyof Events]: (...args: Events[K]) => void;
};

interface ArtPlayerProps {
  url: string;
  poster?: string;
  height?: number;
  on?: Partial<ArtPlayerEventMap>;
  once?: Partial<ArtPlayerEventMap>;
  off?: Partial<ArtPlayerEventMap>;
}

function bindEvents(
  player: Artplayer,
  handlers: Partial<ArtPlayerEventMap> | undefined,
  method: 'on' | 'once' | 'off',
) {
  if (!handlers) return;
  for (const [eventName, handler] of Object.entries(handlers) as [keyof ArtPlayerEventMap, any][]) {
    player[method](eventName, handler);
  }
}

export default function ArtPlayer({ url, poster, height, on, once, off }: ArtPlayerProps) {
  const artRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Artplayer | null>(null);
  const videoType = url.includes('.m3u8') ? 'm3u8' : undefined;

  useEffect(() => {
    if (!artRef.current) return;

    playerRef.current = new Artplayer({
      container: artRef.current,
      url,
      aspectRatio: true,
      fullscreen: true,
      playsInline: true,
      setting: true,
      pip: true,
      flip: true,
      backdrop: true,
      playbackRate: true,
      screenshot: true,
      poster,
      customType: {
        m3u8: function (video: HTMLMediaElement, url: string) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
          }
        },
      },
      ...(videoType ? { type: videoType } : {}),
    });

    if (playerRef.current) {
      bindEvents(playerRef.current, on, 'on');
      bindEvents(playerRef.current, once, 'once');
      bindEvents(playerRef.current, off, 'off');
    }

    return () => {
      playerRef.current?.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poster, url, videoType]);

  return <div ref={artRef} style={{ width: '100%', height: `${height}px` }} />;
}

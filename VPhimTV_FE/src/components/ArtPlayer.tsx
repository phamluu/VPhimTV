import Artplayer from 'artplayer';
import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

interface ArtPlayerProps {
  url: string;
  poster?: string;
  height?: number;
}

export default function ArtPlayer({ url, poster, height }: ArtPlayerProps) {
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

    return () => {
      playerRef.current?.destroy();
    };
  }, [poster, url, videoType]);

  return <div ref={artRef} style={{ width: '100%', height: `${height}px` }} />;
}

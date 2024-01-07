// /* eslint-disable */
import React, { useEffect, useRef } from 'react';
import './styles.css';

interface PlayerInfo {
  id: string;
  videoId: string;
}

interface YTWindow extends Window {
  YT: {
    Player: new (id: string, options: { videoId: string; playerVars: { showinfo: number } }) => any;
  };
  onYouTubeIframeAPIReady?: () => void;
}

const YoutubeVideos: React.FC = () => {
  const players = useRef<YT.Player[]>([]);

  const playerInfoList: PlayerInfo[] = [
    { id: 'player1', videoId: 'c9Wg6Cb_YlU?si=xHw63qALtnRMpB47' },
    { id: 'player2', videoId: 'A74TOX803D0?si=_NQsWG0wcvd6hWoy' },
    { id: 'player3', videoId: 'bMknfKXIFA8?si=7yHga1h6pWNHFKzR' },
    { id: 'player4', videoId: 'HVjjoMvutj4?si=vF1MOiSXvmS7Kwzv' },
    { id: 'player5', videoId: 'fKJVxItLiUw?si=TXh46BswkD7rdqP5' },
    { id: 'player6', videoId: 'zJSY8tbf_ys?si=0oDRzCC1hI6x-Z2f' },
  ];

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (window as YTWindow).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    return () => {
     
      delete (window as YTWindow).onYouTubeIframeAPIReady;
    };
  }, []);

  const onYouTubeIframeAPIReady = () => {
    if (!playerInfoList) return;

    playerInfoList.forEach((playerInfo, i) => {
      const curPlayer = createPlayer(playerInfo);
      players.current[i] = curPlayer;
    });
  };

  const createPlayer = (playerInfo: PlayerInfo) => {
    return new (window as YTWindow).YT.Player(playerInfo.id, {
      videoId: playerInfo.videoId,
      playerVars: {
        showinfo: 0,
      },
    });
  };

  const stopAllVideos = () => {
    players.current.forEach((player) => {
      player.stopVideo();
    });
  };

  return (
    <div>
      <div>
        <button onClick={stopAllVideos}>Stop All Videos</button>
      </div>
      <div className="wrapper">
        <div id="player1" />
        <div id="player2" />
        <div id="player3" />
      </div>
      <div className="wrapper">
        <div id="player4" />
        <div id="player5" />
        <div id="player6" />
      </div>
    </div>
  );
};

export default YoutubeVideos;

import { useRef, useState } from 'react'
import mutedIcon from '../../assets/dotted/media-video-muted.svg'
import pauseIcon from '../../assets/dotted/media-video-pause.svg'
import playIcon from '../../assets/dotted/media-video-play.svg'
import volumeIcon from '../../assets/dotted/media-video-volume.svg'

export type DotsMediaVideoOrientation = 'portrait' | 'landscape'
const initialFrameOffsetSeconds = 0.1

export type DotsMediaVideoItem = {
  src: string
  label: string
  orientation: DotsMediaVideoOrientation
  duration?: string
  author?: string
  avatar?: string
}

export function DotsMediaVideo({
  video,
  onClick,
  initialMuted = true,
  initialPlaying = false,
  onMutedChange,
  onPlayingChange,
  className = '',
}: {
  video: DotsMediaVideoItem
  onClick?: () => void
  initialMuted?: boolean
  initialPlaying?: boolean
  onMutedChange?: (muted: boolean) => void
  onPlayingChange?: (playing: boolean) => void
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(initialMuted)
  const [playing, setPlaying] = useState(initialPlaying)
  const [displayTime, setDisplayTime] = useState('00:00')
  const rootClassName = ['dots-media-video', `dots-media-video--${video.orientation}`, className]
    .filter(Boolean)
    .join(' ')

  const toggleMuted = () => {
    const nextMuted = !muted
    if (videoRef.current) videoRef.current.muted = nextMuted
    setMuted(nextMuted)
    onMutedChange?.(nextMuted)
  }

  const togglePlaying = () => {
    const nextPlaying = !playing
    if (videoRef.current) {
      if (nextPlaying) void videoRef.current.play()
      else videoRef.current.pause()
    }
    setPlaying(nextPlaying)
    onPlayingChange?.(nextPlaying)
  }

  const syncTime = () => {
    const element = videoRef.current
    if (!element || !Number.isFinite(element.currentTime)) return
    const elapsedSeconds = Math.max(0, Math.floor(element.currentTime))
    const minutes = Math.floor(elapsedSeconds / 60)
    const seconds = elapsedSeconds % 60
    setDisplayTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
  }

  const showFirstVisibleFrame = () => {
    const element = videoRef.current
    if (!element || element.currentTime > 0) return
    element.currentTime = initialFrameOffsetSeconds
    syncTime()
  }

  return (
    <div className={rootClassName}>
      <video
        ref={videoRef}
        className="dots-media-video__poster"
        src={video.src}
        aria-label={video.label}
        preload="auto"
        autoPlay={initialPlaying}
        muted={muted}
        loop
        playsInline
        onClick={onClick}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={showFirstVisibleFrame}
        onTimeUpdate={syncTime}
      />
      <>
          <span className="dots-media-video__controls">
            <span className="dots-media-video__author">
              {video.avatar && <img src={video.avatar} alt="" draggable={false} />}
              {video.author && <span>{video.author}</span>}
            </span>
            <span className="dots-media-video__actions">
              <button type="button" onClick={toggleMuted} aria-label={muted ? '打开声音' : '静音'}>
                <img src={muted ? mutedIcon : volumeIcon} alt="" />
              </button>
              <button type="button" onClick={togglePlaying} aria-label={playing ? '暂停视频' : '播放视频'}>
                <img src={playing ? pauseIcon : playIcon} alt="" />
              </button>
            </span>
          </span>
          {displayTime && (
            <>
              <span className="dots-media-video__duration-mask" aria-hidden="true" />
              <span className="dots-media-video__duration">{displayTime}</span>
            </>
          )}
      </>
    </div>
  )
}

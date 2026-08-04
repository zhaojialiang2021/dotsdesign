import type { CSSProperties } from 'react'
import playIcon from '../../assets/dotted/dots-note-play.svg'
import likeIcon from '../../assets/dotted/media-note-like.svg'

export type DotsMediaNoteItem = {
  cover: string
  coverAlt: string
  title: string
  author: string
  avatar: string
  likes: string | number
  mediaType?: 'image' | 'video'
}

export function DotsMediaNote({
  notes,
  onNoteClick,
  onMoreClick,
  className = '',
}: {
  notes: DotsMediaNoteItem[]
  onNoteClick?: (note: DotsMediaNoteItem, index: number) => void
  onMoreClick?: () => void
  className?: string
}) {
  if (notes.length === 0) return null

  const visibleNotes = notes.slice(0, 3)
  const compact = visibleNotes.length >= 3
  const rootClassName = ['dots-media-note', compact ? 'dots-media-note--compact' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClassName}>
      <div className="dots-media-note__grid">
        {visibleNotes.map((note, index) => (
          <button
            className="dots-media-note__card"
            type="button"
            onClick={() => onNoteClick?.(note, index)}
            key={`${note.title}-${index}`}
            style={{ '--media-note-index': index } as CSSProperties}
            aria-label={`打开笔记：${note.title}`}
          >
            <img className="dots-media-note__cover" src={note.cover} alt={note.coverAlt} draggable={false} />
            {note.mediaType === 'video' && (
              <span className="dots-media-note__video" aria-label="视频笔记">
                <img src={playIcon} alt="" />
              </span>
            )}
            <span className="dots-media-note__overlay" aria-hidden="true" />
            <span className="dots-media-note__content">
              <span className="dots-media-note__title">{note.title}</span>
              <span className="dots-media-note__meta">
                <span className="dots-media-note__author">
                  <img src={note.avatar} alt="" draggable={false} />
                  <span>{note.author}</span>
                </span>
                <span className="dots-media-note__likes">
                  <img src={likeIcon} alt="" />
                  <span>{note.likes}</span>
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
      {notes.length > 3 && (
        <button
          className="dots-media-note__more"
          type="button"
          onClick={onMoreClick}
          aria-label={`查看全部 ${notes.length} 篇相关笔记`}
        >
          <span className="dots-media-note__avatars" aria-hidden="true">
            {visibleNotes.map((note, index) => (
              <img src={note.avatar} alt="" draggable={false} key={`${note.author}-avatar-${index}`} />
            ))}
          </span>
          <span>{notes.length} 篇相关笔记</span>
        </button>
      )}
    </div>
  )
}

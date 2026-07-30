import type { CSSProperties } from 'react'

export type DotsMediaImageOrientation = 'portrait' | 'landscape'

export type DotsMediaImageItem = {
  src: string
  alt: string
  orientation?: DotsMediaImageOrientation
}

export function DotsMediaImage({
  images,
  onMoreClick,
  className = '',
}: {
  images: DotsMediaImageItem[]
  onMoreClick?: () => void
  className?: string
}) {
  if (images.length === 0) return null

  const visibleImages = images.slice(0, 3)
  const isGroup = images.length > 1
  const rootClassName = [
    'dots-media-image',
    isGroup ? 'dots-media-image--group' : `dots-media-image--single-${visibleImages[0].orientation ?? 'landscape'}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClassName}>
      <div className="dots-media-image__grid">
        {visibleImages.map((image, index) => (
          <img
            className="dots-media-image__item"
            src={image.src}
            alt={image.alt}
            draggable={false}
            key={`${image.src}-${index}`}
            style={{ '--media-image-index': index } as CSSProperties}
          />
        ))}
      </div>
      {images.length > 3 && (
        <button
          className="dots-media-image__more"
          type="button"
          onClick={onMoreClick}
          aria-label={`查看全部 ${images.length} 张相关图片`}
        >
          <span className="dots-media-image__avatars" aria-hidden="true">
            {visibleImages.map((image, index) => (
              <img src={image.src} alt="" draggable={false} key={`${image.src}-avatar-${index}`} />
            ))}
          </span>
          <span>{images.length} 张相关图片</span>
        </button>
      )}
    </div>
  )
}

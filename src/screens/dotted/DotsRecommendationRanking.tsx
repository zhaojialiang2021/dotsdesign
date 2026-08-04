export type DotsRecommendationRankingItem = {
  image: string
  title: string
  description: string
  recommendation: string
}

export function DotsRecommendationRanking({
  items,
}: {
  items: readonly DotsRecommendationRankingItem[]
}) {
  return (
    <ol className="dots-recommendation-ranking" aria-label="上海周末遛娃推荐榜单">
      {items.map((item, index) => (
        <li className="dots-recommendation-ranking__item" key={item.title}>
          <span className="dots-recommendation-ranking__index" aria-hidden="true">
            {index + 1}
          </span>
          <img
            className="dots-recommendation-ranking__image"
            src={item.image}
            alt=""
            draggable={false}
          />
          <span className="dots-recommendation-ranking__copy">
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </span>
          <span className="dots-recommendation-ranking__recommendation">
            {item.recommendation}
          </span>
        </li>
      ))}
    </ol>
  )
}

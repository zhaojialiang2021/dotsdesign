import dotsAiCardPhoto1 from '../../assets/dotted/dots-ai-card-1.png'
import dotsAiCardPhoto2 from '../../assets/dotted/dots-ai-card-2.png'
import dotsAiCardPhoto3 from '../../assets/dotted/dots-ai-card-3.png'

export function DotsGeneratedCard() {
  return (
    <article className="dots-generated-card" data-node-id="1421:1105" aria-label="AI 生成卡片">
      <div className="dots-generated-card__images" aria-hidden="true">
        <div className="dots-generated-card__photo dots-generated-card__photo--first">
          <img src={dotsAiCardPhoto1} alt="" draggable={false} />
        </div>
        <div className="dots-generated-card__photo dots-generated-card__photo--second">
          <img src={dotsAiCardPhoto2} alt="" draggable={false} />
        </div>
        <div className="dots-generated-card__photo dots-generated-card__photo--third">
          <img src={dotsAiCardPhoto3} alt="" draggable={false} />
        </div>
      </div>

      <div className="dots-generated-card__body">
        <h3 className="dots-generated-card__title">💆🏻‍♀️ 正确使用手法</h3>
        <div className="dots-generated-card__list">
          <div className="dots-generated-card__list-item">
            <span className="dots-generated-card__bullet" aria-hidden="true" />
            <p>
              <strong>取量预热：</strong>
              <span>取珍珠大小的面霜于掌心，利用掌心温度预热几秒，使其达到约35℃。</span>
            </p>
          </div>
          <div className="dots-generated-card__list-item">
            <span className="dots-generated-card__bullet" aria-hidden="true" />
            <p>
              <strong>按压上脸：</strong>
              <span>将预热后的面霜均匀按压在脸部和颈部，用掌心由内向外、由下向上轻轻提拉按压。</span>
            </p>
          </div>
        </div>
      </div>

      <div className="dots-generated-card__note-wrap">
        <section className="dots-generated-card__note" aria-label="注意事项">
          <h4>注意事项</h4>
          <p>健康肌肤无需每天使用，过度使用反而会造成负担。建议一周使用3-4次。避免叠加高浓A醇、果酸等强刺激成分，易发不耐受。</p>
        </section>
      </div>
    </article>
  )
}

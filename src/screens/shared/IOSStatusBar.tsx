import statusBarLight from '../../assets/personal/statusbar-light.png'

export function IOSStatusBar({
  className = '',
  dark = false,
  label = '状态栏，时间 9:41',
}: {
  className?: string
  dark?: boolean
  label?: string
}) {
  return (
    <div className={`ios-status-bar${dark ? ' ios-status-bar--dark' : ''} ${className}`.trim()} aria-label={label}>
      <img className="ios-status-bar__asset" src={statusBarLight} alt="" aria-hidden="true" draggable={false} />
    </div>
  )
}

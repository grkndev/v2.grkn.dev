function getTitleFontSize(title) {
  const length = title?.length ?? 0
  if (length <= 25) return 72
  if (length <= 40) return 60
  if (length <= 60) return 48
  return 40
}

function truncateText(text, maxChars) {
  if (!text) return text
  return text.length > maxChars ? `${text.slice(0, maxChars).trimEnd()}…` : text
}

export const OpenGraphImage = ({ title, description, icon, url }) => {
  const titleFontSize = getTitleFontSize(title)
  const displayTitle = truncateText(title, 90)
  const displayDescription = truncateText(description, 110)

  return (
    <div
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
          backgroundImage:
            'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 60,
          fontSize: '2.5rem',
          lineHeight: 1,
          background: '#000',
          color: '#fff',
          fontFamily: 'Geist',
          padding: '1rem 1.75rem',
          borderRadius: 9999
        }}
      >
        {`grkn.dev${url ? `/${url}` : ''}`}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          position: 'absolute',
          top: 240,
          left: 60,
          right: 60,
          bottom: 60
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {icon}
          <span
            style={{
              fontSize: titleFontSize,
              lineHeight: 1.15,
              fontWeight: 600
            }}
          >
            {displayTitle}
          </span>
        </div>
        {displayDescription && (
          <span style={{ fontFamily: 'Geist', fontSize: '2.25rem', lineHeight: '3rem' }}>{displayDescription}</span>
        )}
      </div>
    </div>
  )
}

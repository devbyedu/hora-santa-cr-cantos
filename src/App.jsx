import categories from './data/categories.json'
import songs from './data/songs.json'

function normalizePath(pathname) {
  return pathname.replace(/\/$/, '') || '/'
}

function getYoutubeVideoId(url) {
  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.slice(1)
    }

    if (parsedUrl.searchParams.has('v')) {
      return parsedUrl.searchParams.get('v')
    }

    const embedMatch = parsedUrl.pathname.match(/\/embed\/([^/?]+)/)
    return embedMatch?.[1] || ''
  } catch {
    return ''
  }
}

function PageHeader({ title }) {
  return (
    <header className="page__header">
      <p className="page__eyebrow">Hora Santa</p>
      <h1>{title}</h1>
    </header>
  )
}

function CategoryMenu() {
  return (
    <main className="page">
      <PageHeader title="Repertorio de cantos" />

      <section className="category-menu" aria-label="Categorías de cantos">
        <div className="category-menu__items">
          {categories.map((category) => (
            <a className="category-link" href={category.slug} key={category.slug}>
              {category.title}
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

function YoutubePlayer({ song }) {
  const videoId = getYoutubeVideoId(song.url)

  if (!videoId) {
    return (
      <a
        className="song-card__fallback-link"
        href={song.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        Abrir en YouTube
      </a>
    )
  }

  return (
    <iframe
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="song-card__player"
      loading="lazy"
      src={`https://www.youtube.com/embed/${videoId}`}
      title={`Reproductor de ${song.title}`}
    />
  )
}

function SongCard({ song }) {
  return (
    <article className="song-card">
      <div>
        <h2 className="song-card__title">{song.title}</h2>
      </div>
      <YoutubePlayer song={song} />
    </article>
  )
}

function EmptyState({ children }) {
  return <p className="empty-state">{children}</p>
}

function CategoryPage({ category }) {
  const categorySongs = songs.filter((song) => song.slug === category.slug)

  return (
    <main className="page">
      <a className="back-link" href="/">
        Volver al menú
      </a>
      <PageHeader title={category.title} />

      <section className="song-list" aria-label="Lista de cantos">
        <div className="song-list__items">
          {categorySongs.length > 0 ? (
            categorySongs.map((song) => (
              <SongCard key={`${song.slug}-${song.title}`} song={song} />
            ))
          ) : (
            <EmptyState>Aún no hay cantos registrados para {category.title}.</EmptyState>
          )}
        </div>
      </section>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="page">
      <a className="back-link" href="/">
        Volver al menú
      </a>
      <PageHeader title="Categoría no encontrada" />
      <EmptyState>Aún no hay cantos registrados para esta categoría.</EmptyState>
    </main>
  )
}

function App() {
  const currentSlug = normalizePath(window.location.pathname)

  if (currentSlug === '/') {
    return <CategoryMenu />
  }

  const category = categories.find((item) => item.slug === currentSlug)

  if (!category) {
    return <NotFoundPage />
  }

  return <CategoryPage category={category} />
}

export default App

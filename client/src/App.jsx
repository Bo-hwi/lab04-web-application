
import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import { photos } from './photos'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const dialogRef = useRef(null)

  const selectedCategory = searchParams.get('category')
  const selectedPhotoId = searchParams.get('photoId')

  const filteredPhotos = selectedCategory
    ? photos.filter((photo) => photo.category === selectedCategory)
    : photos

  const selectedPhoto =
    photos.find((photo) => photo.id === selectedPhotoId) ?? null

  function updateParams(key, value) {
    const nextParams = new URLSearchParams(searchParams)

    if (value === null) {
      nextParams.delete(key)
    } else {
      nextParams.set(key, value)
    }

    setSearchParams(nextParams)
  }

  function handleCategoryChange(category) {
    updateParams('category', category === 'all' ? null : category)
  }

  function handleOpenPhoto(photoId) {
    updateParams('photoId', photoId)
  }

  function handleClosePhoto() {
    updateParams('photoId', null)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (selectedPhoto) {
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [selectedPhoto])

  return (
    <main>
      <h1>Photo Gallery</h1>

      <nav aria-label="Photo categories">
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          aria-pressed={!selectedCategory}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => handleCategoryChange('nature')}
          aria-pressed={selectedCategory === 'nature'}
        >
          Nature
        </button>

        <button
          type="button"
          onClick={() => handleCategoryChange('architecture')}
          aria-pressed={selectedCategory === 'architecture'}
        >
          Architecture
        </button>
      </nav>

      <section aria-label="Photo collection">
        {filteredPhotos.map((photo) => (
          <article key={photo.id}>
            <img
              src={photo.src}
              alt={photo.alt}
              width="300"
              height="200"
            />

            <h2>{photo.title}</h2>

            <button
              type="button"
              onClick={() => handleOpenPhoto(photo.id)}
            >
              View {photo.title}
            </button>
          </article>
        ))}
      </section>

      <dialog
        ref={dialogRef}
        aria-label={selectedPhoto?.title ?? 'Photo details'}
        onClose={handleClosePhoto}
        onCancel={(event) => {
          event.preventDefault()
          handleClosePhoto()
        }}
      >
        {selectedPhoto && (
          <>
            <h2>{selectedPhoto.title}</h2>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              width="600"
              height="400"
            />

            <button type="button" onClick={handleClosePhoto}>
              Close
            </button>
          </>
        )}
      </dialog>
    </main>
  )
}

export default App

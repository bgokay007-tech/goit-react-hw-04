import { useState, useEffect } from "react";
import { fetchImages } from "./services/api";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { Toaster } from "react-hot-toast";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalImage, setModalImage] = useState(null);

  // 📡 API çağrısı
  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchImages(query, page);

        setImages(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  // 🔍 yeni arama
  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalPages(0);
  };

  // ➕ load more
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  // 🖼️ modal aç
  const openModal = image => {
    setModalImage(image);
  };

  // ❌ modal kapat
  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <Toaster />

      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage />}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}

      {loading && <Loader />}

      {/* 🔥 SADECE RESİM VARSA VE DAHA VARSA */}
      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={!!modalImage}
        onClose={closeModal}
        image={modalImage}
      />
    </>
  );
}
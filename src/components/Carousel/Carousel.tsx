import { useState, useEffect, useRef } from "react";
import "./Carouse.css";

interface Image {
    id: string;
    download_url: string;
}

export default function Carousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTransition, setShowTransition] = useState(true);
  const timeref = useRef(0);
  const prevIdxRef = useRef(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?page=2&limit=10"
        );
        const data: Image[] = await response.json();
        const imageUrls = data.map(
          (img) => `${img.download_url}?w=600&h=400`
        );
        setImages(imageUrls);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  function handlePrev() {
    setShowTransition(true);
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  }

  function handleNext() {
    setShowTransition(true);
    setActiveIdx((next) => (next + 1) % images.length);
  }

  useEffect(() => {
    if (activeIdx === 0 && prevIdxRef.current === images.length - 1) {
      setShowTransition(false);
    } else if (activeIdx === images.length - 1 && prevIdxRef.current === 0) {
      setShowTransition(false);
    } else {
      setShowTransition(true);
    }
    prevIdxRef.current = activeIdx;
  }, [activeIdx, images.length]);

  useEffect(() => {
    if (!paused && images.length > 0) {
      timeref.current = setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % images.length);
      }, 3000);
    }

    return () => {
      if (timeref.current) {
        clearTimeout(timeref.current);
      }
    };
  }, [activeIdx, paused, images.length]);

  return (
    <>
      <div className="carousel-wrapper">
        <div
          className="carousel-container"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="carousel-btn prev" onClick={handlePrev}>
            &lt;
          </button>
          <div className="carousel-item">
            <div
              className="carousel-item-stack"
              style={{ 
                transform: `translateX(-${activeIdx * 100}%)`,
                transition: showTransition ? 'transform 0.5s ease-in-out' : 'none'
              }}
            >
              {images.map((src, idx) => (
                <img key={idx} src={src} alt={`Slide ${idx}`} />
              ))}
            </div>
          </div>
          <button className="carousel-btn next" onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}

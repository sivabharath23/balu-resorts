import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

import hairPin from '../assets/hair-pin.png';
import balcony1 from '../assets/Balcony 1.jpg';
import balcony2 from '../assets/Balcony 2.jpg';
import balcony3 from '../assets/Balcony 3.jpg';
import bathroom from '../assets/Bathroom.jpg';
import doubleRoom1 from '../assets/Double Bed Room 1.jpg';
import doubleRoom2 from '../assets/Double Bed Room 2.jpg';
import outer1 from '../assets/Outer view 1.jpg';
import outer2 from '../assets/outer view 2.jpg';
import outer3 from '../assets/Outer view 3.jpg';
import single1 from '../assets/Single Bed Room 1.jpg';

// ✅ Gallery items with real images
const galleryItems = [
  { id: 1, label: 'Hair Pin Road', category: 'Views', image: hairPin },
  { id: 2, label: 'Balcony View 1', category: 'Views', image: balcony1 },
  { id: 3, label: 'Balcony View 2', category: 'Views', image: balcony2 },
  { id: 4, label: 'Balcony View 3', category: 'Views', image: balcony3 },
  { id: 5, label: 'Bathroom', category: 'Cottages', image: bathroom },
  { id: 6, label: 'Double Room 1', category: 'Cottages', image: doubleRoom1 },
  { id: 7, label: 'Double Room 2', category: 'Cottages', image: doubleRoom2 },
  { id: 8, label: 'Outer View 1', category: 'Nature', image: outer1 },
  { id: 9, label: 'Outer View 2', category: 'Nature', image: outer2 },
  { id: 10, label: 'Outer View 3', category: 'Nature', image: outer3 },
  { id: 11, label: 'Single Room', category: 'Cottages', image: single1 },
];

const categories = ['All', 'Nature', 'Cottages', 'Views'];

// ✅ Gallery Card Component
function GalleryCard({ item, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(item)}
      className="relative cursor-pointer overflow-hidden rounded-2xl group h-[220px]"
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.label}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-300" />

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-white text-sm font-medium">{item.label}</p>
        <p className="text-white/70 text-xs">{item.category}</p>
      </div>
    </motion.div>
  );
}

// ✅ Main Gallery Component
export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState('All');

  const filtered =
    category === 'All'
      ? galleryItems
      : galleryItems.filter((g) => g.category === category);

  const selectedIdx = filtered.findIndex((g) => g.id === selected?.id);

  const prev = () => {
    const idx = (selectedIdx - 1 + filtered.length) % filtered.length;
    setSelected(filtered[idx]);
  };

  const next = () => {
    const idx = (selectedIdx + 1) % filtered.length;
    setSelected(filtered[idx]);
  };

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-forest-900 text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-10 left-20 w-64 h-64 bg-forest-600/20 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-accent italic text-earth-300 text-lg mb-3"
          >
            Through the lens
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl mb-5"
          >
            Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-forest-300 text-lg"
          >
            Glimpses of life at Balu Resorts.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat
                    ? 'bg-forest-700 text-white shadow-lg'
                    : 'bg-white border text-forest-700 hover:bg-forest-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filtered.map((item) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onClick={setSelected}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <img
                src={selected.image}
                alt={selected.label}
                className="w-full h-[400px] object-cover rounded-2xl"
              />

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-white text-xl">{selected.label}</p>
                <p className="text-white/50 text-sm">
                  {selectedIdx + 1} / {filtered.length}
                </p>
              </div>

              {/* Controls */}
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white"
              >
                <ChevronRight />
              </button>

              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white"
              >
                <X />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
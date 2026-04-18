import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, Coffee, Wind, Tv, Bath, Users, Star, ArrowRight, AirVent } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

// Image imports
import single1 from '../assets/Single Bed Room 1.jpg';
import doubleRoom1 from '../assets/Double Bed Room 1.jpg';
import doubleRoom2 from '../assets/Double Bed Room 2.jpg';

const rooms = [
  {
    id: 1,
    name: 'Single Bedroom',
    type: 'Standard',
    price: 3000,
    originalPrice: 3500,
    guests: 2,
    beds: 1,
    size: '350 sq ft',
    tag: 'Most Popular',
    tagColor: 'bg-forest-600',
    description: 'A cozy and comfortable single bedroom with a king-size bed, perfect for couples or solo travelers seeking peace and privacy.',
    amenities: [
      { icon: Wifi, label: '24×7 Free WiFi' },
      { icon: Coffee, label: 'Breakfast Included' },
      { icon: Wind, label: 'Non-AC' },
      { icon: Bath, label: '24×7 Hot Water' },
      { icon: Tv, label: 'Smart TV' },
    ],
    features: [
      'King-size bed',
      '24×7 Hot Water',
      'Free WiFi',
      'Daily housekeeping',
      'Mountain view'
    ],
    gradient: 'from-forest-700 to-forest-900',
    image: single1,
  },
  {
    id: 2,
    name: 'Double Bedroom',
    type: 'Deluxe',
    price: 6000,
    originalPrice: 7000,
    guests: 6,
    beds: 2,
    size: '520 sq ft',
    tag: 'Best Choice',
    tagColor: 'bg-earth-500',
    description: 'Spacious double bedroom featuring two king-size beds, a dining table, and a private balcony with AC. Ideal for families or groups.',
    amenities: [
      { icon: Wifi, label: '24×7 Free WiFi' },
      { icon: Coffee, label: 'Breakfast Included' },
      { icon: Tv, label: 'Smart TV' },
      { icon: Bath, label: '24×7 Hot Water' },
      { icon: AirVent, label: 'AC in Balcony' },
    ],
    features: [
      'Two King-size beds',
      'Dining table',
      'Private balcony with AC',
      '24×7 Hot Water',
      'Daily housekeeping'
    ],
    gradient: 'from-earth-700 to-forest-900',
    images: [doubleRoom1, doubleRoom2],
  },
];

export default function Cottages() {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-forest-900 text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-80 h-80 bg-forest-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-accent italic text-earth-300 text-lg mb-3"
          >
            Sleep among the clouds
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl mb-5"
          >
            Our Rooms
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-forest-300 text-lg max-w-2xl mx-auto"
          >
            Comfortable, well-appointed rooms designed for a relaxing and memorable stay at Balu Resorts.
          </motion.p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 px-6 bg-cream leaf-pattern">
        <div className="max-w-7xl mx-auto space-y-12">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="glass-card overflow-hidden rounded-3xl shadow-xl"
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* ====================== IMAGE SECTION - FIXED HEIGHT ====================== */}
                <div className="md:col-span-2 relative overflow-hidden bg-gradient-to-br ${room.gradient}">
                  
                  {/* Fixed Height Container */}
                  <div className="relative w-full h-[420px] md:h-[520px] lg:h-[560px]">
                    {room.image ? (
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    ) : room.images && room.images.length > 0 ? (
                      <img
                        src={room.images[0]}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-forest-800">
                        <span className="text-white/30 text-7xl">🏡</span>
                      </div>
                    )}
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                  {/* Top Tags */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                    <span className={`${room.tagColor} text-white text-xs font-semibold px-4 py-1.5 rounded-full`}>
                      {room.tag}
                    </span>
                    <span className="bg-white/90 text-forest-900 px-3 py-1 text-xs font-medium rounded-full">
                      {room.type}
                    </span>
                  </div>

                  {/* Pricing Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-white/75 text-sm line-through">
                          ₹{room.originalPrice.toLocaleString()}
                        </div>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-display text-4xl md:text-5xl font-semibold text-white">
                            ₹{room.price}
                          </span>
                          <span className="text-white/80 text-base">/night</span>
                        </div>
                        <p className="text-white/80 text-sm mt-1">
                          Up to {room.guests} guests
                        </p>
                      </div>

                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-5 h-5 fill-earth-300 text-earth-300" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between bg-white">
                  <div>
                    <h2 className="font-display text-3xl text-forest-900 mb-2">{room.name}</h2>
                    
                    <div className="flex gap-6 text-sm text-forest-600 mb-6">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-5 h-5" /> Up to {room.guests} guests
                      </span>
                      <span>{room.beds} King bed{room.beds > 1 ? 's' : ''}</span>
                      <span>{room.size}</span>
                    </div>

                    <p className="text-forest-600 leading-relaxed mb-7">{room.description}</p>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {room.amenities.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 bg-forest-50 text-forest-700 text-sm px-4 py-2 rounded-2xl">
                          <Icon className="w-4 h-4" /> {label}
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-forest-700">
                      {room.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-earth-500 rounded-full mt-1.5 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <Link
                      to={`/booking?room=${encodeURIComponent(room.name)}&price=${room.price}&guests=${room.guests}`}
                      className="btn-primary flex-1 py-4 text-base font-medium flex items-center justify-center gap-2"
                    >
                      Book Now <ArrowRight className="w-5 h-5" />
                    </Link>

                    <a
                      href={`https://wa.me/919043210789?text=Hi%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(room.name)}%20at%20Balu%20Resorts.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none border-2 border-forest-200 hover:border-forest-300 text-forest-700 hover:bg-forest-50 py-4 px-6 rounded-2xl font-medium flex items-center justify-center gap-3 transition-colors"
                    >
                      <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp Enquiry
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
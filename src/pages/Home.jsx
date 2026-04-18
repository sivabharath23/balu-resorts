import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import single1 from '../assets/Single Bed Room 1.jpg';
import doubleRoom1 from '../assets/Double Bed Room 1.jpg';
import {
  Wind, Flame, Eye, UtensilsCrossed, Star, ArrowRight,
  TreePine, Waves, Sun, Moon, MapPin, ChevronDown, Compass
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import hairPinImage from '../assets/hair-pin.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' }
  })
};

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const highlights = [
  { icon: Wind, label: 'Mountain Breeze', desc: 'Wake up to cool misty air at 1300m elevation' },
  { icon: Flame, label: 'Campfire Nights', desc: 'Gather around crackling fires under the stars' },
  { icon: Eye, label: 'Panoramic Views', desc: '360° vistas of the Eastern Ghats valleys' },
  { icon: UtensilsCrossed, label: 'Local Cuisine', desc: 'Authentic Tamil hillstation delicacies' },
  { icon: TreePine, label: 'Nature Trails', desc: 'Guided treks through dense green forests' },
  { icon: Waves, label: 'Agaya Gangai', desc: 'Visit the spectacular 300ft waterfall nearby' },
];

const testimonials = [
  {
    name: 'Priya Venkatesh',
    location: 'Chennai',
    text: 'An absolutely magical stay! The misty mornings and campfire evenings were unforgettable. The cottage was cozy and the food was delicious.',
    rating: 5,
    avatar: 'PV',
  },
  {
    name: 'Rajan & Family',
    location: 'Bengaluru',
    text: 'Best family getaway we\'ve had in years. The kids loved the nature walks and we loved the peaceful atmosphere. Will definitely return!',
    rating: 5,
    avatar: 'RF',
  },
  {
    name: 'Karthik S.',
    location: 'Coimbatore',
    text: 'Perfect escape from city life. The resort staff were warm and attentive. The views from our cottage were breathtaking at sunset.',
    rating: 5,
    avatar: 'KS',
  },
];

const kollihillsSpots = [
  { name: 'Agaya Gangai', desc: 'A majestic 300-foot waterfall' },
  { name: 'Solakadu Viewpoint', desc: 'Stunning sunrise panorama' },
  { name: 'Siddhar Caves', desc: 'Ancient meditative caves' },
  { name: 'Maasila Dam', desc: 'Serene reservoir views' },
];

export default function Home() {
  return (
    <PageWrapper>
      {/* ───── HERO ───── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
        {/* SVG forest silhouette */}
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 340" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,340 L0,200 Q50,160 100,200 Q130,220 160,170 Q190,120 220,160 Q260,200 300,150 Q340,100 380,140 Q420,180 460,120 Q500,60 540,100 Q580,140 620,80 Q660,20 700,70 Q740,120 780,60 Q820,0 860,50 Q900,100 940,40 Q980,0 1020,50 Q1060,100 1100,50 Q1140,0 1180,60 Q1220,120 1260,70 Q1300,20 1340,80 Q1380,140 1440,100 L1440,340 Z" fill="#163e1c" opacity="0.7"/>
            <path d="M0,340 L0,260 Q80,220 160,260 Q220,290 280,240 Q340,190 400,230 Q460,270 520,220 Q580,170 640,210 Q700,250 760,200 Q820,150 880,190 Q940,230 1000,180 Q1060,130 1120,170 Q1180,210 1240,170 Q1300,130 1360,180 Q1400,210 1440,190 L1440,340 Z" fill="#163e1c" opacity="0.9"/>
          </svg>

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/20"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <MapPin className="w-4 h-4 text-earth-300" />
            <span className="font-body text-sm text-white/90">Kolli Hills, Tamil Nadu</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
          >
            Welcome to<br />
            <span className="text-earth-300 italic">Balu Resorts</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-accent italic text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Escape to the misty embrace of Kolli Hills — where ancient forests, rushing waterfalls, and starlit skies await your arrival.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/booking" className="btn-secondary text-base py-4 px-9">
              Book Your Stay <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/cottages" className="btn-outline text-base py-4 px-9">
              Explore Cottages <Compass className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex gap-8 md:gap-16 justify-center mt-16 pt-8 border-t border-white/10"
          >
            {[
              { val: '9+', label: 'Years of Hospitality' },
              { val: '4.5★', label: 'Guest Rating' },
              { val: '1300m', label: 'Altitude' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl text-earth-300 font-semibold">{val}</div>
                <div className="font-body text-xs text-white/60 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ───── HIGHLIGHTS ───── */}
      <section className="py-24 px-6 leaf-pattern bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="section-subtitle mb-3">Why guests love us</p>
            <h2 className="section-title">The Balu Experience</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group glass-card p-7 cursor-default"
              >
                <div className="w-14 h-14 bg-forest-100 group-hover:bg-forest-600 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-forest-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl text-forest-900 mb-2">{label}</h3>
                <p className="text-forest-600 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* ───── COTTAGES PREVIEW ───── */}
<section className="py-24 px-6 bg-forest-900 text-white relative overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-10 left-10 w-72 h-72 bg-forest-400 rounded-full blur-3xl" />
    <div className="absolute bottom-10 right-10 w-96 h-96 bg-earth-400 rounded-full blur-3xl" />
  </div>

  <div className="relative max-w-7xl mx-auto">
    <AnimatedSection className="text-center mb-16">
      <p className="font-accent italic text-earth-300 text-lg mb-3">Rest in nature</p>
      <h2 className="font-display text-4xl md:text-5xl text-white mb-5">Our Cottages</h2>
      <p className="text-forest-300 max-w-xl mx-auto">
        Thoughtfully designed retreats blending rustic charm with modern comfort.
      </p>
    </AnimatedSection>

    <div className="grid md:grid-cols-2 gap-6 mb-12">   {/* Changed to 2 columns */}
      {[
        {
          name: 'Single Bedroom',
          price: '₹3,000',
          guests: '2',
          tag: 'Most Popular',
          image: single1,                    // Your real image
        },
        {
          name: 'Double Bedroom',
          price: '₹6,000',
          guests: '6',
          tag: 'Best Choice',
          image: doubleRoom1,                // Your real image
        },
      ].map(({ name, price, guests, tag, image }, i) => (
        <motion.div
          key={name}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="glass-dark p-6 group hover:border-earth-400/40 transition-all duration-300"
        >
          {/* Image with Fixed Height - Same pattern as your original */}
          <div className="w-full h-60 md:h-72 rounded-xl overflow-hidden relative mb-5">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Tag Badge - Same position as your original */}
            <span className="absolute top-3 right-3 bg-earth-500 text-white text-xs font-medium px-3 py-1 rounded-full">
              {tag}
            </span>
          </div>

          <h3 className="font-display text-xl mb-1">{name}</h3>
          <p className="text-forest-400 text-sm mb-4">Up to {guests} guests</p>

          <div className="flex items-center justify-between">
            <span className="font-display text-2xl text-earth-300">
              {price}
              <span className="text-sm text-forest-400 font-body">/night</span>
            </span>
            
            <Link 
              to={`/booking?room=${encodeURIComponent(name)}&price=${price.replace(/[₹,]/g, '')}`}
              className="btn-secondary text-xs py-2 px-4"
            >
              Book <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="text-center">
      <Link to="/cottages" className="btn-outline">
        View All Cottages <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
</section>

      {/* ───── EXPLORE KOLLI HILLS ───── */}
      <section className="py-24 px-6 bg-mist leaf-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="section-subtitle mb-3">Beyond the resort</p>
              <h2 className="section-title mb-6">Explore<br /><em className="not-italic text-forest-600">Kolli Hills</em></h2>
              <p className="text-forest-600 leading-relaxed mb-8">
                Kolli Hills, known as the "Mountains of Death" for their treacherous 70-hairpin-bend road, rewards the brave with breathtaking beauty. Ancient temples, rare medicinal herbs, and cascading waterfalls await just minutes from Balu Resorts.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {kollihillsSpots.map(({ name, desc }) => (
                  <div key={name} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-earth-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-forest-800 text-sm">{name}</p>
                      <p className="text-forest-500 text-xs">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary">
                Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative">
                {/* Decorative card stack */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-forest-200 rounded-3xl" />
                <div className="absolute -top-2 -left-2 w-full h-full bg-earth-200 rounded-3xl" />
                <div className="relative rounded-3xl h-96 overflow-hidden shadow-2xl shadow-forest-900/15">
                  <img
                    src={hairPinImage}
                    alt="Hairpin bends road in Kolli Hills"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="flex gap-2 mb-4">
                      <Sun className="w-5 h-5 text-earth-300" />
                      <Moon className="w-5 h-5 text-earth-300" />
                    </div>
                    <p className="font-accent italic text-white/75 text-sm mb-1">Elevation: 1,300m</p>
                    <p className="font-display text-white text-2xl">70 hairpin bends<br />to paradise</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="section-subtitle mb-3">Hear from our guests</p>
            <h2 className="section-title">Stories from the Hills</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, text, rating, avatar }, i) => (
              <motion.div
                key={name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass-card p-7"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-earth-400 text-earth-400" />
                  ))}
                </div>
                <p className="text-forest-700 text-sm leading-relaxed mb-6 italic">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-forest-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-medium text-forest-900 text-sm">{name}</p>
                    <p className="text-forest-500 text-xs">{location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="py-20 px-6 bg-earth-500 text-white text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Ready for the Hills?</h2>
          <p className="font-accent italic text-white/80 text-xl mb-8">Limited cottages available — book before they're gone.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="bg-white text-earth-700 hover:bg-earth-50 font-medium px-9 py-4 rounded-full transition-all hover:shadow-xl inline-flex items-center gap-2">
              Book Now <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/919043210789?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20Balu%20Resorts."
              target="_blank" rel="noopener noreferrer"
              className="border-2 border-white/50 text-white hover:bg-white/10 font-medium px-9 py-4 rounded-full transition-all inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </AnimatedSection>
      </section>
    </PageWrapper>
  );
}

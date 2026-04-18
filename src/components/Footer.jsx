import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, ArrowRight } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png';


export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white">
      {/* Wave divider */}
      <div className="w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-cream">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white rounded-full overflow-hidden flex items-center justify-center shadow-lg shadow-black/20">
              <img src={logo} alt="Balu Resorts logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-display text-xl font-semibold block">Balu Resorts</span>
              <span className="font-accent italic text-forest-400 text-xs">Nature&apos;s comfort kolli&apos;s charm</span>
            </div>
          </div>
          <p className="text-forest-300 text-sm leading-relaxed mb-5">
            A sanctuary of peace nestled in the misty hills of Kolli Hills, Tamil Nadu — where nature meets luxury.
          </p>
          <div className="flex gap-3">
            {[FaInstagram, FaFacebook, FaYoutube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 bg-forest-800 hover:bg-forest-600 rounded-full flex items-center justify-center transition-colors duration-300">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-display text-lg mb-4 text-forest-100">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/cottages', label: 'Cottages' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/about', label: 'About Us' },
              { to: '/booking', label: 'Book Now' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-forest-300 hover:text-white text-sm transition-colors duration-200">
                  → {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-lg mb-4 text-forest-100">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <MapPin className="w-4 h-4 text-earth-400 mt-0.5 flex-shrink-0" />
              <p className="text-forest-300 text-sm leading-relaxed">
                15/57, Puranikaadupatti,<br />
                Valavanthinadu, Kolli Hills,<br />
                Tamil Nadu 637411
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-earth-400 flex-shrink-0" />
              <a href="tel:+919043210789" className="text-forest-300 hover:text-white text-sm transition-colors">
                +91 90432 10789
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-earth-400 flex-shrink-0" />
              <a href="mailto:support@baluresorts.com" className="text-forest-300 hover:text-white text-sm transition-colors">
                support@baluresorts.com
              </a>
            </div>
          </div>
        </div>

        {/* Booking CTA */}
        <div>
          <h3 className="font-display text-lg mb-4 text-forest-100">Plan Your Stay</h3>
          <p className="text-forest-300 text-sm mb-5 leading-relaxed">
            Ready to escape to the hills? Book your retreat today and experience the magic of Kolli Hills.
          </p>
          <Link to="/booking" className="btn-secondary text-sm py-2.5 px-5 mb-4 w-full justify-center">
            Reserve Now <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/919043210789?text=Hi%2C%20I'm%20interested%20in%20booking%20Balu%20Resorts."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-forest-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-forest-400 text-xs">
          <p>© 2026 Balu Resorts. All rights reserved.</p>
          <p>GST: 33ARBPP6635N1ZF &nbsp;|&nbsp; Kolli Hills, Namakkal, Tamil Nadu</p>
        </div>
      </div> 
    </footer>
  );
}

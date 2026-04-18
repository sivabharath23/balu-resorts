import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

export default function Contact() {
  return (
    <PageWrapper>
      <section className="bg-forest-900 text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-accent italic text-earth-300 text-lg mb-3">
            We'd love to hear from you
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl md:text-6xl mb-5">
            Contact Us
          </motion.h1>
        </div>
      </section>

      <section className="py-20 px-6 bg-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl text-forest-900 mb-8">Get in Touch</h2>
            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Address', lines: ['15/57, Puranikaadupatti,', 'Valavanthinadu, Kolli Hills,', 'Tamil Nadu 637411'] },
                { icon: Phone, title: 'Phone', lines: ['+91 90432 10789'] },
                { icon: Mail, title: 'Email', lines: ['support@baluresorts.com'] },
                { icon: Clock, title: 'Check-in / Check-out', lines: ['Check-in: 4:00 PM', 'Check-out: 4:00 PM'] },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-forest-600" />
                  </div>
                  <div>
                    <p className="font-medium text-forest-900 mb-1">{title}</p>
                    {lines.map((line, index) => (
                      <p key={index} className="text-forest-600 text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-green-50 border border-green-200 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <p className="font-medium text-green-800">Fastest Response via WhatsApp</p>
              </div>
              <p className="text-green-700 text-sm mb-3">Our team typically replies within 30 minutes on WhatsApp (9 AM - 9 PM).</p>
              <a
                href="https://wa.me/919043210789?text=Hi%20Balu%20Resorts%2C%20I'd%20like%20to%20enquire%20about%20a%20stay."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-2xl overflow-hidden shadow-xl h-96 bg-forest-100">
              <iframe
                title="Balu Resorts Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.762937537986!2d78.35320707460924!3d11.278828949726824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babb70053a69215%3A0x27631026ac25f253!2sBALU%20RESORTS!5e0!3m2!1sen!2sin!4v1776490198946!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-4 p-4 bg-forest-50 rounded-xl border border-forest-200">
              <p className="text-forest-700 text-sm font-medium mb-1">Balu Resorts, Kolli Hills</p>
              <p className="text-forest-500 text-xs">Access via NH-544E → Namakkal → Kolli Hills. 70 hairpin bends from the foothills. GPS: 11.2788°N, 78.3532°E</p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}

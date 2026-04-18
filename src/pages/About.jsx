import { motion } from 'framer-motion';
import { Heart, Shield, Leaf, Award, Users, TreePine } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const values = [
  { icon: Heart, title: 'Heartfelt Hospitality', desc: 'Every guest is family. We go beyond service to create memories that last a lifetime.' },
  { icon: Leaf, title: 'Eco-Conscious', desc: 'We operate sustainably — solar panels, rainwater harvesting, organic farming, zero-plastic policy.' },
  { icon: Shield, title: 'Safety First', desc: 'Fully certified, hygiene-compliant, and equipped with 24/7 on-call staff and medical support.' },
{
  icon: Award,
  title: 'Trusted Experience',
  desc: 'Delivering consistent quality service and memorable stays for guests visiting Kolli Hills.'
}];

const milestones = [
  { year: '2015', event: 'Balu Resorts founded with 3 cottages' },
  { year: '2017', event: 'Expanded to 8 cottages & added dining hall' },
  { year: '2019', event: 'Won Best Hillstation Resort – TN Tourism' },
  { year: '2021', event: 'Launched nature trails & eco-activities' },
  { year: '2023', event: 'Added Treetop Hideaway & Family Bungalows' },
  { year: '2024', event: 'Digital booking & WhatsApp integration launched' },
];

export default function About() {
  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-forest-900 text-white pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-earth-600 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-accent italic text-earth-300 text-lg mb-3">Our journey</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl md:text-6xl mb-5">Our Story</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-forest-300 text-lg max-w-2xl mx-auto">
            Born from a love of the hills, Balu Resorts was built to share the magic of Kolli Hills with the world.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="section-subtitle mb-3">The beginning</p>
            <h2 className="section-title mb-6">A Dream Born<br />in the Mist</h2>
            <div className="space-y-4 text-forest-700 leading-relaxed">
              <p>
                In 2015, Balu — a native of Kolli Hills — returned from a decade in the city, driven by a singular vision: to open his childhood home's doors to those yearning for an escape from urban life.
              </p>
              <p>
                What began as three humble cottages on a family farm has grown into a thoughtfully curated resort that welcomes over 2,000 guests each year — without losing an ounce of its soul.
              </p>
              <p>
                Every stone, every garden path, every lamp in every room has been chosen with care. We believe luxury isn't about grandeur — it's about the feeling of being exactly where you're meant to be.
              </p>
            </div>
            <div className="flex gap-8 mt-8">
              <div>
                <div className="font-display text-3xl text-forest-700">9+</div>
                <div className="text-forest-500 text-sm">Years of hosting</div>
              </div>
              <div>
                <div className="font-display text-3xl text-forest-700">2000+</div>
                <div className="text-forest-500 text-sm">Happy guests/year</div>
              </div>
              <div>
                <div className="font-display text-3xl text-forest-700">4.5★</div>
                <div className="text-forest-500 text-sm">Average rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <div className="absolute -top-5 -right-5 w-full h-full bg-earth-100 rounded-3xl" />
              <div className="relative bg-gradient-to-br from-forest-700 to-forest-900 rounded-3xl p-10 flex flex-col gap-6">
                <Users className="w-14 h-14 text-forest-300" />
                <blockquote className="font-accent italic text-white text-2xl leading-relaxed">
                  "I wanted every guest to feel what I felt as a child here — free, unhurried, and fully alive."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-earth-500 rounded-full flex items-center justify-center text-white font-bold font-display text-lg">B</div>
                  <div>
                    <p className="text-white font-medium">BALADHANARAJ</p>
                    <p className="text-forest-400 text-sm">Founder, Balu Resorts</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-mist leaf-pattern">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="section-subtitle mb-3">What we stand for</p>
            <h2 className="section-title">Our Values</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-7 text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-14 h-14 bg-forest-100 group-hover:bg-forest-600 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-forest-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg text-forest-900 mb-2">{title}</h3>
                <p className="text-forest-600 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-forest-900 text-white">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-accent italic text-earth-300 text-lg mb-3">Our journey</p>
            <h2 className="font-display text-4xl md:text-5xl">Milestones</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-forest-700" />
            <div className="space-y-10">
              {milestones.map(({ year, event }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 items-start pl-4"
                >
                  <div className="relative">
                    <div className="w-9 h-9 bg-earth-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      <TreePine className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="pb-2">
                    <span className="font-display text-earth-300 text-2xl">{year}</span>
                    <p className="text-forest-300 mt-1">{event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
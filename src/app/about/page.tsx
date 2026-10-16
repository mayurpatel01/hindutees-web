import type { Metadata } from 'next'
import Link from 'next/link'
import { brand } from '@/config/brand'

export const metadata: Metadata = {
  title: `About | ${brand.name}`,
  description:
    'HinduTee is Hindu deity apparel for the global diaspora — celebrating the cultures and countries that have shaped Hindu life beyond India.',
}

const DEITIES = ['Ganesh', 'Lakshmi', 'Shiva', 'Krishna', 'Hanuman', 'Durga', 'Om']
const COUNTRIES = [
  'India', 'USA', 'Canada', 'UK', 'Australia',
  'Trinidad', 'Guyana', 'Fiji', 'Mauritius', 'South Africa',
  'Suriname', 'Netherlands', 'New Zealand', 'Kenya', 'Tanzania', 'Zambia', 'Mexico',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 text-center px-6">
        <p className="text-xs font-medium tracking-[0.25em] mb-4 uppercase"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Our story
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6 leading-tight"
          style={{ color: 'var(--color-text-heading)' }}>
          Two flags.<br />One identity.
        </h1>
        <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}>
          Every HinduTee pairs a Hindu deity with two flags — the land your family came from,
          and the land you call home today.
        </p>
      </section>

      {/* Decorative divider */}
      <div className="flex justify-center pb-16 text-3xl" style={{ color: 'var(--color-primary)', opacity: 0.4 }}>
        ✦
      </div>

      {/* Mission section */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose-style">
          <p className="text-lg leading-loose mb-6" style={{ color: 'var(--color-text-dark)' }}>
            The Hindu diaspora is one of the most geographically scattered communities in human
            history. From Trinidad to Fiji, from South Africa to Canada, Hindu families have
            carried their faith, their deities, and their culture across oceans — and built
            something new everywhere they landed.
          </p>
          <p className="text-base leading-loose mb-6" style={{ color: 'var(--color-text-dark)' }}>
            HinduTee was built to honor that story. We make premium t-shirts that pair Hindu
            iconography with the flags of the diaspora countries where Hindu life has put down
            roots. Each design is a quiet assertion: <em>I am from here and from there.
            I carry both.</em>
          </p>
          <p className="text-base leading-loose" style={{ color: 'var(--color-text-dark)' }}>
            Our designs are not souvenirs. They are identity statements — made for people
            who are tired of explaining which "home" they mean.
          </p>
        </div>
      </section>

      {/* Deity + country grid */}
      <section className="pb-24 px-6" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-5xl mx-auto pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Deities */}
            <div>
              <h2 className="font-display text-xs tracking-widest uppercase mb-6"
                style={{ color: 'var(--color-primary)' }}>
                The deities
              </h2>
              <div className="flex flex-wrap gap-3">
                {DEITIES.map(d => (
                  <Link
                    key={d}
                    href={`/shop?god=${d.toLowerCase()}`}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--color-surface-2)',
                      color: 'var(--color-text-dark)',
                    }}>
                    {d}
                  </Link>
                ))}
              </div>
            </div>

            {/* Countries */}
            <div>
              <h2 className="font-display text-xs tracking-widest uppercase mb-6"
                style={{ color: 'var(--color-primary)' }}>
                The diaspora
              </h2>
              <div className="flex flex-wrap gap-3">
                {COUNTRIES.map(c => (
                  <Link
                    key={c}
                    href={`/shop?country=${c}`}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--color-surface-2)',
                      color: 'var(--color-text-dark)',
                    }}>
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-16"
          style={{ color: 'var(--color-text-heading)' }}>
          What we believe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Identity is not a compromise',
              body: 'You don\'t have to choose between the country you live in and the culture you carry. Wearing both is not confusion — it\'s precision.',
            },
            {
              title: 'Representation matters',
              body: 'Hindu iconography has been on pendants and puja shelves for centuries. It belongs on clothing too — worn with intention, not irony.',
            },
            {
              title: 'Quality tells the story',
              body: 'Each design is print-on-demand, produced locally in your region by Gelato. No overstock, no landfill, no shortcuts.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="text-2xl mb-2" style={{ color: 'var(--color-primary)' }}>✦</div>
              <h3 className="font-display text-lg font-semibold leading-snug"
                style={{ color: 'var(--color-text-heading)' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Production section */}
      <section className="border-t border-b py-20 px-6"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
            How it works
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6"
            style={{ color: 'var(--color-text-heading)' }}>
            Printed fresh, shipped to you
          </h2>
          <p className="text-sm leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: 'var(--color-text-muted)' }}>
            Every HinduTee is made when you order it. We partner with Gelato, a global
            print-on-demand network, to produce each shirt locally in your region. That means
            faster shipping, lower carbon footprint, and no warehouses full of unsold stock.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '224', label: 'Unique designs' },
              { stat: '7', label: 'Hindu deities' },
              { stat: '17', label: 'Diaspora countries' },
              { stat: '130+', label: 'Countries shipped to' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="font-display text-3xl font-semibold mb-1"
                  style={{ color: 'var(--color-primary)' }}>
                  {stat}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <p className="text-xs tracking-widest uppercase mb-4"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
          Ready?
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4"
          style={{ color: 'var(--color-text-heading)' }}>
          Find your combination
        </h2>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          Every deity, every diaspora country. Browse the full collection.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/shop"
            className="inline-block px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text-light)' }}>
            Shop All Designs
          </Link>
          <Link href="/blog"
            className="inline-block px-8 py-3.5 rounded-full font-medium text-sm border transition-all duration-200 hover:opacity-70"
            style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-dark)' }}>
            Read the Blog
          </Link>
        </div>
      </section>
    </>
  )
}

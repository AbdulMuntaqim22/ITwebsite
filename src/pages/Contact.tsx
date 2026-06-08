import { Section } from '../components/Section'
import { ContactForm } from '../components/ContactForm'
import { DirectContactInfo } from '../components/DirectContactInfo'
import { PageMeta } from '../components/PageMeta'
import { useContent } from '../context/ContentContext'

export function Contact() {
  const { contact } = useContent()

  return (
    <>
      <PageMeta
        title="Contact"
        description="Get in touch with MZA Solutions for a quote on website design, video editing, and IT services."
      />

      <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-14 text-center shadow-card sm:px-8 sm:py-18">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--accent)]">Contact</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[color:var(--text)] sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
            Have a project in mind? Send us a message and we&apos;ll get back to you with a tailored quote.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.85fr] lg:gap-16">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-card">
            <h2 className="text-xl font-semibold text-[color:var(--text)]">Send a message</h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Fill out the form and we&apos;ll respond within 1–2 business days.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {contact && (
            <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-card">
              <h2 className="text-xl font-semibold text-[color:var(--text)]">Direct contact</h2>
              <div className="mt-6">
                <DirectContactInfo variant="card" />
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

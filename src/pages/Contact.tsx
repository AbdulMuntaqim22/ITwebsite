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

      <div className="border-b border-white/5 bg-navy-900/30 px-4 py-12 text-center sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Have a project in mind? Send us a message and we&apos;ll get back to you with a tailored quote.
        </p>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-xl font-semibold text-white">Send a message</h2>
            <p className="mt-2 text-sm text-slate-400">
              Fill out the form and we&apos;ll respond within 1–2 business days.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {contact && (
            <div className="rounded-xl border border-white/10 bg-navy-900/80 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">Direct contact</h2>
              <DirectContactInfo variant="card" />
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

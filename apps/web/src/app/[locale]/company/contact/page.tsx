import { Container } from "@gytev/ui";
import { getDictionary } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const detail = dict.pages.companyDetail.contact;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 border-b border-[var(--line)] bg-[var(--color-surface)]">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-2 w-2 rounded-full bg-[var(--color-signal-500)]" />
              <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                {detail.kicker}
              </p>
            </div>
            
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl lg:text-7xl" style={{ textWrap: 'balance' }}>
              {detail.heroTitle}
            </h1>
            
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-zinc-600">
              {detail.note}
            </p>
          </div>
        </Container>
      </section>

      {/* TWO COLUMN LAYOUT: DIRECTORY & FORM */}
      <section className="py-24 bg-[var(--paper)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* LEFT: Inquiries & Offices */}
            <div>
              {/* Inquiries */}
              <div className="mb-16">
                <h2 className="text-2xl font-semibold mb-8 border-b border-[var(--line)] pb-4">{detail.inquiriesHeading}</h2>
                <div className="space-y-8">
                  {detail.inquiries.map((inquiry, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-medium text-[var(--ink)]">{inquiry.title}</h3>
                      <p className="text-sm text-zinc-500 mt-1 mb-2">{inquiry.description}</p>
                      <a href={`mailto:${inquiry.email}`} className="text-sm font-semibold text-[var(--color-signal-600)] hover:underline">
                        {inquiry.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Offices */}
              <div>
                <h2 className="text-2xl font-semibold mb-8 border-b border-[var(--line)] pb-4">{detail.officesHeading}</h2>
                <div className="space-y-8">
                  {detail.offices.map((office, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-medium text-[var(--ink)]">{office.city}</h3>
                      <p className="text-sm text-zinc-500 mt-1">
                        {office.address}<br />
                        {office.country}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div>
              <div className="bg-[var(--color-surface)] border border-[var(--line)] p-8 sm:p-12 shadow-sm">
                <h2 className="text-2xl font-semibold mb-8">{detail.form.heading}</h2>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--ink)] mb-2">
                      {detail.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full h-12 px-4 bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--color-signal-500)] focus:ring-1 focus:ring-[var(--color-signal-500)] outline-none transition-shadow"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--ink)] mb-2">
                      {detail.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full h-12 px-4 bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--color-signal-500)] focus:ring-1 focus:ring-[var(--color-signal-500)] outline-none transition-shadow"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--ink)] mb-2">
                      {detail.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full p-4 bg-[var(--paper)] border border-[var(--line)] focus:border-[var(--color-signal-500)] focus:ring-1 focus:ring-[var(--color-signal-500)] outline-none transition-shadow resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full h-12 bg-[var(--ink)] text-white font-medium hover:bg-zinc-800 transition-colors"
                  >
                    {detail.form.submit}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
}

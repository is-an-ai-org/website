import SEO from "@/components/SEO";
import { BlueprintCard } from "@/components/blueprint";

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms for using is-an.ai subdomains, including removal of inactive subdomains and subdomains used for criminal activity."
        url="/terms"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16" lang="en">
        <BlueprintCard className="p-6 sm:p-10" bg="bg-white/90">
          <article className="text-bp-ink text-base leading-relaxed space-y-8">
            <header className="pb-6 border-b border-dashed border-bp-ink/40">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                Terms of Service
              </h1>
              <p className="text-sm">
                Last updated: <time dateTime="2026-09-05">September 5, 2026</time>
              </p>
            </header>

            <section className="space-y-3">
              <h2 className="text-xl font-bold">1. About the service</h2>
              <p>
                is-an.ai provides free subdomains for AI projects. These terms
                govern the use of subdomains provided by is-an.ai, including
                registrations through the website, CLI, API, or GitHub. A
                registration gives you permission to use a subdomain subject to
                these terms; it does not transfer ownership of is-an.ai to you.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold">2. Your responsibilities</h2>
              <p>
                You are responsible for your account, DNS records, and the
                content and services connected to your subdomain. Keep your DNS
                configuration working, use destinations you are authorized to
                use, and comply with applicable law and the rights of others.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold">3. Inactive subdomains</h2>
              <p>
                <strong>
                  We may delete a subdomain that has not been used for at least
                  three consecutive months.
                </strong>{" "}
                Signs of inactivity include missing or incorrect DNS records,
                DNS resolution failures, or a destination that persistently
                returns errors or no longer provides a working service throughout
                that period.
              </p>
              <p>
                We consider the intended use of the subdomain. A single failed
                check, a temporary outage, low traffic, or an intentional
                authentication requirement alone does not establish inactivity.
                A valid non-web use, such as a DNS verification record, does not
                need to serve a public webpage.
              </p>
              <p>
                Before deleting a subdomain for inactivity, we will notify you
                through the contact details available for your account, explain
                the reason, and give you a reasonable opportunity to fix the
                issue or provide evidence of active use.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold">4. Criminal activity</h2>
              <p>
                <strong>
                  We may suspend or delete a subdomain used for criminal
                  activity, regardless of how long it has been registered or
                  active.
                </strong>{" "}
                This includes phishing, fraud, distributing malware, stealing
                credentials, and other unlawful activity. The three-month
                inactivity period does not apply to these cases.
              </p>
              <p>
                We assess reports and available evidence before deciding on
                removal. We may temporarily suspend a subdomain while
                investigating credible reports of criminal use. When necessary
                to prevent ongoing harm or comply with a binding legal request,
                we may act without advance notice and will explain the action
                afterward where legally permitted.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold">5. Removal and review</h2>
              <p>
                Deletion removes the subdomain registration and its associated
                DNS records. Websites and other services that depend on that
                subdomain may become unreachable. You can also stop using the
                service and delete your subdomain from the dashboard.
              </p>
              <p>
                If you believe a suspension or deletion was a mistake, contact{" "}
                <a
                  href="mailto:support@is-an.ai"
                  className="underline underline-offset-2 hover:text-bp-accent"
                >
                  support@is-an.ai
                </a>{" "}
                with your subdomain and supporting information so we can review
                the decision.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold">6. Changes and contact</h2>
              <p>
                We will publish updates to these terms on this page and provide
                advance notice of material changes, including when they take
                effect. Nothing in these terms limits rights or responsibilities
                that cannot be excluded under applicable law.
              </p>
              <p>
                For questions about these terms, contact{" "}
                <a
                  href="mailto:support@is-an.ai"
                  className="underline underline-offset-2 hover:text-bp-accent"
                >
                  support@is-an.ai
                </a>
                . To report abuse, contact{" "}
                <a
                  href="mailto:security@is-an.ai"
                  className="underline underline-offset-2 hover:text-bp-accent"
                >
                  security@is-an.ai
                </a>
                .
              </p>
            </section>
          </article>
        </BlueprintCard>
      </div>
    </>
  );
}

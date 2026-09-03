"use client";

import { Phone, Plus } from "lucide-react";
import Button from "@/components/Button";
import IconSquare from "@/components/IconSquare";
import Section from "@/components/Section";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/components/siteContact";
import { SITE_FAQS, type FaqItem } from "@/lib/faq";
import { useId, useState } from "react";
import {
  RevealGroup,
  RevealItem,
} from "@/components/motion";
import { useReducedMotion } from "motion/react";

const FAQS = SITE_FAQS;

type FAQProps = {
  faqs?: FaqItem[];
  valuationHref?: string;
};

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  reducedMotion: boolean;
  triggerId: string;
  panelId: string;
  onToggle: () => void;
};

function FaqItem({
  question,
  answer,
  isOpen,
  reducedMotion,
  triggerId,
  panelId,
  onToggle,
}: FaqItemProps) {
  return (
    <div
      className={`border-b border-border-primary bg-bg-surface last:border-b-0 ${
        isOpen ? "border-l-2 border-l-red-primary" : "border-l-2 border-l-transparent"
      }`}
    >
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red-primary md:px-6 md:py-5"
          onClick={onToggle}
        >
          <span className="text-base font-semibold tracking-tight text-text-primary md:text-[1.05rem]">
            {question}
          </span>
          <Plus
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 transition-[color,transform] duration-300 ease-out motion-reduce:transition-none ${
              isOpen
                ? "rotate-45 text-red-primary"
                : "rotate-0 text-text-primary"
            }`}
          />
        </button>
      </h3>

      {reducedMotion ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          hidden={!isOpen}
          className="px-5 pb-5 md:px-6 md:pb-6"
        >
          <p className="max-w-prose text-sm leading-relaxed text-text-secondary md:text-[0.95rem]">
            {answer}
          </p>
        </div>
      ) : (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          aria-hidden={!isOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 pt-0 md:px-6 md:pb-6">
              <p className="max-w-prose text-sm leading-relaxed text-text-secondary md:text-[0.95rem]">
                {answer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQ({
  faqs = FAQS,
  valuationHref = "/#valuation",
}: FAQProps) {
  const baseId = useId();
  const reducedMotion = useReducedMotion() ?? false;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" background="black">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-14 xl:gap-16">
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <RevealGroup>
            <RevealItem>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-primary">
                QUESTIONS
              </p>
            </RevealItem>

            <RevealItem>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
                Frequently asked questions
              </h2>
            </RevealItem>

            <RevealItem>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-text-secondary">
                Still have a question? We are happy to help.
              </p>
            </RevealItem>

            <RevealItem>
              <div className="relative mt-8 overflow-hidden rounded-md bg-red-primary p-6 shadow-[0_24px_48px_-20px_rgba(157,13,10,0.55),0_12px_28px_-16px_rgba(0,0,0,0.22)] md:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-red-dark/50 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_100%_100%,rgba(0,0,0,0.22),transparent_55%)]"
                />
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-3 -right-2 h-28 w-28 text-white/[0.05] sm:h-32 sm:w-32"
                  viewBox="0 0 64 32"
                  fill="currentColor"
                >
                  <path d="M4 22c0-1.1.9-2 2-2h3.2l1.4-4.2A3 3 0 0 1 13.4 14H22l2.2 6H38l2.4-5.2a2.5 2.5 0 0 1 2.3-1.5H54a2 2 0 0 1 2 2v1.2a4 4 0 0 1 3.2 3.9l-.4 2.4A3.5 3.5 0 0 1 57.8 24H56v1a2 2 0 0 1-2 2h-1.2a2 2 0 0 1-2-2v-1H13.2v1a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-1H6.2A3.5 3.5 0 0 1 3 20.5l-.4-2.4A4 4 0 0 1 5.8 14V12a2 2 0 0 1 2-2h.2zM14 24.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm32 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <IconSquare icon={Phone} variant="inverse" iconSize={22} />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                        Call us
                      </p>
                      <a
                        href={`tel:${SITE_PHONE_TEL}`}
                        className="mt-2 block text-xl font-bold tracking-tight text-white transition-opacity duration-200 hover:text-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none sm:text-2xl"
                      >
                        {SITE_PHONE_DISPLAY}
                      </a>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        Friendly team, no pressure, no obligation.
                      </p>
                    </div>
                  </div>

                  <Button
                    href={valuationHref}
                    variant="inverse"
                    fullWidth
                    showArrow
                    className="mt-6 px-5"
                  >
                    Get your free valuation
                  </Button>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
        </aside>

        <div className="min-w-0 overflow-hidden rounded-md border border-border-primary bg-bg-surface">
          <RevealGroup>
              {faqs.map((item, index) => {
                const isOpen = openIndex === index;
                const triggerId = `${baseId}-trigger-${index}`;
                const panelId = `${baseId}-panel-${index}`;

                return (
                  <RevealItem key={item.question}>
                    <FaqItem
                      question={item.question}
                      answer={item.answer}
                      isOpen={isOpen}
                      reducedMotion={reducedMotion}
                      triggerId={triggerId}
                      panelId={panelId}
                      onToggle={() =>
                        setOpenIndex((current) =>
                          current === index ? null : index,
                        )
                      }
                    />
                  </RevealItem>
                );
              })}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}

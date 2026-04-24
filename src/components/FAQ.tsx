'use client';

import { useTranslation } from '@/context/LanguageContext';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQ = () => {
    const { t } = useTranslation();

    const faqs = [
        {
            question: t('faq.q2.question'),
            answer: t('faq.q2.answer'),
        },
        {
            question: t('faq.q3.question'),
            answer: t('faq.q3.answer'),
        },
        {
            question: t('faq.q4.question'),
            answer: t('faq.q4.answer'),
        },
        {
            question: t('faq.q1.question'),
            answer: t('faq.q1.answer'),
        },
    ];

    return (
        <section id="faq" className="w-full py-16 md:py-24 relative mt-12 md:mt-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-3/4 h-3/4 bg-sky-500/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />
            <div className="container px-4 md:px-6 mx-auto max-w-3xl relative z-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-white">
                    {t('faq.title')}
                </h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-white/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm shadow-xl overflow-hidden"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-bold text-white px-6 py-5 hover:no-underline hover:bg-white/5 data-[state=open]:bg-white/5 transition-colors">
                                <span dangerouslySetInnerHTML={{ __html: faq.question }} />
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-300 whitespace-pre-wrap text-lg px-6 pb-6 pt-4">
                                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

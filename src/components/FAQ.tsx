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
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                    {t('faq.title')}
                </h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border-none rounded-lg bg-[hsl(205,79%,15%)] overflow-hidden"
                        >
                            <AccordionTrigger className="text-left text-lg md:text-xl font-bold text-white px-6 py-5 hover:no-underline hover:bg-white/5 data-[state=open]:bg-white/5 transition-colors">
                                <span dangerouslySetInnerHTML={{ __html: faq.question }} />
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400 whitespace-pre-wrap text-lg px-6 pb-6 pt-4">
                                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

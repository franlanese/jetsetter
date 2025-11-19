'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Plane, History, Code , BadgePercent, SearchCheck} from 'lucide-react';
import { LanguageProvider, useTranslation } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

import { DemoRequestDialog } from '@/components/DemoRequestDialog';

const PresentationPageContent = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <LanguageSwitcher />
      {/* Hero Section - Overlay and text colors are already dark-theme friendly */}
      <section className="relative w-full py-20 md:py-28 lg:py-36 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <Image
          src="/images/jetinterior.jpg"
          alt="Interior de jet privado de lujo"
          fill
          objectFit="cover"
          className="opacity-20"
          priority
        />
        <div className="relative z-20 max-w-3xl mx-auto px-4">
          <Image
            src="/images/aera2.png"
            alt="Interior de jet privado de lujo"
            width={200}
            height={200}
            className='mx-auto'
          />
          <h1 className="text-5xl font-bold text-white mb-4">
            {t('welcomeTitle')}
          </h1>
          <p className="text-xl text-gray-200">
            {t('welcomeSubtitle')}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* New Section */}
        <section className="mb-20">
          <Card className="max-w-4xl mx-auto bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-center">Aera es una Plataforma web para clientes y un Panel de Control para administradores. Modular y escalable.</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
              Permite a tus clientes solicitar vuelos y visualizar empty Legs y realizar pagos. Ademas adquiere la posibilidad de publicar y difundir empty Legs, tanto a clientes como a potenciales interesados.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Features Section - Adjust card background for contrast */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t('featuresTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow bg-secondary/50">
              <CardHeader>
                <SearchCheck className="mx-auto h-12 w-12 text-blue-400 mb-4" />
                <CardTitle>{t('feature1Title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {t('feature1Text')}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow bg-secondary/50">
              <CardHeader>
                <BadgePercent className="mx-auto h-12 w-12 text-green-400 mb-4" />
                <CardTitle>{t('feature2Title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {t('feature2Text')}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow bg-secondary/50">
              <CardHeader>
                <History className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                <CardTitle>{t('feature3Title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {t('feature3Text')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section - Text will inherit foreground color */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-lg mb-8">
            {t('ctaSubtitle')}
          </p>
          <DemoRequestDialog>
            <Button style={{ width:250, height: 60, fontSize: 20}}>
              {t('ctaButton')}
            </Button>
          </DemoRequestDialog>
        </section>

        {/* Technology Stack Section - Adjust card and badge colors */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            {t('techTitle')}
          </h2>
          <Card className="max-w-4xl mx-auto bg-secondary/50">
            <CardHeader>
              <Code className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <CardTitle className="text-center">{t('techSubtitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-lg mb-6">
                {t('techText')}
              </p>
              <div className="flex justify-center flex-wrap gap-4">
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">Next.js</span>
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">React</span>
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">TypeScript</span>
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">Tailwind CSS</span>
                <span className="bg-muted text-muted-foreground text-sm font-medium me-2 px-2.5 py-0.5 rounded">Genkit AI</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer - Remove explicit background, let it inherit */}
      <footer className="text-center p-6 border-t">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Aera. {t('footerRights')}</p>
      </footer>
    </div>
  );
};

const PresentationPage = () => {
  return (
    <LanguageProvider>
      <PresentationPageContent />
    </LanguageProvider>
  );
};

export default PresentationPage;

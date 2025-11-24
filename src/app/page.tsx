'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Plane, History, Code, BadgePercent, SearchCheck, LayoutDashboard, Monitor, Mail, Calculator, UserCheck, Globe, Blocks } from 'lucide-react';
import { LanguageProvider, useTranslation } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { DemoRequestDialog } from '@/components/DemoRequestDialog';
import CardNav, { CardNavItem } from '@/components/NavBar';
import GradientText from '@/components/GradientText';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const PresentationPageContent = () => {
  const { t } = useTranslation();
  const [paginationEl, setPaginationEl] = useState<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [swiper, setSwiper] = useState<any>(null);

  const handleHeaderClick = (index: number) => {
    setSelectedIndex(index);
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  const navItems: CardNavItem[] = [
    {
      label: 'Por qué Aera?',
      bgColor: '#e0f2fe', // light blue
      textColor: '#0f172a',
      links: [
        { label: 'Funcionalidades', href: '#features', ariaLabel: 'Funcionalidades' },
        { label: 'Precios', href: '#', ariaLabel: 'Precios' },
        { label: 'Ver Demo', href: '#demo', ariaLabel: 'Ver Demo' },
      ],
    },
    {
      label: 'Compañía',
      bgColor: '#f0fdf4', // light green
      textColor: '#0f172a',
      links: [
        { label: 'Sobre Nosotros', href: '#powered-by-zonodev', ariaLabel: 'Sobre Nosotros' },
        { label: 'Linkedin', href: 'https://www.linkedin.com/company/zonodev/', ariaLabel: 'Linkedin', target: '_blank' },
        { label: 'Contacto', href: '#powered-by-zonodev', ariaLabel: 'Contacto' },
      ],
    },

  ];

  const features = [
    {
      icon: <LayoutDashboard className="mx-auto h-12 w-12 text-blue-400 mb-4" />,
      title: "Panel de Control",
      description: "Publica viajes, Gestionar flota y Obtene estadisticas y analisis de tu empresa en tiempo real. "
    },
    {
      icon: <Monitor className="mx-auto h-12 w-12 text-green-400 mb-4" />,
      title: "Plataforma para Clientes",
      description: "Solicitar Vuelos, Visualizar Empty Legs y Realizar Pagos. Diseño profesional y exclusivo hecho para tu empresa."
    },
    {
      icon: <Mail className="mx-auto h-12 w-12 text-purple-400 mb-4" />,
      title: "Email Marketing para Empty Legs",
      description: "Permite enviar comunicaciones personalizadas sobre vuelos Empty Legs, optimizando la difusión y el alcance comercial."
    },
    {
      icon: <Calculator className="mx-auto h-12 w-12 text-orange-400 mb-4" />,
      title: "Automatización de presupuestos",
      description: "Genera presupuestos de vuelos de forma automática, aplicando los parámetros de la empresa para asegurar rapidez, precisión y eficiencia en cada cotización."
    },
    {
      icon: <UserCheck className="mx-auto h-12 w-12 text-red-400 mb-4" />,
      title: "Validar registros de clientes",
      description: "Validá los registros de clientes mediante SMS, correo electrónico o WhatsApp, garantizando, autenticidad y confiabilidad en la información ingresada."
    },
    {
      icon: <Globe className="mx-auto h-12 w-12 text-teal-400 mb-4" />,
      title: "Traducción Multilingüe",
      description: "Ofrece tus servicios en diferentes idiomas, facilitando el alcance a mercados internacionales."
    },
    {
      icon: <Blocks className="mx-auto h-12 w-12 text-indigo-400 mb-4" />,
      title: "Escalable y Modular",
      description: "Posibilidad de futuras ampliaciones funcionales y personalización de diseño."
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="top-nav-row">
        <div className="nav-side-box" style={{ backgroundColor: 'hsl(205, 79%, 7%)', padding: '0 1rem' }}>
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Image
              src="/images/aera2.png"
              alt="Aera Logo"
              width={32}
              height={32}
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>
        <CardNav
          items={navItems}
          baseColor="hsl(205, 79%, 7%)"
          menuColor="hsl(45, 48%, 91%)"
          buttonBgColor="hsl(45, 48%, 91%)"
          buttonTextColor="hsl(205, 79%, 7%)"
          languageSelector={<LanguageSwitcher />}
        />
      </div>
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
          <Card className="max-w-6xl mx-auto bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-center text-4xl leading-tight">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  onClick={() => handleHeaderClick(0)}
                  isActive={selectedIndex === 0}
                  isDimmed={selectedIndex !== null && selectedIndex !== 0}
                >
                  Aera es una Plataforma web para Clientes.
                </GradientText>

                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  onClick={() => handleHeaderClick(1)}
                  isActive={selectedIndex === 1}
                  isDimmed={selectedIndex !== null && selectedIndex !== 1}
                >
                  Aera es un Panel de Control para Administradores.
                </GradientText>

                <GradientText
                  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                  onClick={() => handleHeaderClick(2)}
                  isActive={selectedIndex === 2}
                  isDimmed={selectedIndex !== null && selectedIndex !== 2}
                >
                  Aera es Modular y Escalable.
                </GradientText>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                onSwiper={(swiper) => setSwiper(swiper)}
                onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
                className="w-full h-[400px] rounded-lg"
              >
                <SwiperSlide className="relative w-full h-full">
                  <Image
                    src="/images/jetinterior.jpg"
                    alt="Plataforma Web"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold px-4 text-center">
                      Solicita vuelos, visualiza Empty Legs y realiza pagos de forma sencilla.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="relative w-full h-full">
                  <Image
                    src="/images/Learjet-60xr.png"
                    alt="Panel de Control"
                    fill
                    className="object-contain bg-slate-900 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold px-4 text-center">
                      Gestiona tu flota, publica viajes y obtén estadísticas en tiempo real.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="relative w-full h-full">
                  <Image
                    src="/images/Cessna-citation-xls+.png"
                    alt="Modular y Escalable"
                    fill
                    className="object-contain bg-slate-900 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <p className="text-white text-2xl font-bold px-4 text-center">
                      Adapta la plataforma a tus necesidades y crece sin límites.
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </CardContent>
          </Card>
        </section>

        {/* Features Section - Adjust card background for contrast */}
        <section className="mb-20 scroll-mt-28" id="features">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t('featuresTitle')}
          </h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, el: paginationEl }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            className="pb-16"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <Card className="h-full flex flex-col text-center hover:shadow-lg transition-shadow bg-secondary/50">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center mt-8" ref={setPaginationEl} />
        </section>

        {/* CTA Section - Text will inherit foreground color */}
        <section className="text-center mb-20 scroll-mt-28" id="demo">
          <h2 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-lg mb-8">
            {t('ctaSubtitle')}
          </p>
          <DemoRequestDialog>
            <Button style={{ width: 250, height: 60, fontSize: 20 }}>
              {t('ctaButton')}
            </Button>
          </DemoRequestDialog>
        </section>

        {/* Powered by Zonodev Section */}
        <section className="mb-10 scroll-mt-28" id="powered-by-zonodev">
          <Card className="max-w-4xl mx-auto bg-secondary/50">
            <CardHeader>
              <img src="https://zonodev.ar/favicon.ico" alt="Zonodev Logo" className="mx-auto h-12 w-12 mb-4" />
              <CardTitle className="text-center">Powered by Zonodev</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-lg">
                Aera es nuestra plataforma de gestion en que la plasmamos nuestra experiencia y creatividad.
                <br />
                Un desarrollo de <a href="https://zonodev.ar" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">zonodev.ar </a> {'  <3'}
              </p>
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

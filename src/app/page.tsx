'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Rocket, Plane, History, Code, BadgePercent, SearchCheck, LayoutDashboard, Monitor, Mail, Calculator, UserCheck, Globe, Blocks, Linkedin, ChevronLeft, ChevronRight, Loader2, Send } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { DemoRequestDialog } from '@/components/DemoRequestDialog';
import { useToast } from "@/hooks/use-toast";
import CardNav, { CardNavItem } from '@/components/NavBar';
import GradientText from '@/components/GradientText';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import DotGrid from '@/components/DotGridBG';
import { ImageViewerDialog } from '@/components/ImageViewerDialog';
import { FAQ } from '@/components/FAQ';

const PresentationPageContent = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: '', alt: '' });

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHeaderClick = (index: number) => {
    setSelectedIndex(index);
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
    setImageViewerOpen(true);
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("contacto@zonodev.ar");
    toast({
      title: "Email copiado",
      description: "La dirección de email ha sido copiada al portapapeles.",
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/nextapi/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Gracias por contactarnos. Te responderemos pronto.",
        });
        // Clear form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Hubo un problema al enviar el mensaje.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems: CardNavItem[] = [
    {
      label: t('nav.whyAera'),
      bgColor: 'hsl(45, 48%, 91%)',
      textColor: 'hsl(205, 79%, 7%)',
      links: [
        { label: t('nav.features'), href: '#features', ariaLabel: 'Funcionalidades' },
        { label: t('nav.demo'), href: '#demo', ariaLabel: 'Ver Demo' }
      ]
    },
    {
      label: t('nav.company'),
      bgColor: 'hsl(190, 60%, 92%)',
      textColor: 'hsl(205, 79%, 7%)',
      links: [
        { label: t('nav.aboutUs'), href: 'https://zonodev.ar/', ariaLabel: 'Sobre Nosotros', target: '_blank' },
        { label: 'Linkedin', href: 'https://www.linkedin.com/company/zonodev/', ariaLabel: 'Linkedin', target: '_blank' },
        { label: t('nav.contact'), href: '#powered-by-zonodev', ariaLabel: 'Contacto' }
      ]
    }
  ];

  const features = [
    {
      icon: <LayoutDashboard className="mx-auto h-12 w-12 text-blue-400 mb-4" />,
      title: t('features.dashboard.title'),
      description: t('features.dashboard.desc')
    },
    {
      icon: <Monitor className="mx-auto h-12 w-12 text-green-400 mb-4" />,
      title: t('features.clientPlatform.title'),
      description: t('features.clientPlatform.desc')
    },
    {
      icon: <Mail className="mx-auto h-12 w-12 text-purple-400 mb-4" />,
      title: t('features.emailMarketing.title'),
      description: t('features.emailMarketing.desc')
    },
    {
      icon: <Calculator className="mx-auto h-12 w-12 text-orange-400 mb-4" />,
      title: t('features.budgetAutomation.title'),
      description: t('features.budgetAutomation.desc')
    },
    {
      icon: <UserCheck className="mx-auto h-12 w-12 text-red-400 mb-4" />,
      title: t('features.clientValidation.title'),
      description: t('features.clientValidation.desc')
    },
    {
      icon: <Globe className="mx-auto h-12 w-12 text-teal-400 mb-4" />,
      title: t('features.multilingual.title'),
      description: t('features.multilingual.desc')
    },
    {
      icon: <Blocks className="mx-auto h-12 w-12 text-indigo-400 mb-4" />,
      title: t('features.scalable.title'),
      description: t('features.scalable.desc')
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
          onDemoClick={() => setIsDemoDialogOpen(true)}
        />
      </div>
      {/* Hero Section - Overlay and text colors are already dark-theme friendly */}
      <section className="relative w-full pt-20 pb-32 md:pt-32 md:pb-48 lg:pt-40 lg:pb-64 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-110 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-20 z-10"></div>
        <div className="absolute inset-0 overflow-hidden z-0">
          <DotGrid
            baseColor="#385fad"
            activeColor="#d2d2bc"
            dotSize={6}
            gap={35}
            proximity={130}
            shockRadius={200}
            resistance={600}
            returnDuration={1}
          />
        </div>
        <div className="relative z-20 max-w-3xl mx-auto px-4">
          <div className="relative inline-block mb-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-black/50 blur-3xl -z-10 rounded-full"></div>
            <Image
              src="/images/aera2.png"
              alt="Interior de jet privado de lujo"
              width={200}
              height={200}
              className='mx-auto relative z-10'
            />
          </div>
          <div className="relative inline-block max-w-2xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-black/50 blur-3xl -z-10 rounded-full"></div>
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-md">
              {t('welcomeTitle')}
            </h1>
            <p className="text-xl text-gray-200 drop-shadow-md">
              {t('welcomeSubtitle')}
            </p>
          </div>
        </div>
      </section>

      <main className="w-full">
        <div className="container mx-auto px-4 py-12">
          {/* New Section */}
          <section className="mb-20">
            <Card className="max-w-6xl mx-auto bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-center text-2xl md:text-3xl lg:text-4xl leading-tight">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    onClick={() => handleHeaderClick(0)}
                    isActive={selectedIndex === 0}
                    isDimmed={selectedIndex !== null && selectedIndex !== 0}
                  >
                    {t('hero.passengerPlatform')}
                  </GradientText>

                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    onClick={() => handleHeaderClick(1)}
                    isActive={selectedIndex === 1}
                    isDimmed={selectedIndex !== null && selectedIndex !== 1}
                  >
                    {t('hero.adminPanel')}
                  </GradientText>

                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    onClick={() => handleHeaderClick(2)}
                    isActive={selectedIndex === 2}
                    isDimmed={selectedIndex !== null && selectedIndex !== 2}
                  >
                    {t('hero.modular')}
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
                  className="w-full aspect-[1920/911] rounded-lg"
                >
                  <SwiperSlide className="relative w-full h-full">
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => handleImageClick('/images/CapturaDemo1.2.png', 'Plataforma Web')}
                    >
                      <Image
                        src="/images/CapturaDemo1.2.png"
                        alt="Plataforma Web"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="relative w-full h-full">
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => handleImageClick('/images/CapturaPanelControl.png', 'Panel de Control')}
                    >
                      <Image
                        src="/images/CapturaPanelControl.png"
                        alt="Panel de Control"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="object-contain bg-slate-900 rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="relative w-full h-full">
                    <div
                      className="relative w-full h-full cursor-pointer"
                      onClick={() => handleImageClick('/images/Cessna-citation-xls+.png', 'Modular y Escalable')}
                    >
                      <Image
                        src="/images/Cessna-citation-xls+.png"
                        alt="Modular y Escalable"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="object-contain bg-slate-900 rounded-lg"
                      />
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
            <div className="relative group px-4 md:px-12">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                navigation={{
                  prevEl: '.features-swiper-button-prev',
                  nextEl: '.features-swiper-button-next',
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
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
                      <CardContent className="flex-grow flex flex-col justify-center">
                        <p>
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button
                className="features-swiper-button-prev absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 z-10 p-2 rounded-full bg-background/80 shadow-md hover:bg-background transition-colors hidden md:block"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="features-swiper-button-next absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 z-10 p-2 rounded-full bg-background/80 shadow-md hover:bg-background transition-colors hidden md:block"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </section>
        </div>

        {/* CTA Section - Text will inherit foreground color */}
        <section className="py-16 mb-20 scroll-mt-28 bg-[hsl(45,48%,91%)] text-[hsl(205,79%,7%)]" id="demo">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              {/* Left Column: Image */}
              <div className="relative md:-mt-24 z-10 flex justify-center md:justify-end">
                <Image
                  src="/images/PhoneScreenshot.webp"
                  alt="App Screenshot"
                  width={350}
                  height={600}
                  className="w-full max-w-[350px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Right Column: Text */}
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('ctaTitle')}</h2>
                <p className="text-lg mb-8 max-w-lg">
                  {t('ctaSubtitle')}
                </p>
                <DemoRequestDialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
                  <Button
                    style={{ width: 250, height: 60, fontSize: 20 }}
                    className="bg-[hsl(205,79%,7%)] text-[hsl(45,48%,91%)] hover:bg-[hsl(205,79%,7%)]/90"
                  >
                    {t('ctaButton')}
                  </Button>
                </DemoRequestDialog>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        <div className="container mx-auto px-4 pb-12">

          {/* Powered by Zonodev Section */}
          <section className="mb-10 scroll-mt-28" id="powered-by-zonodev">
            <Card className="max-w-6xl mx-auto bg-secondary/50">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  {/* Left Column: Branding */}
                  <div className="flex flex-col items-center space-y-6 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative h-40 w-40 rounded-full overflow-hidden shadow-md border-4 border-white/10">
                        <Image
                          src="/images/zonodevBG.png"
                          alt="Zonodev Logo"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-3xl font-bold">{t('poweredBy.title')}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {t('poweredBy.desc')}
                      <br />
                      {t('poweredBy.devBy')} <a href="https://zonodev.ar" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">zonodev.ar </a> {'  <3'}
                    </p>
                  </div>

                  {/* Right Column: Contact Form */}
                  <div className="md:bg-background/50 md:p-6 md:rounded-xl md:border md:shadow-sm">
                    <h4 className="text-xl font-semibold mb-6 flex items-center justify-center md:justify-start gap-2">
                      <Mail className="w-5 h-5" />
                      {t('contact.title')}
                    </h4>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t('contact.name')}</Label>
                          <Input
                            id="name"
                            placeholder="Tu nombre"
                            className="placeholder:text-muted-foreground/30"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('contact.email')}</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            className="placeholder:text-muted-foreground/30"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">{t('contact.company')}</Label>
                        <Input
                          id="company"
                          placeholder="Nombre de tu empresa"
                          className="placeholder:text-muted-foreground/30"
                          value={formData.company}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t('contact.message')}</Label>
                        <Textarea
                          id="message"
                          placeholder="Escribe tu mensaje aquí..."
                          className="min-h-[120px] resize-none placeholder:text-muted-foreground/30"
                          value={formData.message}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full text-lg py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('contact.submitting')}
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            {t('contact.submit')}
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main >

      {/* Footer */}
      < footer className="bg-secondary/30 border-t pt-16 pb-8" >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/aera2.png"
                  alt="Aera Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-xl font-bold">Aera</span>
              </div>
              <p className="text-muted-foreground text-sm">
                {t('footer.brandDesc')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.product')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">{t('nav.features')}</a></li>
                <li><a href="#demo" className="hover:text-primary transition-colors">{t('nav.demo')}</a></li>
              </ul>
            </div>

            {/* Soporte Técnico */}
            <div>
              <h3 className="font-semibold mb-4">{t('footer.support')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a
                  href="https://api.whatsapp.com/send/?phone=5493417568545&text=Hola%2C+me+gustar%C3%ADa+saber+m%C3%A1s+sobre+sus+servicios.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors">WhatsApp</a></li>
                <li><a
                  href="#"
                  onClick={handleEmailClick}
                  className="hover:text-primary transition-colors">Email</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="font-semibold">{t('footer.connect')}</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/zonodev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://zonodev.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="Website"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
              <DemoRequestDialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
                <Button className="w-full">
                  {t('nav.getStarted')}
                </Button>
              </DemoRequestDialog>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Zonodev. {t('footerRights')}</p>
          </div>
        </div>
      </footer >
      <ImageViewerDialog
        src={selectedImage.src}
        alt={selectedImage.alt}
        open={imageViewerOpen}
        onOpenChange={setImageViewerOpen}
      />
    </div >
  );
};

const PresentationPage = () => {
  return (
    <PresentationPageContent />
  );
};

export default PresentationPage;

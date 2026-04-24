'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { checkDemoCookie } from '@/app/actions';
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
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';
import DotGrid from '@/components/DotGridBG';
import { ImageViewerDialog } from '@/components/ImageViewerDialog';
import { FAQ } from '@/components/FAQ';
import Video1 from "@/components/VideoComponent"
import VideoComponent from '@/components/VideoComponent';

const PresentationPageContent = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [desktopSwiper, setDesktopSwiper] = useState<any>(null);
  const [mobileSwiper, setMobileSwiper] = useState<any>(null);
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: '', alt: '' });
  const [demoUnlocked, setDemoUnlocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkDemoCookie().then(setDemoUnlocked);
  }, []);

  const handleDemoRequest = () => {
    if (demoUnlocked) {
      router.push('/demo');
    } else {
      setIsDemoDialogOpen(true);
    }
  };

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

    // Desktop logic
    if (desktopSwiper) {
      const targetSlide = index * 3;
      desktopSwiper.slideTo(targetSlide);
    }

    // Mobile logic
    if (mobileSwiper) {
      // 0 -> 0 (Pasajeros start)
      // 1 -> 2 (Admin start: Slide 0 is Stacked Pasajeros, Slide 1 is Web Pasajeros)
      // 2 -> 4 (Modular start: Slide 2 is Stacked Admin, Slide 3 is Web Admin)
      const targetSlide = index === 0 ? 0 : index === 1 ? 2 : 4;
      mobileSwiper.slideTo(targetSlide);
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
        { label: t('nav.demo'), href: '#demo', ariaLabel: 'Ver Demo' },
        { label: t('nav.faq'), href: '#faq', ariaLabel: 'FAQ' }
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
          onDemoClick={handleDemoRequest}
        />
      </div>
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 text-center overflow-x-clip">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-100 z-10"></div>
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/20 blur-[120px] rounded-full pointer-events-none z-10 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-10 mix-blend-screen" />

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
        <div className="relative z-20 max-w-4xl mx-auto px-4 flex flex-col items-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(14,165,233,0.2)]">
            <Rocket className="w-4 h-4" />
            <span>El software de gestión #1 para aviación privada</span>
          </div>

          <div className="relative inline-block mb-10 transition-transform duration-700 hover:scale-110">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-sky-500/20 blur-3xl -z-10 rounded-full animate-pulse"></div>
            <Image
              src="/images/aera2.png"
              alt="Logo Aera"
              width={180}
              height={180}
              className="mx-auto relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            />
          </div>

          <div className="relative inline-block w-full">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 mb-8 tracking-tight drop-shadow-2xl">
              {t('welcomeTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
              {t('welcomeSubtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 w-full sm:w-auto">
            <Button
              onClick={handleDemoRequest}
              className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white px-8 py-7 rounded-full text-lg shadow-[0_0_40px_rgba(14,165,233,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(14,165,233,0.6)] border-0"
            >
              Agendar Demo
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-7 rounded-full text-lg border-white/10 hover:bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 bg-slate-900/50"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Descubrir Funciones
            </Button>
          </div>
        </div>
      </section>

      <main className="w-full">
        <div className="container mx-auto px-4 py-12">
          {/* New Section */}
          <section className="py-16 md:py-24 relative">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-3/4 h-3/4 bg-sky-500/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center">
              {/* Título solo para móvil */}
              <div className="lg:hidden flex flex-col justify-center items-center space-y-4 px-4 md:px-0 order-1 mt-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit text-sm font-medium">
                  <SearchCheck className="w-4 h-4" />
                  <span>Optimización de conversión</span>
                </div>
                <h2 className="text-center text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                  Convierte visitas en <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">vuelos reales</span>
                </h2>
              </div>

              {/* Text Content */}
              <div className="order-3 lg:order-2 lg:col-span-5 flex flex-col justify-center space-y-6 relative z-20 px-4 md:px-0 mt-2 lg:mt-0">
                <div className="hidden lg:flex flex-col space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit text-sm font-medium">
                    <SearchCheck className="w-4 h-4" />
                    <span>Optimización de conversión</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] md:leading-[1.1]">
                    Convierte visitas en <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">vuelos reales</span>
                  </h2>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                  Un flujo simple para que cada consulta llegue clara, rápida y accionable a tu equipo de ventas.
                </p>

                {/* Feature list */}
                <ul className="space-y-4 mt-4">
                  {['Cotizaciones instantáneas', 'Gestión de leads integrada', 'Sin intermediarios'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-200">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center">
                        <SearchCheck className="w-3 h-3 text-sky-400" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bento Video Container */}
              <div className="lg:col-span-7 relative order-2 lg:order-1 px-4 md:px-8 lg:px-0 mt-8 lg:mt-0">
                {/* Main Video Box */}
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-sm z-10 p-2 md:p-3">
                  <div className="rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 border border-white/10 rounded-2xl z-10 pointer-events-none"></div>
                    <VideoComponent videoUrl={"video1.mp4"} />
                  </div>
                </div>

                {/* Floating Card 1: Top Left */}
                {/*<div className="absolute -top-6 -left-2 md:-top-8 md:-left-8 z-20 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4 transform transition duration-500 hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <BadgePercent className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-400 font-medium">Tasa de Cierre</p>
                    <p className="text-lg md:text-xl font-bold text-white">+45%</p>
                  </div>
                </div>*/}

                {/* Floating Card 2: Bottom Right */}
                {/*<div className="absolute -bottom-6 -right-2 md:-bottom-8 md:-right-8 z-20 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4 transform transition duration-500 hover:-translate-y-2">
                  <div className="flex -space-x-3">
                    {[
                      '/images/UserPhoto1.webp',
                      '/images/UserPhoto2.webp',
                      '/images/AdminPhoto1.webp'
                    ].map((src, i) => (
                      <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden relative">
                        <Image src={src} alt="User" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-white">Nuevos leads</p>
                    <p className="text-[10px] md:text-xs text-sky-400">En tiempo real</p>
                  </div>
                </div>
                */}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 relative mt-12 md:mt-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-3/4 h-3/4 bg-sky-500/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-16 items-center">

              {/* Título solo para móvil */}
              <div className="lg:hidden flex flex-col justify-center items-center space-y-6 px-4 md:px-0 order-1 mt-2 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit text-sm font-medium">
                  <Plane className="w-4 h-4" />
                  <span>Red de Empty Legs</span>
                </div>
                <h2 className="text-center text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                  La visibilidad que tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">empty legs</span> necesitan
                </h2>
              </div>

              {/* Bento Video Container */}
              <div className="lg:col-span-7 relative px-4 md:px-8 lg:px-0 mt-8 lg:mt-0 order-2 lg:order-1">
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-sm z-10 p-2 md:p-3">
                  <div className="rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 border border-white/10 rounded-2xl z-10 pointer-events-none"></div>
                    <VideoComponent videoUrl={"video2.mp4"} />
                  </div>
                </div>

                {/* Floating Card: Bottom Left */}
                {/*<div className="absolute -bottom-6 -left-2 md:-bottom-8 md:-left-8 z-20 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 md:p-5 rounded-2xl shadow-xl w-[200px] md:w-xs transform transition duration-500 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-slate-400 font-medium">Vuelo Disponible</p>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] md:text-xs font-bold animate-pulse">EN VIVO</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <span className="font-bold text-sm md:text-base">BUE</span>
                    <Plane className="w-3 h-3 md:w-4 md:h-4 text-slate-500" />
                    <span className="font-bold text-sm md:text-base">MIA</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-emerald-400 mt-2 font-medium">Publicado hace 5 min</p>
                </div>
                */}
                {/* Floating Card: Top Right */}
                {/*<div className="absolute -top-6 -right-2 md:-top-8 md:-right-8 z-20 bg-slate-900/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-4 transform transition duration-500 hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Globe className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-400 font-medium">Alcance Global</p>
                    <p className="text-lg md:text-xl font-bold text-white">24/7</p>
                  </div>
                </div>
                */}
              </div>

              {/* Text Content */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6 relative z-20 px-4 md:px-0 order-3 lg:order-none mt-2 lg:mt-0">
                <div className="hidden lg:flex flex-col space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit text-sm font-medium">
                    <Plane className="w-4 h-4" />
                    <span>Red de Empty Legs</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] md:leading-[1.1]">
                    La visibilidad que tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">empty legs</span> necesitan
                  </h2>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
                  Publica tus vuelos disponibles y llega a miles de pasajeros que buscan exactamente lo que ofreces, minimizando los vuelos en vacío.
                </p>

                <ul className="space-y-4 mt-4">
                  {['Integración automática', 'Notificaciones a pasajeros', 'Mayor rentabilidad'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-200">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center">
                        <Plane className="w-3 h-3 text-sky-400" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </section>
          {/* Features Section */}
          <section className="mb-20 scroll-mt-28 relative mt-12 md:mt-20" id="features">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-3/4 h-3/4 bg-sky-500/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />
            <h2 className="text-4xl font-bold text-center mb-12 relative z-10 text-white">
              {t('featuresTitle')}
            </h2>
            <div className="relative group px-4 md:px-12 z-10">
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
                  <SwiperSlide key={index} className="!h-auto p-2">
                    <div className="h-full flex flex-col text-center hover:shadow-2xl transition-all duration-300 rounded-[2rem] border border-white/10 bg-slate-900/50 backdrop-blur-sm p-6 md:p-8 group hover:-translate-y-1">
                      <div className="mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                      <div className="flex-grow flex flex-col justify-center">
                        <p className="text-slate-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
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

        {/* CTA Section */}
        <section className="py-16 mb-20 scroll-mt-28 bg-[hsl(45,48%,91%)] text-[hsl(205,79%,7%)] relative" id="demo">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              {/* Left Column: Image */}
              <div className="relative md:-mt-24 z-10 flex justify-center md:justify-end">
                <Image
                  src="/images/PhoneScreenshot.webp"
                  alt="App Screenshot"
                  width={350}
                  height={600}
                  className="w-full max-w-[280px] md:max-w-[380px] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Right Column: Text */}
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('ctaTitle')}</h2>
                <p className="text-lg mb-8 max-w-lg opacity-90">
                  {t('ctaSubtitle')}
                </p>
                <Button
                  style={{ width: 250, height: 60, fontSize: 20 }}
                  className="bg-[hsl(205,79%,7%)] text-[hsl(45,48%,91%)] hover:bg-[hsl(205,79%,7%)]/90 shadow-xl border-0"
                  onClick={handleDemoRequest}
                >
                  {t('ctaButton')}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        <div className="container mx-auto px-4 pb-12">

          {/* Powered by Zonodev Section */}
          <section className="mb-10 scroll-mt-28 relative mt-12 md:mt-20" id="powered-by-zonodev">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-3/4 h-3/4 bg-sky-500/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-sm z-10 p-8 md:p-12 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Column: Branding */}
                <a
                  href="https://zonodev.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-6 text-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative h-40 w-40 rounded-full overflow-hidden shadow-md border-4 border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(56,95,173,0.6)] group-hover:border-sky-500/50">
                      <Image
                        src="/images/zonodevBG.png"
                        alt="Zonodev Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-3xl font-bold group-hover:text-sky-400 text-white transition-colors">{t('poweredBy.title')}</h3>
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed max-w-lg mx-auto group-hover:text-white transition-colors">
                    {t('poweredBy.desc')}
                  </p>
                </a>

                {/* Right Column: Contact Form */}
                <div className="md:bg-slate-800/50 md:p-8 md:rounded-[2rem] md:border md:border-white/10 md:shadow-xl">
                  <h4 className="text-xl font-semibold mb-6 flex items-center justify-center md:justify-start gap-2 text-white">
                    <Mail className="w-5 h-5" />
                    {t('contact.title')}
                  </h4>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-200">{t('contact.name')}</Label>
                        <Input
                          id="name"
                          placeholder="Tu nombre"
                          className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-200">{t('contact.email')}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-slate-200">{t('contact.company')}</Label>
                      <Input
                        id="company"
                        placeholder="Nombre de tu empresa"
                        className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
                        value={formData.company}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-200">{t('contact.message')}</Label>
                      <Textarea
                        id="message"
                        placeholder="Escribe tu mensaje aquí..."
                        className="min-h-[120px] resize-none bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-sky-500"
                        value={formData.message}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-lg py-6 bg-sky-500 hover:bg-sky-600 text-white border-0 shadow-lg"
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
            </div>
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
              <Button className="w-full" onClick={handleDemoRequest}>
                {t('nav.getStarted')}
              </Button>
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
      <DemoRequestDialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
        <span className="hidden"></span>
      </DemoRequestDialog>
    </div >
  );
};

const PresentationPage = () => {
  return (
    <PresentationPageContent />
  );
};

export default PresentationPage;

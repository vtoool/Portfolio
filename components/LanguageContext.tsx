"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en' | 'ro';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const enMessages = {
  navbar: {
    portfolio: "Portfolio",
    services: "Services",
    about: "About",
    "let'sTalk": "Let's Talk"
  },
  hero: {
    availability: "Available for new projects",
    headline: "Turn Manual Operations Into {highlight}",
    highlight: "Revenue Engines.",
    bookCall: "Book a Discovery Call",
    viewProjects: "View Projects",
    toolsSection: "Tools I Work With",
    aboutMe: "Hi, I'm Victor. I'm a developer, a student, and a creative at heart. I focus on building software that solves actual business problems. My work ranges from creating booking systems for local service providers to developing specialized SaaS tools for the logistics industry. I use my background in sales to ensure that everything I build drives results, regardless of the project size. When I'm not coding, I recharge by playing the guitar and traveling to find new inspiration.",
    formMode: "Form Mode",
    dragMode: "Drag Mode"
  },
  portfolio: {
    sectionLabel: "Portfolio",
    featuredWork: "Featured Work",
    featuredWorkDesc: "A selection of internal tools, automation systems, and SaaS products."
  },
  services: {
    sectionLabel: "Services"
  },
  about: {
    sectionLabel: "About"
  },
  trust: {
    title: "What Clients Say",
    readyToAutomate: "Ready to automate your growth?",
    discussText: "Let's discuss how we can streamline your operations and build tools that scale with your business.",
    bookCall: "Book a Call",
    hireMe: "Hire Me"
  },
  project: {
    backToPortfolio: "Back to Portfolio",
    techStack: "Tech Stack",
    theStory: "The Story",
    readyToBuild: "Ready to build something similar?",
    applyPrinciples: "Let's discuss how we can apply these principles to your business and create a revenue engine tailored to your needs.",
    bookDiscoveryCall: "Book a Discovery Call",
    visitLiveSite: "Visit Live Site"
  },
  trustMetrics: {
    projectsDelivered: "Projects Delivered",
    hoursSaved: "Hours Saved",
    clientROI: "Client ROI",
    responseTime: "Response Time"
  }
};

const roMessages = {
  navbar: {
    portfolio: "Portofoliu",
    services: "Servicii",
    about: "Despre",
    "let'sTalk": "Să Discutăm"
  },
  hero: {
    availability: "Disponibil pentru proiecte noi",
    headline: "Transform Operațiunile Manuale în {highlight}",
    highlight: "Motoare de Venituri.",
    bookCall: "Rezervă o Discuție de Descoperire",
    viewProjects: "Vezi Proiectele",
    toolsSection: "Tehnologii cu care Lucrez",
    aboutMe: "Salut, sunt Victor. Sunt dezvoltator, student și o persoană creativă. Mă concentrez pe construirea de software care rezolvă probleme reale de business. Activitatea mea variază de la sisteme de programări pentru prestatori de servicii locali, până la platforme SaaS complexe pentru logistică. Îmi folosesc experiența în vânzări pentru a mă asigura că tot ce construiesc aduce rezultate, indiferent de mărimea proiectului. Când nu scriu cod, mă reîncarc cântând la chitară și călătoresc pentru a găsi inspirație nouă.",
    formMode: "Mod Formular",
    dragMode: "Mod Tragere"
  },
  portfolio: {
    sectionLabel: "Portofoliu",
    featuredWork: "Lucrări Recomandate",
    featuredWorkDesc: "O selecție de instrumente interne, sisteme de automatizare și produse SaaS."
  },
  services: {
    sectionLabel: "Servicii"
  },
  about: {
    sectionLabel: "Despre"
  },
  trust: {
    title: "Ce Spun Clienții",
    readyToAutomate: "Pregătit să automatizezi creșterea?",
    discussText: "Hai să discutăm cum putem eficientiza operațiunile și construi instrumente care cresc odată cu business-ul tău.",
    bookCall: "Programează un Apel",
    hireMe: "Angajează-mă"
  },
  project: {
    backToPortfolio: "Înapoi la Portofoliu",
    techStack: "Tehnologii Folosite",
    theStory: "Povestea",
    readyToBuild: "Pregătit să construim ceva similar?",
    applyPrinciples: "Hai să discutăm cum putem aplica aceste principii pentru business-ul tău și să creăm un motor de venituri personalizat nevoilor tale.",
    bookDiscoveryCall: "Rezervă o Discuție de Descoperire",
    visitLiveSite: "Vizitează Site-ul"
  },
  trustMetrics: {
    projectsDelivered: "Proiecte Completate",
    hoursSaved: "Ore Salvate",
    clientROI: "ROI",
    responseTime: "Răspund în"
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && ['en', 'ro'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string): string => {
    const messages = locale === 'ro' ? roMessages : enMessages;
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      value = value?.[k];
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

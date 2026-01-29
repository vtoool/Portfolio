import { Service } from "@/types";

export const roServices: Service[] = [
  {
    id: "crm-tools",
    title: "CRMs Personalizate și Instrumente Interne",
    description: "Oprește să folosești foi de calcul. Construiesc instrumente interne care se potrivesc procesului tău de vânzări, reducând introducerea manuală a datelor și fragmentarea.",
    iconType: "database",
    features: [
      "Fluxuri de lucru pentru captarea și calificarea lead-urilor",
      "Atribuiri automate de sarcini și mementouri",
      "Rapoarte personalizate și dashboard-uri",
      "Integrare cu instrumentele existente",
      "Control al accesului pe roluri",
      "Jurnale de audit și conformitate"
    ]
  },
  {
    id: "api-integrations",
    title: "Integrări API și Automatizare",
    description: "Conectează instrumentele izolate pentru ca datele să circule automat. Sincronizare în timp real pentru mai multe informații și mai puține transferuri manuale.",
    iconType: "zap",
    features: [
      "Sincronizare bidirecțională între platforme",
      "Actualizări în timp real bazate pe webhook-uri",
      "Dezvoltare API personalizată",
      "Integrare cu sisteme legacy",
      "Transformarea și normalizarea datelor",
      "Gestionarea erorilor și logica de reîncercare"
    ]
  },
  {
    id: "saas-mvps",
    title: "MVP-uri SaaS și Aplicații Web",
    description: "De la idee la produs deployat. Construiesc Minimum Viable Products rapide și scalabile folosind tehnologii moderne.",
    iconType: "rocket",
    features: [
      "Autentificare utilizatori și plăți",
      "Proiectare și optimizare bază de date",
      "Dashboard-uri admin și analiză",
      "Notificări prin Email/SMS",
      "Optimizarea performanței",
      "CI/CD și deployment"
    ]
  }
];

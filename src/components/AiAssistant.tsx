
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react"; 
import aiIcon from "@/assets/ai-assistant.png";
import { useAiChat } from "@/contexts/AiChatContext";
import { useLanguage } from "@/contexts/LanguageContext";

type KnowledgeEntry = {
  keywords: string[];
  response: { en: string; fr: string };
};

// Knowledge Base Data extracted from legacy site
// Knowledge Base Data extracted from legacy site & reviews
const KNOWLEDGE_BASE: Record<string, KnowledgeEntry> = {
  greetings: {
    keywords: ["hello", "hi", "hey", "greetings", "start", "bonjour", "salut", "allo"],
    response: {
      en: "Hello! I'm the CFH Safety Assistant. I can help you with <b>Fire Alarms</b>, <b>Extinguishers</b>, <b>Emergency Services</b>, and <b>Inspections</b>.<br><br>How can I assist you today?",
      fr: "Bonjour! Je suis l'assistant CFH Sécurité. Je peux vous aider avec les <b>Alarmes Incendie</b>, <b>Extincteurs</b>, <b>Services d'Urgence</b> et <b>Inspections</b>.<br><br>Comment puis-je vous aider aujourd'hui?"
    },
  },
  emergency: {
    keywords: ["emergency", "24/7", "urgent", "night", "help now", "urgence", "24h", "nuit", "vite"],
    response: {
      en: "<b>🚨 24/7 Emergency Service:</b><br>We offer 24-hour emergency service for all your fire safety systems.<br>Call us immediately at <a href='tel:5143333389' class='text-[hsl(var(--cfh-red))] font-bold'>(514) 333-3389</a>.",
      fr: "<b>🚨 Service d'Urgence 24/7:</b><br>Nous offrons un service d'urgence 24h pour tous vos systèmes de sécurité incendie.<br>Appelez-nous immédiatement au <a href='tel:5143333389' class='text-[hsl(var(--cfh-red))] font-bold'>(514) 333-3389</a>."
    }
  },
  locations: {
    keywords: ["location", "address", "where", "map", "office", "valleyfield", "st-laurent", "adresse", "ou", "carte", "bureau"],
    response: {
      en: "<b>Our Locations:</b><br>📍 <b>Head Office:</b> 1455 Boul. Pitfield, Saint-Laurent, QC H4S 1G3<br>📍 <b>Branch:</b> 647 rue Roger, Valleyfield, QC J6S 0A7<br>We serve the greater Montreal area and beyond.",
      fr: "<b>Nos Adresses:</b><br>📍 <b>Siège Social:</b> 1455 Boul. Pitfield, Saint-Laurent, QC H4S 1G3<br>📍 <b>Succursale:</b> 647 rue Roger, Valleyfield, QC J6S 0A7<br>Nous desservons le Grand Montréal et les environs."
    }
  },
  services: {
    keywords: ["services", "offer", "help", "work", "serv", "plan", "test", "inspection", "maintenance", "offre", "aider", "travail"],
    response: {
      en: `<b>Our Services:</b><br>
      • <b>Design & Engineering:</b> Certified plans & custom evacuation maps.<br>
      • <b>Inspection & Maintenance:</b> Alarms, Extinguishers, Sprinklers, Emergency Lights.<br>
      • <b>Specialized Testing:</b> Air tightness testing & Hydrostatic testing.<br>
      • <b>Installation:</b> New systems for any building type.<br>
      <a href='/services' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>View All Services</a>`,
      fr: `<b>Nos Services:</b><br>
      • <b>Design et Ingénierie:</b> Plans certifiés et plans d'évacuation sur mesure.<br>
      • <b>Inspection & Maintenance:</b> Alarmes, Extincteurs, Gicleurs, Éclairage d'urgence.<br>
      • <b>Tests Spécialisés:</b> Tests d'étanchéité et tests hydrostatiques.<br>
      • <b>Installation:</b> Nouveaux systèmes pour tout type de bâtiment.<br>
      <a href='/services' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>Voir tous les Services</a>`
    }
  },
  products: {
    keywords: ["products", "buy", "extinguisher", "alarm", "ansul", "buckeye", "strike", "novec", "fm-200", "foam", "produits", "acheter", "extincteur", "alarme", "mousse"],
    response: {
      en: `<b>Our Products:</b><br>
      We carry top brands like <b>Ansul</b>, <b>Buckeye</b>, and <b>Strike First</b>.<br>
      • <b>Extinguishers:</b> ABC, CO2, Water, Chemical.<br>
      • <b>Suppression Systems:</b> FM-200, Novec 1230, CO2, Foam.<br>
      • <b>Kitchen Systems:</b> Range Guard, Ansul R-102.<br>
      <a href='/products' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>View Catalog</a>`,
      fr: `<b>Nos Produits:</b><br>
      Nous distribuons des marques comme <b>Ansul</b>, <b>Buckeye</b> et <b>Strike First</b>.<br>
      • <b>Extincteurs:</b> ABC, CO2, Eau, Chimique.<br>
      • <b>Systèmes d'Extinction:</b> FM-200, Novec 1230, CO2, Mousse.<br>
      • <b>Cuisines:</b> Range Guard, Ansul R-102.<br>
      <a href='/products' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>Voir le Catalogue</a>`
    }
  },
  clients: {
    keywords: ["clients", "who", "sector", "hotel", "hospital", "school", "residential", "customer", "secteur", "ecole", "hopital", "residentiel"],
    response: {
      en: "<b>Who We Serve:</b><br>We work with Hotels, Restaurants, Hospitals, Schools, Government Institutions, Office Towers, and Residential Buildings. <br>Trusted by 500+ clients.",
      fr: "<b>Nos Clients:</b><br>Nous servons les Hôtels, Restaurants, Hôpitaux, Écoles, Institutions Gouvernementales, Tours de Bureaux et Édifices Résidentiels. <br>Confiance de plus de 500 clients."
    }
  },
  reviews: {
    keywords: ["review", "rating", "reputation", "good", "bad", "opinion", "avis", "classement", "reputation", "bon", "mauvais"],
    response: {
      en: "<b>Our Reputation:</b><br>CFH Security is known for its productive and positive work culture (Rated 3.0/5 on Indeed). We are a trusted partner in Montreal since 1995, committed to customer satisfaction and safety.",
      fr: "<b>Notre Réputation:</b><br>CFH Sécurité est reconnue pour sa culture de travail positive (Noté 3.0/5 sur Indeed). Partenaire de confiance à Montréal depuis 1995, nous sommes dévoués à la satisfaction et à la sécurité de nos clients."
    }
  },
  kitchen: {
    keywords: ["kitchen", "cooking", "restaurant", "hood", "cuisine", "cuisson", "hotte", "restau"],
    response: {
      en: "<b>Kitchen Systems:</b><br>We specialize in fire suppression for commercial kitchens (Restaurants, Food Courts). We install and service major brands preventing grease fires.<br><a href='/services' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>Learn More</a>",
      fr: "<b>Systèmes de Cuisine:</b><br>Nous sommes spécialisés dans l'extinction d'incendie pour cuisines commerciales (Restaurants). Nous installons et entretenons les grandes marques pour prévenir les feux de graisse.<br><a href='/services' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>En Savoir Plus</a>"
    }
  },
  contact: {
    keywords: ["contact", "email", "phone", "call", "quote", "price", "cost", "speak", "appeler", "telephone", "prix", "cout", "parler", "soumission"],
    response: {
      en: "You can reach us at <a href='tel:5143333389' class='text-[hsl(var(--cfh-red))] font-bold'>(514) 333-3389</a> or email <b>cfhsecurite@cfhsecurite.com</b>.<br><a href='/quote' class='text-[hsl(var(--cfh-red))] font-bold'>Request a Quote Online</a>.",
      fr: "Joignez-nous au <a href='tel:5143333389' class='text-[hsl(var(--cfh-red))] font-bold'>(514) 333-3389</a> ou par courriel à <b>cfhsecurite@cfhsecurite.com</b>.<br><a href='/demande-de-soumission' class='text-[hsl(var(--cfh-red))] font-bold'>Demander une Soumission</a>."
    },
  },
  about: {
    keywords: ["about", "history", "who", "company", "years", "since", "propos", "histoire", "qui", "compagnie", "entreprise", "annee", "depuis"],
    response: {
      en: "<b>About CFH:</b><br>Proudly at your service for 115 years! Incorporated in 1995, we are leaders in fire prevention. We possess all relevant accreditations for major manufacturers and offer 24/7 service.",
      fr: "<b>À Propos de CFH:</b><br>Fièrement à votre service depuis 115 ans! Incorporée en 1995, nous sommes leaders en prévention incendie. Nous possédons les accréditations majeures et offrons un service 24/7."
    }
  },
  default: {
    keywords: [],
    response: {
      en: "I'm here to ensure your safety! I can provide info on <b>Alarms</b>, <b>Extinguishers</b>, <b>Emergency Services</b>, or help you <b>Get a Quote</b>.<br><br>How can I assist you?",
      fr: "Je suis là pour votre sécurité! Je peux vous informer sur les <b>Alarmes</b>, <b>Extincteurs</b>, <b>Services d'Urgence</b>, ou vous aider avec une <b>Soumission</b>.<br><br>Comment puis-je vous aider?"
    }
  },
};

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

const AiAssistant = () => {
  const { isOpen, setIsOpen } = useAiChat();
  const { language } = useLanguage(); // 'en' | 'fr'
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".ai-toggle-btn")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  const getAIResponse = (query: string) => {
    const q = query.toLowerCase();
    
    // Find best match by checking if ANY keywords (FR or EN) appear in the query
    // We search through all topics
    const match = Object.values(KNOWLEDGE_BASE).find(
        (item) => item !== KNOWLEDGE_BASE.default && item.keywords.some((k) => q.includes(k.toLowerCase()))
    );

    // Return the response in the CURRENT selected language
    return match ? match.response[language] : KNOWLEDGE_BASE.default.response[language];
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newMessage: Message = { id: Date.now().toString(), sender: "user", text: userText };
    
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI delay
    const responseText = getAIResponse(userText);
    const delay = Math.min(Math.max(responseText.length * 5, 800), 2000);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "ai", text: responseText },
      ]);
    }, delay);
  };

  // Text Resources
  const t = {
    en: {
      title: "CFH Assistant",
      online: "Online",
      placeholder: "Type a message...",
      welcome: "👋 Hi! Ask me anything about our fire safety services.",
      suggestions: ["Fire Alarms", "Inspection", "Get a Quote", "Contact"]
    },
    fr: {
      title: "Assistant CFH",
      online: "En Ligne",
      placeholder: "Écrivez un message...",
      welcome: "👋 Bonjour! Posez-moi vos questions sur nos services.",
      suggestions: ["Alarmes Incendie", "Inspection", "Soumission", "Contact"]
    }
  };

  const text = t[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 w-[90vw] md:w-[380px] h-[500px] max-h-[80vh] bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[hsl(var(--cfh-blue))]/20">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/10">
                  <img src={aiIcon} alt="AI" className="w-6 h-6 object-contain invert" />
               </div>
               <div>
                  <h3 className="font-bold text-sm text-white">{text.title}</h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      {text.online}
                  </p>
               </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white/70 hover:text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {messages.length === 0 && (
                 <div className="text-center text-sm text-muted-foreground mt-10">
                     <p>{text.welcome}</p>
                     <div className="flex flex-wrap justify-center gap-2 mt-4">
                         {text.suggestions.map((s) => (
                             <button 
                              key={s} 
                              onClick={() => { setInputValue(s); handleSendMessage(); }}
                              className="px-3 py-1.5 bg-muted/50 rounded-full text-xs hover:bg-[hsl(var(--cfh-red))] hover:text-white transition-colors"
                             >
                                 {s}
                             </button>
                         ))}
                     </div>
                 </div>
             )}

             {messages.map((msg) => (
                 <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <div className={`
                       max-w-[85%] rounded-2xl p-3 text-sm
                       ${msg.sender === 'user' 
                           ? 'bg-[hsl(var(--cfh-red))] text-white rounded-tr-none' 
                           : 'bg-muted/80 text-foreground rounded-tl-none border border-border/50'
                       }
                     `}>
                        {msg.sender === 'ai' ? (
                          <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                        ) : (
                          msg.text
                        )}
                     </div>
                 </div>
             ))}

             {isTyping && (
                 <div className="flex justify-start">
                      <div className="bg-muted/50 rounded-2xl rounded-tl-none p-3 border border-border/50 flex gap-1 items-center">
                          <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                 </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border/40 bg-background/50">
             <form onSubmit={handleSendMessage} className="flex gap-2">
                 <Input 
                   value={inputValue}
                   onChange={(e) => setInputValue(e.target.value)}
                   placeholder={text.placeholder}
                   className="rounded-full bg-muted/40 border-border/50 text-white font-medium placeholder:text-muted-foreground focus-visible:ring-[hsl(var(--cfh-red))]"
                 />
                 <Button type="submit" size="icon" className="rounded-full bg-[hsl(var(--cfh-red))] hover:bg-[hsl(var(--cfh-red))]/90 text-white shrink-0">
                     <Send className="w-4 h-4 ml-0.5" />
                 </Button>
             </form>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AiAssistant;

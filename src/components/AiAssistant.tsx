
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
const KNOWLEDGE_BASE: Record<string, KnowledgeEntry> = {
  greetings: {
    keywords: ["hello", "hi", "hey", "greetings", "start", "bonjour", "salut", "allo"],
    response: {
      en: "Hello! I'm the CFH Safety Assistant. I can help you with <b>Fire Alarms</b>, <b>Extinguishers</b>, <b>Kitchen Systems</b>, and <b>Inspections</b>.<br><br>How can I assist you today?",
      fr: "Bonjour! Je suis l'assistant CFH Sécurité. Je peux vous aider avec les <b>Alarmes Incendie</b>, <b>Extincteurs</b>, <b>Systèmes de Cuisine</b> et <b>Inspections</b>.<br><br>Comment puis-je vous aider aujourd'hui?"
    },
  },
  services: {
    keywords: ["services", "offer", "help", "work", "serv", "offre", "aider", "travail"],
    response: {
      en: `<b>Our Services:</b><br>
      • <b>Design & Engineering:</b> Certified plans for all fire systems.<br>
      • <b>Inspection & Maintenance:</b> Regular maintenance for Alarms, Extinguishers, Sprinklers.<br>
      • <b>Custom Workshop:</b> Hydrostatic testing, cylinder painting, and refilling.<br>
      <a href='/services' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>View Services</a>`,
      fr: `<b>Nos Services:</b><br>
      • <b>Design et Ingénierie:</b> Plans certifiés pour tous systèmes incendie.<br>
      • <b>Inspection de Maintenance:</b> Entretien régulier pour Alarmes, Extincteurs, Gicleurs.<br>
      • <b>Atelier sur mesure:</b> Tests hydrostatiques, peinture de cylindres et remplissage.<br>
      <a href='/services' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>Voir les Services</a>`
    }
  },
  products: {
    keywords: ["products", "buy", "extinguisher", "alarm", "ansul", "buckeye", "strike", "produits", "acheter", "extincteur", "alarme"],
    response: {
      en: `<b>Our Products:</b><br>
      We carry top brands like <b>Ansul</b>, <b>Buckeye</b>, and <b>Strike First</b>.<br>
      • <b>Portable Extinguishers</b> (ABC, CO2, Water)<br>
      • <b>Kitchen Suppression Systems</b><br>
      • <b>Fire Alarms & Detectors</b><br>
      <a href='/products' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>View Catalog</a>`,
      fr: `<b>Nos Produits:</b><br>
      Nous distribuons des marques reconnues comme <b>Ansul</b>, <b>Buckeye</b> et <b>Strike First</b>.<br>
      • <b>Extincteurs Portatifs</b> (ABC, CO2, Eau)<br>
      • <b>Systèmes d'extinction pour cuisine</b><br>
      • <b>Alarmes Incendie et Détecteurs</b><br>
      <a href='/products' class='text-[hsl(var(--cfh-red))] font-bold hover:underline'>Voir le Catalogue</a>`
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
      en: "You can reach us at <a href='tel:5143333389' class='text-[hsl(var(--cfh-red))] font-bold'>(514) 333-3389</a> or <a href='/quote' class='text-[hsl(var(--cfh-red))] font-bold'>Request a Quote</a> online.<br>Address: 1455 Boul. Pitfield, Ville St-Laurent.",
      fr: "Vous pouvez nous joindre au <a href='tel:5143333389' class='text-[hsl(var(--cfh-red))] font-bold'>(514) 333-3389</a> ou <a href='/demande-de-soumission' class='text-[hsl(var(--cfh-red))] font-bold'>Demander une Soumission</a>.<br>Adresse: 1455 Boul. Pitfield, Ville St-Laurent."
    },
  },
  about: {
    keywords: ["about", "history", "who", "company", "propos", "histoire", "qui", "compagnie", "entreprise"],
    response: {
      en: "<b>About CFH:</b><br>Proudly at your service for 115 years! We are specialists in sales, verification, and maintenance of fire prevention equipment. We possess all relevant accreditations for major manufacturers.",
      fr: "<b>À Propos de CFH:</b><br>Fièrement à votre service depuis 115 ans! Nous sommes spécialistes de la vente, vérification et entretien d'équipements de prévention incendie. Nous possédons les accréditations pour tous les manufacturiers majeurs."
    }
  },
  default: {
    keywords: [],
    response: {
      en: "I'm here to ensure your safety! I can provide info on <b>Alarms</b>, <b>Extinguishers</b>, <b>Services</b>, or help you <b>Get a Quote</b>.<br><br>How can I assist you?",
      fr: "Je suis là pour votre sécurité! Je peux vous informer sur les <b>Alarmes</b>, <b>Extincteurs</b>, <b>Services</b>, ou vous aider avec une <b>Soumission</b>.<br><br>Comment puis-je vous aider?"
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

import { Shield, Flame, Video, Users, Calendar, GraduationCap, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Shield,
      title: t.services.security.title,
      description: t.services.security.description,
      gradient: 'from-primary/20 to-electric-blue/10',
      iconColor: 'text-primary',
      span: 'lg:col-span-2',
    },
    {
      icon: Flame,
      title: t.services.fire.title,
      description: t.services.fire.description,
      gradient: 'from-accent/20 to-gold/10',
      iconColor: 'text-accent',
      span: '',
    },
    {
      icon: Video,
      title: t.services.surveillance.title,
      description: t.services.surveillance.description,
      gradient: 'from-primary/10 to-secondary/20',
      iconColor: 'text-primary',
      span: '',
    },
    {
      icon: Users,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      gradient: 'from-secondary/30 to-muted/20',
      iconColor: 'text-electric-glow',
      span: '',
    },
    {
      icon: Calendar,
      title: t.services.events.title,
      description: t.services.events.description,
      gradient: 'from-accent/10 to-gold/5',
      iconColor: 'text-accent',
      span: '',
    },
    {
      icon: GraduationCap,
      title: t.services.training.title,
      description: t.services.training.description,
      gradient: 'from-primary/15 to-electric-blue/5',
      iconColor: 'text-primary',
      span: 'lg:col-span-2',
    },
  ];

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                'bento-card group cursor-pointer relative overflow-hidden',
                service.span
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                service.gradient
              )} />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 relative inline-block">
                  <div className={cn(
                    'p-4 rounded-2xl bg-secondary/50 border border-border/30 transition-all duration-300 group-hover:scale-110',
                    service.iconColor
                  )}>
                    <service.icon className="h-7 w-7" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

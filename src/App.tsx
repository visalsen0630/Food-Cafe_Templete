import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  Instagram, 
  Facebook, 
  ArrowRight,
  Star,
  UtensilsCrossed,
  ChefHat,
  Calendar,
  ArrowUpRight,
  Quote
} from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeMenuTab, setActiveMenuTab] = useState('starters');
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.3 });
      heroTl
        .fromTo('.hero-bg', 
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
        )
        .fromTo('.hero-overlay',
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'none' },
          '-=0.8'
        )
        .fromTo('.hero-tag',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.hero-title span',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo('.hero-subtitle',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.hero-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );

      // Scroll-triggered animations
      const sections = [
        { ref: aboutRef, selector: '.about-image', from: { y: 60, opacity: 0 } },
        { ref: aboutRef, selector: '.about-content > *', from: { y: 40, opacity: 0 }, stagger: 0.1 },
        { ref: featuredRef, selector: '.featured-header > *', from: { y: 30, opacity: 0 }, stagger: 0.1 },
        { ref: featuredRef, selector: '.featured-card', from: { y: 80, opacity: 0 }, stagger: 0.12 },
        { ref: menuRef, selector: '.menu-header > *', from: { y: 30, opacity: 0 }, stagger: 0.1 },
        { ref: menuRef, selector: '.menu-content', from: { y: 40, opacity: 0 } },
        { ref: testimonialsRef, selector: '.testimonials-header > *', from: { y: 30, opacity: 0 }, stagger: 0.1 },
        { ref: testimonialsRef, selector: '.testimonial-card', from: { y: 60, opacity: 0 }, stagger: 0.15 },
        { ref: contactRef, selector: '.contact-header > *', from: { y: 30, opacity: 0 }, stagger: 0.1 },
        { ref: contactRef, selector: '.contact-grid > *', from: { y: 50, opacity: 0 }, stagger: 0.1 },
      ];

      sections.forEach(({ ref, selector, from, stagger }) => {
        if (ref.current) {
          const elements = ref.current.querySelectorAll(selector);
          gsap.fromTo(elements, from, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: stagger || 0,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const featuredDishes = [
    {
      name: 'Truffle Eggs Benedict',
      description: 'Poached farm eggs on sourdough with black truffle hollandaise and fresh herbs',
      price: '$24',
      image: '/images/breakfast-eggs.jpg',
      tag: 'Breakfast',
    },
    {
      name: 'Wagyu Beef Burger',
      description: 'Aged wagyu patty, brioche bun, caramelized onions, truffle aioli',
      price: '$32',
      image: '/images/dish-gourmet.jpg',
      tag: 'Signature',
    },
    {
      name: 'Artisan Latte',
      description: 'Single-origin espresso with velvety steamed milk and hand-poured latte art',
      price: '$7',
      image: '/images/coffee-latte.jpg',
      tag: 'Coffee',
    },
    {
      name: 'Chocolate Fondant',
      description: 'Warm dark chocolate cake with vanilla bean ice cream and berry compote',
      price: '$16',
      image: '/images/dessert-chocolate.jpg',
      tag: 'Dessert',
    },
  ];

  const menuItems: Record<string, Array<{ name: string; price: string; desc: string }>> = {
    starters: [
      { name: 'Heirloom Tomato Bruschetta', price: '$14', desc: 'Fresh basil, balsamic glaze, toasted sourdough' },
      { name: 'Truffle Arancini', price: '$16', desc: 'Wild mushroom risotto balls, herb aioli' },
      { name: 'Burrata Salad', price: '$18', desc: 'Creamy burrata, prosciutto, rocket, pine nuts' },
      { name: 'Soup of the Day', price: '$12', desc: 'Seasonal ingredients, house-made sourdough' },
    ],
    mains: [
      { name: 'Pan-Seared Salmon', price: '$34', desc: 'Miso glaze, seasonal vegetables, quinoa' },
      { name: 'Wild Mushroom Risotto', price: '$28', desc: 'Arborio rice, aged parmesan, truffle oil' },
      { name: 'Grass-Fed Ribeye', price: '$48', desc: '280g steak, herb butter, roasted potatoes' },
      { name: 'Duck Confit', price: '$36', desc: 'Slow-cooked duck leg, cherry reduction, polenta' },
    ],
    desserts: [
      { name: 'Crème Brûlée', price: '$14', desc: 'Madagascar vanilla, caramelized sugar' },
      { name: 'Tiramisu', price: '$15', desc: 'Espresso-soaked ladyfingers, mascarpone cream' },
      { name: 'Seasonal Fruit Tart', price: '$13', desc: 'Pastry cream, fresh berries, mint' },
      { name: 'Affogato', price: '$10', desc: 'Vanilla gelato, double espresso shot' },
    ],
    beverages: [
      { name: 'Single Origin Pour Over', price: '$8', desc: 'Ethiopian Yirgacheffe, floral notes' },
      { name: 'Matcha Latte', price: '$7', desc: 'Ceremonial grade matcha, oat milk' },
      { name: 'House Kombucha', price: '$6', desc: 'Fermented tea, seasonal flavors' },
      { name: 'Fresh Pressed Juice', price: '$9', desc: 'Cold-pressed, daily selection' },
    ],
  };

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Food Critic, Portland Monthly',
      text: 'Velvet & Bean has redefined the café experience. Every dish is a masterpiece, and the coffee is simply exceptional.',
      image: '/images/customer-1.jpg',
      rating: 5,
    },
    {
      name: 'James Chen',
      role: 'Regular Guest',
      text: 'The attention to detail is remarkable. From the warm ambiance to the perfectly crafted latte, everything feels intentional.',
      image: '/images/customer-2.jpg',
      rating: 5,
    },
    {
      name: 'Emma Thompson',
      role: 'Interior Designer',
      text: 'A beautiful space with even better food. The seasonal menu keeps me coming back to discover new favorites.',
      image: '/images/customer-3.jpg',
      rating: 5,
    },
  ];

  const menuTabs = [
    { id: 'starters', label: 'Starters', icon: ChefHat },
    { id: 'mains', label: 'Mains', icon: UtensilsCrossed },
    { id: 'desserts', label: 'Desserts', icon: Coffee },
    { id: 'beverages', label: 'Beverages', icon: Coffee },
  ];

  return (
    <div className="relative bg-parchment">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5 flex items-center justify-between transition-all duration-300" id="navbar">
        <a href="#" className="font-mono text-sm uppercase tracking-[0.2em] text-charcoal font-medium">
          Velvet & Bean
        </a>
        <div className="hidden md:flex items-center gap-10">
          <a href="#menu" className="nav-link">Menu</a>
          <a href="#about" className="nav-link">Story</a>
          <a href="#contact" className="nav-link">Visit</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href="#contact" className="hidden md:inline-flex btn-primary-sm">
          Reserve
        </a>
        <button className="md:hidden text-charcoal p-2">
          <div className="w-5 h-0.5 bg-charcoal mb-1.5"></div>
          <div className="w-5 h-0.5 bg-charcoal"></div>
        </button>
      </nav>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="hero-bg absolute inset-0">
          <img 
            src="/images/hero-cafe.jpg" 
            alt="Café atmosphere" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay */}
        <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-24 lg:pb-32 px-6 lg:px-16">
          <div className="max-w-4xl">
            <span className="hero-tag inline-block label-mono text-white/70 mb-6">
              Est. 2019 — Portland, Oregon
            </span>
            
            <h1 className="hero-title heading-hero text-white mb-6">
              <span className="block">Crafted</span>
              <span className="block">Coffee.</span>
              <span className="block text-terracotta">Seasonal</span>
              <span className="block text-terracotta">Plates.</span>
            </h1>
            
            <p className="hero-subtitle body-text text-white/80 max-w-lg mb-10 text-lg">
              A place to linger, savor, and connect. Where every cup tells a story and every plate is prepared with intention.
            </p>
            
            <div className="hero-cta flex flex-wrap items-center gap-4">
              <a href="#menu" className="btn-primary">
                Explore Menu
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <a href="#contact" className="btn-outline">
                Book a Table
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="label-mono text-white/50 text-[10px]">Scroll</span>
          <div className="w-px h-8 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/70 animate-scroll-line" />
          </div>
        </div>
      </section>

      {/* Section 2: About Us */}
      <section id="about" ref={aboutRef} className="section-padding bg-parchment">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="about-image relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <img 
                  src="/images/cafe-exterior.jpg" 
                  alt="Velvet & Bean Café" 
                  className="w-full h-full object-cover image-editorial"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-white p-6 shadow-card">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <span className="font-display font-bold text-2xl lg:text-3xl text-terracotta">5+</span>
                    <p className="label-mono text-[10px] mt-1">Years</p>
                  </div>
                  <div className="text-center">
                    <span className="font-display font-bold text-2xl lg:text-3xl text-terracotta">50K</span>
                    <p className="label-mono text-[10px] mt-1">Guests</p>
                  </div>
                  <div className="text-center">
                    <span className="font-display font-bold text-2xl lg:text-3xl text-terracotta">4.9</span>
                    <p className="label-mono text-[10px] mt-1">Rating</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text Content */}
            <div className="about-content lg:pl-8">
              <span className="label-mono text-terracotta mb-4 block">Our Story</span>
              <h2 className="heading-section text-charcoal mb-8">
                Made Fresh,<br />Made With Love
              </h2>
              <div className="space-y-5 body-text text-charcoal/80">
                <p>
                  Founded in 2019, Velvet & Bean began with a simple vision: to create a space where 
                  exceptional coffee meets thoughtfully prepared food.
                </p>
                <p>
                  Our kitchen operates on a simple philosophy—prepare everything fresh, source 
                  locally when possible, and never compromise on quality. From our slow-roasted 
                  meats to our house-made sauces, every element is crafted with intention.
                </p>
                <p>
                  The result is a menu that changes with the seasons, celebrating the best 
                  ingredients at their peak.
                </p>
              </div>
              
              <div className="mt-10 flex items-center gap-6">
                <a href="#menu" className="text-link">
                  Discover Our Menu
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Featured Dishes */}
      <section id="featured" ref={featuredRef} className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="featured-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="label-mono text-terracotta mb-4 block">Chef's Selection</span>
              <h2 className="heading-section text-charcoal">
                Signature<br />Dishes
              </h2>
            </div>
            <p className="body-text text-charcoal/70 max-w-md lg:text-right">
              Each dish is crafted with seasonal ingredients and prepared fresh daily in our kitchen.
            </p>
          </div>
          
          {/* Dishes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish, index) => (
              <div 
                key={index} 
                className="featured-card group cursor-pointer bg-white"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover image-editorial transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="label-mono text-[10px] bg-white/95 backdrop-blur-sm px-3 py-1.5">
                      {dish.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="font-display font-bold text-lg text-white drop-shadow-lg">{dish.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg text-charcoal mb-2 group-hover:text-terracotta transition-colors">
                    {dish.name}
                  </h3>
                  <p className="body-text text-sm text-charcoal/60 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Menu Preview */}
      <section id="menu" ref={menuRef} className="section-padding bg-parchment">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="menu-header text-center mb-12">
            <span className="label-mono text-terracotta mb-4 block">Our Menu</span>
            <h2 className="heading-section text-charcoal mb-6">
              Seasonal<br />Offerings
            </h2>
            <p className="body-text text-charcoal/70 max-w-lg mx-auto">
              Our menu evolves with the seasons, featuring the freshest ingredients at their peak.
            </p>
          </div>
          
          {/* Menu Tabs */}
          <div className="menu-content">
            <div className="flex justify-center gap-2 mb-12 flex-wrap">
              {menuTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveMenuTab(tab.id)}
                    className={`menu-tab ${activeMenuTab === tab.id ? 'active' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Menu Items */}
            <div className="bg-white shadow-soft">
              {menuItems[activeMenuTab].map((item, index) => (
                <div 
                  key={index} 
                  className="menu-item group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-display font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex-1 h-px border-b border-dashed border-charcoal/20 group-hover:border-terracotta/30 transition-colors" />
                        <span className="font-display font-bold text-terracotta">{item.price}</span>
                      </div>
                      <p className="body-text text-sm text-charcoal/60">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <button className="btn-secondary">
                View Full Menu
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section id="testimonials" ref={testimonialsRef} className="section-padding bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="testimonials-header text-center mb-16">
            <span className="label-mono text-terracotta mb-4 block">Testimonials</span>
            <h2 className="heading-section text-charcoal">
              What Our<br />Guests Say
            </h2>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card bg-white p-8 shadow-soft relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-terracotta/20" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-terracotta text-terracotta" />
                  ))}
                </div>
                
                <p className="body-text text-charcoal/80 mb-8 leading-relaxed">
                  {testimonial.text}
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-charcoal/10">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-charcoal text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="label-mono text-[10px] text-charcoal/50">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Location & Contact */}
      <section id="contact" ref={contactRef} className="section-padding bg-ink text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="contact-header text-center mb-16">
            <span className="label-mono text-terracotta mb-4 block">Get In Touch</span>
            <h2 className="heading-section text-white mb-6">
              Visit Us<br />Soon
            </h2>
          </div>
          
          <div className="contact-grid grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h3 className="heading-subsection text-white mb-10">Find Us</h3>
              
              <div className="space-y-8 mb-12">
                <div className="contact-item">
                  <MapPin className="w-5 h-5 text-terracotta flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-semibold text-white mb-1 text-sm">Address</h4>
                    <p className="body-text text-white/60">
                      124 Maple Lane<br />
                      Portland, OR 97205
                    </p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Clock className="w-5 h-5 text-terracotta flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-semibold text-white mb-1 text-sm">Hours</h4>
                    <p className="body-text text-white/60">
                      Mon – Fri: 7am – 4pm<br />
                      Sat – Sun: 8am – 5pm
                    </p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Phone className="w-5 h-5 text-terracotta flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-semibold text-white mb-1 text-sm">Phone</h4>
                    <p className="body-text text-white/60">(503) 555-0142</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Mail className="w-5 h-5 text-terracotta flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-semibold text-white mb-1 text-sm">Email</h4>
                    <p className="body-text text-white/60">hello@velvetandbean.co</p>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="aspect-video bg-white/5 border border-white/10 rounded-sm overflow-hidden relative group">
                <img 
                  src="/images/interior-modern.jpg" 
                  alt="Café interior" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-terracotta mx-auto mb-2" />
                    <p className="label-mono text-xs text-white/50">View on Map</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h3 className="heading-subsection text-white mb-10">Send a Message</h3>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label-mono text-[10px] text-white/50 mb-2 block uppercase">Name</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="label-mono text-[10px] text-white/50 mb-2 block uppercase">Email</label>
                    <input 
                      type="email" 
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label-mono text-[10px] text-white/50 mb-2 block uppercase">Subject</label>
                  <input 
                    type="text" 
                    className="form-input"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label className="label-mono text-[10px] text-white/50 mb-2 block uppercase">Message</label>
                  <textarea 
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Tell us more..."
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
              
              {/* Reservation CTA */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-terracotta" />
                  <h4 className="font-display font-semibold text-white text-sm">Reserve a Table</h4>
                </div>
                <p className="body-text text-white/60 mb-4 text-sm">
                  Planning a special occasion? Book your table in advance.
                </p>
                <button className="btn-outline w-full">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="font-mono text-sm uppercase tracking-[0.2em] text-white font-medium">
              Velvet & Bean
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#menu" className="footer-link">Menu</a>
              <a href="#about" className="footer-link">Story</a>
              <a href="#contact" className="footer-link">Reservations</a>
              <a href="#" className="footer-link">Privacy</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="social-link">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="social-link">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="social-link">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-white/5">
            <p className="label-mono text-white/30 text-[10px]">
              © 2026 Velvet & Bean Café. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

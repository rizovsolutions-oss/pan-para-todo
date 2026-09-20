import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CakeSlice,
  Check,
  ChefHat,
  Clock3,
  Facebook,
  HeartHandshake,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  WheatOff,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImage from "@/assets/delipanese-hero.jpg";
import productsImage from "@/assets/delipanese-products.jpg";
import customersImage from "@/assets/delipanese-customers.jpg";
import logoAsset from "@/assets/delipanese-logo.jpg.asset.json";

const WHATSAPP_NUMBER = "521XXXXXXXXXX";
const whatsappUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const categories = ["Todos", "Panes", "Galletas", "Pasteles", "Postres", "Bebidas"] as const;

const products = [
  { name: "Pan de caja keto", category: "Panes", price: 145, badges: ["Keto", "Sin gluten"], position: "0% 0%" },
  { name: "Galletas de almendra", category: "Galletas", price: 95, badges: ["Sin azúcar", "Sin gluten"], position: "50% 0%" },
  { name: "Cheesecake de frutos rojos", category: "Pasteles", price: 490, badges: ["Sin azúcar", "Keto"], position: "100% 0%" },
  { name: "Pastel tres leches saludable", category: "Pasteles", price: 520, badges: ["Alta proteína", "Sin azúcar"], position: "0% 100%" },
  { name: "Brownies de cacao", category: "Postres", price: 75, badges: ["Sin azúcar", "Sin gluten"], position: "50% 100%" },
  { name: "Smoothie proteico de frutos rojos", category: "Bebidas", price: 89, badges: ["Alta proteína", "Sin azúcar"], position: "100% 100%" },
];

const reviews = [
  { name: "Mariana C.", text: "Por fin encontré un pan keto que sabe a pan de verdad. Fresco, suave y delicioso.", position: "0% 50%" },
  { name: "Alejandra R.", text: "El cheesecake fue la estrella de mi cumpleaños. Nadie creyó que fuera sin azúcar.", position: "50% 50%" },
  { name: "Paola M.", text: "Todo llega impecable y se siente hecho con muchísimo cariño. Ya soy clienta frecuente.", position: "100% 50%" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeliPanese | Repostería sin gluten y pan keto en Colima" },
      { name: "description", content: "Pan keto, repostería sin gluten y postres sin azúcar en Colima. Horneado artesanal fresco, ingredientes reales y opciones con alta proteína." },
      { name: "keywords", content: "repostería sin gluten Colima, pan keto Colima, postres sin azúcar Colima, panadería saludable" },
      { property: "og:title", content: "DeliPanese | Pan y postres sin culpa en Colima" },
      { property: "og:description", content: "Panadería artesanal saludable: sin gluten, sin azúcar añadida y keto friendly." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Bakery",
        name: "DeliPanese",
        description: "Panadería y repostería artesanal saludable en Colima, México.",
        address: { "@type": "PostalAddress", addressLocality: "Colima", addressRegion: "Colima", addressCountry: "MX" },
        openingHours: ["Mo-Fr 08:00-20:00", "Sa 09:00-21:00"],
        servesCuisine: ["Panadería saludable", "Keto", "Sin gluten", "Sin azúcar"],
        sameAs: ["https://www.instagram.com/delipanese"],
      }),
    }],
  }),
  component: Index,
});

function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.45 14.88L2 22l5.25-1.54A9.9 9.9 0 1 0 12.04 2Zm0 17.98a8.02 8.02 0 0 1-4.08-1.12l-.29-.17-3.12.92.94-3.04-.19-.31A8.02 8.02 0 1 1 12.04 20Zm4.4-6.01c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.31-.75-1.8-.2-.47-.4-.41-.55-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.83-.84 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.59 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function Index() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Todos");
  const [mobileOpen, setMobileOpen] = useState(false);
  const visibleProducts = activeCategory === "Todos" ? products : products.filter((item) => item.category === activeCategory);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    window.open(whatsappUrl(`Hola DeliPanese, soy ${data.get("nombre")}. ${data.get("mensaje")} Mi teléfono es ${data.get("telefono")}.`), "_blank", "noopener,noreferrer");
  };

  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 sm:h-20 lg:px-8">
          <a href="#inicio" className="flex min-w-0 items-center" aria-label="DeliPanese, inicio">
            <img src={logoAsset.url} alt="DeliPanese, el pan sin culpa" className="h-12 w-36 object-cover object-center sm:h-14 sm:w-40" width={160} height={56} />
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
            {["Productos", "Beneficios", "Pedidos", "Contacto"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-foreground/75 transition-colors hover:text-primary">{item}</a>
            ))}
            <Button asChild size="lg" className="rounded-full px-6 shadow-none">
              <a href={whatsappUrl("Hola DeliPanese, quiero hacer un pedido.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Pedir por WhatsApp</a>
            </Button>
          </nav>
          <Button variant="ghost" size="icon" className="size-11 shrink-0 rounded-full lg:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {mobileOpen && (
          <nav id="mobile-navigation" className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Navegación móvil">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {["Productos", "Beneficios", "Pedidos", "Contacto"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 py-2 font-semibold hover:bg-muted">{item}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="inicio" className="relative min-h-[calc(100svh-4.5rem)] scroll-mt-18 sm:min-h-[calc(100svh-5rem)] sm:scroll-mt-20">
        <img src={heroImage} alt="Pan keto, galletas, cheesecake y brownies artesanales de DeliPanese" className="absolute inset-0 h-full w-full object-cover" width={1600} height={1000} />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl items-end px-5 pb-12 pt-20 sm:min-h-[calc(100svh-5rem)] sm:items-center sm:py-24 lg:px-8">
          <div className="max-w-3xl text-primary-foreground">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-foreground/20 px-4 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur-md"><Leaf className="size-4" /> Horneado artesanal en Colima</span>
            <h1 className="font-display text-[2.75rem] leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">Pan y postres sin culpa, horneados frescos cada día</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/90 sm:text-xl">Sin gluten, sin azúcar añadida, keto friendly y con opciones de alta proteína. Sabor real para disfrutar bonito y sentirte bien.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 w-full rounded-full bg-background px-6 text-primary hover:bg-background/90 sm:h-13 sm:w-auto sm:px-7"><a className="whitespace-nowrap" href="#productos">Ver menú <ArrowRight /></a></Button>
              <Button asChild size="lg" variant="outline" className="h-12 w-full rounded-full border-primary-foreground/50 bg-transparent px-6 text-primary-foreground shadow-none hover:bg-primary-foreground/10 hover:text-primary-foreground sm:h-13 sm:w-auto sm:px-7"><a className="whitespace-nowrap" href={whatsappUrl("Hola DeliPanese, quiero conocer el menú y hacer un pedido.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Pedir por WhatsApp</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-6" aria-label="Características de nuestros productos">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
          {[[WheatOff,"Sin gluten"],[Sparkles,"Sin azúcar"],[Leaf,"Keto friendly"],[HeartHandshake,"Alta proteína"],[ShieldCheck,"Sin conservadores"]].map(([Icon, label]) => {
            const BadgeIcon = Icon as typeof Leaf;
            return <div key={label as string} className="flex items-center justify-center gap-2 text-center text-sm font-bold text-secondary-foreground"><BadgeIcon className="size-5 text-primary" />{label as string}</div>;
          })}
        </div>
      </section>

      <section id="productos" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center"><p className="section-kicker">Hecho para antojarte</p><h2 className="section-title">Nuestro menú</h2><p className="section-copy">Recetas honestas, ingredientes que reconoces y el sabor casero que estabas buscando.</p></div>
          <div className="-mx-5 mt-8 flex snap-x gap-2 overflow-x-auto px-5 pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-10 sm:justify-center sm:px-0" role="tablist" aria-label="Filtrar productos">
            {categories.map((category) => <Button key={category} type="button" size="sm" variant={activeCategory === category ? "default" : "outline"} className="h-11 shrink-0 snap-start rounded-full px-5 whitespace-nowrap shadow-none" onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</Button>)}
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <article key={product.name} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl">
                <div className="h-56 overflow-hidden sm:h-64"><img src={productsImage} alt={product.name} className="h-full w-full scale-[2.02] object-cover transition-transform duration-500 group-hover:scale-[2.08]" style={{ objectPosition: product.position }} loading="lazy" width={768} height={512} /></div>
                <div className="p-5 sm:p-6"><div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-3"><h3 className="min-w-0 font-display text-xl font-semibold leading-tight sm:text-2xl">{product.name}</h3><span className="shrink-0 whitespace-nowrap text-sm font-bold text-primary sm:text-base">${product.price} MXN</span></div>
                  <div className="mt-4 flex flex-wrap gap-2">{product.badges.map((badge) => <span key={badge} className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">{badge}</span>)}</div>
                  <Button asChild className="mt-6 h-12 w-full rounded-full shadow-none"><a className="whitespace-nowrap" href={whatsappUrl(`Hola DeliPanese, quiero pedir: ${product.name}.`)} target="_blank" rel="noreferrer">Pedir <ShoppingBag /></a></Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="scroll-mt-20 bg-muted py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-2xl"><p className="section-kicker">Cuidarte también sabe rico</p><h2 className="section-title">¿Por qué DeliPanese?</h2></div>
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [Leaf,"Ingredientes reales","Harinas de almendra, semillas, cacao y fruta: sin rellenos innecesarios."],
              [ShieldCheck,"Opciones para cada necesidad","Recetas aptas para personas que cuidan su consumo de azúcar y gluten."],
              [Clock3,"Horneado diario","Preparamos en pequeñas tandas para entregar sabor, aroma y frescura."],
              [ChefHat,"Recetas propias artesanales","Cada receta nace en nuestra cocina y se perfecciona con paciencia."],
            ].map(([Icon,title,text]) => { const ValueIcon = Icon as typeof Leaf; return <article key={title as string}><div className="grid size-13 place-items-center rounded-2xl bg-accent text-accent-foreground"><ValueIcon /></div><h3 className="mt-5 font-display text-2xl font-semibold">{title as string}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text as string}</p></article>; })}
          </div>
        </div>
      </section>

      <section id="pedidos" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><p className="section-kicker">Fácil y recién hecho</p><h2 className="section-title">Cómo pedir</h2></div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[[ShoppingBag,"Elige tus productos","Explora el menú y arma tu pedido."],[WhatsAppIcon,"Escríbenos por WhatsApp","Confirma existencias y personaliza tu orden."],[PackageCheck,"Recibe o recoge","Te avisamos cuando todo esté recién listo."]].map(([Icon,title,text], index) => { const StepIcon = Icon as typeof Leaf; return <article key={title as string} className="relative text-center"><span className="mx-auto grid size-18 place-items-center rounded-full bg-primary text-2xl font-bold text-primary-foreground"><StepIcon className="size-7" /></span><span className="mt-4 block text-xs font-extrabold uppercase tracking-widest text-primary">Paso {index + 1}</span><h3 className="mt-2 font-display text-2xl font-semibold">{title as string}</h3><p className="mt-2 text-muted-foreground">{text as string}</p></article>; })}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 rounded-2xl bg-secondary px-6 py-5 text-sm font-semibold text-secondary-foreground"><span className="flex items-center gap-2"><Truck className="size-5 text-primary" /> Entrega local en Colima</span><span className="flex items-center gap-2"><PackageCheck className="size-5 text-primary" /> Envíos nacionales</span><span className="flex items-center gap-2"><ShoppingBag className="size-5 text-primary" /> También en Uber Eats</span></div>
        </div>
      </section>

      <section className="bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><p className="section-kicker">Palabras que nos alimentan</p><h2 className="section-title">Lo que dicen de nosotros</h2></div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">{reviews.map((review) => <figure key={review.name} className="rounded-3xl bg-card p-7 shadow-soft"><div className="flex items-center gap-4"><img src={customersImage} alt={`Retrato de ${review.name}`} className="size-14 rounded-full object-cover" style={{ objectPosition: review.position }} loading="lazy" width={112} height={112} /><div><div className="flex gap-0.5 text-rating" aria-label="5 de 5 estrellas">{Array.from({length:5}).map((_,i) => <Star key={i} className="size-4 fill-current" />)}</div><figcaption className="mt-1 font-bold">{review.name}</figcaption></div></div><blockquote className="mt-5 font-display text-xl leading-relaxed">“{review.text}”</blockquote></figure>)}</div>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div><p className="section-kicker">Visítanos</p><h2 className="section-title">Ubicación y horarios</h2><div className="mt-8 overflow-hidden rounded-3xl bg-muted shadow-soft"><iframe title="Mapa de Colima, México" src="https://www.google.com/maps?q=Colima%2C%20M%C3%A9xico&z=14&output=embed" className="h-80 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2"><div className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-primary" /><div><h3 className="font-bold">Colima, México</h3><p className="mt-1 text-sm text-muted-foreground">Confirma la dirección exacta al realizar tu pedido.</p></div></div><div className="flex gap-3"><Clock3 className="mt-0.5 size-5 shrink-0 text-primary" /><div><h3 className="font-bold">Horarios</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Lunes a viernes: 8:00 am – 8:00 pm<br />Sábados: 9:00 am – 9:00 pm</p></div></div></div>
            <Button asChild variant="outline" className="mt-6 rounded-full shadow-none"><a href="https://www.ubereats.com/mx" target="_blank" rel="noreferrer">Buscar en Uber Eats <ArrowRight /></a></Button>
          </div>
          <div className="self-start rounded-3xl bg-muted p-7 sm:p-10"><CakeSlice className="size-8 text-primary" /><h2 className="mt-5 font-display text-3xl font-semibold">Cuéntanos qué se te antoja</h2><p className="mt-3 text-muted-foreground">Envíanos tu mensaje y continuaremos tu pedido por WhatsApp.</p>
            <form onSubmit={submitContact} className="mt-8 space-y-5"><label className="block text-sm font-bold">Nombre<Input name="nombre" required placeholder="Tu nombre" className="mt-2 h-12 rounded-xl bg-background" /></label><label className="block text-sm font-bold">Teléfono<Input name="telefono" type="tel" inputMode="tel" required placeholder="312 000 0000" className="mt-2 h-12 rounded-xl bg-background" /></label><label className="block text-sm font-bold">Mensaje<Textarea name="mensaje" required placeholder="Quiero pedir..." className="mt-2 min-h-32 rounded-xl bg-background" /></label><Button type="submit" size="lg" className="h-12 w-full rounded-full whitespace-nowrap"><WhatsAppIcon /> Enviar mensaje</Button></form>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-28 lg:px-8"><div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-cta px-5 py-14 text-center text-primary-foreground sm:px-12 sm:py-18"><p className="text-sm font-extrabold uppercase tracking-widest text-primary-foreground/75">Tu próximo favorito está aquí</p><h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">¿Se te antojó? Pide hoy mismo</h2><p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">Lo horneamos fresco para ti. Escríbenos y te ayudamos a elegir.</p><Button asChild size="lg" className="mt-7 h-12 w-full rounded-full bg-background px-5 text-primary hover:bg-background/90 sm:h-13 sm:w-auto sm:px-7"><a className="whitespace-nowrap" href={whatsappUrl("Hola DeliPanese, ¡se me antojó! Quiero hacer un pedido.")} target="_blank" rel="noreferrer"><WhatsAppIcon /> Pedir por WhatsApp</a></Button></div></section>

      <footer className="border-t border-border bg-footer pt-12 pb-24 text-footer-foreground sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8"><div><img src={logoAsset.url} alt="DeliPanese" className="h-20 w-52 rounded-xl object-cover" width={208} height={80} /><p className="mt-4 max-w-sm text-sm leading-relaxed text-footer-foreground/70">Pan y repostería artesanal para disfrutar sin culpa, hechos con cariño en Colima.</p></div><div><h3 className="font-display text-xl font-semibold">Explora</h3><nav className="mt-4 flex flex-col gap-3 text-sm text-footer-foreground/70">{["Productos","Beneficios","Pedidos","Contacto"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-footer-foreground">{item}</a>)}</nav></div><div><h3 className="font-display text-xl font-semibold">Síguenos</h3><div className="mt-4 flex gap-3"><a href="https://instagram.com/delipanese" target="_blank" rel="noreferrer" aria-label="Instagram de DeliPanese" className="social-link"><Instagram /></a><a href="https://facebook.com/delipanese" target="_blank" rel="noreferrer" aria-label="Facebook de DeliPanese" className="social-link"><Facebook /></a><a href="https://tiktok.com/@delipanese" target="_blank" rel="noreferrer" aria-label="TikTok de DeliPanese" className="social-link"><span className="font-bold">Tk</span></a></div><p className="mt-4 text-sm text-footer-foreground/70">@delipanese</p></div></div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-footer-foreground/15 px-5 pt-7 text-xs text-footer-foreground/60 sm:flex-row sm:justify-between lg:px-8"><p>© 2026 DeliPanese. Todos los derechos reservados.</p><a href="#contacto" className="hover:text-footer-foreground">Aviso de privacidad</a></div>
      </footer>

      <a href={whatsappUrl("Hola DeliPanese, quiero hacer un pedido.")} target="_blank" rel="noreferrer" aria-label="Pedir por WhatsApp" className="fixed right-5 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-float transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><WhatsAppIcon className="size-7" /></a>
    </main>
  );
}
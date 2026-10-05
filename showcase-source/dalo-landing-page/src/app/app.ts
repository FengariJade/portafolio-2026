import { AfterViewInit, Component, HostListener, signal } from '@angular/core';

type Mode = 'cliente' | 'profesional';

@Component({ selector: 'app-root', imports: [], templateUrl: './app.html', styleUrl: './app.css' })
export class App implements AfterViewInit {
  readonly mode = signal<Mode>('cliente');
  readonly menuOpen = signal(false);
  readonly activeFaq = signal<number | null>(0);
  readonly searchValue = signal('');
  readonly searchMessage = signal('');
  readonly scrolled = signal(false);

  readonly categories = [
    { name: 'Electricidad', icon: 'bolt', note: '128 disponibles' },
    { name: 'Gasfitería', icon: 'droplet', note: '94 disponibles' },
    { name: 'Pintura', icon: 'brush', note: '76 disponibles' },
    { name: 'Carpintería', icon: 'hammer', note: '61 disponibles' },
    { name: 'Limpieza', icon: 'sparkles', note: '112 disponibles' },
    { name: 'Climatización', icon: 'snow', note: '43 disponibles' },
  ];
  readonly professionals = [
    { initials: 'CR', name: 'Carlos Rojas', role: 'Electricista', rating: '4.9', reviews: '230', price: '80', color: '#dce7ef', image: 'carlos.png', imagePosition: '50% 24%' },
    { initials: 'LM', name: 'Lucía Mendoza', role: 'Pintora', rating: '5.0', reviews: '186', price: '95', color: '#ffe8a3', image: 'lucia.png', imagePosition: '50% 20%' },
    { initials: 'JP', name: 'José Paredes', role: 'Gasfitero', rating: '4.8', reviews: '154', price: '70', color: '#d8f3e4', image: null, imagePosition: '50% 50%' },
  ];
  readonly faqs = [
    { q: '¿Cómo sé que un profesional es confiable?', a: 'Verificamos identidad, experiencia y antecedentes. Además, cada perfil muestra reseñas de trabajos realmente completados dentro de Dalo.' },
    { q: '¿Publicar una solicitud tiene costo?', a: 'No. Buscar, comparar perfiles y publicar tu solicitud es gratis. Solo pagas cuando confirmas el servicio con el profesional elegido.' },
    { q: '¿Cómo se protege mi pago?', a: 'Tu pago queda protegido hasta que confirmes que el trabajo fue completado. Si surge un inconveniente, nuestro equipo te acompaña para resolverlo.' },
    { q: '¿Qué necesito para ofrecer mis servicios?', a: 'Crea tu perfil, completa la verificación y publica tus especialidades. Cuando esté aprobado, podrás recibir solicitudes cercanas a ti.' },
  ];

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  }
  @HostListener('window:scroll') onScroll(): void { this.scrolled.set(window.scrollY > 60); }
  setMode(mode: Mode): void { this.mode.set(mode); }
  toggleMenu(): void { this.menuOpen.update((value) => !value); }
  closeMenu(): void { this.menuOpen.set(false); }
  toggleFaq(index: number): void { this.activeFaq.update((value) => value === index ? null : index); }
  submitSearch(): void {
    const query = this.searchValue().trim();
    this.searchMessage.set(query ? `Buscando “${query}” cerca de ti…` : 'Escribe el servicio que necesitas.');
  }
}

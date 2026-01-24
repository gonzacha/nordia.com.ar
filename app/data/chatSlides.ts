/**
 * Data de slides para ChatCarousel
 * Conversaciones simuladas de diferentes rubros
 */

export type ChatMessage = {
  id: string;
  tipo: "cliente" | "ia";
  texto: string;
  hora: string;
};

export type ChatSlide = {
  id: string;
  rubro: string;
  titulo: string;
  icono: string;
  color: string;
  mensajes: ChatMessage[];
};

export const chatSlides: ChatSlide[] = [
  {
    id: "peluqueria",
    rubro: "Peluquería",
    titulo: "Peluquería Laura",
    icono: "✂️",
    color: "#FF6B9D",
    mensajes: [
      {
        id: "1",
        tipo: "cliente",
        texto: "Hola, ¿cuánto sale el corte?",
        hora: "14:23",
      },
      {
        id: "2",
        tipo: "ia",
        texto: "Hola 👋 El corte está $8.500. ¿Querés que te reserve un turno?",
        hora: "14:23",
      },
      {
        id: "3",
        tipo: "cliente",
        texto: "Dale, mañana a las 18",
        hora: "14:24",
      },
      {
        id: "4",
        tipo: "ia",
        texto: "Perfecto ✨ Te agendé para mañana 18 hs. Te mando recordatorio.",
        hora: "14:24",
      },
    ],
  },
  {
    id: "kiosco",
    rubro: "Kiosco",
    titulo: "Kiosco San Martín",
    icono: "🏪",
    color: "#4A90E2",
    mensajes: [
      {
        id: "1",
        tipo: "cliente",
        texto: "¿Tenés Coca 2L?",
        hora: "16:45",
      },
      {
        id: "2",
        tipo: "ia",
        texto: "Sí 🙌 Coca Cola 2L $2.400. ¿Te la preparo para retirar?",
        hora: "16:45",
      },
      {
        id: "3",
        tipo: "cliente",
        texto: "Dale, paso en 10 minutos",
        hora: "16:46",
      },
      {
        id: "4",
        tipo: "ia",
        texto: "Perfecto, te la tengo lista 👍",
        hora: "16:46",
      },
    ],
  },
  {
    id: "consultorio",
    rubro: "Consultorio",
    titulo: "Consultorio Dra. Martínez",
    icono: "🦷",
    color: "#50C878",
    mensajes: [
      {
        id: "1",
        tipo: "cliente",
        texto: "¿Atienden los sábados?",
        hora: "11:20",
      },
      {
        id: "2",
        tipo: "ia",
        texto: "Sí, de 9 a 13 hs. ¿Querés que te agende?",
        hora: "11:20",
      },
      {
        id: "3",
        tipo: "cliente",
        texto: "Sí, este sábado si hay",
        hora: "11:21",
      },
      {
        id: "4",
        tipo: "ia",
        texto: "Tengo disponible a las 10:30 hs. ¿Te sirve?",
        hora: "11:21",
      },
    ],
  },
  {
    id: "ferreteria",
    rubro: "Ferretería",
    titulo: "Ferretería El Rayo",
    icono: "🔧",
    color: "#FF6B35",
    mensajes: [
      {
        id: "1",
        tipo: "cliente",
        texto: "¿Tenés taladro Black & Decker?",
        hora: "09:15",
      },
      {
        id: "2",
        tipo: "ia",
        texto: "Sí 🔧 Tenemos el modelo 500W en $85.000. ¿Querés que te pase las formas de pago?",
        hora: "09:15",
      },
      {
        id: "3",
        tipo: "cliente",
        texto: "Dale, ¿aceptan tarjeta?",
        hora: "09:16",
      },
      {
        id: "4",
        tipo: "ia",
        texto: "Sí, todas las tarjetas en 3 cuotas sin interés 💳",
        hora: "09:16",
      },
    ],
  },
];

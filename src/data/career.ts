export type Role = {
  kind: string;
  title: string;
  place?: string;
  period: string;
  items: string[];
};

export const experience: Role[] = [
  {
    kind: "Pasantía",
    title: "Desarrollo de firmware y automatización",
    place: "tecso",
    period: "sep. – oct. 2024",
    items: [
      "Diseño de un datalogger en C++ sobre el microcontrolador ATtiny85.",
      "Evolución de una estación de carga para drones, de un prototipo funcional a una versión pulida sobre ESP32.",
      "Sistema automático de cámaras en Python para Raspberry Pi, comandado desde un bot de Telegram.",
    ],
  },
  {
    kind: "Independiente",
    title: "Reparación y soporte informático",
    period: "2018 – hoy",
    items: [
      "Atención a clientes: diagnóstico y presupuesto.",
      "Soporte remoto, limpieza de malware y optimización de equipos con Windows.",
      "Instalación, puesta a punto y personalización de entornos Linux.",
      "Automatización de backups y de tareas recurrentes con Bash, Batch y Python.",
    ],
  },
  {
    kind: "Independiente",
    title: "Clases particulares",
    period: "2018 – hoy",
    items: [
      "Alumnos de secundario y de universidad, en modalidad presencial y virtual.",
      "Álgebra, cálculo, física, química, electrónica, epistemología y programación en C, C++, Python y Racket.",
    ],
  },
];

export type Study = { title: string; place: string; detail: string };

export const education: Study[] = [
  {
    title: "Licenciatura en Ciencias de la Computación",
    place: "Universidad Nacional de Rosario · FCEIA",
    detail: "Programación funcional, diseño de programas y diseño de datos.",
  },
  {
    title: "Tecnicatura Universitaria en Inteligencia Artificial",
    place: "Universidad Nacional de Rosario · FCEIA",
    detail: "Programación orientada a objetos, datos estructurados y entornos de programación.",
  },
  {
    title: "Técnico en Electrónica",
    place: "Instituto Politécnico Superior (UNR)",
    detail: "Microprocesadores, automatización, sistemas de control, electrónica de potencia y protocolos de red.",
  },
];

export type Milestone = { year: number; items: string[] };

export const timeline: Milestone[] = [
  { year: 2018, items: ["Empiezo a reparar equipos y a dar clases particulares."] },
  { year: 2022, items: ["Primer proyecto público: un tema GTK propio."] },
  { year: 2024, items: ["Pasantía en tecso: firmware para ATtiny85 y ESP32, y automatización en Raspberry Pi."] },
  { year: 2025, items: ["Mapa interactivo histórico, Racketarra, Generador de CV y Morphtools.", "Aportes a Alejandría."] },
  { year: 2026, items: ["Rocola llega a beta pública.", "xport y su Compliance Gate.", "EX Emulators corriendo en el Galaxy Pocket Plus."] },
];

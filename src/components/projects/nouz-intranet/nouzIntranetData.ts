export type NouzIntranetView = 'home' | 'agenda' | 'chat' | 'friends' | 'customize' | 'settings'

export const nouzNavLinks = [
  { id: 'priorities', labelEs: 'Prioridades', labelEn: 'Priorities' },
  { id: 'notifications', labelEs: 'Notificaciones', labelEn: 'Notifications' },
  { id: 'notes', labelEs: 'Notas', labelEn: 'Notes' },
] as const

export const nouzSidebarLinks: Array<{ view: NouzIntranetView; labelEs: string; labelEn: string }> = [
  { view: 'home', labelEs: 'Inicio', labelEn: 'Home' },
  { view: 'chat', labelEs: 'Nouz', labelEn: 'Nouz' },
  { view: 'friends', labelEs: 'Amigos', labelEn: 'Friends' },
  { view: 'agenda', labelEs: 'Agenda Semanal', labelEn: 'Weekly agenda' },
  { view: 'settings', labelEs: 'Opciones', labelEn: 'Options' },
  { view: 'customize', labelEs: 'Personalizacion', labelEn: 'Customization' },
] as const

export const nouzPriorities = [
  { es: 'Pagar mantenimiento del departamento', en: 'Pay apartment maintenance' },
  { es: 'Reunion con Sofia a las 5 pm', en: 'Meeting with Sofia at 5 pm' },
  { es: 'Recordar regalo de cumpleanos', en: 'Remember birthday gift' },
]

export const nouzNotes = [
  { es: 'Comprar ingredientes para la cena del viernes.', en: 'Buy ingredients for Friday dinner.' },
  { es: 'Enviar propuesta revisada antes de las 11 am.', en: 'Send revised proposal before 11 am.' },
  { es: 'Separar tiempo para meditar al final del dia.', en: 'Set aside time to meditate at the end of the day.' },
]

export const nouzNotifications = [
  { es: 'Tienes un recordatorio compartido con Camila.', en: 'You have a shared reminder with Camila.' },
  { es: 'Tu lista de viaje tiene 3 tareas pendientes.', en: 'Your travel list has 3 pending tasks.' },
  { es: 'Nouz preparo un resumen de tu semana.', en: 'Nouz prepared a summary of your week.' },
]

export const nouzDashboardWidgets = {
  greetingEs: 'Buenos dias, Kevin',
  greetingEn: 'Good morning, Kevin',
  currentTime: '09:24',
  currentDateEs: 'Viernes 24 de abril',
  currentDateEn: 'Friday, April 24',
  currentEvent: {
    titleEs: 'Reunion de seguimiento con Bartech',
    titleEn: 'Follow-up meeting with Bartech',
    time: '10:00',
    endTime: '11:00',
  },
  upcoming: [
    {
      titleEs: 'Enviar avance del portfolio',
      titleEn: 'Send portfolio progress update',
      time: '11:30',
      durationEs: '30 min',
      durationEn: '30 min',
      locationEs: 'Slack',
      locationEn: 'Slack',
      color: 'violet',
      priorityEs: 'Alta',
      priorityEn: 'High',
    },
    {
      titleEs: 'Llamada con cliente de tracking',
      titleEn: 'Call with tracking client',
      time: '14:00',
      durationEs: '45 min',
      durationEn: '45 min',
      locationEs: 'Google Meet',
      locationEn: 'Google Meet',
      color: 'blue',
      priorityEs: 'Media',
      priorityEn: 'Medium',
    },
    {
      titleEs: 'Sesión de enfoque personal',
      titleEn: 'Personal focus session',
      time: '18:30',
      durationEs: '20 min',
      durationEn: '20 min',
      locationEs: 'Casa',
      locationEn: 'Home',
      color: 'green',
      priorityEs: 'Baja',
      priorityEn: 'Low',
    },
  ],
  calendarMonthEs: 'Abril 2026',
  calendarMonthEn: 'April 2026',
  temperatureEs: 'Lima, 24°',
  temperatureEn: 'Lima, 24°',
  timeZoneEs: 'Hora local',
  timeZoneEn: 'Local time',
  lists: [
    {
      titleEs: 'Trabajo',
      titleEn: 'Work',
      itemsEs: [
        { text: 'Cerrar showcase de intranets', done: true },
        { text: 'Preparar demo de CRM-SAT', done: false },
        { text: 'Responder mensajes pendientes', done: false },
      ],
      itemsEn: [
        { text: 'Finish intranet showcases', done: true },
        { text: 'Prepare CRM-SAT demo', done: false },
        { text: 'Reply to pending messages', done: false },
      ],
    },
    {
      titleEs: 'Personal',
      titleEn: 'Personal',
      itemsEs: [
        { text: 'Comprar vitaminas', done: false },
        { text: 'Llamar a mama', done: true },
        { text: 'Separar tiempo para leer', done: false },
      ],
      itemsEn: [
        { text: 'Buy vitamins', done: false },
        { text: 'Call mom', done: true },
        { text: 'Set aside time to read', done: false },
      ],
    },
  ],
}

export const nouzWeekDays = [
  { labelEs: 'Lun', labelEn: 'Mon', date: 20 },
  { labelEs: 'Mar', labelEn: 'Tue', date: 21 },
  { labelEs: 'Mie', labelEn: 'Wed', date: 22 },
  { labelEs: 'Jue', labelEn: 'Thu', date: 23 },
  { labelEs: 'Vie', labelEn: 'Fri', date: 24, isToday: true },
  { labelEs: 'Sab', labelEn: 'Sat', date: 25 },
  { labelEs: 'Dom', labelEn: 'Sun', date: 26 },
]

export const nouzHours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

export const nouzAgendaEvents = [
  { day: 1, hour: 1, height: 1, color: '#8B5CF6', titleEs: 'Kickoff con cliente', titleEn: 'Client kickoff', descriptionEs: 'Alinear metas de la semana', descriptionEn: 'Align the week goals' },
  { day: 3, hour: 4, height: 2, color: '#1FA2FF', titleEs: 'Bloque de diseño', titleEn: 'Design block', descriptionEs: 'Refinar componentes glass', descriptionEn: 'Refine glass components' },
  { day: 4, hour: 2, height: 1, color: '#22C55E', titleEs: 'Llamada familiar', titleEn: 'Family call', descriptionEs: 'Recordatorio compartido', descriptionEn: 'Shared reminder' },
  { day: 5, hour: 6, height: 1, color: '#F59E0B', titleEs: 'Meditar', titleEn: 'Meditate', descriptionEs: '20 min de pausa', descriptionEn: '20 min pause' },
]

export const nouzPlans = [
  {
    id: 'nova',
    name: 'Nova',
    icon: 'N',
    image: '/showcase/nouz-intranet/images/bot.png',
    color: 'linear-gradient(135deg, #3535EF 0%, #1FA2FF 100%)',
    descriptionEs: 'Asistente equilibrado y amable.',
    descriptionEn: 'Balanced and friendly assistant.',
  },
  {
    id: 'pulse',
    name: 'Pulse',
    icon: 'P',
    image: '/showcase/nouz-intranet/images/bot.png',
    color: 'linear-gradient(135deg, #1FA2FF 0%, #22C55E 100%)',
    descriptionEs: 'Mas energia para el dia a dia.',
    descriptionEn: 'More energy for daily life.',
  },
  {
    id: 'mind',
    name: 'Mind',
    icon: 'M',
    image: '/showcase/nouz-intranet/images/bot.png',
    color: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    descriptionEs: 'Mas reflexivo y creativo.',
    descriptionEn: 'More reflective and creative.',
  },
]

export const nouzChatMessages = [
  { role: 'assistant', contentEs: 'Hola Kevin, hoy tienes una reunión importante a las 10:00. ¿Quieres que te prepare un resumen?', contentEn: 'Hi Kevin, you have an important meeting at 10:00. Want me to prepare a summary?' },
  { role: 'user', contentEs: 'Sí, y también ayúdame a ordenar mis prioridades del día.', contentEn: 'Yes, and also help me sort today’s priorities.' },
  { role: 'assistant', contentEs: 'Perfecto. Primero: reunión con Bartech. Segundo: enviar avances del portfolio. Tercero: revisar recordatorios compartidos.', contentEn: 'Perfect. First: Bartech meeting. Second: send portfolio progress. Third: review shared reminders.' },
]

export const nouzQuickActions = {
  es: ['Resume mi dia', 'Ordena prioridades', 'Crear lista', 'Enviar recordatorio'],
  en: ['Summarize my day', 'Sort priorities', 'Create a list', 'Send reminder'],
}

export const nouzFriends = [
  { initial: 'C', name: 'Camila Torres', activeReminders: 3 },
  { initial: 'M', name: 'Mateo Perez', activeReminders: 2 },
  { initial: 'A', name: 'Andrea Rojas', activeReminders: 1 },
  { initial: 'S', name: 'Sofia Luna', activeReminders: 4 },
]

export const nouzFriendActivity = [
  { friendEs: 'Camila', friendEn: 'Camila', actionEs: 'recordó la cita médica', actionEn: 'was reminded about the medical appointment', whenEs: 'hace 1 hora', whenEn: '1 hour ago' },
  { friendEs: 'Mateo', friendEn: 'Mateo', actionEs: 'confirmó la compra del regalo', actionEn: 'confirmed the gift purchase', whenEs: 'ayer', whenEn: 'yesterday' },
]

export const nouzBackgrounds = [
  { id: 'violet-sky', name: 'Violet Sky', gradient: 'linear-gradient(135deg, #f7e8ff 0%, #e9f0ff 55%, #ffffff 100%)' },
  { id: 'sunrise', name: 'Sunrise', gradient: 'linear-gradient(135deg, #fff0e0 0%, #ffe2f2 50%, #f3ebff 100%)' },
  { id: 'mint', name: 'Mint', gradient: 'linear-gradient(135deg, #e6fff7 0%, #f0fffd 45%, #eef5ff 100%)' },
  { id: 'night', name: 'Night Mood', gradient: 'linear-gradient(135deg, #1c1f4a 0%, #3535EF 60%, #1FA2FF 100%)' },
]

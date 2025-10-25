/**
 * Pool de preguntas DISC
 * Cada pregunta tiene 4 opciones que corresponden a los 4 perfiles:
 * D = Dominancia (Directo, Decisivo, Dominante)
 * I = Influencia (Inspirador, Interactivo, Impresionante)
 * S = Estabilidad (Estable, Servicial, Sistemático)
 * C = Cumplimiento (Cuidadoso, Cauteloso, Correcto)
 */

const discQuestions = [
  {
    id: 1,
    pregunta: "Cuando trabajo en equipo, yo generalmente:",
    opciones: [
      { texto: "Tomo el control y dirijo el proyecto", perfil: "D" },
      { texto: "Motivo y entusiasmo a los demás", perfil: "I" },
      { texto: "Apoyo y ayudo a mantener la armonía", perfil: "S" },
      { texto: "Analizo y aseguro la calidad del trabajo", perfil: "C" }
    ]
  },
  {
    id: 2,
    pregunta: "Al enfrentar un desafío difícil, mi primera reacción es:",
    opciones: [
      { texto: "Atacar el problema directamente y buscar resultados rápidos", perfil: "D" },
      { texto: "Buscar apoyo de otros y generar ideas creativas", perfil: "I" },
      { texto: "Evaluar cuidadosamente la situación antes de actuar", perfil: "S" },
      { texto: "Investigar a fondo y crear un plan detallado", perfil: "C" }
    ]
  },
  {
    id: 3,
    pregunta: "En mi trabajo ideal, yo preferiría:",
    opciones: [
      { texto: "Tener autoridad y poder tomar decisiones importantes", perfil: "D" },
      { texto: "Trabajar con gente y crear un ambiente positivo", perfil: "I" },
      { texto: "Tener estabilidad y un ambiente predecible", perfil: "S" },
      { texto: "Trabajar con precisión siguiendo estándares altos", perfil: "C" }
    ]
  },
  {
    id: 4,
    pregunta: "Cuando alguien no está de acuerdo conmigo, yo:",
    opciones: [
      { texto: "Defiendo mi posición con firmeza", perfil: "D" },
      { texto: "Trato de persuadirlos con entusiasmo", perfil: "I" },
      { texto: "Escucho su punto de vista y busco compromisos", perfil: "S" },
      { texto: "Presento datos y hechos para apoyar mi argumento", perfil: "C" }
    ]
  },
  {
    id: 5,
    pregunta: "Mi ritmo de trabajo es generalmente:",
    opciones: [
      { texto: "Rápido y orientado a resultados inmediatos", perfil: "D" },
      { texto: "Activo y variado, me gusta cambiar de tarea", perfil: "I" },
      { texto: "Constante y metódico, prefiero la rutina", perfil: "S" },
      { texto: "Cuidadoso y deliberado, sin apuros", perfil: "C" }
    ]
  },
  {
    id: 6,
    pregunta: "La gente me describe como alguien:",
    opciones: [
      { texto: "Fuerte y directo", perfil: "D" },
      { texto: "Amigable y sociable", perfil: "I" },
      { texto: "Paciente y leal", perfil: "S" },
      { texto: "Preciso y reservado", perfil: "C" }
    ]
  },
  {
    id: 7,
    pregunta: "Cuando tomo decisiones, generalmente me baso en:",
    opciones: [
      { texto: "Mi instinto y experiencia", perfil: "D" },
      { texto: "Las opiniones de otras personas", perfil: "I" },
      { texto: "Lo que ha funcionado en el pasado", perfil: "S" },
      { texto: "Análisis cuidadoso de toda la información", perfil: "C" }
    ]
  },
  {
    id: 8,
    pregunta: "En una reunión, yo normalmente:",
    opciones: [
      { texto: "Dirijo la conversación hacia resultados concretos", perfil: "D" },
      { texto: "Contribuyo con ideas y mantengo el ambiente ligero", perfil: "I" },
      { texto: "Escucho más de lo que hablo", perfil: "S" },
      { texto: "Hago preguntas específicas y busco claridad", perfil: "C" }
    ]
  },
  {
    id: 9,
    pregunta: "Lo que más me motiva en el trabajo es:",
    opciones: [
      { texto: "Lograr metas ambiciosas y ganar", perfil: "D" },
      { texto: "Reconocimiento y aprecio de otros", perfil: "I" },
      { texto: "Seguridad y un ambiente armonioso", perfil: "S" },
      { texto: "Hacer las cosas correctamente y con excelencia", perfil: "C" }
    ]
  },
  {
    id: 10,
    pregunta: "Bajo presión, yo tiendo a:",
    opciones: [
      { texto: "Volverme más asertivo y tomar el control", perfil: "D" },
      { texto: "Ser desorganizado o demasiado optimista", perfil: "I" },
      { texto: "Evitar el conflicto y ceder ante otros", perfil: "S" },
      { texto: "Obsesionarme con los detalles", perfil: "C" }
    ]
  },
  {
    id: 11,
    pregunta: "Mi mayor fortaleza es:",
    opciones: [
      { texto: "Lograr resultados y superar obstáculos", perfil: "D" },
      { texto: "Inspirar y motivar a otros", perfil: "I" },
      { texto: "Ser confiable y crear estabilidad", perfil: "S" },
      { texto: "Mantener altos estándares de calidad", perfil: "C" }
    ]
  },
  {
    id: 12,
    pregunta: "Al comunicarme, yo soy:",
    opciones: [
      { texto: "Directo y al grano", perfil: "D" },
      { texto: "Expresivo y entusiasta", perfil: "I" },
      { texto: "Paciente y comprensivo", perfil: "S" },
      { texto: "Preciso y detallado", perfil: "C" }
    ]
  },
  {
    id: 13,
    pregunta: "En mi tiempo libre, prefiero:",
    opciones: [
      { texto: "Actividades competitivas o desafiantes", perfil: "D" },
      { texto: "Socializar y conocer gente nueva", perfil: "I" },
      { texto: "Relajarme en casa con familia o amigos cercanos", perfil: "S" },
      { texto: "Hobbies que requieren concentración y habilidad", perfil: "C" }
    ]
  },
  {
    id: 14,
    pregunta: "Cuando empiezo un proyecto nuevo, yo:",
    opciones: [
      { texto: "Me lanzo de inmediato a la acción", perfil: "D" },
      { texto: "Me emociono por las posibilidades", perfil: "I" },
      { texto: "Necesito tiempo para adaptarme", perfil: "S" },
      { texto: "Planifico cada detalle cuidadosamente", perfil: "C" }
    ]
  },
  {
    id: 15,
    pregunta: "Mi mayor temor en el trabajo es:",
    opciones: [
      { texto: "Perder el control o ser aprovechado", perfil: "D" },
      { texto: "Ser rechazado o ignorado", perfil: "I" },
      { texto: "Cambios súbitos o conflictos", perfil: "S" },
      { texto: "Cometer errores o ser criticado", perfil: "C" }
    ]
  },
  {
    id: 16,
    pregunta: "Al resolver problemas, yo prefiero:",
    opciones: [
      { texto: "Tomar decisiones rápidas y asumir riesgos", perfil: "D" },
      { texto: "Hacer una lluvia de ideas con otros", perfil: "I" },
      { texto: "Usar métodos probados y seguros", perfil: "S" },
      { texto: "Analizar todas las opciones sistemáticamente", perfil: "C" }
    ]
  },
  {
    id: 17,
    pregunta: "En conflictos, mi estilo es:",
    opciones: [
      { texto: "Confrontar directamente el problema", perfil: "D" },
      { texto: "Usar el humor para aliviar la tensión", perfil: "I" },
      { texto: "Evitar la confrontación si es posible", perfil: "S" },
      { texto: "Buscar soluciones lógicas y justas", perfil: "C" }
    ]
  },
  {
    id: 18,
    pregunta: "Mi espacio de trabajo ideal sería:",
    opciones: [
      { texto: "Eficiente y funcional, sin distracciones", perfil: "D" },
      { texto: "Abierto y colaborativo, lleno de energía", perfil: "I" },
      { texto: "Cómodo y personal, sin mucho cambio", perfil: "S" },
      { texto: "Organizado y ordenado, cada cosa en su lugar", perfil: "C" }
    ]
  },
  {
    id: 19,
    pregunta: "Cuando doy feedback a otros, yo:",
    opciones: [
      { texto: "Soy franco y directo sobre qué mejorar", perfil: "D" },
      { texto: "Enfatizo lo positivo y los animo", perfil: "I" },
      { texto: "Soy gentil y considerado con sus sentimientos", perfil: "S" },
      { texto: "Proporciono crítica constructiva específica", perfil: "C" }
    ]
  },
  {
    id: 20,
    pregunta: "Mi actitud hacia las reglas es:",
    opciones: [
      { texto: "Las cuestiono si limitan los resultados", perfil: "D" },
      { texto: "Soy flexible si hay buenas razones", perfil: "I" },
      { texto: "Las sigo porque dan estructura y seguridad", perfil: "S" },
      { texto: "Las respeto porque existen por algo", perfil: "C" }
    ]
  },
  {
    id: 21,
    pregunta: "En proyectos de grupo, mi rol natural es:",
    opciones: [
      { texto: "Líder que toma decisiones", perfil: "D" },
      { texto: "El que mantiene la moral alta", perfil: "I" },
      { texto: "Quien apoya y facilita el trabajo", perfil: "S" },
      { texto: "El experto que asegura la calidad", perfil: "C" }
    ]
  },
  {
    id: 22,
    pregunta: "Cuando recibo críticas, yo:",
    opciones: [
      { texto: "Me defiendo o contraataco", perfil: "D" },
      { texto: "Me siento herido pero trato de no mostrarlo", perfil: "I" },
      { texto: "Me retiro y necesito tiempo para procesarlo", perfil: "S" },
      { texto: "Analizo si la crítica es válida", perfil: "C" }
    ]
  },
  {
    id: 23,
    pregunta: "Al aprender algo nuevo, yo:",
    opciones: [
      { texto: "Quiero ir directo a lo práctico", perfil: "D" },
      { texto: "Aprendo mejor en grupo y compartiendo", perfil: "I" },
      { texto: "Necesito instrucciones claras paso a paso", perfil: "S" },
      { texto: "Leo el manual completo primero", perfil: "C" }
    ]
  },
  {
    id: 24,
    pregunta: "Mi nivel de energía es:",
    opciones: [
      { texto: "Intenso y enfocado en metas", perfil: "D" },
      { texto: "Alto y entusiasta, me emociono fácilmente", perfil: "I" },
      { texto: "Estable y consistente", perfil: "S" },
      { texto: "Reservado, conservo mi energía", perfil: "C" }
    ]
  },
  {
    id: 25,
    pregunta: "Al delegar tareas, yo:",
    opciones: [
      { texto: "Delego con autoridad y espero resultados", perfil: "D" },
      { texto: "Motivo y confío en que lo harán bien", perfil: "I" },
      { texto: "Me aseguro de que se sientan cómodos primero", perfil: "S" },
      { texto: "Doy instrucciones detalladas y claras", perfil: "C" }
    ]
  },
  {
    id: 26,
    pregunta: "Respecto al cambio organizacional, yo:",
    opciones: [
      { texto: "Lo impulso si mejora los resultados", perfil: "D" },
      { texto: "Me entusiasmo con nuevas posibilidades", perfil: "I" },
      { texto: "Necesito tiempo para adaptarme", perfil: "S" },
      { texto: "Quiero ver evidencia de que funcionará", perfil: "C" }
    ]
  },
  {
    id: 27,
    pregunta: "Mi estilo de liderazgo es:",
    opciones: [
      { texto: "Autocrático y orientado a resultados", perfil: "D" },
      { texto: "Carismático e inspirador", perfil: "I" },
      { texto: "Participativo y orientado al equipo", perfil: "S" },
      { texto: "Analítico y basado en competencia", perfil: "C" }
    ]
  },
  {
    id: 28,
    pregunta: "Lo que me frustra más es:",
    opciones: [
      { texto: "La ineficiencia y la indecisión", perfil: "D" },
      { texto: "El trabajo rutinario y aburrido", perfil: "I" },
      { texto: "La presión y los conflictos constantes", perfil: "S" },
      { texto: "La falta de claridad y los errores", perfil: "C" }
    ]
  },
  {
    id: 29,
    pregunta: "En negociaciones, yo:",
    opciones: [
      { texto: "Busco ganar y obtener el mejor trato", perfil: "D" },
      { texto: "Trato de que todos salgan contentos", perfil: "I" },
      { texto: "Busco soluciones justas y equitativas", perfil: "S" },
      { texto: "Me preparo con datos y argumentos sólidos", perfil: "C" }
    ]
  },
  {
    id: 30,
    pregunta: "Mi relación con los deadlines es:",
    opciones: [
      { texto: "Los cumplo siempre, cueste lo que cueste", perfil: "D" },
      { texto: "A veces los extiendo si hay buenas razones", perfil: "I" },
      { texto: "Trabajo constantemente para cumplirlos", perfil: "S" },
      { texto: "Planeo con anticipación para evitar prisas", perfil: "C" }
    ]
  },
  {
    id: 31,
    pregunta: "Cuando algo sale mal, yo:",
    opciones: [
      { texto: "Busco soluciones inmediatas y responsables", perfil: "D" },
      { texto: "Trato de mantener el optimismo del equipo", perfil: "I" },
      { texto: "Me preocupo por cómo afectará a todos", perfil: "S" },
      { texto: "Analizo qué falló para evitarlo en el futuro", perfil: "C" }
    ]
  },
  {
    id: 32,
    pregunta: "En presentaciones públicas, yo:",
    opciones: [
      { texto: "Soy asertivo y voy directo al punto", perfil: "D" },
      { texto: "Uso historias y humor para conectar", perfil: "I" },
      { texto: "Prefiero evitarlas si es posible", perfil: "S" },
      { texto: "Me preparo exhaustivamente con datos", perfil: "C" }
    ]
  },
  {
    id: 33,
    pregunta: "Mi forma de vestir en el trabajo es:",
    opciones: [
      { texto: "Profesional y de poder", perfil: "D" },
      { texto: "Moderna y llamativa", perfil: "I" },
      { texto: "Cómoda y práctica", perfil: "S" },
      { texto: "Conservadora y apropiada", perfil: "C" }
    ]
  },
  {
    id: 34,
    pregunta: "Al manejar múltiples tareas, yo:",
    opciones: [
      { texto: "Priorizo por impacto y urgencia", perfil: "D" },
      { texto: "Hago varias cosas a la vez", perfil: "I" },
      { texto: "Termino una antes de empezar otra", perfil: "S" },
      { texto: "Organizo y programo todo sistemáticamente", perfil: "C" }
    ]
  },
  {
    id: 35,
    pregunta: "Mi filosofía de vida es:",
    opciones: [
      { texto: "Hazlo ahora, hazlo rápido", perfil: "D" },
      { texto: "La vida es para disfrutarla", perfil: "I" },
      { texto: "Paso a paso, sin prisa pero sin pausa", perfil: "S" },
      { texto: "Si vale la pena hacerlo, hazlo bien", perfil: "C" }
    ]
  },
  {
    id: 36,
    pregunta: "Cuando trabajo en equipo virtual, yo:",
    opciones: [
      { texto: "Establezco metas claras y plazos", perfil: "D" },
      { texto: "Mantengo la comunicación activa y frecuente", perfil: "I" },
      { texto: "Me aseguro de que todos estén incluidos", perfil: "S" },
      { texto: "Documento todo y uso herramientas organizadas", perfil: "C" }
    ]
  },
  {
    id: 37,
    pregunta: "Mi uso del email es:",
    opciones: [
      { texto: "Breve y directo, bullets points", perfil: "D" },
      { texto: "Casual y amigable, con emojis", perfil: "I" },
      { texto: "Cortés y considerado", perfil: "S" },
      { texto: "Formal y bien estructurado", perfil: "C" }
    ]
  },
  {
    id: 38,
    pregunta: "En capacitaciones, yo busco:",
    opciones: [
      { texto: "Herramientas prácticas para ser más efectivo", perfil: "D" },
      { texto: "Networking y conexiones con otros", perfil: "I" },
      { texto: "Desarrollar habilidades útiles gradualmente", perfil: "S" },
      { texto: "Conocimiento profundo y certificaciones", perfil: "C" }
    ]
  },
  {
    id: 39,
    pregunta: "Al recibir una tarea ambigua, yo:",
    opciones: [
      { texto: "Tomo la iniciativa e interpreto a mi manera", perfil: "D" },
      { texto: "Pregunto a otros qué opinan", perfil: "I" },
      { texto: "Pido clarificación antes de empezar", perfil: "S" },
      { texto: "Investigo y defino los requerimientos exactos", perfil: "C" }
    ]
  },
  {
    id: 40,
    pregunta: "Mi actitud hacia la innovación es:",
    opciones: [
      { texto: "La adopto si da ventaja competitiva", perfil: "D" },
      { texto: "Me emociono con lo nuevo y diferente", perfil: "I" },
      { texto: "Prefiero mejoras incrementales", perfil: "S" },
      { texto: "La evalúo críticamente antes de adoptar", perfil: "C" }
    ]
  },
  {
    id: 41,
    pregunta: "Cuando lidero un proyecto, primero:",
    opciones: [
      { texto: "Establezco los objetivos y resultados esperados", perfil: "D" },
      { texto: "Reúno al equipo y genero entusiasmo", perfil: "I" },
      { texto: "Entiendo las necesidades y preocupaciones del equipo", perfil: "S" },
      { texto: "Creo un plan detallado con cronograma", perfil: "C" }
    ]
  },
  {
    id: 42,
    pregunta: "En situaciones de crisis, yo:",
    opciones: [
      { texto: "Tomo el mando y actúo decisivamente", perfil: "D" },
      { texto: "Mantengo la calma del equipo", perfil: "I" },
      { texto: "Busco estabilizar la situación", perfil: "S" },
      { texto: "Analizo las causas y soluciones", perfil: "C" }
    ]
  },
  {
    id: 43,
    pregunta: "Mi forma de celebrar logros es:",
    opciones: [
      { texto: "Paso rápido al siguiente desafío", perfil: "D" },
      { texto: "Organizo una celebración con el equipo", perfil: "I" },
      { texto: "Agradezco a quienes contribuyeron", perfil: "S" },
      { texto: "Documento las lecciones aprendidas", perfil: "C" }
    ]
  },
  {
    id: 44,
    pregunta: "Al dar instrucciones, yo:",
    opciones: [
      { texto: "Digo qué hacer y espero que se haga", perfil: "D" },
      { texto: "Explico la visión y los inspiro", perfil: "I" },
      { texto: "Me aseguro de que entiendan y se sientan cómodos", perfil: "S" },
      { texto: "Proporciono pasos específicos y ejemplos", perfil: "C" }
    ]
  },
  {
    id: 45,
    pregunta: "Mi escritorio/área de trabajo es:",
    opciones: [
      { texto: "Funcional con lo esencial", perfil: "D" },
      { texto: "Lleno de fotos, colores y recuerdos", perfil: "I" },
      { texto: "Personal y cómodo", perfil: "S" },
      { texto: "Impecable y organizado", perfil: "C" }
    ]
  },
  {
    id: 46,
    pregunta: "Al hacer networking, yo:",
    opciones: [
      { texto: "Busco contactos que puedan ser útiles", perfil: "D" },
      { texto: "Disfruto conocer gente nueva", perfil: "I" },
      { texto: "Prefiero profundizar relaciones existentes", perfil: "S" },
      { texto: "Selecciono cuidadosamente a quién conocer", perfil: "C" }
    ]
  },
  {
    id: 47,
    pregunta: "Mi actitud hacia la competencia es:",
    opciones: [
      { texto: "Me motiva y me hace mejorar", perfil: "D" },
      { texto: "La veo como oportunidad de colaborar", perfil: "I" },
      { texto: "Me incomoda, prefiero la cooperación", perfil: "S" },
      { texto: "La analizo para encontrar ventajas", perfil: "C" }
    ]
  },
  {
    id: 48,
    pregunta: "Cuando me siento sobrecargado, yo:",
    opciones: [
      { texto: "Elimino lo no esencial y sigo adelante", perfil: "D" },
      { texto: "Pido ayuda y delego", perfil: "I" },
      { texto: "Me estreso pero continúo cumpliendo", perfil: "S" },
      { texto: "Reorganizo y re-priorizo metódicamente", perfil: "C" }
    ]
  },
  {
    id: 49,
    pregunta: "En mi desarrollo profesional, busco:",
    opciones: [
      { texto: "Ascender y tener más responsabilidad", perfil: "D" },
      { texto: "Ser reconocido y valorado", perfil: "I" },
      { texto: "Ser experto y confiable en mi área", perfil: "S" },
      { texto: "Dominar mi campo con excelencia", perfil: "C" }
    ]
  },
  {
    id: 50,
    pregunta: "Al terminar el día laboral, yo:",
    opciones: [
      { texto: "Reviso lo logrado y planeo el siguiente día", perfil: "D" },
      { texto: "Socializo con colegas", perfil: "I" },
      { texto: "Desconecto y paso tiempo con seres queridos", perfil: "S" },
      { texto: "Completo tareas pendientes para dejar todo en orden", perfil: "C" }
    ]
  },
  {
    id: 51,
    pregunta: "Mi reacción ante el fracaso es:",
    opciones: [
      { texto: "Aprender rápido y reintentar con más fuerza", perfil: "D" },
      { texto: "Buscar apoyo emocional y motivación", perfil: "I" },
      { texto: "Me toma tiempo recuperarme", perfil: "S" },
      { texto: "Analizo exhaustivamente qué salió mal", perfil: "C" }
    ]
  },
  {
    id: 52,
    pregunta: "En reuniones de lluvia de ideas, yo:",
    opciones: [
      { texto: "Evalúo rápidamente qué ideas son viables", perfil: "D" },
      { texto: "Genero muchas ideas creativas", perfil: "I" },
      { texto: "Apoyo y desarrollo las ideas de otros", perfil: "S" },
      { texto: "Analizo pros y contras de cada propuesta", perfil: "C" }
    ]
  },
  {
    id: 53,
    pregunta: "Mi tolerancia al riesgo es:",
    opciones: [
      { texto: "Alta, los riesgos traen grandes recompensas", perfil: "D" },
      { texto: "Media, si el ambiente es positivo", perfil: "I" },
      { texto: "Baja, prefiero lo seguro y probado", perfil: "S" },
      { texto: "Depende del análisis de probabilidades", perfil: "C" }
    ]
  },
  {
    id: 54,
    pregunta: "Al recibir un ascenso, yo:",
    opciones: [
      { texto: "Lo veo como algo merecido y busco el siguiente", perfil: "D" },
      { texto: "Lo celebro y comparto mi alegría", perfil: "I" },
      { texto: "Me preocupo por estar a la altura", perfil: "S" },
      { texto: "Planifico cómo desempeñarme perfectamente", perfil: "C" }
    ]
  },
  {
    id: 55,
    pregunta: "Mi uso de la tecnología es:",
    opciones: [
      { texto: "La uso si me hace más productivo", perfil: "D" },
      { texto: "Me gustan los gadgets nuevos y las redes sociales", perfil: "I" },
      { texto: "Uso lo necesario cuando me siento cómodo", perfil: "S" },
      { texto: "La domino completamente antes de usarla", perfil: "C" }
    ]
  },
  {
    id: 56,
    pregunta: "En situaciones sociales de trabajo, yo:",
    opciones: [
      { texto: "Las uso para networking estratégico", perfil: "D" },
      { texto: "Soy el alma de la fiesta", perfil: "I" },
      { texto: "Participo pero prefiero grupos pequeños", perfil: "S" },
      { texto: "Asisto por compromiso, no es mi preferencia", perfil: "C" }
    ]
  },
  {
    id: 57,
    pregunta: "Al mentorear a alguien, yo:",
    opciones: [
      { texto: "Los desafío a salir de su zona de confort", perfil: "D" },
      { texto: "Los motivo y celebro sus avances", perfil: "I" },
      { texto: "Los apoyo pacientemente en su proceso", perfil: "S" },
      { texto: "Les enseño las mejores prácticas y estándares", perfil: "C" }
    ]
  },
  {
    id: 58,
    pregunta: "Mi nivel de detalle al reportar es:",
    opciones: [
      { texto: "Resumen ejecutivo con puntos clave", perfil: "D" },
      { texto: "Narrativo con contexto y anécdotas", perfil: "I" },
      { texto: "Completo pero claro", perfil: "S" },
      { texto: "Exhaustivo con todos los datos", perfil: "C" }
    ]
  },
  {
    id: 59,
    pregunta: "Cuando alguien necesita ayuda, yo:",
    opciones: [
      { texto: "Les digo qué hacer para resolver rápido", perfil: "D" },
      { texto: "Los animo y les ofrezco apoyo moral", perfil: "I" },
      { texto: "Me tomo tiempo para ayudarlos personalmente", perfil: "S" },
      { texto: "Les doy recursos y guías detalladas", perfil: "C" }
    ]
  },
  {
    id: 60,
    pregunta: "Mi visión del éxito es:",
    opciones: [
      { texto: "Lograr objetivos ambiciosos y poder", perfil: "D" },
      { texto: "Ser reconocido y tener impacto positivo", perfil: "I" },
      { texto: "Tener estabilidad y relaciones significativas", perfil: "S" },
      { texto: "Alcanzar la excelencia y maestría", perfil: "C" }
    ]
  }
];

module.exports = discQuestions;

/**
 * Calcula el tiempo transcurrido desde una fecha dada y lo devuelve
 * en un formato amigable y localizado (ej: "hace 3 días", "ayer").
 *
 * @param fechaPost - Puede ser un objeto Date, un string de fecha o un timestamp en milisegundos.
 * @returns Un string formateado con el tiempo relativo.
 */
export function obtenerTiempoTranscurrido(fechaPost: Date | string | number): string {
  const fecha = new Date(fechaPost);
  const ahora = new Date();

  // Calculamos la diferencia en milisegundos
  const diferenciaMs = fecha.getTime() - ahora.getTime();

  // Definimos la estructura para las unidades de tiempo
  interface UnidadTiempo {
    limite: number;
    valor: number;
    nombre: Intl.RelativeTimeFormatUnit;
  }

  // Equivalentes de tiempo en milisegundos
  const unidades: UnidadTiempo[] = [
    { limite: 60 * 1000, valor: 1000, nombre: 'second' },
    { limite: 60 * 60 * 1000, valor: 60 * 1000, nombre: 'minute' },
    { limite: 24 * 60 * 60 * 1000, valor: 60 * 60 * 1000, nombre: 'hour' },
    { limite: 30 * 24 * 60 * 60 * 1000, valor: 24 * 60 * 60 * 1000, nombre: 'day' },
    { limite: 365 * 24 * 60 * 60 * 1000, valor: 30 * 24 * 60 * 60 * 1000, nombre: 'month' },
    { limite: Infinity, valor: 365 * 24 * 60 * 60 * 1000, nombre: 'year' }
  ];

  // Buscamos la unidad que corresponda según la diferencia actual
  const unidadActual = unidades.find(u => Math.abs(diferenciaMs) < u.limite)
    || unidades[unidades.length - 1]; // Fallback por seguridad

  // Calculamos la cantidad numérica redondeando de forma exacta
  const cantidad = Math.round(diferenciaMs / unidadActual.valor);

  // Inicializamos el formateador nativo en español de Argentina
  const rtf = new Intl.RelativeTimeFormat('es-AR', { numeric: 'auto' });

  return rtf.format(cantidad, unidadActual.nombre);
}

import { SingleBar } from 'cli-progress';

/**
 * Crea una barra de progreso para mostrar el progreso de una operación de trabajo.
 * La barra de progreso mostrará el porcentaje de finalización, la cantidad de archivos procesados ​​y una representación de la barra visual.
 */
export const barraProgress = new SingleBar({
    format: 'Progreso de Trabajo |' + '{bar}' + '| {percentage}% || {value}/{total} Archivos',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    progressCalculationRelative: true
})

/**
 * Crea una barra de progreso para mostrar el progreso de una operación de trabajo.
 * La barra de progreso mostrará el porcentaje de finalización, la cantidad de archivos procesados ​​y una representación visual de la barra.
 */
export const barraProgressAws = new SingleBar({
    format: 'Subida de Archivos|' + '{bar}' + '| {percentage}% || {value} / {total} Restante',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    progressCalculationRelative: true
});
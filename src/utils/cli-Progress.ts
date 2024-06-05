import { SingleBar } from 'cli-progress';

export const barraProgress = new SingleBar({
    format: 'Progreso de Trabajo |' + '{bar}' + '| {percentage}% || {value}/{total} Archivos',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    progressCalculationRelative: true
})

export const barraProgressAws = new SingleBar({
    format: 'Subida de Archivos|' + '{bar}' + '| {percentage}% || {value} / {total} Restante',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    progressCalculationRelative: true
});
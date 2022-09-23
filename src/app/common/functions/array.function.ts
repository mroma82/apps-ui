export function sortArray(arr: any[], func: any) {
    return arr.sort((x, y) => func(x) > func(y) ? 1 : -1);
}
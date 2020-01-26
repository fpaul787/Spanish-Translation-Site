
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 * Taken from stackoverflow
 */
export function shuffle(a) {
    var j, x, i
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
    }
    return a
}

export const reverseMapping = dict => Object.keys(dict).reduce((ret, key) => {
    ret[dict[key]] = key
    return ret
}, {})
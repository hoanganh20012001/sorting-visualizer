import {
    ORANGE_COLOR,
    PINK_COLOR,
    SECONDARY_COLOR,
    THIRST_COLOR,
} from '../constants'
import {
    changeColorAnimation,
    finishedSort,
    getValueBar,
    swapContent,
    swapHeight,
} from '../helpers'

const heapify = async (arr, n, i) => {
    let largest = i
    const l = 2 * i + 1
    const r = 2 * i + 2

    if (l < n && getValueBar(arr, l) > getValueBar(arr, largest)) {
        largest = l
    }

    if (r < n && getValueBar(arr, r) > getValueBar(arr, largest)) {
        largest = r
    }

    if (largest !== i) {
        await Promise.all([
            changeColorAnimation(arr, i, ORANGE_COLOR),
            swapHeight(arr, i, largest),
            swapContent(arr, i, largest),
            heapify(arr, n, largest),
        ])
    }

    arr[largest].style.backgroundColor = SECONDARY_COLOR
}

const heapSort = async () => {
    const arr = document.querySelectorAll('.bar')
    const n = arr.length

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await changeColorAnimation(arr, i, PINK_COLOR)
        await Promise.all([heapify(arr, n, i)])
    }

    for (let i = n - 1; i > 0; i--) {
        await changeColorAnimation(arr, i, THIRST_COLOR, 200)
        await Promise.all([
            swapHeight(arr, 0, i),
            swapContent(arr, 0, i),
            heapify(arr, i, 0),
        ])
    }
    arr[0].style.backgroundColor = THIRST_COLOR
    await finishedSort(arr, 100)
}
export default heapSort

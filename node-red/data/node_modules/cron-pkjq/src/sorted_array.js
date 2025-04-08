'use strict';

///////////////////////////////////////////////////////
// this code borrowed from stackoverflow: https://stackoverflow.com/questions/22697936/binary-search-in-javascript
//
function binarySearch(arr, pred) {
    let begin   = -1;
    let end     = arr.length;

    while (1 + begin < end) {
        const mi = begin + ((end - begin) >> 1);

        if (pred(arr[mi]))
            end = mi;
        else
            begin = mi;
    }

    return end;
}

function lowerBound(arr, item, elementExtractor) {
    return binarySearch(arr, j => elementExtractor(item) <= elementExtractor(j));
}

function upperBound(arr, item, elementExtractor) {
    return binarySearch(arr, j => elementExtractor(item) < elementExtractor(j));
}
////////////////////////////////////////////////////


class SortedArray {
    constructor(elementExtractor) {
        //super();

        this._array = [];

        this._elementExtractor = elementExtractor;
    }


    push(value) {
        const boundInd = upperBound(this._array, value, this._elementExtractor);
        this._array.splice(boundInd, 0, value);
    }

    resort() {
        this._array.sort((a, b) => { return (this._elementExtractor(a) - this._elementExtractor(b)); });
    }

    get array() {
        return this._array;
    }

    get front() {
        return this._array[0];
    }
};


/////////////////////////////
module.exports = SortedArray;
/////////////////////////////

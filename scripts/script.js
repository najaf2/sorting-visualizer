
let outer = document.getElementById("outer");

// Create random vals
randomize();


function randomize() {
    // Remove all the vals that are already there
    while (outer.firstChild) {
        outer.firstChild.remove()
    }

    // Create 20 divs with differing heights
    for (let i = 0; i < 100; i++) {
        // Create a val and set its id
        val = document.createElement('div');
        val.id = "vals"
        // append it to outer and put in the array
        outer.appendChild(val);
        // Set its width to 20 and its height to a random num
        val.style.width = "3vw"
        let rand = Math.floor(Math.random() * (70 - 5) + 5);
        val.style.height = rand + "vh";
    }

}
arrVals = document.querySelectorAll("#vals");
let visited = new Array(arrVals.length)
visited.fill(0, 0, arrVals.length - 1)

async function bubbleSort(delay = 100) {
    let n = arrVals.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            arrVals[j].style.backgroundColor = "#47B880";
            arrVals[j + 1].style.backgroundColor = "#B8477F";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            let value1 = Number(("" + arrVals[j].style.height + "").replace("vh", ""));
            let value2 = Number(("" + arrVals[j + 1].style.height + "").replace("vh", ""));

            // To compare value of two vals
            if (value1 > value2) {

                arrVals[j].style.backgroundColor = "#B8477F";
                arrVals[j + 1].style.backgroundColor = "#47B880";
                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, delay)
                );
                await swap(arrVals[j], arrVals[j + 1], delay / 3);

                arrVals = document.querySelectorAll("#vals");
            }
            arrVals[j].style.backgroundColor = "white";
            arrVals[j + 1].style.backgroundColor = "white";
        }

        arrVals[n - i - 1]
            .style.backgroundColor = "lime";
    }
}

// Promise to swap two blocks
function swap(x, y, delay) {
    return new Promise((resolve) => {
        let temp = x.style.transform;
        x.style.transform = y.style.transform;
        y.style.transform = temp;

        window.requestAnimationFrame(function () {
            setTimeout(() => {
                outer.insertBefore(y, x);
                resolve();
            }, delay);
        });
    });
}

async function selectionSort(delay = 50) {
    let n = arrVals.length;
    for (let i = 0; i < n; i++) {
        let min = i;
        let pastMins = []
        arrVals[min].style.backgroundColor = "#B8477F";
        pastMins.push(arrVals[min])
        for (let j = i + 1; j < n; j++) {
            arrVals[j].style.backgroundColor = "#47B880";
            pastMins.push(arrVals[j])
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            let value1 = Number(("" + arrVals[j].style.height + "").replace("vh", ""));
            let value2 = Number(("" + arrVals[min].style.height + "").replace("vh", ""));

            if (value1 < value2) {
                min = j;
                arrVals[j].style.backgroundColor = "white";
                arrVals[min].style.backgroundColor = "#B8477F";
            }

            if (min != j) {
                arrVals[j].style.backgroundColor = "white";
            }


        }
        pastMins.forEach((elem) => {
            elem.style.backgroundColor = "white";
        })

        if (min != i) {
            await swap(arrVals[i], arrVals[min])
            arrVals = document.querySelectorAll("#vals");
            arrVals[min].style.backgroundColor = "white";
        }
        arrVals[i].style.backgroundColor = "lime";

    }
}

async function radixBucketSort(delay = 100) {
    let idx1, idx2, idx3, len1, len2, radix, radixKey;
    let radices = {}, buckets = {}, num, curr;
    let currLen, radixStr, currBucket;

    len1 = arrVals.length;
    len2 = 10;  // radix sort uses ten buckets

    for (idx1 = 0; idx1 < len1; idx1++) {
        radices[arrVals[idx1].style.height.replace("vh", "").toString().length] = 0;
    }

    for (radix in radices) {
        len1 = arrVals.length;
        for (idx1 = 0; idx1 < len1; idx1++) {
            arrVals[idx1].style.backgroundColor = "green"
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 50)
            );
            curr = Number(arrVals[idx1].style.height.replace("vh", ""));
            currLen = curr.toString().length;

            if (currLen >= radix) {
                radixKey = curr.toString()[currLen - radix];
                if (!buckets.hasOwnProperty(radixKey)) {
                    buckets[radixKey] = [];
                }

                buckets[radixKey].push(curr);
            }

            else {
                if (!buckets.hasOwnProperty('0')) {
                    buckets['0'] = [];
                }
                buckets['0'].push(curr);
            }

            arrVals[idx1].style.backgroundColor = "white"

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
        }

        idx1 = 0;

        for (idx2 = 0; idx2 < len2; idx2++) {
            arrVals[idx2].style.backgroundColor = "blue"

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            if (buckets[idx2] != null) {
                currBucket = buckets[idx2];
                len1 = currBucket.length;
                for (idx3 = 0; idx3 < len1; idx3++) {

                    arrVals[idx1++].style.height = currBucket[idx3] + "vh";
                    arrVals[idx3].style.backgroundColor = "yellow"

                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, delay)
                    );

                    arrVals[idx3].style.backgroundColor = "white"

                }
            }

            arrVals[idx2].style.backgroundColor = "white"

        }
        buckets = {};
    }

    valValues = []
    arrVals.forEach((elem) => {
        valValues.push((Number(elem.style.height.replace("vh", ""))))
    })

    let sorted = true;

    for (let k = 0; k < valValues.length - 1; k++) {
        if (valValues[k] > valValues[k + 1]) {
            sorted = false;
            break;
        }
    }

    if (!sorted) {
        bubbleSort();
    }

    else {
        for (let k = 0; k < arrVals.length; k++) {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 30)
            );

            arrVals[k].style.backgroundColor = "lime"
        }
    }

}

async function insertionSort(delay = 100) {
    let n = arrVals.length;
    arrVals[0].style.backgroundColor = "#B8477F";

    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = Number(arrVals[i].style.height.replace("vh", ""));
        arrVals[i].style.backgroundColor = "#B8477F";

        console.log(current)
        // The last element of our sorted subarray
        let j = i - 1;

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        while ((j > -1) && (current < Number(arrVals[j].style.height.replace("vh", "")))) {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay));

            arrVals[j + 1].style.height = arrVals[j].style.height;
            arrVals[j].style.backgroundColor = "red"
            if (j > 0) {
                arrVals[j - 1].style.backgroundColor = "red"
            }


            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay));
            j--;

            for (let k = i; k >= 0; k--) {
                arrVals[k].style.backgroundColor = "lime";
            }

        }
        arrVals[j + 1].style.height = current.toString() + "vh";


        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        arrVals[i].style.backgroundColor = "lime"
    }
}

async function merge(start, mid, end, delay) {
    let start2 = mid + 1;

    // If the direct merge is already sorted
    if (Number(arrVals[mid].style.height.replace("vh", "")) <= Number(arrVals[start2].style.height.replace("vh", ""))) {
        return;
    }

    // Two pointers to maintain start
    // of both arrays to merge
    while (start <= mid && start2 <= end) {
        arrVals[start].style.backgroundColor = "red"
        arrVals[end].style.backgroundColor = "red"

        await timeout(delay);
        // If element 1 is in right place
        if (Number(arrVals[start].style.height.replace("vh", "")) <= Number(arrVals[start2].style.height.replace("vh", ""))) {
            arrVals[start].style.backgroundColor = "white"
            arrVals[end].style.backgroundColor = "white"
            start++;
        }
        else {
            let value = Number(arrVals[start2].style.height.replace("vh", ""));
            let index = start2;

            // Shift all the elements between element 1
            // element 2, right by 1.
            while (index != start) {
                arrVals[index].style.height = arrVals[index - 1].style.height.toString();
                index--;
            }
            arrVals[start].style.height = value.toString() + "vh";

            // Update all the pointers
            arrVals[start].style.backgroundColor = "white"
            arrVals[end].style.backgroundColor = "white"

            start++;
            mid++;
            start2++;
        }
    }
}

async function mergeColors(l, r, delay) {
    for (let i = l; i < arrVals.length; i++) {
        arrVals[i].style.backgroundColor = "white"

        if (visited[i] == 1) {

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay / 3));

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay / 3));

            arrVals[i].style.backgroundColor = "lime"
        }
    }

    for (let i = l; i <= r + 1; i++) {
        visited[i] = 1
    }
}

async function mergeSort(l, r, delay = 100) {
    if (l < r) {
        // Same as (l + r) / 2, but avoids overflow
        // for large l and r
        let m = l + Math.floor((r - l) / 2);

        // Sort first and second halves
        await mergeSort(l, m);
        await mergeSort(m + 1, r);
        await merge(l, m, r, delay);
        await mergeColors(l, m, delay)
        await timeout(delay)
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Heapify(n, i, delay) {
    let arrVals = document.querySelectorAll("#vals");
    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2

    await putColor.apply(null, [i, l, r, largest, n])


    // If left child is larger than root
    if (
        l < n &&
        Number(arrVals[l].style.height.replace("vh", "")) >
        Number(arrVals[largest].style.height.replace("vh", ""))
    ) {
        largest = l;
    }

    // If right child is larger than largest so far
    if (
        r < n &&
        Number(arrVals[r].style.height.replace("vh", "")) >
        Number(arrVals[largest].style.height.replace("vh", ""))
    ) {
        largest = r;
    }

    // If largest is not root
    if (largest != i) {

        let temp1 = arrVals[i].style.height;
        arrVals[i].style.height = arrVals[largest].style.height;
        arrVals[largest].style.height = temp1;

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        await Heapify(n, largest);
        await colorfy(n, largest - 1)


    }
}

async function putColor(i, delay) {
    await new Promise((resolve) =>
        setTimeout(() => {
            if (i >= 0 && i < arrVals.length)
                arrVals[i].style.backgroundColor = "red"
            resolve();
        }, delay / 3));
}

async function colorfy(n, i, delay) {
    let temp1 = n;
    let temp2 = i

    console.log(temp1)
    console.log(temp2)

    arrVals.forEach((elem) => {
        if (elem.style.backgroundColor != "lime")
            elem.style.backgroundColor = "white"
    })


    await new Promise((resolve) =>
        setTimeout(() => {
            if (temp1 <= arrVals.length - 1 && temp1 > 0)
                arrVals[temp1].style.backgroundColor = "red"

            if (temp2 >= 0 && temp2 <= arrVals.length - 1)
                arrVals[temp2].style.backgroundColor = "red"
            resolve();
        }, delay / 3));

}

async function HeapSort(delay = 100) {
    let arrVals = document.querySelectorAll("#vals");
    n = arrVals.length
    temp = n
    for (let i = n / 2 - 1; i >= 0; i--) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
        await Heapify(n, i);
        await colorfy(temp--, i)
    }

    for (let i = n - 1; i > 0; i--) {
        arrVals[i].style.backgroundColor = "lime"
        let temp1 = arrVals[i].style.height;
        arrVals[i].style.height = arrVals[0].style.height;
        arrVals[0].style.height = temp1;


        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        await Heapify(i, 0);
        await colorfy(i - 1, 0)
    }

    for (let k = 0; k < arrVals.length; k++) {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 30)
        );

        arrVals[k].style.backgroundColor = "lime"
    }

}

function getHeightAsNum(elem) {
    return Number(elem.style.height.replace("vh", ""))
}

async function Bogosort(arr = arrVals){
    var isSorted = function(arr){
        for(var i = 1; i < arr.length; i++){
            if (getHeightAsNum(arr[i-1]) > getHeightAsNum(arr[i])) {
                return false;
            }
        }
        return true;
    };

    async function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = getHeightAsNum(arr[i]) + "vh";
            arr[i].style.height = arr[j].style.height;
            arr[j].style.height = temp;
            console.log("swap")
        }

        return arr
    }
      

    async function sort(arr){
        var sorted = false;
        while(!sorted){
            arr = await shuffle(arr);
            bogoColor()
            await timeout(5)
            sorted = isSorted(arr);
            
        }

        for (let k = 0; k < arrVals.length; k++) {
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 70)
            );

            arrVals[k].style.backgroundColor = "lime"
        }
        document.getElementById("vals").style.transition = "0.05s all ease-in"
        return arr;
    }

    async function bogoColor(arr) {
        
        arrVals.forEach((elem) => {
            let randColor;
            if (elem.style.backgroundColor != "lime")
                randColor = Math.floor(Math.random()*16777215).toString(16);
                elem.style.backgroundColor = "#" + randColor;
        })
    }
    document.getElementById("vals").style.transition = "None"
    return sort(arr);
}

// selectionSort(); //17sec
// bubbleSort(); //22sec
// radixBucketSort(); //16sec
// insertionSort(); //39sec
// mergeSort(0, arrVals.length-1) //22sec
// HeapSort()
Bogosort()

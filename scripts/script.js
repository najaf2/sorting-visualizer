let outer = document.getElementById("outer");
// Create random vals
randomize();

function randomize() {
    // Remove all the vals that are already there
    while (outer.firstChild) {
        outer.firstChild.remove()
    }

    // Create 20 divs with differing heights
    for (let i = 0; i < 20; i++) {
        // Create a val and set its id
        val = document.createElement('div');
        val.id = "vals"
        // append it to outer and put in the array
        outer.appendChild(val);
        // Set its width to 20 and its height to a random num
        val.style.width = "3vw"
        val.style.height = Math.floor(Math.random() * (70 - 5) + 5) + "vh";
    }

}
arrVals = document.querySelectorAll("#vals");

async function bubbleSort(delay = 50) {
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
                await swap(arrVals[j], arrVals[j + 1]);

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
function swap(x, y) {
    return new Promise((resolve) => {
        let temp = x.style.transform;
        x.style.transform = y.style.transform;
        y.style.transform = temp;

        window.requestAnimationFrame(function () {
            setTimeout(() => {
                outer.insertBefore(y, x);
                resolve();
            }, 100);
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
        if (valValues[k] > valValues[k+1]) {
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

                arrVals[j+1].style.height = arrVals[j].style.height;
                arrVals[j].style.backgroundColor = "red"
                if (j > 0) {
                    arrVals[j-1].style.backgroundColor = "red"
                }


                await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay));
                j--;

                for(let k = i; k >= 0; k--){
                    arrVals[k].style.backgroundColor = "lime";
                }

            }
            arrVals[j+1].style.height = current.toString() + "vh";


            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
            }, delay)
            );

            arrVals[i].style.backgroundColor = "lime"
        }
}

// selectionSort();
// bubbleSort();
// radixBucketSort();
insertionSort();


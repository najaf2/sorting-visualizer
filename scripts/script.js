let outer = document.getElementById("outer");
// Create random vals
randomize();




function randomize() {
    // Remove all the vals that are already there
    while (outer.firstChild) {
        outer.firstChild.remove()
    }

    for (let i = 0; i < 20; i++) {
        // Create a val and set its id
        val = document.createElement('div');
        val.id = "vals"
        // append it to outer and put in the array
        outer.appendChild(val);
        // Set its width to 20 and its height to a random num
        val.style.width = "3vw"
        val.style.height = Math.floor(Math.random() * (70-5) + 5) + "vh";
    } 

    arrVals = document.querySelectorAll("#vals");
}


async function bubbleSort(delay = 50) { 
    let n = arrVals.length;
        
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n - i - 1; j++){
            arrVals[j].style.backgroundColor = "#47B880";
            arrVals[j+1].style.backgroundColor = "#B8477F";

            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, delay)
            );

            let value1 = Number(("" + arrVals[j].style.height + "").replace("vh", ""));
            let value2 = Number(("" + arrVals[j + 1].style.height + "").replace("vh", ""));

            // To compare value of two vals
            if (value1 > value2) {
                await swap(arrVals[j], arrVals[j + 1]);
                arrVals = document.querySelectorAll("#vals");

            }

            arrVals[j].style.backgroundColor = "white";
            arrVals[j+1].style.backgroundColor = "white";
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
  
        window.requestAnimationFrame(function() {
            setTimeout(() => {
                outer.insertBefore(y, x);
                resolve();
            }, 100);
        });
    });
}

async function selectionSort(delay = 100) { 
    let n = arrVals.length;
    // min B8477F
    // red 47B880
    // current white

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

selectionSort();
// bubbleSort();
let min = parseInt(prompt("Enter the Minimum Number"));
let max = parseInt(prompt("Enter the Maximum Number"));

function displayEvenNumbers(min, max) {
    if (min > max) {
        return;
    }
    
    else if (min % 2 === 0) {
        console.log(min);
    }
    
    displayEvenNumbers(min + 1, max);
}

displayEvenNumbers(min, max);
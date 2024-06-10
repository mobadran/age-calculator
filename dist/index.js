let invalid = false;

// Calling the function when ANY key is pressed
const yearIn = document.getElementById('year-in');
yearIn.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        calculate()
    }
});
const monthIn = document.getElementById('month-in');
monthIn.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        calculate()
    }
});
const dayIn = document.getElementById('day-in');
dayIn.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        calculate()
    }
});


function redden(which, why) {
    switch (which) {
        case 'day':
            document.getElementById('day-div').classList.add('div-invalid');
            switch (why) {
                case 'range':
                    document.getElementById('day-p').innerHTML = 'Must be a valid day';
                    break;
                case 'int':
                    document.getElementById('day-p').innerHTML = 'Must be an integer';
                    break;
                case 'required':
                    document.getElementById('day-p').innerHTML = 'This field is required';
                    break;
            }
            break;
        case 'month':
            document.getElementById('month-div').classList.add('div-invalid');
            switch (why) {
                case 'range':
                    document.getElementById('month-p').innerHTML = 'The month must be a valid month';
                    break;
                case 'int':
                    document.getElementById('month-p').innerHTML = 'Must be an integer';
                    break;
                case 'required':
                    document.getElementById('month-p').innerHTML = 'This field is required';
                    break;
            }
            break;
        case 'year':
            document.getElementById('year-div').classList.add('div-invalid');
            switch (why) {
                case 'range':
                    document.getElementById('year-p').innerHTML = 'Year must be in the past';
                    break;
                case 'int':
                    document.getElementById('year-p').innerHTML = 'Must be an integer';
                    break;
                case 'required':
                    document.getElementById('year-p').innerHTML = 'This field is required';
                    break;
            }
            break;
    }
}

// Is Valid Date
function validDate(year, month, day) {
    const current = new Date();
    let monthNow = current.getMonth() + 1;
    if (year > current.getFullYear()) {
        redden('year', 'range');
        invalid = true;
    } else if (year == current.getFullYear()) {
        if (month > monthNow) {
            redden('month', 'range');
            invalid = true;
            if (day > current.getDate()) {
                console.log(day, current.getDate());
                redden('day', 'range');
                invalid = true;
            }
        } else if (month == monthNow) {
            if (day > current.getDate()) {
                redden('day', 'range');
                invalid = true;
            }
        }
    }
    if (month < 1 || month > 12) {
        redden('month', 'range');
        invalid = true;
    }
    if (day < 1 || day > 31) {
        redden('day', 'range');
        invalid = true;
    }

    // Create a date object and check if the day matches (handles month/day combinations)
    const date = new Date(year, month - 1, day);
    if (date.getDate() != day) {
        redden('day', 'range');
        invalid = true;
    }
    if (invalid) return false;
    return true;
}

// Reset
function reset(which) {
    document.getElementById(`${which}-div`).classList.remove('div-invalid');
    document.getElementById('day-p').classList.add('display-none');
    document.getElementById('month-p').classList.add('display-none');
    document.getElementById('year-p').classList.add('display-none');
}

// Calculating
function calculateAge(year, month, day) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // Month is 0-indexed
    if (year < 99 || year > 0) {
        birthDate.setFullYear(year);
    }

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust if the current month is before the birth month or
    // it's the birth month but the current day is before the birth day
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }

    // Adjust days if the current day is before the birth day
    if (ageDays < 0) {
        const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, day);
        ageDays = Math.floor((today - previousMonth) / (1000 * 60 * 60 * 24));
        ageMonths--;
    }

    return {
        year: ageYears,
        month: ageMonths,
        day: ageDays
    };
}

function calculate() {
    const day = document.getElementById('day-in').value;
    const month = document.getElementById('month-in').value;
    const year = document.getElementById('year-in').value;
    invalid = false;

    if (!parseInt(day) && parseInt(day) !== 0) {
        redden('day', 'int');
        invalid = true;
    }
    if (!parseInt(month) && parseInt(month) !== 0) {
        redden('month', 'int');
        invalid = true;
    }
    if (!parseInt(year) && parseInt(year) !== 0) {
        redden('year', 'int');
        invalid = true;
    }
    if (day == '') {
        redden('day', 'required');
        invalid = true;
    }
    if (month == '') {
        redden('month', 'required');
        invalid = true;
    }
    if (year == '') {
        redden('year', 'required');
        invalid = true;
    }

    if (invalid) {
        return;
    }

    yearInt = parseInt(year);
    monthInt = parseInt(month);
    dayInt = parseInt(day);


    if (!validDate(yearInt, monthInt, dayInt)) {
        return;
    }

    let age = calculateAge(yearInt, monthInt, dayInt);

    reset('day');
    reset('month');
    reset('year');

    document.getElementById('day').innerHTML = age['day'];
    document.getElementById('month').innerHTML = age['month'];
    document.getElementById('year').innerHTML = age['year'];
}
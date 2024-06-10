let invalid = false;
// Is Valid Date
function validDate(year, month, day) {
    const current = new Date();
    if (year > current.getFullYear) {
        document.getElementById('year-div').classList.add('div-invalid');
        document.getElementById('year-p').innerHTML = 'The year must be in the past'
        invalid = true;
    }
    if (month < 1 || month > 12) {
        document.getElementById('month-div').classList.add('div-invalid');
        document.getElementById('month-p').innerHTML = 'The month must be a valid month'
        invalid = true;
    }
    if (day < 1 || day > 31) {
        document.getElementById('day-div').classList.add('div-invalid');
        document.getElementById('day-p').innerHTML = 'The day must be a valid day'
        invalid = true;
    }

    // Create a date object and check if the day matches (handles month/day combinations)
    const date = new Date(year, month - 1, day);
    if (date.getDate() != day) {
        document.getElementById('day-div').classList.add('div-invalid');
        document.getElementById('day-p').innerHTML = 'The day must be a valid day'
        console.log(date.getDate(), " Hello ", day)
        invalid = true;
    }
    if (invalid) return false;
    return true;
}

// || date.getMonth() !== (month - 1) || 


// Calculating
function calculateAge(year, month, day) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // Month is 0-indexed

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


    if (!int(day)) {
        document.getElementById('day-div').classList.add('div-invalid');
        document.getElementById('day-p').innerHTML = 'Must be an integer';
        invalid = true;
    }
    if (!int(month)) {
        document.getElementById('month-div').classList.add('div-invalid');
        document.getElementById('month-p').innerHTML = 'Must be an integer';
        invalid = true;
    }
    if (!int(year)) {
        document.getElementById('year-div').classList.add('div-invalid');
        document.getElementById('year-p').innerHTML = 'Must be an integer';
        invalid = true;
    }
    if (day == '') {
        document.getElementById('day-div').classList.add('div-invalid');
        document.getElementById('day-p').innerHTML = 'This field is required';
        invalid = true;
    }
    if (month == '') {
        document.getElementById('month-div').classList.add('div-invalid');
        document.getElementById('month-p').innerHTML = 'This field is required';
        invalid = true;
    }
    if (year == '') {
        document.getElementById('year-div').classList.add('div-invalid');
        document.getElementById('year-p').innerHTML = 'This field is required';
        invalid = true;
    }
    yearInt = int(year);
    monthInt = int(month);
    dayInt = int(day);

    if (!validDate(yearInt, monthInt, dayInt)) {
        return;
    }

    if (invalid) {
        return;
    }

    let age = calculateAge(yearInt, monthInt, dayInt);

    document.getElementById('day').innerHTML = age['day'];
    document.getElementById('month').innerHTML = age['month'];
    document.getElementById('year').innerHTML = age['year'];
}


function int(value) {
    const dist = {
        '0': 0,
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9
    };

    let num = 0;
    let mult = 1;
    let isNegative = false;
    let startIndex = value.length - 1;

    // Check for negative sign
    if (value[0] === '-') {
        isNegative = true;
        startIndex = value.length - 2; // Skip the negative sign
    }

    for (let i = startIndex; i >= 0; i--) {
        if (dist.hasOwnProperty(value[i])) {
            num += dist[value[i]] * mult;
            mult *= 10;
        } else {
            return false;
        }
    }

    return isNegative ? -num : num;
}
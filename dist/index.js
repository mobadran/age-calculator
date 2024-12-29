document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    reset('day');
    reset('month');
    reset('year');
    const validation = validate();
    if (validation) {
        const result = calculate(validation[0], validation[1], validation[2]);
        document.getElementById('day').innerHTML = result[0];
        document.getElementById('month').innerHTML = result[1];
        document.getElementById('year').innerHTML = result[2];
    }
});

function calculate(year, month, day) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }

    if (ageDays < 0) {
        const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
        ageDays = Math.floor((today - previousMonth) / (1000 * 60 * 60 * 24));
        ageMonths--;
    }

    return [ageDays, ageMonths, ageYears];
}


function validate() {
    const day = document.getElementById('day-in').value;
    const month = document.getElementById('month-in').value;
    const year = document.getElementById('year-in').value;
    let invalid = false;
    const yearInt = parseInt(year);
    const monthInt = parseInt(month);
    const dayInt = parseInt(day);

    // Checking if the inputs are numbers
    if (isNaN(dayInt)) {
        invalidate('day', 'Please Type a valid number');
        invalid = true;
    }
    if (isNaN(monthInt)) {
        invalidate('month', 'Please Type a valid number');
        invalid = true;
    }
    if (isNaN(yearInt)) {
        invalidate('year', 'Please Type a valid number');
        invalid = true;
    }

    // Checking if the fields are required
    if (day == '') {
        invalidate('day', 'This Field Is Required');
        invalid = true;
    }
    if (month == '') {
        invalidate('month', 'This Field Is Required');
        invalid = true;
    }
    if (year == '') {
        invalidate('year', 'This Field Is Required');
        invalid = true;
    }

    // Checking if the date is correct
    if (validateDay(dayInt, monthInt, yearInt)) {
        invalidate('day', validateDay(dayInt, monthInt, yearInt));
        invalid = true;
    }
    if (validateMonth(monthInt, yearInt)) {
        invalidate('month', validateMonth(monthInt));
        invalid = true;
    }
    if (validateYear(yearInt)) {
        invalidate('year', validateYear(yearInt));
        invalid = true;
    }

    return !invalid ? [yearInt, monthInt, dayInt] : false;
}

function validateYear(year) {
    const today = new Date();
    if (year < 1) {
        return "Year must be a positive integer.";
    } else if (year > today.getFullYear()) {
        return `Year must be before ${today.getFullYear()}`;
    }
    return null;
}

function validateMonth(month, year) {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;

    if (month < 1 || month > 12) {
        return "Month must be an integer between 1 and 12.";
    } else if (year === today.getFullYear() && month > currentMonth) {
        return `Month must be before or equal to ${currentMonth}.`;
    }
    return null;
}

function validateDay(day, month, year) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;

    if (day < 1) {
        return "Day must be a positive integer";
    } else if (day > 31) {
        return "Day must be between 1 and 31";
    }

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check for leap year
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        daysInMonth[1] = 29; // February has 29 days in a leap year
    }

    // Validate the day against the month
    if (day > daysInMonth[month - 1]) {
        return `${month} does not have ${day} days.`;
    }

    // Future Dates
    if (year === today.getFullYear()) {
        if (month === currentMonth && day > currentDay) {
            return `Day must be before or equal to ${currentDay} for the current month.`;
        }
    } else if (year > today.getFullYear()) {
        return `Day must be before or equal to ${daysInMonth[month - 1]} for future months.`;
    }

    return null;
}


function invalidate(input, message) {
    switch (input) {
        case 'day':
            document.getElementById('day-div').classList.add('div-invalid');
            document.getElementById('day-p').innerHTML = message;
            break;

        case 'month':
            document.getElementById('month-div').classList.add('div-invalid');
            document.getElementById('month-p').innerHTML = message;
            break;

        case 'year':
            document.getElementById('year-div').classList.add('div-invalid');
            document.getElementById('year-p').innerHTML = message;
            break;

    }
}

function reset(which) {
    document.getElementById(`${which}-div`).classList.remove('div-invalid');
    document.getElementById(`${which}-p`).classList.add('display-none');
}

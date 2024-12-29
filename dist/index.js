// let invalid = false;

// // Calling the function when ANY key is pressed
// // const yearIn = document.getElementById('year-in');
// // const monthIn = document.getElementById('month-in');
// // const dayIn = document.getElementById('day-in');

// document.getElementById('form').addEventListener('submit', e => {
//     e.preventDefault();
//     reset('day')
//     reset('month')
//     reset('year')
//     calculate()
// })


// function arToEn(str) {
//     const arNums = {
//         '٠': '0',
//         '١': '1',
//         '٢': '2',
//         '٣': '3',
//         '٤': '4',
//         '٥': '5',
//         '٦': '6',
//         '٧': '7',
//         '٨': '8',
//         '٩': '9',
//         '0': '0',
//         '1': '1',
//         '2': '2',
//         '3': '3',
//         '4': '4',
//         '5': '5',
//         '6': '6',
//         '7': '7',
//         '8': '8',
//         '9': '9'
//     }
//     let ar = '';
//     for (let i = 0; i < str.length; i++) {
//         arNums[str[i]] ? ar += arNums[str[i]] : ar += str[i];
//     }
//     return ar;
// }

// function redden(which, why) {
//     switch (which) {
//         case 'day':
//             document.getElementById('day-div').classList.add('div-invalid');
//             switch (why) {
//                 case 'range':
//                     document.getElementById('day-p').innerHTML = 'Must be a valid day';
//                     break;
//                 case 'int':
//                     document.getElementById('day-p').innerHTML = 'Must be an integer';
//                     break;
//                 case 'required':
//                     document.getElementById('day-p').innerHTML = 'This field is required';
//                     break;
//             }
//             break;
//         case 'month':
//             document.getElementById('month-div').classList.add('div-invalid');
//             switch (why) {
//                 case 'range':
//                     document.getElementById('month-p').innerHTML = 'The month must be a valid month';
//                     break;
//                 case 'int':
//                     document.getElementById('month-p').innerHTML = 'Must be an integer';
//                     break;
//                 case 'required':
//                     document.getElementById('month-p').innerHTML = 'This field is required';
//                     break;
//             }
//             break;
//         case 'year':
//             document.getElementById('year-div').classList.add('div-invalid');
//             switch (why) {
//                 case 'range':
//                     document.getElementById('year-p').innerHTML = 'Year must be in the past';
//                     break;
//                 case 'int':
//                     document.getElementById('year-p').innerHTML = 'Must be an integer';
//                     break;
//                 case 'required':
//                     document.getElementById('year-p').innerHTML = 'This field is required';
//                     break;
//             }
//             break;
//     }
// }

// // Is Valid Date
// function validDate(year, month, day) {
//     let whichInvalid = {
//         year: false,
//         month: false,
//         day: false,
//     };
//     const current = new Date();
//     let monthNow = current.getMonth() + 1;
//     if (year > current.getFullYear()) {
//         redden('year', 'range');
//         whichInvalid.year = true;
//     } else if (year == current.getFullYear()) {
//         if (month > monthNow) {
//             redden('month', 'range');
//             whichInvalid.month = true;
//             if (day > current.getDate()) {
//                 console.log(day, current.getDate());
//                 redden('day', 'range');
//                 whichInvalid.day = true;
//             }
//         } else if (month == monthNow) {
//             if (day > current.getDate()) {
//                 redden('day', 'range');
//                 whichInvalid.day = true;
//             }
//         }
//     }
//     if (month < 1 || month > 12) {
//         redden('month', 'range');
//         whichInvalid.month = true;
//     }
//     if (day < 1 || day > 31) {
//         redden('day', 'range');
//         whichInvalid.day = true;
//     }

//     // Create a date object and check if the day matches (handles month/day combinations)
//     const date = new Date(year, month - 1, day);
//     if (date.getDate() != day) {
//         redden('day', 'range');
//         whichInvalid.day = true;
//     }
//     return whichInvalid;
// }

// // Reset
// function reset(which) {
//     document.getElementById(`${which}-div`).classList.remove('div-invalid');
//     document.getElementById('day-p').classList.add('display-none');
//     document.getElementById('month-p').classList.add('display-none');
//     document.getElementById('year-p').classList.add('display-none');
// }

// // Calculating
// function calculateAge(year, month, day) {
//     const today = new Date();
//     const birthDate = new Date(year, month - 1, day); // Month is 0-indexed
//     if (year < 99 || year > 0) {
//         birthDate.setFullYear(year);
//     }

//     let ageYears = today.getFullYear() - birthDate.getFullYear();
//     let ageMonths = today.getMonth() - birthDate.getMonth();
//     let ageDays = today.getDate() - birthDate.getDate();

//     // Adjust if the current month is before the birth month or
//     // it's the birth month but the current day is before the birth day
//     if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
//         ageYears--;
//         ageMonths += 12;
//     }

//     // Adjust days if the current day is before the birth day
//     if (ageDays < 0) {
//         const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, day);
//         ageDays = Math.floor((today - previousMonth) / (1000 * 60 * 60 * 24));
//         ageMonths--;
//     }

//     return {
//         year: ageYears,
//         month: ageMonths,
//         day: ageDays
//     };
// }

// function calculate() {
//     // const dayVal = document.getElementById('day-in').value;
//     // const monthVal = document.getElementById('month-in').value;
//     // const yearVal = document.getElementById('year-in').value;

//     const day = arToEn(document.getElementById('day-in').value);
//     const month = arToEn(document.getElementById('month-in').value);
//     const year = arToEn(document.getElementById('year-in').value);

//     invalid = false;

//     yearInt = parseInt(year);
//     monthInt = parseInt(month);
//     dayInt = parseInt(day);

//     if (!validDate(yearInt, monthInt, dayInt).year || !validDate(yearInt, monthInt, dayInt).month || !validDate(yearInt, monthInt, dayInt).day) {
//         invalid = true;
//     }
//     console.log(dayInt);
//     if (dayInt === NaN) {
//         redden('day', 'int');
//         invalid = true;
//     }
//     if (monthInt === NaN) {
//         redden('month', 'int');
//         invalid = true;
//     }
//     if (yearInt === NaN) {
//         redden('year', 'int');
//         invalid = true;
//     }
//     if (day == '') {
//         redden('day', 'required');
//         invalid = true;
//     }
//     if (month == '') {
//         redden('month', 'required');
//         invalid = true;
//     }
//     if (year == '') {
//         redden('year', 'required');
//         invalid = true;
//     }

//     if (invalid) {
//         return;
//     }

//     let age = calculateAge(yearInt, monthInt, dayInt);

//     reset('day');
//     reset('month');
//     reset('year');

//     document.getElementById('day').innerHTML = age['day'];
//     document.getElementById('month').innerHTML = age['month'];
//     document.getElementById('year').innerHTML = age['year'];
// }

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    reset('day')
    reset('month')
    reset('year')
    const validation = validate()
    if (validation) {
        const result = calculate(validation[0], validation[1], validation[2]);
        document.getElementById('day').innerHTML = result[0];
        document.getElementById('month').innerHTML = result[1];
        document.getElementById('year').innerHTML = result[2];
    }
});

function calculate(year, month, day) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // Month is 0-indexed

    // Calculate age in years
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust if the current month is before the birth month or
    // it's the birth month but the current day is before the birth day
    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12; // Adjust months
    }
    // Adjust days if the current day is before the birth day
    if (ageDays < 0) {
        const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
        ageDays = Math.floor((today - previousMonth) / (1000 * 60 * 60 * 24));
        ageMonths--; // Adjust months
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
    return null; // Valid year
}

function validateMonth(month, year) {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11

    if (month < 1 || month > 12) {
        return "Month must be an integer between 1 and 12.";
    } else if (year === today.getFullYear() && month > currentMonth) {
        return `Month must be before or equal to ${currentMonth}.`;
    }
    return null; // Valid month
}

function validateDay(day, month, year) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // getMonth() returns 0-11

    if (day < 1) {
        return "Day must be a positive integer";
    } else if (day > 31) {
        return "Day must be between 1 and 31";
    }

    // Days in each month
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check for leap year
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        daysInMonth[1] = 29; // February has 29 days in a leap year
    }

    // Validate the day against the month
    if (day > daysInMonth[month - 1]) {
        return `${month} does not have ${day} days.`;
    }

    // Additional validation for future dates
    if (year === today.getFullYear()) {
        if (month === currentMonth && day > currentDay) {
            return `Day must be before or equal to ${currentDay} for the current month.`;
        }
    } else if (year > today.getFullYear()) {
        return `Day must be before or equal to ${daysInMonth[month - 1]} for future months.`;
    }

    return null; // Valid day
}

// function validateDate(year, month, day) {
//     const today = new Date();
//     // Check if year is valid
//     if (year > today.getFullYear()) {
//         // return "Invalid year: Year must be a positive integer.";
//         return ['year', `Year must be before ${today.getFullYear()}`];
//     }

//     // Check if month is valid
//     if (month < 1 || month > 12) {
//         // return "Invalid month: Month must be an integer between 1 and 12.";
//         return ['month', `Month must be between 1 and 12`];
//     }

//     // Check if day is valid
//     if (day < 1) {
//         // return "Invalid day: Day must be a positive integer.";
//         return ['day', `Day must be a positive integer`];
//     }

//     // Days in each month
//     const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//     // Check for leap year
//     if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
//         daysInMonth[1] = 29; // February has 29 days in a leap year
//     }

//     // Validate the day against the month
//     if (day > daysInMonth[month - 1]) {
//         // return `Invalid day: ${month} does not have ${day} days.`;
//         return ['day', `${month} does not have ${day} days.`];
//     }

//     return ['valid']; // If all checks pass
// }

function invalidate(input, message) {
    switch (input) {
        case 'day':
            document.getElementById('day-div').classList.add('div-invalid');
            document.getElementById('day-p').innerHTML = message
            break;

        case 'month':
            document.getElementById('month-div').classList.add('div-invalid');
            document.getElementById('month-p').innerHTML = message
            break;

        case 'year':
            document.getElementById('year-div').classList.add('div-invalid');
            document.getElementById('year-p').innerHTML = message
            break;

    }
}

function reset(which) {
    document.getElementById(`${which}-div`).classList.remove('div-invalid');
    document.getElementById(`${which}-p`).classList.add('display-none');
}
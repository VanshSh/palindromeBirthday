let dateInput = document.getElementById('date')
let checkBtn = document.getElementById('check-btn')
let result = document.querySelector('.result')

checkBtn.addEventListener('click', () => {
  let dateValue = dateInput.value
  if (dateValue.length !== 0) {
    let splitDate = dateValue.split('-')

    let date = {
      day: Number(splitDate[2]),
      month: Number(splitDate[1]),
      year: Number(splitDate[0]),
    }
    let ifPalindrome = checkPalindromeForAllDateFormats(date)

    if (ifPalindrome) {
      result.style.display = 'block'
      result.innerHTML = `<h3>✨ Your Birthday is Palindrome. ✨</h3>`
    } else {
      let [countNext, nextDate] = getNextPalindromeDate(date)
      let [countPrev, prevDate] = getPreviousPalindromeDate(date)
      if (countNext > countPrev) {
        result.style.display = 'block'

        result.innerHTML = `<p>Aww! Your birthday is not a palindrome.
         The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}. You missed it by ${countPrev} day/s. 😔 </p>`
      } else {
        result.style.display = 'block'

        result.innerHTML = `<p>Aww! Your birthday is not a palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${countNext} day/s. 😔</p>`
      }
    }
  }
})

//     let isPalindrome = checkPalindromeForAllDateFormats(date)

//     if (isPalindrome) {
//       outputDiv.innerText = `Wow! Your Birthday is a Palindrome! 🥳`
//     } else {
//       let [countNext, nextDate] = getNextPalindromeDate(date)
//       let [countPrev, prevDate] = getPreviousPalindromeDate(date)
//       if (countNext > countPrev) {
//         outputDiv.innerText = `Aww! Your birthday is not a palindrome. The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}. You missed it by ${countPrev} days. 🙁`
//       } else {
//         outputDiv.innerText = `Aww! Your birthday is not a palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${countNext} days. 🙁`
//       }
//     }
//   }
// }

// checkBtn.addEventListener('click', clickHandler)

function reverseStr(str) {
  let listOfChars = str.split('')
  let reverseListOfChars = listOfChars.reverse()
  let reversedStr = reverseListOfChars.join('')
  return reversedStr
}

function isPalindrome(str) {
  let reverse = reverseStr(str)
  return str === reverse
}

function convertDateToStr(date) {
  let dateStr = { day: '', month: '', year: '' }

  if (date.day < 10) {
    dateStr.day = '0' + date.day
  } else {
    dateStr.day = date.day.toString()
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month
  } else {
    dateStr.month = date.month.toString()
  }

  dateStr.year = date.year.toString()

  return dateStr
}

function getAllDateFormats(date) {
  let dateStr = convertDateToStr(date)

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeForAllDateFormats(date) {
  let listOfPalindromes = getAllDateFormats(date)

  let palindrome = false

  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      palindrome = true
      break
    }
  }
  return palindrome
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true
  }
  if (year % 100 === 0) {
    return false
  }
  if (year % 4 === 0) {
    return true
  }
  return false
}

function getNextDate(date) {
  let day = date.day + 1
  let month = date.month
  let year = date.year

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1
        month++
      }
    } else {
      if (day > 28) {
        day = 1
        month++
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1
      month++
    }
  }

  if (month > 12) {
    month = 1
    year++
  }

  return {
    day: day,
    month: month,
    year: year,
  }
}

function getNextPalindromeDate(date) {
  let count = 0
  let nextDate = getNextDate(date)

  while (1) {
    count++
    let isPalindrome = checkPalindromeForAllDateFormats(nextDate)
    if (isPalindrome) {
      break
    }
    nextDate = getNextDate(nextDate)
  }

  return [count, nextDate]
}

function getPreviousDate(date) {
  let day = date.day - 1
  let month = date.month
  let year = date.year

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29
        month--
      }
    } else {
      if (day < 1) {
        day = 28
        month--
      }
    }
  } else if (
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 8 ||
    month === 9 ||
    month === 11
  ) {
    if (day < 1) {
      day = 31
      month--
    }
  } else if (month === 1) {
    if (day < 1) {
      day = 31
      month = 12
      year--
    }
  } else {
    if (day < 1) {
      day = 30
      month--
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  }
}

function getPreviousPalindromeDate(date) {
  let count = 0
  let prevDate = getPreviousDate(date)

  while (1) {
    count++
    let isPalindrome = checkPalindromeForAllDateFormats(prevDate)
    if (isPalindrome) {
      break
    }
    prevDate = getPreviousDate(prevDate)
  }

  return [count, prevDate]
}

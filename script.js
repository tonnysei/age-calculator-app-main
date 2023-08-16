const labelElement = document.querySelectorAll('.input-label')
const inputElement = document.querySelectorAll('.input-bar')
const buttonElement = document.querySelector('.calculate-btn')
const errorDay = document.getElementById('error-day')
const errorMonth = document.getElementById('error-month')
const errorYear = document.getElementById('error-year')



const checkEmpty = (dayValue, monthValue, yearValue) => {
  const test1 = {
    test1: true,
    dayTest1: true,
    monthTest1: true,
    yearTest1: true
  }

  if(dayValue === "") {
    errorDay.innerHTML = "This field is required"
    test1.dayTest1 = false
  }
     
  if(monthValue === "") {
    errorMonth.innerHTML = "This field is required"
    test1.monthTest1 = false
  }   

  if(yearValue === "") {
    errorYear.innerHTML = "This field is required"
    test1.yearTest1 = false
  }  

  if(test1.dayTest1 === false || test1.monthTest1 === false || test1.yearTest1 === false) {
    test1.test1 = false
    return test1
  } else {
    return test1
  }
}



const checkInputNumber = (day, month, year) => {
  const test2 = {
    test2: true,
    dayTest2: true,
    monthTest2: true,
    yearTest2: true
  }

  if(day*1 != day) {
    errorDay.innerHTML = "Invalid input"
    test2.dayTest2 = false
  }

  if(month*1 != month) {
    errorMonth.innerHTML = "Invalid input"
    test2.monthTest2 =  false
  } 

  if(year*1 != year) {
    errorYear.innerHTML = "Invalid input"
    test2.yearTest2 = false
  } 

  if(test2.dayTest2 === false || test2.monthTest2 ===  false || test2.yearTest2 === false) {
    test2.test2 = false
  }

  return test2
}



const checkValidInput = (day, month, year, today) => {
  const test3 = {
    test3: true,
    dayTest3: true,
    monthTest3: true,
    yearTest3: true
  }

  if(day < 0 || day > 31) {
    errorDay.innerHTML = "Must be a valid day"
    test3.dayTest3 = false
  }

  if(month < 0 || month > 12) {
    errorMonth.innerHTML = "Must be a valid month"
    test3.monthTest3 = false
  }

  if(year > today.getFullYear()) {
    errorYear.innerHTML = "Must be in the past"
    test3.yearTest3 = false
  }

  if(test3.dayTest3 === false || test3.monthTest3 === false || test3.yearTest3 === false) {
    test3.test3 = false
  }
  
  return test3
}



const checkValidDate = (day, month, year) => {
  let test4 = true

  if([4, 6, 9, 11].includes(month) && day === 31) {
    errorDay.innerHTML = "Invalid date"
    test4 = false
  }

  if((month === 2 && day > 28) && !(month === 2 && year%4 === 0 && day === 29)) {
    errorDay.innerHTML = "Invalid date"
    test4 = false
  }

  return test4
}



const DisplayError = (test1, test2, test3, test4) => {
  if(!test1 || !test2 || !test3 || !test4) {
    labelElement.forEach(value => {
      value.classList.add('error-text')
    })
    inputElement.forEach(value => {
      value.classList.add('error-input')
    })
  } else {
    labelElement.forEach(value => {
      value.classList.remove('error-text')
    })
    inputElement.forEach(value => {
      value.classList.remove('error-input')
    })
  }
}



const displayResult = (day, month, year, today) => {

  const birthDay = new Date(year, month-1, day)
  const timeDiff = new Date((today - birthDay))



  document.getElementById('output-day').innerHTML = `${timeDiff.getFullYear() - 1970}`
  document.getElementById('output-month').innerHTML = `${timeDiff.getMonth()}`
  document.getElementById('output-year').innerHTML = `${timeDiff.getDate()-1}`
}



const calculateTimeDiff = () => {

  const dayValue = document.getElementById("input-day").value
  const monthValue = document.getElementById("input-month").value
  const yearValue = document.getElementById("input-year").value
  const day = Number(dayValue)
  const month = Number(monthValue)
  const year = Number(yearValue)
  const today = new Date()


  const { test1, dayTest1, monthTest1, yearTest1 } = checkEmpty(dayValue, monthValue, yearValue)
  const { test2, dayTest2, monthTest2, yearTest2 } = checkInputNumber(day, month, year)
  const { test3, dayTest3, monthTest3, yearTest3 } = checkValidInput(day, month, year, today)  

  if(dayTest1 && dayTest2 && dayTest3) {
    errorDay.innerHTML = ""
  }

  if(monthTest1 && monthTest2 && monthTest3) {
    errorMonth.innerHTML = ""
  }

  if(yearTest1 && yearTest2 && yearTest3) {
    errorYear.innerHTML = ""
  }

  const test4 = checkValidDate(day, month, year)

  DisplayError(test1, test2, test3, test4)

  if(!test1 || !test2 || !test3 || !test4) return

  displayResult(day, month, year, today)
}


buttonElement.addEventListener('click', () => {
  calculateTimeDiff()
})
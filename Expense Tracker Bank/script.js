'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-12-27T23:36:17.929Z',
    '2021-01-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'hi-IN',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Global Context Variables
let currentUser = null

let intervalTimer
// Login Event Listeners
btnLogin.addEventListener('click', function(e){
  e.preventDefault()
  // 1. Get userName and password.
  const userName = inputLoginUsername.value
  const pin = inputLoginPin.value

  currentUser = accounts.find(acc => acc.userName === userName)
  if(  currentUser?.pin === Number(pin)){
    // console.log('access granted!')
    if(intervalTimer)
      clearInterval(intervalTimer)
    labelDate.textContent = new Intl.DateTimeFormat(currentUser.locale).format(new Date())
    labelWelcome.textContent = `Welcome Back, ${currentUser.owner.split(' ')[0]}`
    containerMovements.innerHTML = ''
    containerApp.style.opacity = 100
    
    startLogoutTimer()
    updateUI(currentUser)

  }
  inputLoginUsername.value = ''
  inputLoginPin.value = ''
  inputLoginPin.blur()
})

// Transfer amount Event Listener
btnTransfer.addEventListener('click', function(e){
  e.preventDefault()
  const receiverAccountUserName = inputTransferTo.value
  const amount = Number(inputTransferAmount.value)

  const recipient = accounts.find(acc => acc.userName === receiverAccountUserName)
  // Debit the amount from senders account
  currentUser.movements.push(-amount)
  // credit the amount to recipient account
  recipient.movements.push(amount)

  // Add the transaction date to the movementsDate List.
  currentUser.movementsDates.push(new Date().toISOString())
  recipient.movementsDates.push(new Date().toISOString())
  // update UI.
  updateUI(currentUser)
  inputTransferTo.value = ''
  inputTransferAmount.value = ''
  inputTransferAmount.blur()
})


// Request for loan Event Listener
btnLoan.addEventListener('click', function(e){
  e.preventDefault()
  // 1. Add the requested amount to movements and balance
  // console.log(currentUser)
  const amount = Number(inputLoanAmount.value)
  if(amount > 0){
    currentUser.movements.push(amount)
    currentUser.movementsDates.push(new Date().toISOString())
    updateUI(currentUser)
  }
  inputLoanAmount.value = ''
  inputLoanAmount.blur()
})

// Close the account btn Event Listener
btnClose.addEventListener('click', function(e){
  e.preventDefault()
  const userName = inputCloseUsername.value
  const pin = Number(inputClosePin.value)
  if(currentUser.userName === userName && currentUser.pin === pin){
    // set the opacity to 0.
    containerApp.style.opacity = 0
    const index = accounts.findIndex(acc => acc.userName === userName)
    accounts.splice(index, 1)
  }

  // console.log('accounts left:'+accounts)
  inputCloseUsername.value = ''
  inputClosePin.value = ''
})

// Logout Timer


const startLogoutTimer = function(){
  let timer = 120
 
  intervalTimer = setInterval(() =>{
    let minutes = String(Math.trunc(timer / 60)).padStart(2, 0);
    let seconds = String(timer % 60).padStart(2, 0);
    labelTimer.textContent = `${minutes}:${seconds}`
    

    if(timer === 0){
      clearInterval(intervalTimer)
      containerApp.style.opacity =0
      labelWelcome.textContent = 'Login to get started'
    }
    timer--
  },1000)
}

// UserName Creation
const createUserNames = function(accounts){
  // console.log('computing userNames for acc '+ acc.owner)
  accounts.forEach(acc => {
  acc.userName = acc.owner.toLowerCase().split(' ')
  .map(name => name[0])
  .join('')
  })
  
}

// Update the UI
const updateUI = function(currentUser){
    calcAndDisplayMovements(currentUser)
    calcAndDisplayBudget(currentUser)
    calcAndDisplaySummary(currentUser)
}

// Get the formatted date based on locale.
const formatDate = function(date, locale){
  // Improve the date returns.
  const calcDaysPassed = (date1, date2) => 
    Math.round(Math.abs(date1-date2)/(1000*60*60*24))
  
  // console.log(new Date(), date)
  const daysPassed = calcDaysPassed(new Date(), date)
  // console.log(`days Passed: ${daysPassed}`)
  if (daysPassed === 0) return 'Today'
  if (daysPassed === 1) return 'Yesterday'
  if (daysPassed <= 7) return `${daysPassed} days Ago`
  return new Intl.DateTimeFormat(locale).format(date)

}

// Get the formatted Number based on locale and add currency
const formatNumber = function(value, locale, currency){
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);

}

// Get all the movements of a user and display on web page.
const calcAndDisplayMovements = function(currentUser){
  // console.log(currentUser)
  currentUser.movements.forEach((mov, index) =>{
    const movementDate = new Date(currentUser.movementsDates[index])

    const displayDate = formatDate(movementDate, currentUser.locale)
    // console.log(displayDate)
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const formattedMovement = formatNumber(mov, currentUser.locale, currentUser.currency)
    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
                    <div class="movements__date">${displayDate}</div>
                    <div class="movements__value">${formattedMovement}</div>
          </div>`
          
    containerMovements.insertAdjacentHTML('afterbegin', html)
    
  })
}

// Calculate budget and show on web page.
const calcAndDisplayBudget = function(acc){
  const balance = acc.movements.reduce((acc, mov) => acc+mov, 0)
  // console.log(balance)
  // update the balance to UI
  labelBalance.textContent = formatNumber(balance,acc.locale,acc.currency)


}

// calculate summary and show on webpage
const calcAndDisplaySummary = function(account){
  // calculate deposits summary
  const deposits = account.movements.filter(mov => mov>0).reduce((acc, curr) => acc+curr)
  labelSumIn.textContent = formatNumber(deposits, account.locale, account.currency)
  // calculate withdrawal summary

  const withdrawals = account.movements.filter(mov => mov<0).reduce((acc,curr) => acc+curr)
  labelSumOut.textContent = formatNumber(Math.abs(withdrawals), account.locale, account.currency)
  // calculate interests.

  const interest = deposits*(account.interestRate/100)
  labelSumInterest.textContent = formatNumber(interest, account.locale, account.currency)

}
// Global Context
createUserNames(accounts)


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

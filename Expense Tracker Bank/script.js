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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
// Event Listeners
btnLogin.addEventListener('click', function(e){
  e.preventDefault()
  // 1. Get userName and password.
  const userName = inputLoginUsername.value
  const pin = inputLoginPin.value

  currentUser = accounts.find(acc => acc.userName === userName)
  if(  currentUser?.pin === Number(pin)){
    // console.log('access granted!')
    
    containerMovements.innerHTML = ''
    containerApp.style.opacity = 100
    
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
    calcAndDisplayBudget(currentUser.movements)
    calcAndDisplaySummary(currentUser)
}

// Get all the movements of a user and display on web page.
const calcAndDisplayMovements = function(currentUser){
  currentUser.movements.forEach((mov, index) =>{
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
                    <div class="movements__value">${mov}€</div>
          </div>`
          
    containerMovements.insertAdjacentHTML('afterbegin', html)
    
  })
}

// Calculate budget and show on web page.
const calcAndDisplayBudget = function(movements){
  const balance = movements.reduce((acc, mov) => acc+mov, 0)
  // console.log(balance)
  // update the balance to UI
  labelBalance.textContent = `${balance}€`


}

// calculate summary and show on webpage
const calcAndDisplaySummary = function(account){
  // calculate deposits summary
  const deposits = account.movements.filter(mov => mov>0).reduce((acc, curr) => acc+curr)
  labelSumIn.textContent = `${deposits}€`
  // calculate withdrawal summary

  const withdrawals = account.movements.filter(mov => mov<0).reduce((acc,curr) => acc+curr)
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`
  // calculate interests.

  const interest = deposits*(account.interestRate/100)
  labelSumInterest.textContent = `${interest}€`

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

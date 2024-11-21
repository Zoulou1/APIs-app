const apiKey = 'ada0d80e0771f2b64abbedec'; // 
const apiUrl = 'https://v6.exchangerate-api.com/v6/ada0d80e0771f2b64abbedec/latest/';

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');

// Fetch the list of currencies and populate dropdowns
fetch(`${apiUrl}USD`) // Base endpoint for getting rates
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.conversion_rates);
    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      const option2 = document.createElement('option');
      option1.value = option2.value = currency;
      option1.text = option2.text = currency;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });
    fromCurrency.value = 'USD'; // Default values
    toCurrency.value = 'EUR';
  });

// Convert currency
convertBtn.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = 'Please enter a valid amount.';
    return;
  }

  fetch(`${apiUrl}${from}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.conversion_rates[to];
      const convertedAmount = (amount * rate).toFixed(2);
      resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    })
    .catch(() => {
      resultDiv.textContent = 'Error fetching exchange rates. Please try again later.';
    });
});

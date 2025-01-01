document.addEventListener("DOMContentLoaded", function () {

  const card = document.getElementById('card');
  const spinnerContainer = document.getElementById('spinner');
  const loadingText = document.getElementById('loading-text');

  function fetchInitialData() {

    loadSpinner();
    setTimeout(() => {

      simulateInitialData()
        .then(response => {
          document.getElementById('parent-name').textContent = response.CustomerName;
          document.getElementById('academic-year').textContent = response.AcademicYear;
          document.getElementById('dibber-unit-name').textContent = response.BusinessUnitName;
          document.getElementById('payment-plan').textContent = response.PaymentPlan;
          document.getElementById('receiver-name').textContent = response.LegalEntityName;
          document.getElementById('total-payable').textContent = response.TotalInvoiceValue;
          document.getElementById('child-id').textContent = response.ChildId;

          // Populate the product line items table
          const productLineItems = response.ProductLineItems;
          const productLineItemsTableBody = document.getElementById('product-line-items');
          let totalNetPrice = 0; // To calculate the total price

          productLineItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                     <td>${item.ItemNo}</td>
                     <td>${item.Category}</td>
                     <td>${item.CategoryType}</td>
                     <td>${item.CategorySubtype}</td>
                     <td>${item.Product}</td>
                     <td>${item.Quantity}</td>
                     <td>${item.NetPrice}</td>
                 `;
            productLineItemsTableBody.appendChild(row);

            // Accumulate the total NetPrice (remove currency for calculation)
            const netPrice = parseFloat(item.NetPrice.replace('₹', '').replace(',', ''));
            totalNetPrice += netPrice;
          });

          // Add the Total Inclusive GST row
          const totalRow = document.createElement('tr');
          totalRow.innerHTML = `
                 <td colspan="6">Total Inclusive GST</td>
                 <td>₹${totalNetPrice.toLocaleString()}</td>
             `;
          productLineItemsTableBody.appendChild(totalRow);

          // Hide the spinner and show the content
          spinnerContainer.classList.add('hidden');
          card.style.visibility = 'visible';
        });


    }, 2000);
  }

  fetchInitialData();

});



function loadSpinner() {
  fetch('./assets/loading.svg')
    .then(response => response.text())
    .then(svgContent => {
      const spinnerSvgDiv = document.getElementById('spinner-svg');
      spinnerSvgDiv.innerHTML = svgContent;
    })
    .catch(error => {
      console.error('Error loading spinner:', error);
    });
}


// Simulation code //
function simulateInitialData() {
  // Simulated response data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        "Id": "77DB7A4F-FD2F-4360-944D-CB9F7EF32D44",
        "ChildId": "IN-K-0000000202",
        "CustomerName": "Surabhi Kaur",
        "CustomerEmail": "Surabhi@mail.com",
        "CustomerPhone": "+917500578965",
        "PaymentPlan": "Year",
        "AcademicYear": "2024-25",
        "TotalInvoiceValue": "₹350000",
        "BusinessUnitName": "Gurgaon - Sector 50",
        "LegalEntityName": "Dibber Schools India Private Limited",
        "LegalMerchantID": "UATDIBBV2",
        "ProductLineItems": [
          {
            "ItemNo": 3,
            "Category": "Condition",
            "CategoryType": "Fee",
            "CategorySubtype": "Annual",
            "Product": "Annual Fee",
            "Quantity": 1,
            "NetPrice": "₹40000"
          },
          {
            "ItemNo": 4,
            "Category": "Condition",
            "CategoryType": "Fee",
            "CategorySubtype": "Admission",
            "Product": "Admission Fee",
            "Quantity": 1,
            "NetPrice": "₹30000"
          }
        ]
      });
    }, 2000);
  });
}
const firstField = document.getElementById("mortgage-term");
const secondField = document.getElementById("interest-rate");
const button = document.querySelector("button");
const  result = document.getElementsByClassName("monthly-box")[0];


button.addEventListener('click', function() {
    const firstValue = Number(firstField.value);
    const secondValue = Number(secondField.value);

    if (isNaN(firstValue) || isNaN(secondValue)) {
        result.textContent = "Please enter valid numbers.";
        return;
    }

    const finalResult = firstValue *  secondValue;


    result.textContent = finalResult;
})


//  let mortgage = 230 * 40;

 
//     document.querySelector("button").addEventListener('click', function () {
//       alert(mortgage + mortgage);

      

//     })

// element.innerHTML = "<strong>Bold text</strong>";
// ```

// **Difference:**
// - `textContent` - Plain text only, faster
// - `innerText` - Respects CSS styling
// - `innerHTML` - Can include HTML tags


// ### **Step 9: Complete Connection Algorithm**
// ```
// FUNCTION setupMortgageCalculator():

//     // Step A: Wait for DOM to be ready
//     WHEN document loads completely:

// // Step B: Get references to elements
// buttonElement = getElementById('calculateBtn')
// mortgageInput = getElementById('mortgageAmount')
// rateInput = getElementById('interestRate')
// termInput = getElementById('mortgageTerm')
// typeInput = getElementById('mortgageType')
// resultElement = getElementById('result')

// // Step C: Add click event listener
// buttonElement.addEventListener('click', FUNCTION():

//   // Step D: Extract values
//   principalString = mortgageInput.value
//             rateString = rateInput.value
//             termString = termInput.value
//             mortgageType = typeInput.value

//             // Step E: Convert to numbers
//             principal = parseFloat(principalString)
//             rate = parseFloat(rateString)
//             term = parseFloat(termString)

//             // Step F: Validate inputs
//             IF isNaN(principal) OR isNaN(rate) OR isNaN(term):
//   DISPLAY error message
//                 RETURN

//             // Step G: Call calculation function
//             result = calculateMortgage(principal, rate, term, mortgageType)

//             // Step H: Display results
//             IF result.error:
//   resultElement.textContent = result.error
//             ELSE:
//   resultElement.innerHTML = formatResults(result)
// )


// /**
//  * MORTGAGE CALCULATOR
//  * ====================
//  * This program calculates monthly mortgage payments and total repayment
//  * for both repayment (amortizing) and interest-only mortgages.
//  */

// // ============================================================================
// // MAIN CALCULATION FUNCTION
// // ============================================================================

// /**
//  * Calculate mortgage payment details
//  * @param {number} principal - The loan amount (P)
//  * @param {number} annualInterestRate - Annual interest rate as percentage (e.g., 5.25 for 5.25%)
//  * @param {number} years - Loan term in years
//  * @param {string} mortgageType - Either "repayment" or "interest-only"
//  * @returns {object} Calculation results
//  */
// function calculateMortgage(principal, annualInterestRate, years, mortgageType) {
//   // ------------------------------------------------------------------------
//   // STEP 1: INPUT VALIDATION
//   // ------------------------------------------------------------------------
//   // Ensure all inputs are valid before proceeding with calculations

//   if (principal <= 0) {
//     return { error: "Mortgage amount must be greater than 0" };
//   }

//   if (annualInterestRate < 0 || annualInterestRate > 100) {
//     return { error: "Interest rate must be between 0 and 100" };
//   }

//   if (years <= 0 || years > 50) {
//     return { error: "Mortgage term must be between 1 and 50 years" };
//   }

//   if (mortgageType !== "repayment" && mortgageType !== "interest-only") {
//     return { error: "Mortgage type must be 'repayment' or 'interest-only'" };
//   }

//   // ------------------------------------------------------------------------
//   // STEP 2: CONVERT INPUTS TO MONTHLY VALUES
//   // ------------------------------------------------------------------------

//   /**
//    * FORMULA: Monthly Interest Rate
//    * r = (Annual Rate / 100) / 12
//    * 
//    * Why divide by 100? To convert percentage to decimal (5.25% → 0.0525)
//    * Why divide by 12? To convert annual rate to monthly rate
//    * 
//    * Example: 5.25% annual
//    * r = (5.25 / 100) / 12 = 0.0525 / 12 = 0.004375 per month
//    */
//   const monthlyInterestRate = (annualInterestRate / 100) / 12;

//   /**
//    * FORMULA: Number of Monthly Payments
//    * n = Years × 12
//    * 
//    * Example: 25 years = 25 × 12 = 300 monthly payments
//    */
//   const numberOfPayments = years * 12;

//   // ------------------------------------------------------------------------
//   // STEP 3: CALCULATE BASED ON MORTGAGE TYPE
//   // ------------------------------------------------------------------------

//   let monthlyPayment;
//   let totalRepayment;
//   let totalInterest;
//   let remainingBalance;

//   if (mortgageType === "interest-only") {
//     // ====================================================================
//     // INTEREST-ONLY MORTGAGE CALCULATION
//     // ====================================================================

//     /**
//      * FORMULA: Monthly Payment (Interest-Only)
//      * M = P × r
//      * 
//      * Where:
//      * M = Monthly payment
//      * P = Principal (loan amount)
//      * r = Monthly interest rate
//      * 
//      * This only covers the interest; principal is NOT reduced
//      * 
//      * Example:
//      * M = $300,000 × 0.004375 = $1,312.50 per month
//      */
//     monthlyPayment = principal * monthlyInterestRate;

//     /**
//      * FORMULA: Total Interest Paid
//      * Total Interest = Monthly Payment × Number of Payments
//      * 
//      * Example:
//      * Total Interest = $1,312.50 × 300 = $393,750
//      */
//     totalInterest = monthlyPayment * numberOfPayments;

//     /**
//      * FORMULA: Total Repayment (Interest-Only)
//      * Total = Total Interest + Principal
//      * 
//      * You must add the principal because you still owe it at the end
//      * 
//      * Example:
//      * Total = $393,750 + $300,000 = $693,750
//      */
//     totalRepayment = totalInterest + principal;

//     /**
//      * Remaining balance after all payments (interest-only)
//      * The principal is never paid down, so you still owe the full amount
//      */
//     remainingBalance = principal;

//   } else {
//     // ====================================================================
//     // REPAYMENT (AMORTIZING) MORTGAGE CALCULATION
//     // ====================================================================

//     // Handle special case: zero interest rate
//     if (monthlyInterestRate === 0) {
//       /**
//        * FORMULA: Monthly Payment (Zero Interest)
//        * M = P / n
//        * 
//        * When interest rate is 0%, simply divide principal by number of payments
//        * 
//        * Example:
//        * M = $300,000 / 300 = $1,000 per month
//        */
//       monthlyPayment = principal / numberOfPayments;
//       totalRepayment = principal;
//       totalInterest = 0;

//     } else {
//       /**
//        * FORMULA: Monthly Payment (Repayment Mortgage)
//        * M = P × [r(1 + r)^n] / [(1 + r)^n - 1]
//        * 
//        * Where:
//        * M = Monthly payment
//        * P = Principal
//        * r = Monthly interest rate
//        * n = Number of payments
//        * 
//        * This is the standard amortization formula
//        */

//       // STEP 3A: Calculate (1 + r)^n
//       /**
//        * This represents the compound interest factor
//        * Shows how much $1 grows to over n periods at rate r
//        * 
//        * Example:
//        * (1 + 0.004375)^300 = 1.004375^300 = 3.63188
//        */
//       const onePlusRatePowerN = Math.pow(1 + monthlyInterestRate, numberOfPayments);

//       // STEP 3B: Calculate numerator: r(1 + r)^n
//       /**
//        * This is the interest rate multiplied by the compound factor
//        * 
//        * Example:
//        * 0.004375 × 3.63188 = 0.015889
//        */
//       const numerator = monthlyInterestRate * onePlusRatePowerN;

//       // STEP 3C: Calculate denominator: (1 + r)^n - 1
//       /**
//        * This represents the total growth minus the initial $1
//        * 
//        * Example:
//        * 3.63188 - 1 = 2.63188
//        */
//       const denominator = onePlusRatePowerN - 1;

//       // STEP 3D: Calculate monthly payment
//       /**
//        * Multiply principal by the payment factor
//        * 
//        * Example:
//        * $300,000 × (0.015889 / 2.63188)
//        * $300,000 × 0.006039
//        * = $1,811.70
//        */
//       monthlyPayment = principal * (numerator / denominator);

//       /**
//        * FORMULA: Total Repayment
//        * Total = Monthly Payment × Number of Payments
//        * 
//        * Example:
//        * Total = $1,811.70 × 300 = $543,510
//        */
//       totalRepayment = monthlyPayment * numberOfPayments;

//       /**
//        * FORMULA: Total Interest Paid
//        * Total Interest = Total Repayment - Principal
//        * 
//        * This shows how much extra you pay beyond the loan amount
//        * 
//        * Example:
//        * Total Interest = $543,510 - $300,000 = $243,510
//        */
//       totalInterest = totalRepayment - principal;
//     }

//     /**
//      * Remaining balance after all payments (repayment mortgage)
//      * The loan is fully paid off, so balance is zero
//      */
//     remainingBalance = 0;
//   }

//   // ------------------------------------------------------------------------
//   // STEP 4: ROUND TO 2 DECIMAL PLACES (CURRENCY FORMAT)
//   // ------------------------------------------------------------------------
//   /**
//    * Financial calculations should be rounded to 2 decimal places
//    * to represent cents in currency
//    */
//   monthlyPayment = Math.round(monthlyPayment * 100) / 100;
//   totalRepayment = Math.round(totalRepayment * 100) / 100;
//   totalInterest = Math.round(totalInterest * 100) / 100;
//   remainingBalance = Math.round(remainingBalance * 100) / 100;

//   // ------------------------------------------------------------------------
//   // STEP 5: CALCULATE ADDITIONAL METRICS
//   // ------------------------------------------------------------------------

//   /**
//    * FORMULA: Interest as Percentage of Principal
//    * Interest % = (Total Interest / Principal) × 100
//    * 
//    * Shows what percentage of the loan amount you pay in interest
//    * 
//    * Example:
//    * ($243,510 / $300,000) × 100 = 81.17%
//    */
//   const interestAsPercentage = (totalInterest / principal) * 100;

//   // ------------------------------------------------------------------------
//   // STEP 6: RETURN RESULTS
//   // ------------------------------------------------------------------------
//   return {
//     monthlyPayment: monthlyPayment,
//     totalRepayment: totalRepayment,
//     totalInterest: totalInterest,
//     remainingBalance: remainingBalance,
//     numberOfPayments: numberOfPayments,
//     interestAsPercentage: Math.round(interestAsPercentage * 100) / 100,
//     mortgageType: mortgageType
//   };
// }

// // ============================================================================
// // AMORTIZATION SCHEDULE GENERATOR (OPTIONAL)
// // ============================================================================

// /**
//  * Generate a detailed payment schedule showing how each payment is split
//  * between interest and principal over the life of the loan
//  * 
//  * @param {number} principal - The loan amount
//  * @param {number} monthlyPayment - Fixed monthly payment amount
//  * @param {number} monthlyInterestRate - Monthly interest rate (as decimal)
//  * @param {number} numberOfPayments - Total number of monthly payments
//  * @returns {array} Array of payment details for each month
//  */
// function generateAmortizationSchedule(principal, monthlyPayment, monthlyInterestRate, numberOfPayments) {
//   const schedule = [];
//   let remainingBalance = principal;

//   // Loop through each payment period
//   for (let month = 1; month <= numberOfPayments; month++) {
//     /**
//      * FORMULA: Interest Payment for Current Month
//      * Interest = Remaining Balance × Monthly Rate
//      * 
//      * Interest is calculated on the outstanding balance
//      * As balance decreases, so does the interest portion
//      * 
//      * Example (Month 1):
//      * Interest = $300,000 × 0.004375 = $1,312.50
//      */
//     const interestPayment = remainingBalance * monthlyInterestRate;

//     /**
//      * FORMULA: Principal Payment for Current Month
//      * Principal = Monthly Payment - Interest Payment
//      * 
//      * Whatever doesn't go to interest reduces the loan balance
//      * 
//      * Example (Month 1):
//      * Principal = $1,811.70 - $1,312.50 = $499.20
//      */
//     const principalPayment = monthlyPayment - interestPayment;

//     /**
//      * FORMULA: New Remaining Balance
//      * New Balance = Old Balance - Principal Payment
//      * 
//      * The loan balance decreases by the principal portion
//      * 
//      * Example (Month 1):
//      * New Balance = $300,000 - $499.20 = $299,500.80
//      */
//     remainingBalance = remainingBalance - principalPayment;

//     // Prevent negative balance due to rounding in final payment
//     if (remainingBalance < 0) {
//       remainingBalance = 0;
//     }

//     // Store this month's payment breakdown
//     schedule.push({
//       month: month,
//       payment: Math.round(monthlyPayment * 100) / 100,
//       interestPaid: Math.round(interestPayment * 100) / 100,
//       principalPaid: Math.round(principalPayment * 100) / 100,
//       remainingBalance: Math.round(remainingBalance * 100) / 100
//     });
//   }

//   return schedule;
// }

// // ============================================================================
// // HELPER FUNCTION: FORMAT CURRENCY
// // ============================================================================

// /**
//  * Format a number as currency with commas and 2 decimal places
//  * @param {number} amount - The amount to format
//  * @returns {string} Formatted currency string
//  */
// function formatCurrency(amount) {
//   return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
// }

// // ============================================================================
// // EXAMPLE USAGE
// // ============================================================================

// // Example 1: Repayment Mortgage
// console.log("=== REPAYMENT MORTGAGE ===");
// const repaymentMortgage = calculateMortgage(300000, 5.25, 25, "repayment");

// if (repaymentMortgage.error) {
//   console.log("Error:", repaymentMortgage.error);
// } else {
//   console.log("Mortgage Amount:", formatCurrency(300000));
//   console.log("Interest Rate:", "5.25%");
//   console.log("Term:", "25 years");
//   console.log("Type:", repaymentMortgage.mortgageType);
//   console.log("\n--- Results ---");
//   console.log("Monthly Payment:", formatCurrency(repaymentMortgage.monthlyPayment));
//   console.log("Total Repayment:", formatCurrency(repaymentMortgage.totalRepayment));
//   console.log("Total Interest:", formatCurrency(repaymentMortgage.totalInterest));
//   console.log("Interest as % of Loan:", repaymentMortgage.interestAsPercentage.toFixed(2) + "%");
//   console.log("Remaining Balance:", formatCurrency(repaymentMortgage.remainingBalance));
// }

// console.log("\n");

// // Example 2: Interest-Only Mortgage
// console.log("=== INTEREST-ONLY MORTGAGE ===");
// const interestOnlyMortgage = calculateMortgage(300000, 5.25, 25, "interest-only");

// if (interestOnlyMortgage.error) {
//   console.log("Error:", interestOnlyMortgage.error);
// } else {
//   console.log("Mortgage Amount:", formatCurrency(300000));
//   console.log("Interest Rate:", "5.25%");
//   console.log("Term:", "25 years");
//   console.log("Type:", interestOnlyMortgage.mortgageType);
//   console.log("\n--- Results ---");
//   console.log("Monthly Payment:", formatCurrency(interestOnlyMortgage.monthlyPayment));
//   console.log("Total Repayment:", formatCurrency(interestOnlyMortgage.totalRepayment));
//   console.log("Total Interest:", formatCurrency(interestOnlyMortgage.totalInterest));
//   console.log("Remaining Balance:", formatCurrency(interestOnlyMortgage.remainingBalance));
//   console.log("\nNote: You still owe the full principal amount at the end!");
// }

// console.log("\n");

// // Example 3: Generate Amortization Schedule (first 12 months)
// console.log("=== AMORTIZATION SCHEDULE (First 12 Months) ===");
// const monthlyRate = (5.25 / 100) / 12;
// const schedule = generateAmortizationSchedule(
//   300000,
//   repaymentMortgage.monthlyPayment,
//   monthlyRate,
//   12 // Just show first year
// );

// console.log("Month | Payment    | Interest   | Principal  | Balance");
// console.log("------|------------|------------|------------|------------");
// schedule.forEach(month => {
//   console.log(
//     `${month.month.toString().padStart(5)} | ` +
//     `${formatCurrency(month.payment).padStart(10)} | ` +
//     `${formatCurrency(month.interestPaid).padStart(10)} | ` +
//     `${formatCurrency(month.principalPaid).padStart(10)} | ` +
//     `${formatCurrency(month.remainingBalance).padStart(11)}`
//   );
// });

// // ============================================================================
// // COMPARISON FUNCTION
// // ============================================================================

// /**
//  * Compare repayment vs interest-only mortgages side by side
//  * @param {number} principal - The loan amount
//  * @param {number} annualInterestRate - Annual interest rate as percentage
//  * @param {number} years - Loan term in years
//  */
// function compareMortgageTypes(principal, annualInterestRate, years) {
//   const repayment = calculateMortgage(principal, annualInterestRate, years, "repayment");
//   const interestOnly = calculateMortgage(principal, annualInterestRate, years, "interest-only");

//   console.log("\n=== MORTGAGE COMPARISON ===");
//   console.log(`Loan Amount: ${formatCurrency(principal)}`);
//   console.log(`Interest Rate: ${annualInterestRate}%`);
//   console.log(`Term: ${years} years\n`);

//   console.log("                     | Repayment      | Interest-Only");
//   console.log("---------------------|----------------|---------------");
//   console.log(`Monthly Payment      | ${formatCurrency(repayment.monthlyPayment).padStart(14)} | ${formatCurrency(interestOnly.monthlyPayment).padStart(13)}`);
//   console.log(`Total Repayment      | ${formatCurrency(repayment.totalRepayment).padStart(14)} | ${formatCurrency(interestOnly.totalRepayment).padStart(13)}`);
//   console.log(`Total Interest       | ${formatCurrency(repayment.totalInterest).padStart(14)} | ${formatCurrency(interestOnly.totalInterest).padStart(13)}`);
//   console.log(`Final Balance        | ${formatCurrency(repayment.remainingBalance).padStart(14)} | ${formatCurrency(interestOnly.remainingBalance).padStart(13)}`);

//   const monthlySavings = repayment.monthlyPayment - interestOnly.monthlyPayment;
//   console.log(`\nMonthly Savings (Interest-Only): ${formatCurrency(monthlySavings)}`);
//   console.log(`But you still owe: ${formatCurrency(interestOnly.remainingBalance)} at the end!`);
// }

// // Run comparison
// compareMortgageTypes(500000, 5.25, 25);



  
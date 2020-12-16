export function breakdownIncome(schema, income, allowance) {
    let splits = [];

    if( income/schema.highIncomeMaxLimit > 1 ) {
        splits[0] = income - schema.highIncomeMaxLimit;
        splits[1] = schema.highIncomeMaxLimit - schema.basicIncomeMaxLimit;
        splits[2] = schema.basicIncomeMaxLimit - allowance;
    }else{
        if( income/schema.basicIncomeMaxLimit > 1 ) {
            splits[0] = income - schema.basicIncomeMaxLimit;
            if( income/schema.allowanceLimit > 1 ) {
                splits[1] = schema.basicIncomeMaxLimit - allowance;
            }else{
                splits[1] = schema.basicIncomeMaxLimit - schema.allowance;
            }
        }else{
            if( income/schema.allowance > 1 ) {
                splits[0] = income - schema.allowance;
            }else{
                splits = [];
            }
        }
    }
    splits = splits.reverse();

    return splits
}

export function calculateTax(schema, income) {
    let output,
        allowance = schema.allowance,
        insuranceTax = 0,
        taxes = 0,
        getSplits;

    // calculate the allowance upon which I will set afterwards the income breakdown splits
    if( income > schema.allowanceLimit) {
        const diff = income - schema.allowanceLimit;
        if( diff >= 2*allowance ) allowance = 0;
        else allowance = allowance - diff/2;
    }

    getSplits = breakdownIncome(schema, income, allowance);

    // calculate the sum of all taxes applied on the income
    if( getSplits.length > 0 ) {
        taxes = getSplits
            .map((item, index) => schema.rates[index] / 100 * item) // get an array of tax values applied differently on each of the income breakdown
            .reduce((accumulator, currentValue) => accumulator + currentValue); // sum up all these taxes to get the total
    }

    // calculate remaining income after applying taxes
    output = income - taxes - schema.allowance + allowance;

    // calculate insurance tax
    if( output >= 12*schema.insurance.lowLimit ) {
        if( output <= 12*schema.insurance.highLimit ) {
            insuranceTax = schema.insurance.lowRate/100 * output;
        }else{
            insuranceTax = schema.insurance.highRate/100 * output;
        }
    }else{
        insuranceTax = 0;
    }

    // calculate final income after applying insurance tax
    output = output - insuranceTax;

    return [taxes, insuranceTax, output, allowance]
}
export function breakdownIncome(schema, income, allowance) {
    let splits = [];

    if( income/schema.highIncomeMaxLimit > 1 ) {
        splits[0] = income - schema.highIncomeMaxLimit;
        splits[1] = schema.highIncomeMaxLimit - schema.basicIncomeMaxLimit + schema.allowance;
        splits[2] = schema.basicIncomeMaxLimit - schema.allowance;
    }else{
        if( income/schema.basicIncomeMaxLimit > 1 ) {
            if( income/schema.allowanceLimit > 1 ) {
                splits[0] = income - schema.basicIncomeMaxLimit + schema.allowance - allowance;
                splits[1] = schema.basicIncomeMaxLimit - schema.allowance;
            }else{
                splits[0] = income - schema.basicIncomeMaxLimit;
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
        insuranceTaxes = [],
        taxes = 0,
        getSplits,
        taxSplits = [];

    // calculate the allowance upon which I will set afterwards the income breakdown splits
    if( income > schema.allowanceLimit) {
        const diff = income - schema.allowanceLimit;
        if( diff >= 2*allowance ) allowance = 0;
        else allowance = schema.allowance - diff/2;
    }

    getSplits = breakdownIncome(schema, income, allowance);

    // calculate the sum of all taxes applied on the income
    if( getSplits.length > 0 ) {
        taxSplits = getSplits.map((item, index) => schema.rates[index] / 100 * item); // get an array of tax values applied differently on each of the income breakdown
        taxes = taxSplits.reduce((accumulator, currentValue) => accumulator + currentValue); // sum up all these taxes to get the total
    }

    // calculate insurance tax
    if( income > schema.insurance.lowLimit ) {
        if( income <= schema.insurance.highLimit ) {
            insuranceTaxes = [{
                amount: income - schema.insurance.lowLimit,
                rate: schema.insurance.lowRate,
                value: schema.insurance.lowRate/100 * ( income - schema.insurance.lowLimit )
            }];
        }else{
            insuranceTaxes = [{
                amount: schema.insurance.highLimit - schema.insurance.lowLimit,
                rate: schema.insurance.lowRate,
                value: schema.insurance.lowRate/100 * ( schema.insurance.highLimit - schema.insurance.lowLimit )
            },
            {
                amount: income - schema.insurance.highLimit,
                rate: schema.insurance.highRate,
                value: schema.insurance.highRate/100 * ( income - schema.insurance.highLimit )
            }]
        }
    }else{
        insuranceTaxes = [{
            amount: income,
            rate: 0,
            value: 0
        }];
    }

    // calculate final income after applying insurance tax
    output = income - taxes - insuranceTaxes.map((item)=>(item.value)).reduce((accumulator, currentValue) => accumulator + currentValue);

    if( getSplits.length === 0 ) {
        getSplits[0] = income;
        taxSplits[0] = income;
    }

    return {
        taxes: taxes,
        insuranceTaxes: insuranceTaxes.map((item)=>(item.value)).reduce((accumulator, currentValue) => accumulator + currentValue),
        income: output,
        initialAllowance: schema.allowance,
        allowance: allowance,
        taxSplits: taxSplits.map((item, index)=>(
            {
                amount: getSplits[index],
                rate: getSplits[index] <= schema.allowance ? 0 : schema.rates[index],
                value: item
            }
        )),
        insuranceSplits: insuranceTaxes
    }
}
import fs from 'fs';
import {deserializeQif, serializeQif, QifData} from 'qif-ts';
import { parse } from 'date-fns'

const qifRawData = fs.readFileSync('/home/vytas/Downloads/amex1.qif', 'utf8');
const qifData: QifData = deserializeQif(qifRawData);
// console.log(qifData.transactions)
const startDate = new Date('2024-04-12')
const endDate = new Date('2024-04-18')
const filteredTransactions = qifData.transactions.filter((transaction) => {
    if (!transaction.date) {
        return true
    }
    const transactionDate = parse(transaction.date, 'dd/MM/yyyy', new Date())

    return transactionDate >= startDate && transactionDate <= endDate
})
qifData.transactions = filteredTransactions
const qifText: string = serializeQif(qifData);
console.log(filteredTransactions)

// fs.writeFileSync('/home/vytas/Downloads/amex1-modified.qif', qifText);
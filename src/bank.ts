class Transaction {
    public amount: number;
    public date: Date;
    constructor(amount: number, date: Date) {
        this.amount = amount;
        this.date = date;
    }
}

class Customer {
    public name: string;
    public id: number;
    private transactions: Transaction[];
    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }

    getName(): string {
        return this.name;
    }

    getId(): number {
        return this.id;
    }

    getTransactions(): Transaction[]{
        return this.transactions;
    }

    addTransaction(amount: number): boolean {
        if(amount < 0) {
            console.log('Negative values are not accepted.');
            return false;
        }
        else {
            const transaction = new Transaction(amount, new Date());
            this.transactions.push(transaction);
            return true;
        }
    }

    getBalance(): number { 
        return this.transactions.reduce(
            (totalBalance, currentAmount) => totalBalance + currentAmount.amount , 0
            );
    }
}

class Branch {
    public name: string;
    public customers: Customer[];
    constructor(name: string) {
        this.name = name;
        this.customers = [];
    }

    getName(): string {
        return this.name;
    }

    getCustomers(): Customer[] {
        return this.customers;
    }

    addCustomer(customer: Customer): boolean {
        if (!this.customers.includes(customer)) {
            this.customers.push(customer);
            console.log(`${customer.name} is added now!`);
            return true;
        }
        else {
            console.log('The customer is already added.');
            return false;
        }
    }

    addCustomerTransaction(customerId: number, amount: number): boolean {
        const customer = this.customers.find(
            customer => customer.id == customerId
            );
        if(customer) {
            if(amount < 0) {
                console.log('Negative values are not accepted.');
                return false;
            }
            else {
                console.log(`${amount} is added now to ${customer.name} account!`);
                return customer.addTransaction(amount);
            }
        }
        else {
            console.log('The customer Id is incorrect or the customer is not registered.');
            return false;
        }
    }
}

class Bank {
    public name: string;
    private branches: Branch[];
    constructor(name: string) {
        this.name = name;
        this.branches = [];
    }

    addBranch(branch: Branch): boolean {
        if(!this.branches.includes(branch)) {
            this.branches.push(branch);
            console.log(`${branch.name} is added now to ${this.name} bank!`);
            return true;
        }
        else {
            console.log('The branch is already added.');
            return false;
        }
    }

    addCustomer(branch: Branch, customer: Customer): boolean {
        if(this.checkBranch(branch)) {
            if (!branch.customers.includes(customer)) {
                branch.customers.push(customer);
                console.log(`${customer.name} is added now to ${branch.name}!`);
                return true;
            }
            else {
                console.log(`${customer.name} is already added to ${branch.name}.`);
                return false;
            }
        }
        else {
            console.log('The branch is not found.');
            return false;
        }
    }

    addCustomerTransaction(branch: Branch, customerId: number, amount: number): boolean {
        if(this.checkBranch(branch)) {
            const customer = branch.customers.find(
                customer => customer.id == customerId
                );
            if(customer) {
                if(amount < 0) {
                    console.log('Negative values are not accepted.');
                    return false;
                }
                else {
                    console.log(`${amount} is added now to ${customer.name} account!`);
                    return customer.addTransaction(amount);
                }
            }
            else {
                console.log('The customer Id is incorrect or the customer is not registered.');
                return false;
            }
        }
        else {
            console.log('The branch is not found.');
            return false;
        }
    }

    findBranchByName(branchName: string): string | null {
        if(branchName){
            const branch = this.branches.find(
                branch => branch.getName() == branchName
                );
            if(branch){
                return branch.getName(); 
            }
            else {
                return null;
            }
        }
        else {
            throw new Error('Please fill in all the required fields.');
        }
    }

    checkBranch(branch: Branch): boolean {
        if(this.branches.includes(branch)) {
            return true;
        }
        else {
            return false;
        }
    }

    listCustomers(branch: Branch, includeTransactions: boolean): void {
        if (this.checkBranch(branch)) {
            const customers = branch.getCustomers();
            let info = 'Customers List:\n';
            for (let customer of customers) {
                info += `Name: ${customer.name}\n Id: ${customer.id}\n`;
                if(includeTransactions){
                    if (customer.getTransactions().length) {
                        info += 'Transactions:\n';
                        let transactions = customer.getTransactions();
                        for (let transaction of transactions) {
                            info += `Amount: ${transaction.amount}, Date: ${transaction.date}\n`;
                        }
                    }
                    else {
                        info += `Transactions:\n Empty...\n`;   
                    }
                }
            }
            console.log(info);
        }
        else {  
            throw new Error('The branch is not found.');
        }
    }
}


const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("Sara", 3)

console.log('...............................Add Branches to the bank...............................');
arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch) 

console.log('...............................Find branch by name...............................');
console.log(arizonaBank.findBranchByName("Bank"));
console.log(arizonaBank.findBranchByName("sun"));

console.log('...............................Add Customers to branches...............................');
arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)

console.log('...............................Add Customer transactions to the bank...............................');
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000)

console.log('...............................Add a transaction to a customer...............................');
customer1.addTransaction(-1000)

console.log('...............................Get the balance of a customer...............................');
console.log(customer1.getBalance())

console.log('...............................List all customers of the bank in west branch...............................');
arizonaBank.listCustomers(westBranch, true)

console.log('...............................List all customers of the bank in sun branch...............................');
arizonaBank.listCustomers(sunBranch,true)
class Customer {
    private firstName: string;
    private lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public greet() {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }
}

let customer = new Customer("John", "Doe");
customer.greet();

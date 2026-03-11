export class Customer {
    firstName: string;
    lastName: string;
    age: number;
    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    public getAge() {
        return this.age;
    }
    public greet() {
        console.log(`Hello ${this.firstName} ${this.lastName}`);
    }
}
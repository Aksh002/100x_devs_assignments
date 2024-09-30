//Class - Gives out a structure of smthing that is reusable and used in multiple places. Class is like a blueprint,an architectural map of a building

class Animal {
  constructor(name, legCount,speaks) {
    this.name = name
    this.legCount = legCount
    this.speaks= speaks
  }
  describe() {
    return `${this.name} speaks ${this.speaks} has ${this.legCount} legs `
  }
  speak()
  {
    console.log("hi there "+this.speaks)
  }
}
let dog=new Animal("dog",4,"bhow bhow") //Create an obj
// What above is the object, it is building moulded out of the class mould
let cat= new Animal("Cat",4,"meow")
dog.speak()//call fxn on obj
console.log(dog.describe())
cat.speak()

//                Static
class Animal {
  constructor(name, legCount,speaks) {
    this.name = name
    this.legCount = legCount
    this.speaks= speaks
  }
  describe() {
    return `${this.name} speaks ${this.speaks} has ${this.legCount} legs `
  }
  speak()
  {
    console.log("hi there "+this.speaks)
  }
  static mytype()
  {
    console.log("ANIMAL HU MAIIII")
  }
}
Animal.mytype()   //If u ant to call smthing directly on the class u make that fxn static. Static method can be called without instentiating the object


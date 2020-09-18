
describe('Quotes app', () =>{
    //test goes here
    beforeEach(() =>{
        //code you want running before each test
        cy.visit('http://localhost:3000')
    })

    it('can type in a box', () =>{
    
        cy.get('input[name ="orderName"]')       //.get selects the element
            .should('have.value', '')           //asserts value is empty
            .type('Robert')                     //types in Robert into selected array
            .should('have.value', 'Robert')     //asserts value is Robert
    })

    it('an select multiple toppings', () =>{
 
        cy.get('input[name ="pepperoni"]')
        .check()
        .should('have.value', 'on')

        cy.get('input[name ="bacon"]')
        .check()
        .should('have.value', 'on')
    })
    it('can submit the form', () =>{

        cy.get('input[name ="orderName"]').type('Robert')
        cy.get('input[name ="instructions"]').type('double cheese')
        cy.get('select').select('small')
        cy.get('button')
            .should('be.enabled')
        })

})
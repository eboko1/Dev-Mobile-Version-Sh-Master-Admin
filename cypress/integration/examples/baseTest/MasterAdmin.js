/// <reference types="cypress" />

const url = 'dev-'   //test-   // dev-  // ''


const baseUrl = 'https://'+url+'my.carbook.pro';
const appointments = 'https://'+url+'my.carbook.pro/orders/appointments';
const approve = 'https://'+url+'my.carbook.pro/orders/approve';
const progress = 'https://'+url+'my.carbook.pro/orders/progress';
const success = 'https://'+url+'my.carbook.pro/orders/success';
const cancel = 'https://'+url+'my.carbook.pro/orders/cancel';


var date = new Date();
////const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
var codeNZ =''
var mehanic=''

const idClient ='7947'


describe ('BaseTest|Mobile Version|UA|CarBook', function(){
    beforeEach('User LogIn ', () => {
        cy.visit(baseUrl)
            .then(()=>{
                cy.get('#login.ant-input').type(Cypress.env('Dev1Login'));  // ProdLogin     DevLogin      ProdLogin   TestSpecialistLogin  DevSpecialistLogin
                cy.get('#password').type(Cypress.env('Password')); //  TestSpecialistPassword  DevSpecialistPassword
        })
        cy.get('button').click()
        cy.intercept('GET', baseUrl+'/dashboard')
        .then(()=>{
            cy.get('.drawer-handle').click() // close
        })
    });

    it('Календар завантажень', function(){
        cy.get('.withScroll').should('exist');
        cy.get('.styles-m__title---34B8J > span').should('exist');
    })

    it('*Додавання ремонту ч/з +|Планувальник', function(){
        cy.get(':nth-child(1) > .sc-jtRfpW > .sc-gxMtzJ > :nth-child(5) > .sc-btzYZH').first().click({ force: true })
        cy.get('#searchClientQuery').clear().type('Vika')
        cy.get('.ant-table-row > :nth-child(1)').first().click({ force: true })
        cy.get('.ant-select-selection__rendered').eq(2).click() //вибір поста
        cy.get('.ant-select-dropdown-menu-item-active').click()
        cy.get('#manager > .ant-select-selection').click()
        cy.get('.ant-select-dropdown-menu-item-active').click()
        cy.get('#employee > .ant-select-selection').click()
        cy.get('.ant-select-dropdown-menu-item-active').click()
        cy.get('#comment').type('не заляпать авто')
        cy.get('.ant-btn').first().click({ force: true }).click() ///додати Ремонт
    })

    it('Додавання робіт', function(){
        cy.visit(appointments)
        .then(()=>{
            //  cy.get('.ant-input').type(codeNZ)   //пошук
          
            cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
            cy.wait(4000)
            cy.get('.ant-select-selection').last().invoke('text')// отримати механіка
                .then (text => {
                    mehanic = text;
                    cy.log(mehanic)
                })
             })
            cy.log(mehanic)
            .then(()=>{
                cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(2)').click({ force: true }) // табка роботи в НЗ
            })
            cy.get('button').contains('Додати').click({ force: true })// Додати
           
            cy.get('.ant-select-selection').contains('Робота').click() // вибір Роботи
            cy.get('.ant-select-dropdown-menu-item-active').click()
            cy.get(':nth-child(1) > div > .ant-btn').click({ force: true })
            cy.get('.styles-m__blockButtonsWrap---2oTAz > :nth-child(1)').click({ force: true })
            cy.get('.styles-m__blockButtonsWrap---2oTAz > :nth-child(15)').click({ force: true })
            cy.get('.ant-modal-footer > .ant-btn-primary').first().click({ force: true })
            cy.get(':nth-child(6) > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(222)
            cy.wait(2000)
            cy.get(':nth-child(7) > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().clear().type(2)
            cy.wait(2000)
            cy.get('.ant-modal-footer > div > .ant-btn-primary').contains('OK').click({ force: true })
    })  

    it('Додавання робіт через комплекси', function(){
        cy.visit(appointments)
        .then(()=>{
            //  cy.get('.ant-input').type(codeNZ)   //пошук
            cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
            cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(2)').click({ force: true })
            cy.log('Відкриття модалки Комплекси');
            cy.get('.styles-m__ownIcon---2tsV5').click() // кнопка комплекси
                .then( () => {
                    cy.get('.ant-modal-body').should('exist');     
            })
            cy.get('.styles-m__laborsList---3qgUM > .styles-m__listRow---2lt3h > .styles-m__nameField---3rhCH > .ant-select > .ant-select-selection').click()
            cy.wait(2000)
            cy.get('.ant-select-dropdown-menu-item-active').click()
            cy.wait(2000)
            cy.get('.ant-btn-primary').last().click({force: true})
            cy.wait(3000)
        })
    })

    // // it('Перевірка відображення працівника в модалці Роботи', function(){
    // //     cy.visit(appointments)
    // //     .then(()=>{
    // //         //  cy.get('.ant-input').type(codeNZ)   //пошук        
    // //     })
    // //     cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
    // //     .then(()=>{
    // //         cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(2)').click({ force: true }) // табка роботи в НЗ
    // //     })
    // //     cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > [data-row-key="0"] > :nth-child(1)').eq(0).click({ force: true })
    // //     cy.get('.styles-m__mobileTableEmployee---3qb2T > :nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value').contains('Vika').should('exist')   
    // // })

    it('Додавання запчастин', function(){
        cy.visit(appointments)
        .then(()=>{
            //  cy.get('.ant-input').type(codeNZ)   //пошук
        })
        cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
        cy.get('.ant-tabs-nav').contains('Запчастини').click({ force: true }) // табка Запчастини в НЗ
        cy.wait(2000)  
        cy.get('.ant-tabs-tabpane-active > [style="margin: 12px 0px 8px; display: flex; justify-content: flex-end;"] > .ant-btn').click()
        cy.get('.styles-m__modalSectionTitle---3L6Ff > div > span').contains('Вузол/деталь')
        cy.get('.ant-select-selection').contains('Група З/Ч').click({ force: true })
        cy.get('.ant-select-search__field').type('Мастила (оливи)')
        cy.get('.ant-select-tree-node-content-wrapper').click()
        cy.get(':nth-child(4) > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(1234)
        cy.get(':nth-child(5) > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(1.6)
        cy.get('.ant-btn-primary').click({ force: true })
    })
})
/// <reference types="cypress" />



const url = 'dev-'   //test-   // dev-  // ''


const baseUrl = 'https://'+url+'my.carbook.pro';
const appointments = 'https://'+url+'my.carbook.pro/orders/appointments';
const approve = 'https://'+url+'my.carbook.pro/orders/approve';
const progress = 'https://'+url+'my.carbook.pro/orders/progress';
const success = 'https://'+url+'my.carbook.pro/orders/success';
const cancel = 'https://'+url+'my.carbook.pro/orders/cancel';


var date = new Date();
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10

var mehanic=''

//const idClient ='9010'


describe ('Dev|Mobile|SH|Admin|UA', function(){
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

    it('Календар Завантажень', function(){
        cy.get('.withScroll').should('exist');
        cy.get('.styles-m__title---34B8J > span').should('exist');
    })

   it('Створення Клієнта '+idClient, function(){
        cy.get(':nth-child(1) > .sc-jtRfpW > .sc-gxMtzJ > :nth-child(6) > span > .anticon > svg').first().click({ force: true })
        cy.wait(2000)
        cy.get('.ant-btn').eq(3).click({ force: true })
        cy.get('#name').type('V')
        cy.get('#surname').type('БазовийMobi'+idClient)
        cy.wait(2000)
        cy.get('.ant-input-number-input').type('683781977')
        cy.get('.ant-modal-confirm-btns > .ant-btn').first().click({ force: true })
        cy.log('Додавання а/м')
        cy.get('.styles-m__addVehicleButtonCont---Y1h26 > .ant-btn').first().click({ force: true })
        cy.get('#vehicle_add_from_number').type(idClient)
        cy.get('#vehicle_add_from_vin').type('MDHFBUK13U0107589')
        cy.wait(1000)
        cy.get(':nth-child(3) > .ant-col-12 > .ant-row > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-select > .ant-select-selection').click()
        cy.get('.ant-select-dropdown-menu-item-active').click()
        cy.wait(1000)
        cy.get(':nth-child(4) > .ant-col-12 > .ant-row > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-select > .ant-select-selection').click()
        cy.get('.ant-select-dropdown-menu-item-active').click()
        cy.wait(1000)
        cy.get(':nth-child(5) > .ant-col-12 > .ant-row > .ant-col > .ant-form-item-control > .ant-form-item-children > .ant-select > .ant-select-selection').click()
        cy.get('.ant-select-dropdown-menu-item-active').click()
        cy.wait(1000)
        cy.get(':nth-child(6) > .ant-col-12').click()
        cy.get('.ant-select-dropdown-menu-item-active').click()
        cy.wait(1000)
        cy.get('.ant-btn').contains('OK').click({ force: true }) ///ОК Додавання Авто
        cy.wait(2000)  
        cy.get('.ant-modal-footer > div > .ant-btn-primary').click({ force: true }) // Додати Клієнта
        cy.wait(2000)  
        cy.get('[style="display: flex;"] > .ant-select > .ant-select-selection').contains('БазовийMobi'+idClient).should('exist')
        cy.wait(4000)   
    })

    it('Додавання ремонту ч/з +|Планувальник', function(){
        cy.get(':nth-child(1) > .sc-jtRfpW > .sc-gxMtzJ > :nth-child(6) > span > .anticon > svg').first().click({ force: true })
        cy.wait(2000)
        cy.get('.ant-select > .ant-select-selection').eq(0).type('БазовийMobi'+idClient)
        cy.get('.ant-select-dropdown-menu-item-active').click()
        cy.wait(2000)
        cy.get('.ant-select > .ant-select-selection').eq(1).type('Пост')
        cy.get('.ant-select-dropdown-menu-item-active').click()
        cy.wait(2000)
        cy.get('.ant-modal-body > .ant-btn').first().click({ force: true }) ///додати Ремонт
        cy.wait(4000)
    })

    it('Додавання Механіка в НЗ', function(){
            cy.get('.anticon-menu-unfold > svg').click()
            cy.get('.ant-menu-item').contains('Ремонти').click()
            cy.wait(4000)
            cy.get('.ant-input').type(idClient)   //пошук
            cy.wait(4000)
            cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
            cy.wait(4000)
            cy.get('.ant-select-selection').last().invoke('text')// отримати механіка
                .then (text => {
                    mehanic = text;
                    cy.log(mehanic)
                })
             cy.get('#employee > .ant-select-selection').click().type('Механік')
             cy.wait(2000)
             cy.get('.ant-select-dropdown-menu-item-active').click()
             cy.wait(2000)
             cy.get('.anticon-save ').first().click({ force: true })
             cy.wait(3000)
             cy.get('.styles-m__headerContorlsShowIcon---6gTgk > .anticon > svg').click()
             cy.wait(3000)
             cy.get('.styles-m__hiddenHeaderContorls---1N6ed > .styles-m__dropdownTitle---3Vlog > .anticon').click()
             cy.wait(3000)
             cy.get('.ant-dropdown-menu').contains('Запис').first().click({ force: true })
             cy.wait(5000)

    })

        it('Перевірка НЗ в статусі Запису', function(){
            cy.visit(appointments)
            .then(()=>{
                cy.get('.ant-input').type(idClient)   //пошук        
            })
            cy.get('.ant-select-selection').click()
            cy.get('.ant-select-dropdown-menu > :nth-child(2)').click()
            cy.wait(2000)
            cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
            .then(()=>{
                cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(2)').click({ force: true }) // табка роботи в НЗ
                cy.wait(3000)
                cy.get('.styles-m__title---34B8J').contains('Запис').should('exist')
                cy.wait(2000)
            })
        })

    it('Додавання Робіт', function(){
        cy.visit(approve)
        .then(()=>{
            cy.get('.ant-input').type(idClient)   //пошук
          
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
            cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({ force: true })
    })  

    it('Додавання Робіт через Комплекси', function(){
        cy.visit(approve)
        .then(()=>{
            cy.get('.ant-input').type(idClient)   //пошук
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

    it('Перевірка відображення працівника та найменування Роботи', function(){
        cy.visit(approve)
        .then(()=>{
            cy.get('.ant-input').type(idClient)   //пошук        
        })
        cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
        .then(()=>{
            cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(2)').click({ force: true }) // табка роботи в НЗ
        })
        cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > [data-row-key="0"] > :nth-child(1)').eq(0).click({ force: true })
        cy.get('.styles-m__mobileTableEmployee---3qb2T > :nth-child(2) > .ant-select > .ant-select-selection > .ant-select-selection__rendered > .ant-select-selection-selected-value').contains('Vika').should('exist')   
        cy.wait(1000)
        cy.get(':nth-child(3) > .ant-select > .ant-select-selection').contains('Балансування диска').should('exist') 
        cy.wait(1000)
        cy.get('.ant-btn-primary').contains('Зберегти').click({ force: true })
        cy.wait(3000)
        cy.get('.styles-m__headerContorlsShowIcon---6gTgk > .anticon > svg').click()
        cy.wait(3000)
        cy.get('.styles-m__hiddenHeaderContorls---1N6ed > .styles-m__dropdownTitle---3Vlog > .anticon').click()
        cy.wait(3000)
        cy.get('.ant-dropdown-menu').contains('Ремонт').click()
        cy.wait(5000)
    })

        it('Перевірка статуса НЗ / Ремонт', function(){
            cy.visit(progress)
            .then(()=>{
                cy.get('.ant-input').type(idClient)   //пошук        
            })
            cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
            .then(()=>{
                cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(2)').click({ force: true }) // табка роботи в НЗ
                cy.get('.styles-m__title---34B8J').contains('Ремонт').should('exist')
            })
        
        })

    it('Додавання Запчастин', function(){
        cy.visit(progress)
        .then(()=>{
            cy.get('.ant-input').type(idClient)   //пошук
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

    it('Видалення Запчастин', function(){
        cy.visit(progress)
        .then(()=>{
          cy.get('.ant-input').type(idClient)   //пошук
        })
        cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
        cy.get('.ant-tabs-nav').contains('Запчастини').click({ force: true }) // табка Запчастини в НЗ
        cy.wait(2000)  
        cy.get('.ant-tabs-tabpane-active > [style="margin: 12px 0px 8px; display: flex; justify-content: flex-end;"] > .ant-btn').click()
        cy.get('.styles-m__modalSectionTitle---3L6Ff > div > span').contains('Вузол/деталь')
        cy.get('.ant-select-selection').contains('Група З/Ч').click({ force: true })
        cy.get('.ant-select-search__field').type('Мастила (оливи)')
        cy.get('.ant-select-tree-node-content-wrapper').click()
        cy.get(':nth-child(4) > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(22)
        cy.get(':nth-child(5) > :nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type(1.6)
        cy.get('.ant-btn-primary').click({ force: true })
        cy.wait(3000)  
        cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > [data-row-key="1"] > :nth-child(1)').last().click({ force: true })
        cy.get('.ant-btn-danger').click({ force: true })
        cy.wait(1000) 
        cy.get('.ant-modal-confirm-btns > .ant-btn-danger').click({ force: true })
        cy.wait(3000)  
    })

    it('Відображення табки Історії ремонту', function(){
        cy.visit(progress)
        .then(()=>{
            cy.get('.ant-input').type(idClient)   //пошук        
        })
        cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
        .then(()=>{
            cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(4)').click({ force: true }) // табка роботи в НЗ
            cy.get('.ant-tabs-tabpane-active').should('exist')
        })
    })

    it('Перевірка відкриття Ордера / іконка $', function(){
        cy.visit(progress)
        .then(()=>{
            cy.get('.ant-input').type(idClient)   //пошук        
        })
        cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
        .then(()=>{
            cy.wait(3000)
            cy.get('.styles-m__headerContorlsShowIcon---6gTgk > .anticon > svg').click()
            cy.wait(3000)
            cy.get('.styles-m__hiddenHeaderContorls---1N6ed > .anticon-dollar').click()
            cy.get('.ant-modal-header').contains('Касовий ордер')
            cy.get('.ant-modal-body').should('exist')
            cy.wait(3000)
        })
    })

    it('Завершення ремонту, оплата', function(){
        cy.visit(progress)
        .then(()=>{
            cy.get('.ant-input').type(idClient)   //пошук        
        })
        cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true })
        .then(()=>{
            cy.wait(3000)
            cy.get('.styles-m__headerContorlsShowIcon---6gTgk > .anticon > svg').click()
            cy.wait(3000)
            cy.get('.styles-m__hiddenHeaderContorls---1N6ed > .styles-m__dropdownTitle---3Vlog > .anticon').click()
            cy.wait(3000)
            cy.get('.ant-dropdown-menu').contains('Завершено').click()
            cy.get('#withPayment > :nth-child(1)').click()
            cy.get('.ant-checkbox').last().click()
            cy.get('.ant-btn-primary').click()
            cy.wait(3000)
        })
    })

    it('Перевірка картки Працівника', function(){
        cy.get('.anticon-menu-unfold > svg').click()
        cy.get('.ant-menu-submenu-title').contains('Довідник').click()
        cy.get('.ant-menu-item').contains('Працівники').click()
        cy.wait(1000)
        cy.get('.styles-m__employeeName---2QyjT').first().click({ force: true })
        cy.wait(1000)
        cy.get('.styles-m__employeeSection---17Lh6').should('exist')
        cy.wait(3000)
    })
  
})
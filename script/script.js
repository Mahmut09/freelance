document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    const customer = document.getElementById('customer');
    const freelancer = document.getElementById('freelancer');
    const blockCustomer = document.getElementById('block-customer');
    const blockFreelancer = document.getElementById('block-freelancer');
    const blockChoice = document.querySelector('#block-choice');
    const btnExit = document.getElementById('btn-exit');
    const formCustomer = document.getElementById('form-customer');
    const ordersTable = document.getElementById('orders');
    const modalOrder = document.getElementById('order_read');
    const modalActive = document.getElementById('order_active');


    const orders = [];
    

    const renderOrders = () => {

        ordersTable.textContent = '';

        orders.forEach((order, i) => {

            ordersTable.innerHTML += `
                <tr class='order taken' data-number-order='${i}'>
                    <td>${i+1}</td>
                    <td>${order.title}</td>
                    <td class='${order.currency}'></td>
                    <td>${order.deadline}</td>
                </tr>
                `;
         })
    };


    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        const modal = order.active ? modalOrderActive : modalOrder;    // Тернарный оператор "?" вместо if и else


        const firstNameBlock = document.querySelector('.firstName'),
            titleBlock = document.querySelector('.modal-title'),
            emailBlock = document.querySelector('.email'),
            descriptionBlock = document.querySelector('.description'),
            deadlineBlock = document.querySelector('.deadline'),
            currencyBlock = document.querySelector('.currency_img'),
            countBlock = document.querySelector('.count'),
            phoneBlock = document.querySelector('.phone');
            

            titleBlock.textContent = order.title;
            firstNameBlock.textContent = order.firstName;
            emailBlock.textContent = order.email;
            descriptionBlock.textContent = order.description;
            deadlineBlock.textContent = order.deadline;
            countBlock.textContent = order.count;
            
            // осталось телефон и оплата


            

        modal.style.display = 'block';
    };


    ordersTable.addEventListener('click', (event) => {
        const target = event.target;

        const targetOrder = target.closest('.order')
        if (targetOrder) {
            openModal(targetOrder.dataset.numberOrder);
        }

    });


        //--ДЗ--
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', () => {                            
        modalOrder.style.display = 'none';
    })



    customer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        renderOrders();
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block';
    })

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();
        const obj = {};

        const elements = [...formCustomer.elements].filter((elem) => ((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                                                                    (elem.type === 'radio' && elem.checked) ||
                                                                    elem.tagName === 'TEXTAREA'));
                                                                    

        elements.forEach((elem) => {  // (добавили) создали массив из formCustomer.elements  (рест оператор ...)
            obj[elem.name] = elem.value;
        });

        formCustomer.reset();      //reset формы

        orders.push(obj);

    });

})
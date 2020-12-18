// const EmployeePayRoll = require('./EmployeePayroll.js');
// const EmployeePayrollForm = require('../pages/EmployeePayrollForm.html');

// UC - 10 - On Document Load Set Event Listener
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            (new EmployeePayRoll()).name = name.value;
            nameError.textContent = "";
        }
        catch (e) {
            nameError.textContent = e;
    
        }

        const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input', function () {
            output.textContent = salary.value;
        });
    });
});

// UC - 11 - On Save Create Employee Payroll Object
const save = () => {
    try {
        let employeePayRoll = createEmployeePayroll();
        createAndUpdateStorage(employeePayRoll)
    }
    catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollObj = new EmployeePayRoll();
    try {
        employeePayrollObj.name = getInputValueById('#name');
    }
    catch (e) {
        setTextValue('name-error', e);
        throw e;
    }

    employeePayrollObj.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj.department = getSelectedValues('[name=department]').pop();
    employeePayrollObj.salary = getInputValueById('#salary');
    employeePayrollObj.gender = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj.date = Date.parse(date);
    alert(employeePayrollObj.toString());
    return employeePayrollObj;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            seltems.push(item.value);
    });
    return selItems
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

// UC - 12 - Save the Employee Payroll Object to Local Storage

function createAndUpdateStorage(employeePayRoll){

    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayRoll);
    }
    else {
        employeePayrollList = [employeePayRoll]
    } 
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
// UC - 13 Reset the Employee Payroll Form

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = ( id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
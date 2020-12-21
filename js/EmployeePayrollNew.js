// UC - 10 - On Document Load Set Event Listener

let isUpdate = false;
let employeePayrollObj = {};

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
    });
        const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input', function () {
            output.textContent = salary.value;    
    });
    checkForUpdate();
});

// UC - 11 - On Save Create Employee Payroll Object
const save = () => {
    try {
        let employeePayRoll = createEmployeePayroll();
        createAndUpdateStorage(employeePayRoll);
    }
    catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let random = Math.floor(Math.random() * 100);
    let employeePayRoll = new EmployeePayRoll();
    try {
        employeePayRoll.name = getInputValueById('#name');
    }
    catch (e) {
        setTextValue('name-error', e);
        throw e;
    }
    employeePayRoll.id = random;
    employeePayRoll.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayRoll.gender = getSelectedValues('[name=gender]').pop();
    employeePayRoll.department = getSelectedValues('[name=department]').pop();
    employeePayRoll.salary = getInputValueById('#salary');
    employeePayRoll.note = getInputValueById('#note');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayRoll.startDate = date;
    alert(employeePayRoll.toString());
    return employeePayRoll;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
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
        employeePayrollList = [employeePayRoll];
    } 
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
// UC - 13 Reset the Employee Payroll Form

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#note', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    }

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
allItems.forEach(item => {
    if(Array.isArray(value)){
        if(value.includes(item.value)){
            item.checked = true;
        }
    }
    else if (item.value === value)
    item.checked = true;
});
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#note','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.setSelectedIndex = index;
}

const checkForUpdate = () => {
    const employeePayRollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayRollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayRollJson);
    setForm();
}



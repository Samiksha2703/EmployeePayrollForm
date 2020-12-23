// UC - 10 - On Document Load Set Event Listener

let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setTextValue('.name-error', "");
            return;
        }
        try {
            (new EmployeePayRoll()).name = name.value;
            setTextValue('.name-error', "");
        }
        catch (e) {
            setTextValue('.name-error', e);    
        }
    });

    const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input', function () {
            output.textContent = salary.value;    
    });

    const date = document.querySelector('#date');
    date.addEventListener('input', function() {
        const startDate = new Date(Date.parse(getInputValueById('#day') + " " +getInputValueById('#month')+ " "+getInputValueById('#year')));
        try {
            (new EmployeePayRoll()).startDate = startDate;
            setTextValue('.date-error', "");
        }
        catch (e) {
            setTextValue('.date-error', e);
        }
    });

    checkForUpdate();
});

//method to save details of employee
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch (e) {
        return;
    }
}

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name = profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#note');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = date;
    console.log(employeePayrollObj);
}

function createAndUpdateStorage(){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if(!empPayrollData){
        employeePayrollList.push(createEmployeePayroll());
        } else {
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayroll(empPayrollData._id));
        }
    } else {
    employeePayrollList = [createEmployeePayRoll()];
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    }

    const createEmployeePayroll = (id) => {
        let employeePayRoll = new EmployeePayRoll();
        if (!id) employeePayRoll.id = createNewEmployeeId();
        else employeePayRoll.id = id;
        setEmployeePayRoll(employeePayRoll);
        return employeePayRoll;
    }

const setEmployeePayRoll = (employeePayRoll) => {
    try {
        employeePayRoll.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.name-error', e);
        throw e;
    }
        employeePayRoll.profilePic = employeePayrollObj._profilePic;
        employeePayRoll.gender = employeePayrollObj._gender;
        employeePayRoll.department = employeePayrollObj._department;
        employeePayRoll.salary = employeePayrollObj._salary;
        employeePayRoll.note = employeePayrollObj._note;
        try {
            employeePayRoll.startDate = 
            new Date(Date.parse(employeePayrollObj._startDate));
        } catch{
            setTextValue('.date-error', e);
            throw e;
        }
        alert(employeePayRoll.toString());
    }

    const createNewEmployeeId = () => {
        let empID = localStorage.getItem("EmployeeID");
        empID =  !empID ? 1 : (parseInt(empID)+1).toString();  
localStorage.setItem("EmployeeID", empID);
return empID;
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

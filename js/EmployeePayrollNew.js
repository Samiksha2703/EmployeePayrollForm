let employeePayroll = require('./EmployeePayroll.js');

window.addEventListener('DOMContentLoaded', (event) => {
const name = document.querySelector('#name');
const nameError = document.querySelector('.name-error');
name.addEventListener('input', function(){
    if (name.value.length == 0) {
        nameError.textContent = "";
    return;
}
try {
    (new EmployeePayrollForm()).name = name.value;;
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


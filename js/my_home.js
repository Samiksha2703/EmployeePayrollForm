window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th><Department</th>" + "<th>Salary</th><th>Start Date</th><th>Action</th>";
    innerHtml = `${headerHtml}`;
    let empPayrollList = createEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
    <tr>
    <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
    
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td> 
    <td>${getDeptHtml(empPayrollData._department)}</td>
    <td>${empPayrollData._salary}</td>
    <td>${empPayrollData._startDate}</td>
    <td>
        <img name="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
        <img name="${empPayrollData._id}" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
    </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <dev class='dept-lable'>${dept}</div>`
    }
    return deptHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Samiksha Shende',
            _gender: 'female',
            _department: [
                'Engineering'
            ],
            _salary: '500000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/Ellipse -7.png'
        },
        {
            _name: 'Apurva Yede',
            _gender: 'female',
            _department: [
                'Engineering', 'Finance'
            ],
            _salary: '500000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/Ellipse -4.png'
        }
    ];
    return empPayrollListLocal;
}


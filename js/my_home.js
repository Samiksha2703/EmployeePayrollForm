window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th><Department</th>" + "<th>Salary</th><th>Start Date</th><th>Action</th>";
    const innerHtml = `${headerHtml}
    <tr>
    <td><img class="profile" alt="" src="../assets/Ellipse -4.png">
    </td>
    <td>Samiksha Shende</td>
    <td>Female</td>
    <td>
        <div class='dept-label'>HR</div>
        <div class='dept-label'>Engineer</div>
    <td>3000000</td>
    <td>5th May 2017</td>
    <td>
        <img id="1" onclick="remove(this)" alt="delete" src="../assets/delete-black-18dp.svg">
        <img id="1" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
    </td>
    </tr>
    `;
    document.querySelector('#table-display').innerHTML = innerHtml;
}

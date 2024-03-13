
let Items = [];

document.getElementById("btn-add").addEventListener('click', function() {
    let Id = document.getElementById("txtId").value;
    let Name = document.getElementById("txtName").value;
    let Hours = document.getElementById("txtHour").value;

    Items.push( [Id, Name, Hours] );
    DrawList();
});

function remove(index) {
    Items.splice(index, 1);
    DrawList();
}

function DrawList() {
    let List = "";
    let total = 0;
    for(let x = 0; x < Items.length; x++) {
        total = total + parseInt(Items[x][2]);
        let empId = "<div class='col-3'>" + Items[x][0] + "</div>";
        let fullName = "<div class='col-3'>" + Items[x][1] + "</div>";
        let hours = "<div class='col-3'>" + Items[x][2] + "</div>";
        let action = "<button class='btn btn-danger' onclick='remove("+x+")'>Remove</button>";
        List += "<li class='mt-1 d-flex list-style-none border-bottom pb-1 border-light'>"+ empId + fullName + hours + action + "</li>";
    }
    document.getElementById("total").innerHTML = total;

    document.getElementById("ul-list").innerHTML = List;
}
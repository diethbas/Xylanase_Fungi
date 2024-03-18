
let Items = [];
let UpdateItem = [];

// EventListener
document.getElementById("btn-add").addEventListener('click', function() {
    let Id = document.getElementById("txtId").value;
    let Name = document.getElementById("txtName").value;
    let Hours = document.getElementById("txtHour").value;
// ButtonTextCheck
    let btnAdd = document.getElementById("btn-add");    
    if (btnAdd.innerText === "Log Hours") {                
        Items.push([Id, Name, Hours]);
    } else if (btnAdd.innerText === "Update Log") { 
        let index = getindex(UpdateItem[0]);
        Items[index] = [UpdateItem[0], Name, Hours];
        btnAdd.innerText = "Log Hours";
    }
    DrawList();
    
    document.getElementById("txtId").value = "";
    document.getElementById("txtName").value = "";
    document.getElementById("txtHour").value = "";
});

// empid getindex loop
function getindex (empid){
    let index = -1;
    for(let x = 0; x < Items.length; x++) {
        if (empid == Items[x][0]) {
            return x;
        }
    }
    return index;
}

// remove funtion
function remove(index) {
    Items.splice(index, 1);
    DrawList();
}

// edit function
function edit(index) {
    UpdateItem = [...Items[index]];
    let selectedItemId = UpdateItem[0];
    let selectedItemName = UpdateItem[1];
    let selectedItemHours = UpdateItem[2];

    document.getElementById("txtId").value = selectedItemId;
    document.getElementById("txtName").value = selectedItemName;
    document.getElementById("txtHour").value = selectedItemHours;

    let btnAdd = document.getElementById("btn-add");
    btnAdd.innerText = "Update Log";
}


function DrawList() {
    let List = "";
    let total = 0;
    for(let x = 0; x < Items.length; x++) {
        total = total + parseInt(Items[x][2]);
        let empId = "<div class='col-3'>" + Items[x][0] + "</div>";
        let fullName = "<div class='col-3'>" + Items[x][1] + "</div>";
        let hours = "<div class='col-3'>" + Items[x][2] + "</div>";
        let editAction = "<button class='btn btn-warning mr-2' onclick='edit("+x+")'>Edit</button>"; 
        let action = "<button class='btn btn-danger' onclick='remove("+x+")'>Remove</button>";
        List += "<li class='mt-1 d-flex list-style-none border-bottom pb-1 border-light'>"+ empId + fullName + hours + editAction + action + "</li>";
    }   
    document.getElementById("total").innerHTML = total;

    document.getElementById("ul-list").innerHTML = List;
}

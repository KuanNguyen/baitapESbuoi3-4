import TodoList from "./TodoList.js";
import TodoListService from "./TodoListService.js";

const todoService = new TodoListService();



let getWorkList = () => {
    todoService.getTodoList().then((result) => {
        console.log(result.data)
        showWork(result.data)
        showDoneWork(result.data)
    }).catch( (error) => {
        error = "Kết nối Thất Bại";
        alert(error)
    })
}

getWorkList();



let showWork = (data) =>{
        let content = "";
        data.map((workTD) => {
            let {id, workName, done } = workTD;
            if(done == false){
                content +=`
                <li>
                    <form>
                        <input class="myCheckBox" type="checkbox" name="${id}" onclick="doneWork(${id})">
                        <label id="checkedText" for="${id}"> ${workName}</label>
                        <i onclick="deleteWorks(${id})" class="fa-solid fa-trash"></i>
                    </form>
                </li>
                `
            }
            document.querySelector("#todo").innerHTML = content;
        });
} 
    

let addWork = () => {
    let workName = document.getElementById("newTask").value;
    if(workName.length == 0){
        alert("lười hả mậy")
    }else{
        let done = false
        let works = new TodoList(workName , done);
        console.log(works);
        todoService.addWork(works).then((result) => {
            alert("Work Added!!");
            getWorkList();
            
        }).catch((error) => {
            error = "add thất bại";
            alert(error)
        })
        
    }
}


document.getElementById("addItem").onclick = addWork;


let resetForm = () => {
    document.querySelector(".card__add").reset();
}


let doneWork = (id) => {
    todoService.workDetail(id).then((result) => {
        let { id, workName, done} = result.data;
        done = true;
        var workDone = new TodoList ( workName, done);
        todoService.updateWorkDetail(id, workDone);
        getWorkList();
        alert("Work Done!!");
    }).catch((error)  => {
        error = "done failed";
        alert(error)
    })
}
window.doneWork= doneWork;

let showDoneWork = (data) => {
    let content = "";
    data.map((workTD) => {
        let {id, workName, done } = workTD;
        if(done == true){
            content +=`
            <li>
                <form>
                    <input class="myCheckBox" type="checkbox" name="${id}" disabled checked>
                    <label id="checkedText" for="${id}"> ${workName}</label>
                    <i onclick="deleteWorks(${id})" class="fa-solid fa-trash"></i>
                </form>
            </li>
            `
        }
        document.querySelector("#completed").innerHTML = content;
    });
}

let deleteWorks = (id) => {
    todoService.deleteWork(id).then((result) => {
        getWorkList()
        alert("Work Deleted!!")
        location.reload()
    }).catch((error) => {
        error = "delete failed";
        alert(error)
    })
}
window.deleteWorks = deleteWorks;

let compareStringsMain = () => {
    todoService.getTodoList()
    .then((result) => {
        
        
        let tasks = result.data;

       
        let sortedArray = tasks.sort((a, b) => {
            return compareStrings(a.workName, b.workName);
        });

        
        let sortAZ = document.querySelector("#two");
        sortAZ.addEventListener("click", () => {
            showWork(sortedArray);
        });
        
        let sortZA = document.querySelector("#three");
        sortZA.addEventListener("click", () => {
            showWork(sortedArray.reverse());
        });
    })
    .catch((error) => {
        error = "delete failed";
        alert(error)
    });

    let compareStrings = (a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
      
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }
}
compareStringsMain();
const form = document.querySelector("form");
localStorage.clear();
form.addEventListener('submit',e=>{
    if(!form.checkValidity()){
        e.preventDefault();
    }
    form.classList.add('was-validated')
})
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const amount = event.target.expense.value; 
    const description = event.target.description.value;
    const category = event.target.category.value;
    const id=event.target.id.value;
    const obj={id,amount,description,category};
    localStorage.setItem(id,JSON.stringify(obj)); 
       display(obj,id);
})

function display(obj,id){
const ul = document.querySelector("ul");
const li=document.createElement("li");
li.textContent = id+"-"+obj.amount+"-"+obj.category+"-"+obj.description;
li.style.fontSize = "1.5rem";
li.style.margin= "2px";
const delBtn = document.createElement("Button");
delBtn.textContent = "Delete Expense";
const editBtn = document.createElement("button");
editBtn.textContent="Edit Expense";
delBtn.setAttribute=("type","click");
li.appendChild(delBtn);
li.appendChild(editBtn);
ul.appendChild (li);
li.className="row gx-5";
delBtn.className="btn btn-sm gy-2 btn-danger col-2";
editBtn.className="col-2 btn-sm gy-2 btn btn-warning";
delBtn.addEventListener('click',(event)=>{
    
    li.remove();
    localStorage.removeItem(id);
});
editBtn.addEventListener('click',(event)=>{

       const editedExp = document.getElementById("expense").value;
       const editedDes =document.getElementById("description").value;
       const editedCat = document.getElementById("category").value;;
       const orgid = document.getElementById("id").value;
       const editObj = {id,expense:editedExp,description:editedDes,category:editedCat};
       localStorage.setItem(orgid,JSON.stringify(editObj));
});
}

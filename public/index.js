window.addEventListener('DOMContentLoaded',(e)=>{
const amountInput = document.getElementById('amount');
const form = document.querySelector('form');
const descriptionInput = document.getElementById('description');
const categoryInput  = document.getElementById('category');
const expenseList = document.querySelector('ul');
const REST_API = "http://localhost:3000/expense";
let editFlag = false;
let editId;
(async function loadcontent(){
 const list = await getExpense();
 list.data.forEach((el)=>{
    display(el);
 })
}())

form.addEventListener('submit',async function handleFormSubmit(event){
     event.preventDefault();
    try{
   
    const expense = {
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value
    }
    
    if(editFlag){
        let newUpdated = await putExpense(expense);
        console.log(newUpdated);
        editFlag=false;
        display(newUpdated.data);   
    }
    else{
    const newExpense = await postUser(expense);
    console.log(newExpense);
    display(newExpense);
   }

    amountInput.value="";
    descriptionInput.value="";
    categoryInput.value="Food";
   }
    catch(error){
        console.log(error);
    }
} );

function display(newExpense){
    const singleExpense = document.createElement('li');
    singleExpense.innerHTML = `${newExpense.amount} ${newExpense.description} ${newExpense.category} 
    <button class="del">Delete</button>
    <button class="edit">Edit</button>`;
    expenseList.appendChild(singleExpense);
    const delBtn = singleExpense.querySelector('.del');
    delBtn.addEventListener('click',()=>{
        deleteUser(newExpense,singleExpense);
    })
    const editBtn =singleExpense.querySelector('.edit');
    editBtn.addEventListener('click',()=>{
        editExpense(newExpense,singleExpense);
    })
}



async function editExpense(newExpense,singleExpense) {
    try{
      amountInput.value = newExpense.amount;
      descriptionInput.value = newExpense.description;
      categoryInput.value = newExpense.category;
      editFlag = true;
      editId = newExpense.id;
      singleExpense.remove();
    }
    catch(err){
        console.log(err);
    }
}

async function putExpense(updatedExp){
    try{
        const updateResponse = await axios.put(`${REST_API}/${editId}`,updatedExp);
        console.log('success put')
        return updateResponse;
    }
    catch(error){
        console.log(error);
    }
}

async function deleteUser(newExpense,singleExpense){
    try{
        const id = newExpense.id;
        const deleted = await axios.delete(`${REST_API}/${id}`);
        singleExpense.remove();
        console.log(deleted,'success delete');
    }
    catch(error){
          console.log(error);
    }
} 

async function postUser(expense){
try{
    const res = await axios.post(REST_API,expense)
    return res.data;
}
catch(error){
    console.log(error)
}
}

async function getExpense() {
    try{
    const res = await axios.get(REST_API);
    return res;
    }
    catch(error){
    console.log(error);
    }
}})
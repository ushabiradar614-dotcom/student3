const cl = console.log;

const fnameControl = document.getElementById("fname");

const lnameControl = document.getElementById("lname");

const emailControl = document.getElementById("email") ;

const contactControl = document.getElementById("contact");

const studentForm = document.getElementById("studentForm"); 

const stdContainer = document.getElementById("stdContainer");

const addBtn = document.getElementById("addBtn"); 

const updateBtn = document.getElementById("updateBtn"); 

const stdArr = [
{fname: 'xyz', lname: 'abc', email: 'xyz@gmail.com', contact: '9867456787', stdId: '9f9a07f0-a7bc-4dde-8a8b-2773b1ee65d0'},
{fname: 'abc', lname: 'def', email: 'abc@gmail.com', contact: '4565549867', stdId: '55b7e01f-cbc6-4b45-b1fa-4d5e87f593fb'}
];

const uuid = () => {
  return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    character => {
      const random = (Math.random() * 16) | 0
      const value = character === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    }
  )
}

const createStdArr = (arr) =>{
	let result = ``;
	arr.forEach((std, i)=>{
		result+=`
		    <tr id=${std.stdId}>
				<td>${i + 1}</td>
				<td>${std.fname} ${std.lname}</td>
				<td>${std.email}</td>
				<td>${std.contact}</td>
				<td><i onclick="onEdit(this)" class="fas fa-edit text-success"</td>
				<td><i onclick="onRemove(this)" class="fas fa-trash-alt text-danger"</td>
			</tr>
		`
	})
	stdContainer.innerHTML= result;
}

createStdArr(stdArr)

let EDIT_ID;
const onEdit = ele =>{
	
	EDIT_ID = ele.closest("tr").id
	cl(EDIT_ID)
	
	let EDIT_OBJ =stdArr.find(std=> std.stdId === EDIT_ID)
    cl(EDIT_OBJ)
	
	fnameControl.value = EDIT_OBJ.fname;
	lnameControl.value = EDIT_OBJ.lname;
	emailControl.value = EDIT_OBJ.email;
	contactControl.value = EDIT_OBJ.contact;
	
	addBtn.classList.add("d-none")
	updateBtn.classList.remove("d-none")
	
}

const onRemove= ele=>{
	// let REMOVE_ID = ele.closest("tr").id
	// cl(REMOVE_ID)

	let getConfirm = confirm("Are you sure to Remove this Student Id !!!!?")
	cl(getConfirm)
	if(!getConfirm) return;
	let REMOVE_ID = ele.closest("tr").id
	cl(REMOVE_ID)

   let getIndex = stdArr.findIndex(std=> std.stdId === REMOVE_ID)
	cl(getIndex)
	
	stdArr.splice(getIndex, 1)
	
	ele.closest("tr").remove()
	
	let allTr =[...document.querySelectorAll("#stdContainer tr")]
	allTr.forEach((tr,i)=>tr.firstElementChild.innerHTML = i+1)
	// createStdArr(stdArr)

}

const onStudentSubmit = (eve)=>{
	eve.preventDefault()
	cl("clicked")
	
	let stdObj ={
		fname:fnameControl.value,
		lname:lnameControl.value,
		email:emailControl.value,
		contact:contactControl.value,
		stdId:uuid()
	}
	cl(stdObj)
	studentForm.reset()
	
	stdArr.push(stdObj)
	cl(stdArr)
	// createLists(stdArr)
	
	let tr = document.createElement("tr");
	tr.id = stdObj.stdId;
	tr.innerHTML= `
			<td>${stdArr.length}</td>
				<td>${stdObj.fname} ${stdObj.lname}</td>
				<td>${stdObj.email}</td>
				<td>${stdObj.contact}</td>
				<td><i onclick="onEdit(this)" class="fas fa-edit text-success"</td>
				<td><i onclick="onRemove(this)" class="fas fa-trash-alt text-danger"</td>
	`
	stdContainer.append(tr)


		
}

const onupdateBtn= ()=>{
	
	let UPDATE_ID = EDIT_ID;
	cl(UPDATE_ID)
	
	let UPDATE_OBJ = {
		fname:fnameControl.value,
		lname:lnameControl.value,
		email:emailControl.value,
		contact:contactControl.value,
		stdId:UPDATE_ID
	}
	cl(UPDATE_OBJ)
	studentForm.reset()
	
	let getIndex = stdArr.findIndex(std=>std.stdId === UPDATE_ID)
	cl(getIndex)
	
	stdArr[getIndex] = UPDATE_OBJ;
	cl(UPDATE_OBJ)
	
	let tr = document.getElementById(UPDATE_ID)
	cl(tr)
	
	let trChild = tr.children
	cl(trChild)
	trChild[1].innerText = `${UPDATE_OBJ.fname} ${UPDATE_OBJ.lname}`
	trChild[2].innerText = `${UPDATE_OBJ.email}`
	trChild[3].innerText = `${UPDATE_OBJ.contact}`
	
	addBtn.classList.remove("d-none")
	updateBtn.classList.add("d-none")
	
}

studentForm.addEventListener("submit",onStudentSubmit)
updateBtn.addEventListener("click",onupdateBtn)
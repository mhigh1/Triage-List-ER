// Add toProperCase property to string objects
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const patientList = [
  'Paul',
  'Jan',
  'Tri',
  'Maryam'
]

const command = prompt('Choose one: add, update, delete, reorder, list, quit');

// Validate if an accepted command is entered, if not alert and reload the page.
if (!command || command.toLowerCase() !== 'add' && command.toLowerCase() !== 'update' && command.toLowerCase() !== 'delete' && command.toLowerCase() !== 'reorder' && command.toLowerCase() !== 'list' && command.toLowerCase() !== 'quit' )
{
  alert(`InvalidCommandException: '${command}' is not a valid operation.\nPlease try: ADD, DELETE, UPDATE, REORDER, LIST, QUIT`);
  location.reload();
} else {
  switch(command.toLowerCase()) 
  {
    // 1. If the user typed in 'add', prompt them for a patient name, add that patient to the list, and display the list.
    case 'add':
    const patientName = prompt("ADD: Enter Patient's First Name:");
    if (patientName.length > 0)
    {
      patientList.push(patientName.toProperCase());
      alert(patientList);
    } else {
      alert("A patient name was not provided.");
      location.reload();
    }
    break;

    // 2. If the user typed in 'update', prompt them for a patient name,  prompt them for a new name, update the name to the new name, and display the list.
    case 'update':
    const patientOldName = prompt("UPDATE: Enter Patient's current Name:").toProperCase();
    if (patientList.includes(patientOldName) === true)
    {
      const pos = patientList.indexOf(patientOldName);
      const patientNewName = prompt("UPDATE: Enter Patient's New Name:").toProperCase();
      
      if (!patientNewName)
      {
        alert("Name change abandoned. The patient's new name cannot be blank.");
        location.reload();
        break;
      }
      const confirmUpdate = confirm(`You're about to change the patient's name from '${patientOldName}' to '${patientNewName}'.\nAre you sure?`)
      if (confirmUpdate === true) 
      {
        patientList[pos] = patientNewName;
        alert(`Patient name has been updated to '${patientNewName}'.`);
        alert(patientList);
      } else {
        alert("Name change abandoned. The patient's name was NOT updated.");
        location.reload();
      }
    } else {
      alert(`No patient checked-in with the name '${patientOldName}'.\nPlease try another name.`);
      location.reload();
    }
    break;

    // 3. If the user typed in 'delete', prompt them for a patient name, delete that patient, and display the list.
    case 'delete':
    const patientDelName = prompt("DELETE: Enter Patient's First Name:").toProperCase();
    if (patientList.includes(patientDelName) === true) 
    {
      const pos = patientList.indexOf(patientDelName);
      const confirmDelete = confirm(`You're about to DELETE the patient '${patientDelName}' from the list.\nThis action cannot be undone. Are you sure?`);
      if (confirmDelete === true)
      {
        patientList.splice(pos, 1);
        alert(`Patient '${patientDelName}' has been deleted.`);
        alert(patientList);
      } else {
        alert("Delete operation has been cancelled. The patient was NOT removed.");
        location.reload();
      }
    } else {
      alert(`No patient checked-in with the name '${patientDelName}'.\nPlease try another name.`);
      location.reload();
    }
    break;

    // 4. If the user typed in 'reorder', prompt them for a patient name, prompt them for another patient name, switch the two entered patients, and display the list.
    case 'reorder':
    const patientNameA = prompt("REORDER: Enter the first Patient's First Name:").toProperCase();
    const patientNameB = prompt("REORDER: Enter the second Patient's First Name:").toProperCase();
    if (patientList.includes(patientNameA) === true && patientList.includes(patientNameB) === true)
    {
      const posPatientA = patientList.indexOf(patientNameA);
      const posPatientB = patientList.indexOf(patientNameB);
      const confirmSwap = confirm(`You're about to SWAP the positions of '${patientNameA}' and '${patientNameB}'.\nAre you sure?`);
      if (confirmSwap === true)
      {
        let temp = patientList[posPatientA];
        patientList[posPatientA] = patientList[posPatientB];
        patientList[posPatientB] = temp;
        alert(`Patient '${patientNameA}' has swapped places with patient '${patientNameB}'.`);
        alert(patientList);
      } else {
        alert("Patient SWAP operation has been cancelled. The patients have NOT swapped places.");
        location.reload();
      }
    } else {
      if (patientList.includes(patientNameA) === false)
      {
        alert(`No patient checked-in with the name '${patientNameA}'.\nPlease try another name.`);
      }
      if (patientList.includes(patientNameB) === false)
      {
        alert(`No patient checked-in with the name '${patientNameB}'.\nPlease try another name.`);
      }
      location.reload();
    }
    break;

    // Show the patient list
    case "list":
    alert(patientList);
    location.reload();
    break;

    // stop the application
    case "quit":
    break;
  }
}
function Student({firstname, lastname, grade, deleteStudent,updateStudent, studentID}){
    return(
        <div className="alert alert-light bg-dark-subtle">
            {lastname}, {firstname}<span className="badge bg-dark ms-2">{grade}</span>
            <button onClick={()=>{
                deleteStudent(studentID, firstname, lastname);
            }}
             className="btn btn-danger btn-sm float-end">Delete</button>
            <button onClick={()=>{
                updateStudent(studentID, firstname, lastname,grade);
            }}
             className="btn btn-info btn-sm float-end me-2">Edit</button>
            
        </div>
    )
}
export default Student;
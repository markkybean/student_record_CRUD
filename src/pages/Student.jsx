function Student({firstname, lastname, grade, deleteStudent, studentID}){
    return(
        <div className="alert alert-light bg-dark-subtle">
            {lastname}, {firstname}<span className="badge bg-dark">{grade}</span>
            <button onClick={()=>{
                deleteStudent(studentID, firstname, lastname);
            }}
             className="btn btn-danger btn-sm float-end">Delete</button>
            <button className="btn btn-info btn-sm float-end me-2">Edit</button>
            
        </div>
    )
}
export default Student;
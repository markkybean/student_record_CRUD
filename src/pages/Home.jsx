import Student from "./Student";
import { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";

export default function Home(){
    const [student, setStudent] = useState({
        firstname: '',
        lastname: '',
        grade: '',
    });

    const [studentList, setStudentList] = useState([]);

    useEffect(() =>{


        // initialize cloud firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

        try{
            
            onSnapshot(collection(db, 'students'), snapshot => {


                const newStudentList = [];

                snapshot.forEach(student => {
                    newStudentList.push(student.data());
                });
                setStudentList(newStudentList);
            });

        }catch(e){
            alert("error")
        }
        
    }, [])

    const addStudent = () =>{
        // initialize cloud firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

        if(student.firstname=== '' || student.lastname==='' || student.grade===''){
            alert("Missing Fields")

        }else{
            setStudentList(
                studentlist => [
                    ...studentList, student
                ]
            );

            addDoc(collection(db, 'students'), student);
                
            setStudent({
                // remove yung nakalagay sa form na sulat
                firstname: '',
                lastname: '',
                grade: '',
            });

            
            // localStorage.setItem('studentList', JSON.stringify(studentList));  
        }

        
        
    }

    return(
        <section className="container">
            <h1 className="fw-bold">🎓Student Record🎓</h1>
            <p>This is the list of student records.</p>
            <div className="mb-5 p-5 border bg-dark-subtle">
                <div className="row">
                    <div className="col-md-5 col-lg-5 col-sm-12">
                        <label htmlFor="firstname">First name:</label>
                        <input onChange={(e)=>setStudent({
                            ...student,
                            firstname: e.target.value
                        })}
                        value={student.firstname}
                        type="text" 
                        className="form-control" 
                        id="firstname" 
                    />
                    </div>
                    <div className="col-md-4 col-lg-5 col-sm-12">
                        <label htmlFor="lastname">Last name:</label>
                        <input onChange={(e)=>setStudent({
                            ...student,
                            lastname: e.target.value
                        })} 
                        value={student.lastname}
                        type="text" 
                        className="form-control" 
                        id="lastname" 
                    />
                    </div>
                    <div className="col-md-2 col-lg-1 col-sm-2">
                        <label htmlFor="grade">Grade:</label>
                        <input onChange={(e)=>setStudent({
                            ...student,
                            grade: e.target.value
                        })} 
                        value={student.grade}
                        type="number"
                        className="form-control" 
                        id="grade"
                    />
                    </div>
                    <div className="col-md-2 col-lg-2 col-sm-12">
                        <button onClick={()=>{addStudent()}} className="btn btn-dark mt-4">Add➕</button>
                    </div>

                    <div className="alert alert-light mt-3">
                        <h3 className="fw-bold">{student.firstname} {student.lastname} <span className="badge bg-dark">{student.grade}</span> </h3>
                    </div>
                </div>
                
            </div>

            {
                studentList.map((studentRecord) => (
                    <Student
                        key={studentRecord.id}
                        firstname={studentRecord.firstname}
                        lastname={studentRecord.lastname}
                        grade={studentRecord.grade}
                    />
                ))
            }
            
            
        </section>
    )
};
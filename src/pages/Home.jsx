import Student from "./Student";
import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home(){
    const [student, setStudent] = useState({
        firstname: '',
        lastname: '',
        grade: '',
    });

    const [studentList, setStudentList] = useState([]);

    const [authenticated, setAuthenticated] = useState(false);

    const [editToggle, setEditToggle] = useState(false);

    const [userProperties, setUserProperties] = useState({});

    useEffect(() =>{


        // initialize cloud firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

        try{
            
            onSnapshot(collection(db, 'students'), snapshot => {


                const newStudentList = [];

                snapshot.forEach(student => {
                    const tempStudent = student.data();
                    tempStudent["student_id"]=student.id;
                    newStudentList.push(tempStudent);
                });
                setStudentList(newStudentList);
            });

        }catch(e){
            alert("error")
        }

        const auth = getAuth(firebaseApp);
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setAuthenticated(true)
              console.log(user.providerData);
              setUserProperties(user);
            } else {
              // User is signed out
              // ...
            }
          });
        
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

    // delete function

    const deleteStudent = (studentID, firstname, lastname) => {

        // initialize cloud firestore and get a reference to the service
        const db = getFirestore(firebaseApp);

        confirm(`Are you sure you want to delete ${firstname} ${lastname}?`).then(
            deleteDoc(doc(db, "students", studentID))
       );
    
    }


    // update student/ edit

    const updateStudent = (studentID, firstname, lastname, grade) => {
        setEditToggle(true);
        setStudent({
            studentID: studentID,
            firstname: firstname,
            lastname: lastname,
            grade: grade
        });
    }

    const handleStudentUpdate = () => {
        const db = getFirestore(firebaseApp);

        const studentRef = doc(db, "students", student.studentID);

        updateDoc(studentRef, {
            firstname: student.firstname,
            lastname: student.lastname,
            grade: student.grade
        });

        setEditToggle(false);
        setStudent({
            // remove yung nakalagay sa form na sulat
            firstname: '',
            lastname: '',
            grade: '',
        });
    }

    if(authenticated){
      return (
        <section className="container">
          <h1 className="fw-bold">🎓Student Record🎓</h1>
          <h3 className="fw-bold">Hello, {userProperties.displayName} </h3>
          <p>This is the list of student records.</p>
          <div className="mb-5 p-5 border bg-dark-subtle shadow-lg">
            <div className="row">
              <div className="col-md-5 col-lg-5 col-sm-12">
                <label htmlFor="firstname">First name:</label>
                <input
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      firstname: e.target.value,
                    })
                  }
                  value={student.firstname}
                  type="text"
                  className="form-control"
                  id="firstname"
                />
              </div>
              <div className="col-md-4 col-lg-5 col-sm-12">
                <label htmlFor="lastname">Last name:</label>
                <input
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      lastname: e.target.value,
                    })
                  }
                  value={student.lastname}
                  type="text"
                  className="form-control"
                  id="lastname"
                />
              </div>
              <div className="col-md-2 col-lg-1 col-sm-2 pe-1">
                <label htmlFor="grade">Grade:</label>
                <input
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      grade: e.target.value,
                    })
                  }
                  value={student.grade}
                  type="number"
                  className="form-control"
                  id="grade"
                />
              </div>
  
              {editToggle ? (
                // kung true magiging update, pag cinlick yung edit
                <div className="col-md-2 col-lg-2 col-sm-12">
                  <button
                    onClick={() => {
                      handleStudentUpdate();
                    }}
                    className="btn btn-success mt-4"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div className="col-md-2 col-lg-2 col-sm-12">
                  <button
                    onClick={() => {
                      addStudent();
                    }}
                    className="btn btn-dark mt-4"
                  >
                    Add➕
                  </button>
                </div>
              )}
  
              <div className="alert alert-light mt-3">
                <h3 className="fw-bold">
                  {student.firstname} {student.lastname}{" "}
                  <span className="badge bg-dark">{student.grade}</span>{" "}
                </h3>
              </div>
            </div>
          </div>
  
  
          {/* kapag 0 lalabas no student */}
          {studentList.length === 0 
          
          ? 
          
          (
            <div className="alert alert-info mt-3 shadow">
              As of right now, no student records exist.
            </div>
          ) 
          
          : 
          
          (
            <>
              {studentList.map((studentRecord) => (
                <Student
                  key={studentRecord.student_id}
                  firstname={studentRecord.firstname}
                  lastname={studentRecord.lastname}
                  grade={studentRecord.grade}
                  deleteStudent={deleteStudent}
                  updateStudent={updateStudent}
                  studentID={studentRecord.student_id}
                />
              ))}
            </>
          )}
        </section>
      )

    }else {
      return (
        <section>
            <h1>Welcome guest!</h1>
        </section>
      )
    }
   
}
import { initializeApp } from "firebase/app";

        //firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyBoEJqtkAOyT61ZpxXNz3btzEA36VHCCoM",
            authDomain: "studentsrecords-64866.firebaseapp.com",
            projectId: "studentsrecords-64866",
            storageBucket: "studentsrecords-64866.appspot.com",
            messagingSenderId: "96477290927",
            appId: "1:96477290927:web:33209534c09552895b8f5a",
            measurementId: "G-8L4R0B48PX"
          };

        //initialize firebase
        const app = initializeApp(firebaseConfig);

        export default app;
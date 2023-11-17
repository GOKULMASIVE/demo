import StudentInfo from "./StudentInfo.js";
import { Routes,Route } from "react-router-dom";
import StudentTable from "./StudentTable.js";
import EditStudent from "./EditStudent.js";

const App = () => {
  return (
    <section className="parent-container">
      <Routes>
        <Route path="/" element={<StudentInfo />} />
        <Route path="/stud-table" element={<StudentTable />} />
        <Route path="/edit-stud/:id" element={<EditStudent />} />
      </Routes>
    </section>
  );
}

export default App;
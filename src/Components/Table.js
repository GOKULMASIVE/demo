import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { API } from "./API.js";
import { json, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";



export default function BasicTable() {
const[student,setStudent]=React.useState([]);
const navigate=useNavigate()

function getStudent(){
  fetch(`${API}/students`)
    .then((data) => data.json())
    .then((data) => setStudent(data));
}
  React.useEffect(()=>getStudent(),[])

  

  function deleteStudent(id){
      fetch(`${API}/students/${id}`,{
        method:"DELETE",
      }).then(()=>getStudent());
  }
// function getStudentByMail(id,email){
//   console.log(id);
//   fetch(`${API}/students/${id}`,{
//     method:"POST",
//     // body:JSON.stringify({email:email}),
//     headers:{
//       "Content-Type":"application/json"
//     },
    
//     // redirect:true
//   })
   
// }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "black" }}>
              <TableCell align="center" sx={{ color: "white" }}>
                <b>STUDENT NAME</b>
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                <b>MATHS</b>
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                <b>PHYSICS</b>
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                <b>CHEMISTRY</b>
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                <b>TOTAL</b>
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                <b>CUTOFF</b>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.maths}</TableCell>
                <TableCell align="center">{row.physics}</TableCell>
                <TableCell align="center">{row.chemistry}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
                <TableCell align="center">{row.cutoff}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => navigate(`/edit-stud/${row._id}`)}
                  >
                    <EditIcon color="secondary" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => deleteStudent(row._id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
                {/* <TableCell>
                  <IconButton
                    aria-label="delete"
                    color="info"
                    onClick={() => getStudentByMail(row._id,row.email)}
                  >
                    <SendIcon color={"info"} />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant={"outlined"}
        onClick={() => navigate("/")}
        sx={{ marginTop: 5 }}
      >
        ADD STUDENT
      </Button>
    </>
  );
}

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import * as yup from "yup"
import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import { API } from "./API.js";

function StudentInfo() {

    const navigate=useNavigate();

    const formValidation = yup.object({
      name: yup.string().required("You should fill this field😁"),
      email: yup.string().email("Enter valid email").required("You should fill this field😁"),
      maths: yup
        .number()
        .min(0)
        .max(100)
        .required("You should fill this field😁"),
      physics: yup
        .number()
        .min(0)
        .max(100)
        .required("You should fill this field😁"),
      chemistry: yup
        .number()
        .min(0)
        .max(100)
        .required("You should fill this field😁"),
    });
    const {handleBlur,handleChange,handleSubmit,errors,touched,values}=useFormik({
        initialValues:{
            name:"",
            email:"",
            maths:"",
            physics:"",
            chemistry:"",
        },

        validationSchema:formValidation,
        onSubmit:(values)=>{
          const phy=parseInt(values.physics)
          const chem=parseInt(values.chemistry)
          const math=parseInt(values.maths)
           insertStudent({...values,total:parseInt(chem+math+phy),cutoff:(parseFloat((phy+chem)/2)+math)});
        }
    })

    function insertStudent(data){
      fetch(`${API}/students`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          "Content-Type":"application/json"
        }
      }).then(()=>navigate("/stud-table"))
    }
  return (
    <>
      <section>
        <Card
          sx={{
            width: 400,
            height: 480,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: 5,
            gap: 1,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            STUDENT INFO
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ display: "grid", gap: 1 }}
          >
            <form onSubmit={handleSubmit} className="form-container">
              <TextField
                label="Student Name"
                variant="outlined"
                sx={{ width: "100%" }}
                value={values.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                helperText={
                  touched.name && errors.name
                    ? errors.name
                    : null
                }
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                sx={{ width: "100%" }}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email ? errors.email : null}
              />
              <TextField
                label="Maths Mark"
                variant="outlined"
                sx={{ width: "100%" }}
                value={values.maths}
                name="maths"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.maths && errors.maths}
                helperText={touched.maths && errors.maths ? errors.maths : null}
              />
              <TextField
                label="Physics Mark"
                variant="outlined"
                sx={{ width: "100%" }}
                value={values.physics}
                name="physics"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.physics && errors.physics}
                helperText={
                  touched.physics && errors.physics ? errors.physics : null
                }
              />
              <TextField
                label="Chemistry Mark"
                variant="outlined"
                sx={{ width: "100%" }}
                value={values.chemistry}
                name="chemistry"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.chemistry && errors.chemistry}
                helperText={
                  touched.chemistry && errors.chemistry
                    ? errors.chemistry
                    : null
                }
              />
              <Button type="submit" variant="outlined">SUBMIT</Button>
            </form>
          </Typography>
        </Card>
      </section>
    </>
  );
}
export default StudentInfo;

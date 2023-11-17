import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import * as yup from "yup";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import { API } from "./API.js";
import { useEffect, useState } from "react";

function EditStudent() {
  const [studInfo, setStudInfo] = useState(null);
  console.log(studInfo);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${API}/students/${id}`)
      .then((data) => data.json())
      .then((data) => setStudInfo(data));
  }, []);

  return studInfo ? (
    <StudentInfo studInfo={studInfo} id={id} />
  ) : (
    <h1>Loading...</h1>
  );
}

function StudentInfo({ studInfo, id }) {
  const navigate = useNavigate();

  const formValidation = yup.object({
    name: yup.string().required("You should fill this field😁"),
    email: yup
      .string()
      .email("Enter valid email")
      .required("You should fill this field😁"),
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

  console.log("Info", studInfo);
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        name: studInfo.name,
        email: studInfo.email,
        maths: studInfo.maths,
        physics: studInfo.physics,
        chemistry: studInfo.chemistry,
      },

      validationSchema: formValidation,
      onSubmit: (values) => {
        const phy = parseInt(values.physics);
        const chem = parseInt(values.chemistry);
        const math = parseInt(values.maths);
        updateStudent({
          ...values,
          total: parseInt(chem + math + phy),
          cutoff: parseFloat((phy + chem) / 2) + math,
        });
      },
    });

  function updateStudent(data) {
    fetch(`${API}/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => navigate("/stud-table"));
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
                helperText={touched.name && errors.name ? errors.name : null}
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
              <Button type="submit" color="success" variant="outlined">
                SAVE
              </Button>
            </form>
          </Typography>
        </Card>
      </section>
    </>
  );
}
export default EditStudent;

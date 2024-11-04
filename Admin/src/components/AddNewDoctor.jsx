import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    doctorDepartment: "",
    docAvatar: null,
    docAvatarPreview: "",
  });

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData.docAvatar,formData.docAvatarPreview)
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setFormData((prevData) => ({
      ...prevData,
      docAvatar: file,
      docAvatarPreview: reader.result,
    }));
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nic: "",
      dob: "",
      gender: "",
      password: "",
      doctorDepartment: "",
      docAvatar: null,
      docAvatarPreview: "",
    });
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    for (let key in formData) {
      submissionData.append(key, formData[key]);
    }
    try {
      const response = await axios.post(
        "https://hospital-management-backend-2w2h.onrender.com/api/v1/user/doctor/addnew",
        submissionData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add doctor");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div>
              <img
                src={formData.docAvatarPreview || "/docHolder.jpg"}
                alt="Doctor Avatar"
              />
              <input type="file" onChange={handleAvatarChange} />
            </div>
            <div>
              {["firstName", "lastName", "email", "phone", "nic", "dob"].map((field) => (
                <input
                  key={field}
                  type={field === "dob" ? "date" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              ))}
              <select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <select
                name="doctorDepartment"
                value={formData.doctorDepartment}
                onChange={handleInputChange}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
              <button type="submit">Register New Doctor</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;

import React, { useEffect, useState } from "react";
import VendorDashboard from "./VendorDash";
import VendorNavbar from "./VendordashNav";
import { useAuth } from "../../store/auth";
const API_URL = import.meta.env.VITE_BACKEND_URL;
import Toast from "../../components/Toast"
import SuccessMessage from "../success"
function UpdateProfile() {
  const { vendor, fetchUser } = useAuth();
  useEffect(() => { fetchUser() }, [fetchUser])
  const [formData, setFormData] = React.useState({
    newName:  "",
    newEmail: "",
    newPhone: "",
    newAddress: "",
  });
  const [image, setImage] = useState(null);
  console.log(vendor);
  
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(null);
    const [type, setType] = useState("error");
    const [success, setSuccess] = useState(false);
  const [loading,setLoading] = useState(false)
  const [preview,setPreview] = useState(null)
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const avatar = e.target.files[0]
    if (avatar) {
      setImage(avatar)
      setPreview(URL.createObjectURL(avatar))
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const newFormData = new FormData()
      newFormData.append("newName", formData.newName)
      newFormData.append("newEmail", formData.newEmail);
      newFormData.append("newPhone", formData.newPhone);
      newFormData.append("newAddress", formData.newAddress);
      if(image) newFormData.append("vendorimg",image)
      
      const res = await fetch(`${API_URL}/updateProfile/`, {
        method: "PUT",
        credentials: "include",
        body: newFormData,
      });
      console.log(res);
      
      const data = await res.json();
      console.log(data);
      
      if (!res.ok) {
        setMessage("something went wrong")
        setShow(true)
        setTimeout(() => {
           setShow(false);
        },2000)
      }
      setMessage(data.message)
      setSuccess(true)
       setTimeout(() => {
         setSuccess(false)
       }, 2000);
     } catch (e) {
       setMessage("something went wrong");
      setShow(true);
      setType("failed")
      console.log(message);
       setTimeout(() => {
         setShow(false);
       }, 2000);
    } finally {
      setLoading(false)
      // setSuccess(false)
      // setShow(false)
    }
  }
  return (
    <>
      <VendorNavbar />
      <div className="min-h-screen bg-slate-600 text-white px-6 py-10">
        <Toast message={message} type={type} show={show} />
        <h1 className="text-3xl font-bold mb-10 text-center">Update Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10 w-2xl mx-auto">
          {/* ================= Vendor Details ================= */}
          {success ? (
            <SuccessMessage message={"Details Updated successfully"} />
          ) : (
            <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-6 border-b border-slate-700 pb-3">
                Vendor Details
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input
                    type="text"
                    name="newName"
                    value={formData.newName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="newEmail"
                    value={formData.newEmail}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Phone</label>
                  <input
                    type="tel"
                    name="newPhone"
                    value={formData.newPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Address</label>
                  <input
                    type="text"
                    name="newAddress"
                    value={formData.newAddress}
                    onChange={handleChange}
                    placeholder="Enter Address"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Profile Picture</label>
                  <input
                    type="file"
                    name="vendorimg"
                    onChange={handleImageChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500"
                  />
                  {preview && (
                    <img src={preview} className="h-50 mt-5 rounded-2xl" />
                  )}
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className={`w-full  ${loading ? "bg-blue-200" : "bg-blue-600 hover:bg-blue-700"}   transition py-2 rounded-lg font-medium`}
                >
                  {loading ? "Updating..." : " Update Vendor"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;

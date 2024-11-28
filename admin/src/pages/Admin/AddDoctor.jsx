// import React, { useContext, useState } from "react";
// import { assets } from "../../assets/assets";
// import { AdminContext } from "../../context/AdminContext";
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const AddDoctor = () => {
//   const [docImg, setDocImg] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [experience, setExperience] = useState("1 Year");
//   const [fees, setFees] = useState("");
//   const [about, setAbout] = useState("");
//   const [speciality, setSpeciality] = useState("General physician");
//   const [degree, setDegree] = useState("");
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");

//   const  {backendUrl, aToken}=useContext(AdminContext)

//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     password: '',
//     fees: '',
//     degree: '',
//     about: '',
//     address1: ''
//   });

//   const validateName = (name) => {
//     if (!name.trim()) return "Name is required";
//     if (!/^[a-zA-Z\s]{3,30}$/.test(name)) return "Name should be 3-30 characters long and contain only letters";
//     return "";
//   };

//   const validateEmail = (email) => {
//     if (!email) return "Email is required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
//     return "";
//   };

//   const validatePassword = (password) => {
//     const trimmedPassword = password.trim(); // Trim any extra spaces
//     if (!trimmedPassword) return "Password is required";
//     if (trimmedPassword.length < 6) return "Password must be at least 6 characters long";
//     if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(trimmedPassword)) {
//       return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
//     }
//     return "";
//   };
  
  

//   const validateFees = (fees) => {
//     if (!fees) return "Consultation fees is required";
//     if (isNaN(fees) || fees <= 0) return "Fees must be a positive number";
//     return "";
//   };

//   const validateDegree = (degree) => {
//     if (!degree.trim()) return "Degree is required";
//     if (degree.length < 2) return "Please enter a valid degree";
//     return "";
//   };

//   const validateAbout = (about) => {
//     if (!about.trim()) return "About section is required";
//     if (about.length < 50) return "About section must be at least 50 characters long";
//     return "";
//   };

//   const validateAddress = (address) => {
//     if (!address.trim()) return "Address is required";
//     if (address.length < 5) return "Please enter a valid address";
//     return "";
//   };

//   const handleInputChange = (field, value) => {
//     switch(field) {
//       case 'name':
//         setName(value);
//         setErrors(prev => ({ ...prev, name: validateName(value) }));
//         break;
//       case 'email':
//         setEmail(value);
//         setErrors(prev => ({ ...prev, email: validateEmail(value) }));
//         break;
//       case 'password':
//         setPassword(value);
//         setErrors(prev => ({ ...prev, password: validatePassword(value) }));
//         break;
//       case 'fees':
//         setFees(value);
//         setErrors(prev => ({ ...prev, fees: validateFees(value) }));
//         break;
//       case 'degree':
//         setDegree(value);
//         setErrors(prev => ({ ...prev, degree: validateDegree(value) }));
//         break;
//       case 'about':
//         setAbout(value);
//         setErrors(prev => ({ ...prev, about: validateAbout(value) }));
//         break;
//       case 'address1':
//         setAddress1(value);
//         setErrors(prev => ({ ...prev, address1: validateAddress(value) }));
//         break;
//       default:
//         break;
//     }
//   };


  

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     const newErrors = {
//       name: validateName(name),
//       email: validateEmail(email),
//       password: validatePassword(password),
//       fees: validateFees(fees),
//       degree: validateDegree(degree),
//       about: validateAbout(about),
//       address1: validateAddress(address1)
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some(error => error !== "")) {
//       toast.error("Please fix all errors before submitting");
//       return;
//     }

//     if (!docImg) {
//       toast.error('Please upload a profile image');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('image', docImg);
//       formData.append('name', name.trim());
//       formData.append('email', email.trim());
//       formData.append('password', password);
//       formData.append('experience', experience);
//       formData.append('fees', Number(fees));
//       formData.append('about', about.trim());
//       formData.append('speciality', speciality);
//       formData.append('degree', degree.trim());
//       formData.append('address', JSON.stringify({
//         line1: address1.trim(),
//         line2: address2.trim()
//       }));

//       const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });

//       if (data.success) {
//         toast.success(data.message);
//         setDocImg(false);
//         setName('');
//         setEmail('');
//         setPassword('');
//         setAbout('');
//         setDegree('');
//         setAddress1('');
//         setAddress2('');
//         setFees('');
//         setErrors({});
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Something went wrong');
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="m-5 w-full">
//       <p className=" mb-3 text-lg font-medium">Add Doctor</p>

//       <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
//         <div className="flex items-center gap-4 mb-8 text-gray-500">
//           <label htmlFor="doc-img">
//             <img
//               className="w-16 bg-gray-100 rounded-full cursor-pointer"
//               src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
//             ></img>
//           </label>
//           <input
//             onChange={(e) => setDocImg(e.target.files[0])}
//             type="file"
//             id="doc-img"
//             hidden
//           ></input>
//           <p>
//             Upload doctor <br /> picture
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor name</p>
//               <input
//                 onChange={(e) => handleInputChange('name', e.target.value)}
//                 value={name}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.name ? 'border-red-500' : 'border-gray-200'
//                 } focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-300`}
//                 type="text"
//                 placeholder="Enter doctor's full name"
//                 required
//               />
//               {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Email</p>
//               <input
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 value={email}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.email ? 'border-red-500' : 'border-gray-200'
//                 } focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-300`}
//                 type="email"
//                 placeholder="Enter doctor's email"
//                 required
//               />
//               {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Password</p>
//               <input
//                 onChange={(e) => handleInputChange('password', e.target.value)}
//                 value={password}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.password ? 'border-red-500' : 'border-gray-200'
//                 } focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-300`}
//                 type="password"
//                 placeholder="Enter doctor's password"
//                 required
//               />
//               {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Experience</p>
//               <select
//                 onChange={(e) => setExperience(e.target.value)}
//                 value={experience}
//                 className="border rounded px-3 py-2"
//                 name=""
//                 id=""
//               >
//                 <option value="1 Year"> 1 Year</option>
//                 <option value="2 Year"> 2 Year</option>
//                 <option value="3 Year"> 3 Year</option>
//                 <option value="4 Year"> 4 Year</option>
//                 <option value="5 Year"> 5 Year</option>
//                 <option value="6 Year"> 6 Year</option>
//                 <option value="7 Year"> 7 Year</option>
//                 <option value="8 Year"> 8 Year</option>
//                 <option value="9 Year"> 9 Year</option>
//                 <option value="10 Year"> 10 Year</option>
//                 <option value="11 Year"> 11 Year</option>
//                 <option value="12 Year"> 12 Year</option>
//                 <option value="13 Year"> 13 Year</option>
//                 <option value="14 Year"> 14 Year</option>
//                 <option value="15 Year"> 15 Year</option>
//                 <option value="15+ Year"> 15+ Year</option>
//               </select>
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Fees</p>
//               <input
//                 onChange={(e) => handleInputChange('fees', e.target.value)}
//                 value={fees}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.fees ? 'border-red-500' : 'border-gray-200'
//                 } focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-300`}
//                 type="number"
//                 placeholder="Enter consultation fees"
//                 required
//               />
//               {errors.fees && <p className="mt-1 text-sm text-red-500">{errors.fees}</p>}
//             </div>
//           </div>

//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Speciality</p>
//               <select
//                 onChange={(e) => setSpeciality(e.target.value)}
//                 value={speciality}
//                 className="border rounded px-3 py-2"
//                 name=""
//               >
//                 <option value="General physician">General physician</option>
//                 <option value="Gynecologist">Gynecologist</option>
//                 <option value="Dermatologist">Dermatologist</option>
//                 <option value="Pediatricians">Pediatricians</option>
//                 <option value="Neurologist">Neurologist</option>
//                 <option value="Gastroenterologist">Gastroenterologist</option>
//               </select>
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Education</p>
//               <input
//                 onChange={(e) => handleInputChange('degree', e.target.value)}
//                 value={degree}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.degree ? 'border-red-500' : 'border-gray-200'
//                 } focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-300`}
//                 type="text"
//                 placeholder="Enter doctor's education"
//                 required
//               />
//               {errors.degree && <p className="mt-1 text-sm text-red-500">{errors.degree}</p>}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Address</p>
//               <input
//                 onChange={(e) => handleInputChange('address1', e.target.value)}
//                 value={address1}
//                 className={`w-full px-4 py-3 rounded-xl border ${
//                   errors.address1 ? 'border-red-500' : 'border-gray-200'
//                 } focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-300`}
//                 type="text"
//                 placeholder="Enter address line 1"
//                 required
//               />
//               {errors.address1 && <p className="mt-1 text-sm text-red-500">{errors.address1}</p>}
//               <input
//                 onChange={(e) => setAddress2(e.target.value)}
//                 value={address2}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="address 2"
//                 required
//               ></input>
//             </div>
//           </div>
//         </div>

//         <div>
//           <p className="mt-4 mb-2">About</p>
//           <textarea
//             onChange={(e) => handleInputChange('about', e.target.value)}
//             value={about}
//             className={`w-full px-4 pt-2 border rounded ${
//               errors.about ? 'border-red-500' : 'border-gray-200'
//             } focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all duration-300`}
//             placeholder="About"
//             rows={5}
//             required
//           ></textarea>
//           {errors.about && <p className="mt-1 text-sm text-red-500">{errors.about}</p>}
//         </div>

//         <button
//           type="submit"
//           className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
//         >
//           Add Doctor
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddDoctor;



import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [nameError, setNameError] = useState("");
  const [aboutError, setAboutError] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  // Add valid degrees list
  const validDegrees = [
    'MBBS',
    'MD',
    'MS',
    'DNB',
    'DM',
    'MCh',
    'BDS',
    'MDS'
  ];

  // Name validation function
  const validateName = (value) => {
    const nameRegex = /^[A-Za-z.\s]+$/;
    const minLength = 3;
    const maxLength = 50;
    
    if (!value.trim()) {
      setNameError("Name is required");
      return false;
    }
    if (!nameRegex.test(value)) {
      setNameError("Name should contain only alphabets and spaces");
      return false;
    }
    if (value.length < minLength) {
      setNameError(`Name should be at least ${minLength} characters long`);
      return false;
    }
    if (value.length > maxLength) {
      setNameError(`Name should not exceed ${maxLength} characters`);
      return false;
    }
    if (!/^[A-Z]/.test(value)) {
      setNameError("Name should start with a capital letter");
      return false;
    }
    setNameError("");
    return true;
  };

  // About text validation function
  const validateAbout = (value) => {
    const minWords = 10;
    const maxWords = 100;
    const words = value.trim().split(/\s+/);
    
    if (!value.trim()) {
      setAboutError("About section is required");
      return false;
    }
    if (words.length < minWords) {
      setAboutError(`Please write at least ${minWords} words`);
      return false;
    }
    if (words.length > maxWords) {
      setAboutError(`Please keep it under ${maxWords} words`);
      return false;
    }
    if (!/[.!?]$/.test(value.trim())) {
      setAboutError("Please end with proper punctuation");
      return false;
    }
    setAboutError("");
    return true;
  };

  // Input change handlers
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAboutChange = (e) => {
    const value = e.target.value;
    setAbout(value);
    validateAbout(value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // Validate image
      if (!docImg) {
        return toast.error("Image not Selected");
      }

      // Validate fees (positive number and reasonable amount)
      if (fee <= 0) {
        return toast.error("Fees must be greater than 0");
      }
      if (fee > 10000) { // Adjust max limit as needed
        return toast.error("Fees seems unreasonably high. Please check the amount");
      }

      // Validate degree
      if (!validDegrees.includes(degree.toUpperCase())) {
        return toast.error(`Invalid degree. Valid degrees are: ${validDegrees.join(', ')}`);
      }

      // Validate all fields before submission
      const isNameValid = validateName(name);
      const isAboutValid = validateAbout(about);

      if (!isNameValid || !isAboutValid) {
        toast.error("Please fix all validation errors before submitting");
        return;
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fee));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree.toUpperCase()); // Standardize degree format
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      console.log("Server response:", response.data);

      if(response.data.success){
        toast.success(response.data.message)
        setDocImg(false);
        setName('')
        setEmail('')
        setPassword('')
        setFee('')
        setAbout('')
        setDegree('')
        setAddress1('')
        setAddress2('')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Error submitting form. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 w-full py-8">
      <div className="container mx-auto px-4">
        <form onSubmit={onSubmitHandler} className="w-full max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Add New Doctor</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Profile Image Section */}
            <div className="bg-emerald-50 px-8 py-6 border-b border-emerald-100">
              <div className="flex items-center gap-6">
                <label htmlFor="doc-img" className="cursor-pointer group relative">
                  <img
                    className="w-32 h-32 object-cover rounded-2xl border-2 border-emerald-500 transition-all duration-300 group-hover:opacity-75"
                    src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                    alt=""
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-sm">Change Photo</span>
                  </div>
                </label>
                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">Doctor's Profile Picture</h2>
                  <p className="text-gray-600">Upload a professional photo</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">
                      Doctor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      onChange={handleNameChange}
                      value={name}
                      className={`w-full border ${
                        nameError ? 'border-red-500' : 'border-gray-300'
                      } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors`}
                      type="text"
                      placeholder="Enter doctor's full name"
                      required
                    />
                    {nameError && (
                      <p className="mt-1 text-sm text-red-500">{nameError}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                      type="email"
                      placeholder="doctor@example.com"
                      required
                    />
                  </div>

                  <div className="form-group mt-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      onChange={handlePasswordChange}
                      value={password}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                      type="password"
                      placeholder="Set a secure password"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Experience</label>
                    <select
                      onChange={(e) => setExperience(e.target.value)}
                      value={experience}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year{i !== 0 && 's'}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Consultation Fee</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        onChange={(e) => setFee(e.target.value)}
                        value={fee}
                        className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                        type="number"
                        placeholder="Enter consultation fee"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Specialization</label>
                    <select
                      onChange={(e) => setSpeciality(e.target.value)}
                      value={speciality}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                    >
                      <option value="General physician">General Physician</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatricians">Pediatrician</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Education</label>
                    <input
                      onChange={(e) => setDegree(e.target.value)}
                      value={degree}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                      type="text"
                      placeholder="Medical degree (e.g., MBBS, MD)"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2">Clinic Address</label>
                    <input
                      onChange={(e) => setAddress1(e.target.value)}
                      value={address1}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                      type="text"
                      placeholder="Address Line 1"
                      required
                    />
                    <input
                      onChange={(e) => setAddress2(e.target.value)}
                      value={address2}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                      type="text"
                      placeholder="Address Line 2"
                      required
                    />
                  </div>

                  <div className="form-group mt-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      About <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      onChange={handleAboutChange}
                      value={about}
                      className={`w-full border ${
                        aboutError ? 'border-red-500' : 'border-gray-300'
                      } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors`}
                      placeholder="Write a detailed description about the doctor's expertise and experience (minimum 10 words)"
                      rows={4}
                      required
                    />
                    {aboutError && (
                      <p className="mt-1 text-sm text-red-500">{aboutError}</p>
                    )}
                    {/* Word count indicator */}
                    <p className="mt-1 text-sm text-gray-500">
                      {about.trim() ? about.trim().split(/\s+/).length : 0} words
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-emerald-500 text-white px-8 py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Doctor
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;

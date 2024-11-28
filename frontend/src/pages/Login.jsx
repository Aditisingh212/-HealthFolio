// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {

//   const {backendUrl, token, setToken}=useContext(AppContext)
//   const navigate =useNavigate()
//   const [state, setState] = useState("Sign Up");

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

// const validateName = (name) => {
//   const regex = /^[a-zA-Z\s]+$/; // Allow only letters and spaces
//   return regex.test(name);
// }

// const validateEmail = (email) => {
//   const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   return regex.test(email);
// }

// const validatePassword = (password) => {
//   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return regex.test(password);
// }

//   const onSumbitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       if(state==='Sign Up'){
//         const {data}= await axios.post(backendUrl+ '/api/user/register',{name,password,email})
//         if(data.success){
//           localStorage.setItem('token', data.token)
//           setToken(data.token)
//         }
//         else{
//           toast.error(data.message)
//         }
//       } else{

//         const {data}= await axios.post(backendUrl+ '/api/user/login',{password,email})
//         if(data.success){
//           localStorage.setItem('token', data.token)
//           setToken(data.token)
//         }
//         else{
//           toast.error(data.message)
//         }

//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   };

//   useEffect(()=>{
//     if(token){
//       navigate('/')
//     }
//   }, [token])

//   return (
//     <form onSubmit={onSumbitHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//         <p className="text-2xl font-semibold">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </p>
//         <p>
//           {" "}
//           Please {state === "Sign Up" ? "Sign up" : "Log in"} to book
//           appointment{" "}
//         </p>
//         {state === "Sign Up" && (
//           <div className="w-full">
//             <p>Full Name</p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1"
//               type="text"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               required
//             ></input>
//           </div>
//         )}

//         <div className="w-full">
//           <p>Email</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           ></input>
//         </div>

//         <div className="w-full">
//           <p>Password</p>
//           <input
//             className="border border-zinc-300 rounded w-full p-2 mt-1"
//             type="password required "
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//           ></input>
//         </div>

//         <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
//           {state === "Sign Up" ? "Create Account" : "Login"}
//         </button>
//         {state === "Sign Up" ? (
//           <p>
//             Already have an account?{" "}
//             <span
//               onClick={() => setState("Login")}
//               className="text-primary underline cursor-pointer"
//             >
//               Login here
//             </span>{" "}
//           </p>
//         ) : (
//           <p>
//             Create a new account{" "}
//             <span
//               onClick={() => setState("Sign Up")}
//               className="text-primary underline cursor-pointer"
//             >
//               {" "}
//               Click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({}); // State for validation errors
  const [showPassword, setShowPassword] = useState(false);

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/; // Allow only letters and spaces
    return regex.test(name) ? "" : "Name must contain only letters and spaces."; // Set specific error message
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email) ? "" : "Invalid email format."; // Set specific error message
  };

  const validatePassword = (password) => {
    // Regex explanation:
    // (?=.*[a-z]) - At least one lowercase letter
    // (?=.*[A-Z]) - At least one uppercase letter
    // (?=.*\d) - At least one digit
    // (?=.*[@$!%*?&]) - At least one special character (allowed characters in this case)
    // [A-Za-z\d@$!%*?&]{8,} - The password should be at least 8 characters long and can only include letters, digits, and special characters
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;

    // Testing the password using the regex
    if (!regex.test(password)) {
      return "Password must be at least 8 characters and include lowercase, uppercase, number, and special character.";
    }

    // If the password is valid, return an empty string
    return "";
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    setErrors({}); // Clear previous errors before validation

    if (state === "Sign Up") {
      const nameError = validateName(name);
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);

      if (nameError || emailError || passwordError) {
        setErrors({
          name: nameError,
          email: emailError,
          password: passwordError,
        });
        return; // Prevent form submission if there are errors
      }
    }

    try {
      const { data } = await axios.post(
        backendUrl +
          (state === "Sign Up" ? "/api/user/register" : "/api/user/login"),
        { name, password, email }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/"); // Redirect to home page on successful login/signup
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          {" "}
          Please {state === "Sign Up" ? "Sign up" : "Log in"} to book
          appointment{" "}
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className={`border border-zinc-300 rounded w-full p-2 mt-1 ${
                errors.name ? "border-red-500" : ""
              }`} // Add error class if name is invalid
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className={`border border-zinc-300 rounded w-full p-2 mt-1 ${
              errors.email ? "border-red-500" : ""
            }`} // Add error class if email is invalid
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="w-full">
          <p>Password</p>

          <div className="relative">
            <input
              className={`border border-zinc-300 rounded w-full p-2 mt-1 ${
                errors.password ? "border-red-500" : ""
              }`} // Add error class if password is invalid
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)} // Toggle showPassword on click
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>{" "}
          </p>
        ) : (
          <p>
            Create a new account{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              {" "}
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

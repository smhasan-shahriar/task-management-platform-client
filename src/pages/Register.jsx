import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthProvider, { AuthContext } from "../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineGoogle } from "react-icons/ai";

import useAuth from "../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile, socialLogIn } = useAuth();
  const navigate = useNavigate();
  const handleSocialLogin = () => {
    socialLogIn()
      .then((result) => {
        console.log(result.user);
        const loggedUser = { email: result.user.email };
        // axios
        //   .post("https://the-blog-hub-server.vercel.app/jwt", loggedUser, {
        //     withCredentials: true,
        //   })
        //   .then((res) => {
        //     console.log("token response", res.data);
        //   });
        // const newUser = result.user;
        // const userEntry = {
        //   userName: newUser.displayName,
        //   userEmail: newUser.email,
        //   userImage: newUser.photoURL,
        // };
        // axios
        //   .post("https://the-blog-hub-server.vercel.app/users", userEntry)
        //   .then((res) => {
        //     if (res.data.insertedId) {
        //       toast("You have successfully registered with Google");
        //       navigate("/");
        //     }
        //   });
      })
      .catch((error) => {
        console.log(error.message);
        toast(error.message);
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name);
    if (password.length < 6) {
      toast("password cannot be less than 6 characters");
      return;
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/.test(password)) {
      toast(
        "password must contain at least one capital letter and one special character and one numeric character"
      );
      return;
    } else {
      createUser(email, password)
        .then((result) => {
          console.log(result.user);
          updateUserProfile(name, image)
            .then(() => {
              const newUser = result.user;
              const loggedUser = { email: result.user.email };
              //   axios
              //     .post(
              //       "https://the-blog-hub-server.vercel.app/jwt",
              //       loggedUser,
              //       {
              //         withCredentials: true,
              //       }
              //     )
              //     .then((res) => {
              //       console.log("token response", res.data);
              //     });
              //   const userEntry = {
              //     userName: newUser.displayName,
              //     userEmail: newUser.email,
              //     userImage: newUser.photoURL,
              //   };
              //   axios
              //     .post("https://the-blog-hub-server.vercel.app/users", userEntry)
              //     .then((res) => {
              //       if (res.data.insertedId) {
              //         toast("You have successfully registered");
              //         navigate("/");
              //       }
              //     });
              toast("You have successfully registered");
              navigate("/");
            })
            .catch((error) => {
              toast(error.message);
            });
        })
        .catch((error) => {
          toast(error.message);
        });
    }
  };
  return (
    <div className="min-h-screen mt-20 md:mt-0 py-20  bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
      <div className="flex items-center justify-center">
        <div>
          <h2 className="text-5xl font-bold mb-10 text-center text-white">
            Register Now
          </h2>
          <div className="card flex-shrink-0  w-full md:min-w-[500px] shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered"
                  name="image"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white normal-case text-xl"
                  type="submit"
                  value="Register"
                />
              </div>
              <p>
                Already have account? Please{" "}
                <Link to="/login">
                  <span className="btn btn-link p-0 normal-case">Login</span>
                </Link>
              </p>
              <div className="flex items-center" onClick={handleSocialLogin}>
                <p className="btn btn-ghost normal-case btn-outline text-blue-600">
                  <AiOutlineGoogle /> Register with Google
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

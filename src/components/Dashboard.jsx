import React from "react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto px-2">
      <div className="py-2 bg-gradient-to-r from-blue-500 to-violet-500 w-full flex items-center justify-between px-5">
        <p className="text-white font-bold text-2xl">Dashboard</p>
        <div className="flex items-center gap-4">
          <p className="text-white font-medium">{user?.displayName}</p>
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={user.photoURL}
            alt=""
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <div className="w-full shadow-xl py-5 rounded-lg">
          <div className="text-center font-medium py-2 rounded-lg  bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xl">
            To Do
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                    <p>date</p>
                    <p className="">priority</p>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                    <p>date</p>
                    <p className="">priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full shadow-xl py-5 rounded-lg">
          <div className="text-center font-medium py-2 rounded-lg  bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xl">
            Ongoing
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                    <p>date</p>
                    <p className="">priority</p>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                    <p>date</p>
                    <p className="">priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full shadow-xl py-5 rounded-lg">
          <div className="text-center font-medium py-2 rounded-lg  bg-gradient-to-r from-blue-500 to-violet-500 text-white text-xl">
            Completed
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                    <p>date</p>
                    <p className="">priority</p>
                </div>
              </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button className="btn btn-square btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="font-bold text-lg">Title</p>
                <p className="font-medium">Description</p>
                <div className="flex justify-start">
                    <p>date</p>
                    <p className="">priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

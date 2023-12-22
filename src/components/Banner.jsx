import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/hg28y06/ionela-mat-0-K5c8b8o-SLs-unsplash-1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Swift Task Planner: Empowering Your Productivity Journey
            </h1>
            <p className="mb-5">
              Unlock efficiency, navigate challenges seamlessly, enhance
              productivity, find inspiration. Your companion for task management
              excellence, purposeful living.
            </p>
            <Link to="/login">
            <button className="btn  bg-gradient-to-r from-cyan-500 to-blue-500 text-white normal-case text-xl border-none">Let's Explore</button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

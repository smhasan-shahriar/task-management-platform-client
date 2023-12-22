const Beneficiary = () => {
  return (
    <div className="customContainer max-w-[1440px] mx-auto px-2 mt-20">
      <h2 className="text-center font-bold text-3xl mb-20">Our Happy Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="card bg-base-100 shadow-xl py-5">
          <figure>
            <img
              className="w-48 h-48 rounded-full object-cover"
              src="https://i.ibb.co/1nJpQ6B/mohammad-rahmani-Fx34-Keq-IEw-unsplash.jpg"
              alt="Developers"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-center">Developers</h2>
            <p>
              Efficient, intuitive, Private: Swift Task Planner
              streamlines productivity seamlessly for developers.
            </p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl py-5">
          <figure>
            <img
              className="w-48 h-48 rounded-full object-cover"
              src="https://i.ibb.co/0fQMNcC/smartworks-coworking-c-W4l-LTav-U80-unsplash.jpg"
              alt="Corporate"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Corporate People</h2>
            <p>
              Boost corporate efficiency with Swift Task Planner: streamlined,
              private, and user-friendly.
            </p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl py-5">
          <figure>
            <img
              className="w-48 h-48 rounded-full object-cover"
              src="https://i.ibb.co/nzmPZG6/ali-morshedlou-WMD64t-Mfc4k-unsplash.jpg"
              alt="Banker"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Banker</h2>
            <p>
              Enhance banking workflows with Swift Task Planner: organized,
              secure, and private.
            </p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl py-5">
          <figure>
            <img
              className="w-48 h-48 rounded-full object-cover"
              src="https://i.ibb.co/KyTy8Rh/javier-trueba-i-QPr1-Xk-F5-F0-unsplash.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Student</h2>
            <p>
              Optimize student success: Swift Task Planner, organized,
              intuitive, and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beneficiary;

import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer footer-center footer-horizontal bg-gradient-to-r from-purple-200 via-pink-100 to-indigo-200 text-base-content rounded p-10 mt-12">
      
      {/* QUICK LINKS */}
      <nav className="grid grid-flow-col gap-6 text-sm">
        <Link to="/" className="link link-hover hover:text-pink-600">
          Home
        </Link>
        <Link to="/all-vehicles" className="link link-hover hover:text-pink-600">
          All Vehicles
        </Link>
        <Link to="/add-vehicle" className="link link-hover hover:text-pink-600">
          Add Vehicle
        </Link>
        <Link to="/my-bookings" className="link link-hover hover:text-pink-600">
          My Bookings
        </Link>
      </nav>

      {/* SOCIAL ICONS */}
      <nav>
        <div className="grid grid-flow-col gap-4">
          
          {/* X (Twitter) */}
          <a className="hover:text-black cursor-pointer" aria-label="X (Twitter)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.172l-4.833-6.32-5.531 6.32H2.656l7.73-8.835L1.5 2.25h6.328l4.37 5.73 5.046-5.73zm-1.161 17.52h1.833L7.87 4.126H5.904L17.083 19.77z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a className="hover:text-red-500 cursor-pointer" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0
                -3.897.266-4.356 2.62-4.385 8.816
                .029 6.185.484 8.549 4.385 8.816
                3.6.245 11.626.246 15.23 0
                3.897-.266 4.356-2.62 4.385-8.816
                -.029-6.185-.484-8.549-4.385-8.816zm
                -10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>

          {/* Facebook */}
          <a className="hover:text-blue-700 cursor-pointer" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4
                v-1.667c0-.955.192-1.333 1.115-1.333h2.885
                v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* COPYRIGHT */}
      <aside>
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">TravelEase</span>.  
          All rights reserved.
        </p>
      </aside>

    </footer>
  );
};

export default Footer;

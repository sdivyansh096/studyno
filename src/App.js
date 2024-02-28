// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Navbar from "./componenets/common/Navbar.jsx";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgotPassword";
// import OpenRoute from "./componenets/core/Auth/OpenRoute.jsx";
// import { UpdatePassword } from "./pages/UpdatePassword.jsx";
// import VerifyEmail from "./pages/VerifyEmail.jsx";
// import About from "./pages/About.jsx";
// import MyProfile from "./componenets/core/Dashboard/MyProfile.jsx";
// import EnrolledCourses from "./componenets/core/Dashboard/EnrolledCourses.jsx";
// import Cart from "./componenets/core/Dashboard/Cart/index.js";
// import Dashboard from "./pages/Dashboard.jsx";
// import Error from "./pages/Error.jsx";
// import { ACCOUNT_TYPE } from "./utils/constants.jsx";
// import { useSelector } from "react-redux";
// // import AddCourse from "./componenets/core/Dashboard/AddCourse/index.jsx";
// import Footer from "./componenets/common/Footer.jsx";
// import ContactUsForm from "./componenets/contactUs/ContactUsForm.jsx";

// function App() {
//   const user = useSelector((state) => state.profile.user);

//   return (
//     <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/login"
//           element={
//             <OpenRoute>
//               <Login />
//             </OpenRoute>
//           }
//         />

//         <Route
//           path="/signup"
//           element={
//             <OpenRoute>
//               <Signup />
//             </OpenRoute>
//           }
//         />

//         <Route
//           path="/forgot-password"
//           element={
//             <OpenRoute>
//               <ForgotPassword />
//             </OpenRoute>
//           }
//         />

//         <Route
//           path="/update-password/:id"
//           element={
//             <OpenRoute>
//               <UpdatePassword />
//             </OpenRoute>
//           }
//         />
//         <Route
//           path="/verify-email"
//           element={
//             <OpenRoute>
//               <VerifyEmail />
//             </OpenRoute>
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <OpenRoute>
//               <About />
//             </OpenRoute>
//           }
//         />
//         <Route
//           path="/contact"
//           element={
//             <OpenRoute>
//               <ContactUsForm />
//             </OpenRoute>
//           }
//         />
//         <Route
//           element={
//             // add privateroute here
//             <Dashboard />
//           }
//         >
//           {/* nested route here */}
//           <Route path="/dashboard/my-profile" element={<MyProfile />} />
//           <Route
//             path="dashboard/enrolled-courses"
//             element={<EnrolledCourses />}
//           />
//           <Route path="dashboard/cart" element={<Cart />} />

//         </Route>
//         <Route path="*" element={<Error />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App;
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./componenets/common/Navbar";
import Footer from "./componenets/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "./slices/loadingBarSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Dashboard from "./pages/Dashboard";
import OpenRoute from "./componenets/core/Auth/OpenRoute";
import PrivateRoute from "./componenets/core/Auth/PrivateRoute";
import MyProfile from "./componenets/core/Dashboard/MyProfile";
import Setting from "./componenets/core/Dashboard/Settings";
import EnrollledCourses from "./componenets/core/Dashboard/EnrolledCourses";
import Cart from "./componenets/core/Dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./componenets/core/Dashboard/AddCourse/index";
import MyCourses from "./componenets/core/Dashboard/MyCourses/MyCourses";
import EditCourse from "./componenets/core/Dashboard/EditCourse.jsx/EditCourse";
import Catalog from "./pages/Catalog";
// import ScrollToTop from "./componenets/ScrollToTop";
import CourseDetails from "./pages/CourseDetails";
import SearchCourse from "./pages/SearchCourse";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./componenets/core/ViewCourse/VideoDetails";
// import PurchaseHistory from "./componenets/core/Dashboard/PurchaseHistory";
import InstructorDashboard from "./componenets/core/Dashboard/InstructorDashboard/InstructorDashboard";
import { RiWifiOffLine } from "react-icons/ri";
// import AdminPannel from "./Components/core/Dashboard/AdminPannel";

function App() {
  console.log = function () {};
  const user = useSelector((state) => state.profile.user);
  const progress = useSelector((state) => state.loadingBar);
  const dispatch = useDispatch();
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <LoadingBar
        color="#FFD60A"
        height={1.4}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <NavBar setProgress={setProgress}></NavBar>
      {!navigator.onLine && (
        <div className="bg-red-500 flex text-white text-center p-2 bg-richblack-300 justify-center gap-2 items-center">
          <RiWifiOffLine size={22} />
          Please check your internet connection.
          <button
            className="ml-2 bg-richblack-500 rounded-md p-1 px-2 text-white"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/catalog/:catalog" element={<Catalog />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/update-password/:id" element={<ResetPassword />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<ContactUs />} />

        <Route path="/courses/:courseId" element={<CourseDetails />} />

        <Route path="/search/:searchQuery" element={<SearchCourse />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Setting />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrollledCourses />}
              />
              {/* <Route
                path="dashboard/purchase-history"
                element={<PurchaseHistory />}
              /> */}
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              <Route
                path="dashboard/instructor"
                element={<InstructorDashboard />}
              />
            </>
          )}
          {/* {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/admin-panel" element={<AdminPannel />} />
            </>
          )} */}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

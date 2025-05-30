import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./components/ContextProvider/Contextprovider.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./components/auth/Signup.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import AllUsers from "./pages/Allusers.jsx";
import Home from "./components/Home/pages/Home.jsx";
import { ApiProvider } from "./components/ContextProvider/ApiContext.jsx";
import AccountInfo from "./components/Header/AccountInfo.jsx";
import AuthLayout from "./components/ContextProvider/AuthLayout.jsx";
import AssignRoom from "./pages/AssignRoom.jsx";
import UpdateOccupants from "./pages/UpdateOccupants.jsx";
import GetRoomOccupants from "./pages/GetRoomOccupants.jsx";
import ExportPayments from "./components/pages/ExportPayments.jsx";
import UpdateUserForm from "./components/pages/UpdateUserForm.jsx";
import UpdatePayment from "./components/pages/UpdatePayment.jsx";
import RefreshPayments from "./components/pages/RefreshPayments.jsx";
import CreateRoom from "./components/pages/CreateRoom.jsx";
import DeleteUser from "./components/pages/DeleteUser.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/signUp",
      //   element: (
      //     <AuthLayout authentication={false}>
      //       <SignUp />
      //     </AuthLayout>
      //   ),
      // },
      {
        path: "/SignIn",
        element: (
          <AuthLayout authentication={false}>
            <SignIn />
          </AuthLayout>
        ),
      },

      {
        path: "/assign-room",
        element: (
          <AuthLayout authentication>
            <AssignRoom />
          </AuthLayout>
        ),
      },
      {
        path: "/export-payments",
        element: (
          <AuthLayout authentication>
            <ExportPayments />
          </AuthLayout>
        ),
      },
      {
        path: "/update-payment",
        element: (
          <AuthLayout authentication>
            <UpdatePayment />
          </AuthLayout>
        ),
      },
      {
        path: "/delete-user",
        element: (
          <AuthLayout authentication>
            <DeleteUser />
          </AuthLayout>
        ),
      },
      {
        path: "/update-user-info",
        element: (
          <AuthLayout authentication>
            <UpdateUserForm />
          </AuthLayout>
        ),
      },
      {
        path: "/update-occupants",
        element: (
          <AuthLayout authentication>
            <UpdateOccupants />
          </AuthLayout>
        ),
      },
      {
        path: "/account-info",
        element: (
          <AuthLayout authentication>
            <AccountInfo />
          </AuthLayout>
        ),
      },

      ,
      {
        path: "/all-occupants",
        element: (
          <AuthLayout authentication>
            <AllUsers />
          </AuthLayout>
        ),
      },
      {
        path: "/room-occupants",
        element: (
          <AuthLayout authentication>
            <GetRoomOccupants />
          </AuthLayout>
        ),
      },

      {
        path: "/refresh-payments",
        element: (
          <AuthLayout authentication>
            <RefreshPayments />
          </AuthLayout>
        ),
      },
      {
        path: "/create-room",
        element: (
          <AuthLayout authentication>
            <CreateRoom />
          </AuthLayout>
        ),
      },
      {
        path: "/create-user",
        element: (
          <AuthLayout authentication>
            <SignUp />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <RouterProvider router={router} />
      </ApiProvider>
      {/* <App /> */}
    </AuthProvider>
  </React.StrictMode>
);

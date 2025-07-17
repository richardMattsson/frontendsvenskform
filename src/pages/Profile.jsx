import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import Logout from '../components/Logout';
import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';

function Profile() {
  const [showLogin, setShowLogin] = useState(true);

  const { user } = useAuth();
  // console.log(user);

  return (
    <>
      {/* <h1>Välkommen {user.email}</h1>; */}
      {user ? (
        <>
          <Logout />

          {/* <Link to="/admin/home">
            <li className="navlink">Admin</li>
          </Link> */}
        </>
      ) : showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <CreateAccount setShowLogin={setShowLogin} />
      )}
    </>
  );
}
export default Profile;

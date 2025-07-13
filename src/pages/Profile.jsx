import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Logout from '../components/Logout';
import Login from '../components/Login';
import CreateAccount from '../components/CreateAccount';

function Profile() {
  const [showLogin, setShowLogin] = useState(true);
  // const [loggedIn, setLoggedIn] = useState(false);
  const { user } = useAuth();
  console.log(user);

  // const [profileInfo, setProfileInfo] = useState([]);
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     try {
  //       const response = await fetch('/api/profile', {
  //         credentials: 'include',
  //       });
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch profile data');
  //       }

  //       const data = await response.json();
  //       setProfileInfo(data);
  //     } catch (error) {
  //       console.error('Logout failed', error);
  //     }
  //   };
  //   getUserInfo();
  // }, []);

  // async function getMessages() {
  //   try {
  //     const response = await fetch('/api/messages', {
  //       credentials: 'include',
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch messages');
  //     }

  //     const data = await response.json();
  //     setMessages(data);
  //   } catch (error) {
  //     console.error('Logout failed', error);
  //   }
  // }

  return (
    <>
      <h1>Profile</h1>
      {/* <h1>Välkommen {user.email}</h1>; */}
      {user ? (
        <>
          <Logout />
          <p>hej</p>
          <Link to="/admin/home">
            <li className="navlink">Admin</li>
          </Link>
        </>
      ) : showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <CreateAccount setShowLogin={setShowLogin} />
      )}
      {/* {showLogin ? (
        <Login setShowLogin={setShowLogin} />
      ) : (
        <CreateAccount setShowLogin={setShowLogin} />
      )} */}
      {/* <table>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>password</th>
            <th>created</th>
          </tr>
        </thead>
        <tbody>
          {profileInfo.map((info) => {
            return (
              <tr key={info.id}>
                <td>{info.id}</td>
                <td>{info.email}</td>
                <td>{info.password}</td>
                <td>{info.created}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      {/* {messages && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>text</th>
              <th>sender_id</th>
              <th>recipient_id</th>
              <th>created</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => {
              return (
                <tr key={message.id}>
                  <td>{message.id}</td>
                  <td>"{message.text}"</td>
                  <td>{message.sender_id}</td>
                  <td>{message.recipient_id}</td>
                  <td>{message.created}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
      {/* )} */}
      {/* <button onClick={getMessages}>Get messages</button> */}
    </>
  );
}
export default Profile;

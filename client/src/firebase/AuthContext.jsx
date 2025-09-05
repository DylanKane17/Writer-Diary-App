import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/Firebase";
import {
  verifyUser,
  newUserData,
  getUserData,
  addUserEntry,
  addUserProject,
  deleteUserData,
  deleteProject,
} from "./CRUD";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initialiseUser);
    return unsubscribe;
  }, []);

  async function initialiseUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        auth.currentUser
          .getIdToken(true)
          .then((idToken) => {
            verifyUser(idToken).then((uid) => getUserData(uid));
          })
          .catch((e) => {
            console.log("Error in handling request: ", e);
          });
        setCurrentUser(userCredential.user);
      })
      .catch((e) => {
        console.log("Error: ", e.message);
      });
  }

  function signUserOut() {
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
        setUserLoggedIn(false);
      })
      .catch((e) => {
        console.log("Error: ", e.message);
      });
  }

  function deleteCurrentUser() {
    deleteUserData(auth.currentUser.uid).then(
      deleteUser(auth.currentUser)
        .then(() => {
          setCurrentUser(null);
          setUserLoggedIn(false);
        })
        .catch((e) => {
          console.log("Error: ", e.message);
        })
    );
  }

  async function deleteUserProject(projectID) {
    console.log("attempting delete...");
    if (!loading && currentUser) {
      let response = await verifyUser(currentUser.accessToken).then((uid) => {
        return deleteProject(uid, projectID);
      });
      return response;
    }
  }

  function createUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        auth.currentUser
          .getIdToken(true)
          .then((idToken) => {
            verifyUser(idToken).then((uid) => newUserData(uid));
          })
          .catch((e) => {
            console.log("Error in handling request: ", e);
          });
        setCurrentUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  async function currentUserData() {
    console.log("User:");
    console.log(currentUser);
    if (!loading && currentUser) {
      let response = await verifyUser(currentUser.accessToken).then((uid) => {
        return getUserData(uid);
      });
      console.log(response);
      return response;
    } else {
      return null;
    }
  }

  function addEntry(
    userTitle,
    userNotes,
    dateAdded,
    userProgress,
    userProject
  ) {
    console.log("Project:");
    console.log(userProject);
    verifyUser(currentUser.accessToken).then((uid) => {
      addUserEntry(
        userTitle,
        userNotes,
        dateAdded,
        userProgress,
        userProject,
        uid
      );
    });
  }

  function addProject(projectName, projectProgress, projectTarget) {
    verifyUser(currentUser.accessToken).then((uid) => {
      addUserProject(projectName, projectProgress, projectTarget, uid);
    });
  }

  async function sendPasswordReset(email) {
    let status = await sendPasswordResetEmail(auth, email)
      .then(() => {
        return "Password reset email sent!";
      })
      .catch((e) => {
        return e.errorMessage;
      });
    return status;
  }

  const value = {
    userLoggedIn,
    currentUser,
    setUserLoggedIn,
    signIn,
    currentUserData,
    createUser,
    signUserOut,
    deleteCurrentUser,
    deleteUserProject,
    addEntry,
    addProject,
    loading,
    sendPasswordReset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

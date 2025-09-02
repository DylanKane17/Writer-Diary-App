const baseUrl = "http://127.0.0.1:5000";

export const verifyUser = async (user_token) => {
  console.log("fetching...");
  let response = await fetch(baseUrl + "/verify-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ JWT: user_token }),
  });
  response = await response.json();
  console.log(response);
  return response["uid"];
};

export const getUserData = async (user_token) => {
  let response = await fetch(baseUrl + "/get-user-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: user_token }),
  });
  response = await response.json();
  console.log("Response:");
  console.log(response);
  return response;
};

export const newUserData = async (user_token) => {
  let response = await fetch(baseUrl + "/new-user-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: user_token }),
  });
  response = await response.json();
};

export const addUserEntry = async (
  userTitle,
  userNotes,
  dateAdded,
  userProgress,
  currProject,
  currUID
) => {
  let response = await fetch(baseUrl + "/add-user-entry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: userTitle,
      notes: userNotes,
      date: dateAdded,
      progress: userProgress,
      project: currProject,
      uid: currUID,
    }),
  });
  response = await response.json();
  return response;
};

export const addUserProject = async (
  projectName,
  projectProgress,
  projectTarget,
  currUID
) => {
  let response = await fetch(baseUrl + "/add-user-project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectName,
      progress: projectProgress,
      target: projectTarget,
      uid: currUID,
    }),
  });
  response = await response.json();
  return response;
};

export const updateUserData = async (
  userQuote,
  userNotes,
  dateAdded,
  userBook,
  currUID,
  entryID
) => {
  let response = await fetch(baseUrl + "/update-user-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quote: userQuote,
      notes: userNotes,
      date: dateAdded,
      book: userBook,
      uid: currUID,
      entry_id: entryID,
    }),
  });
  response = await response.json();
  return response;
};

export const deleteUserData = async (user_id) => {
  console.log("fetching...");
  let response = await fetch(baseUrl + "/delete-user-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: user_id }),
  });
  response = await response.json();
  return response;
};

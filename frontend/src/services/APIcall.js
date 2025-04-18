import { getAuth,onAuthStateChanged } from "firebase/auth";

async function makeRequest(url, method, body) {
  const auth = getAuth();
  let data = { status: "error", msg: "" };
  // Return a promise that resolves when auth state is ready
  return new Promise((resolve) => {
    // This listener fires once when auth state is first determined
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe(); // Stop listening immediately after first auth state is determined
      if (user) {
        const idToken = await user.getIdToken();
        const req = {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
        if(body){
          req.body = JSON.stringify(body);
        }
        const response = await fetch(url, req);
        if (response.ok) {
          data = await response.json();
          console.log("res ok from makeRequest");
          console.log(data);
        }
        else if(response.status === 409){
          data.msg = "overlap";
          data.res = await response.json();
          console.log("overlap from makeRequest");
          console.log(data);
        }
        else {
          console.log("res not ok from makeRequest");
          data.msg = "Failed to make request";
        }
      } else {
        data.msg = "User not logged in";
      }
      resolve(data);
    });
  });
}

export default makeRequest;
import cookie from "js-cookie";

// set user to cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove user from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// read user from cookie like stored token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// set user to local storage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove user from local storage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// authenticate user by passing data to the cookie and local storage @ the time of sign-in
// it workds something like a middleware
export const authenticate = (response, next) => {
  // console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE");
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

// access user information from the local storeage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

// check if the user is an admin
export const isAdmin = () => {
  return isAuth().role === 'Admin';
};

// check if the user is a customer
export const isCustomer = () => {
  return isAuth().role === 'Customer';
};


// logout method
export const logout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};

// updateing user in localstoreage
export const updateUser = (response, next) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};

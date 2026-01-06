import Axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
let server = null;

if (user) {
  const type = user.type === "admin" ? true : false;
  const email = user.email;
  server = Axios.create({
    baseURL: "http://72.61.239.235",
    params: {
      location: localStorage.getItem("branch"),
      admin: type,
      email,
    },
  });
} else {
  server = Axios.create({
    baseURL: "http://72.61.239.235",
    params: {
      location: localStorage.getItem("branch"),
      admin: null,
    },
  });
}
// http://72.61.239.235
// https://admin.aussiehub.co.in
export default server;

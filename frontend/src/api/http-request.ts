import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:4000"
});

const getUsers = async () => 
  request({
    method: "GET",
    url: "/user"
  })

export default {
  getUsers
}
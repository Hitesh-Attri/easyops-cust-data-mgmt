import axios from "axios";

const getAllCustomers = async (req, res) => {
  try {
    // const res = await axios.get(`${BASE_URL}/get-all-customers`);
    // console.log(res.data);
    // res.json(res.data.customers).status(200);
  } catch (error) {
    console.log(error, "error");
    res.json(error).status(500);
  }
};

export default getAllCustomers;

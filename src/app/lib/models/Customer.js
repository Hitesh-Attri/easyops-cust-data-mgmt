import mongoose from "mongoose";

const customerModel = mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
});

const Customer =
  mongoose.models.Customers || mongoose.model("Customers", customerModel);

export default Customer;

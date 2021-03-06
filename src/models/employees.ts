import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide the employee's first name"],
    maxlength: [255, "First name cannot have more than 255 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide the employee's last name"],
    maxlength: [255, "Last name cannot have more than 255 characters"],
  },
  cpf: {
    type: String,
    required: [true, "Please provide the employee's CPF"],
    maxlength: [255, "CPF cannot have more than 255 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide the employee's email"],
    maxlength: [255, "Email cannot have more than 255 characters"],
  },
  companyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Please provide the employee's employer ID"],
  },
});

export default mongoose.models.employees || mongoose.model("employees", EmployeeSchema);

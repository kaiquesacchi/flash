import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the company's name"],
    maxlength: [255, "Name cannot have more than 255 characters"],
  },
  tradingName: {
    type: String,
    required: [true, "Please provide the company's trading name"],
    maxlength: [255, "Trading name cannot have more than 255 characters"],
  },
  cnpj: {
    type: String,
    required: [true, "Please provide the company's CNPJ"],
    maxlength: [255, "CNPJ cannot have more than 255 characters"],
  },
  address: {
    type: String,
    required: [true, "Please provide the company's address"],
    maxlength: [255, "Address cannot have more than 255 characters"],
  },
  chosenBenefits: {
    type: Array,
  },
});

export default mongoose.models.companies || mongoose.model("companies", CompanySchema);

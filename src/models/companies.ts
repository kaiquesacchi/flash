import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name to the company"],
    maxlength: [255, "Name cannot have more than 255 characters"],
  },
  tradingName: {
    type: String,
    required: [true, "Please provide a trading-name to the company"],
    maxlength: [255, "Trading-name cannot have more than 255 characters"],
  },
  cnpj: {
    type: String,
    required: [true, "Please provide a CNPJ to the company"],
    maxlength: [255, "CNPJ cannot have more than 255 characters"],
  },
  address: {
    type: String,
    required: [true, "Please provide an address to the company"],
    maxlength: [255, "Address cannot have more than 255 characters"],
  },
  chosenBenefits: {
    type: Array,
  },
});

export default mongoose.models.companies || mongoose.model("companies", CompanySchema);

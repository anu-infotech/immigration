const mongoose = require("mongoose");
const Password = require("../helpers/password");
const FollowUp = require("./FollowUp");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: false, default: null },
  mobile: { type: Number, required: false, default: null },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: false },
  is_super_admin: { type: Boolean, default: false },
  type: { type: String, default: "user" },
  attendance: {
    type: [
      {
        date: Date,
        location: String,
        status: Boolean
      },
    ],
    default: [],
  },
  dailyReportNormal: {
    type: [
      {
        name: String,
        date: Date,
        type: { type: String, required: false },
      },
    ],
    required: false,
    default: [],
  },

  dailyReportExtended: {
    type: [
      {
        task: { type: {} },
        date: Date,
        addInfo: String,
        document: String,
      },
    ],
    required: false,
    default: [],
  },
  // Soft delete field
  deleted_at: {
    type: Date,
    default: null
  }
});

adminSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
    done();
  }
});

// Automatically ignore soft-deleted records
adminSchema.pre(/^find/, function(next) {
  this.where({ deleted_at: null });
  next();
});

const Admin = mongoose.model("admins", adminSchema);

module.exports = Admin;

const { createHmac, randomBytes } = require("node:crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
      // required: true
    },

    profileImageURL: {
      type: String,
      default: "/images/default-profile.png",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!this.isModified("password"))                          // it only works when you have password changing option
    // If the password field is not modified, skip hashing
    return next();

  const salt = randomBytes(16).toString(); // Generate a random salt
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex"); // Hash the password using HMAC with the generated salt

  this.salt = salt;
  this.password = hashPassword; // Store the hashed password
  // next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found"); // We get the user from the database using the provided email. If the user doesn't exist, return false.

  const salt = user.salt;
  const hashPassword = user.password;

  const userProvidedPasswordHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (userProvidedPasswordHash !== hashPassword)
    throw new Error("Invalid password"); // If the hashed password doesn't match the stored hash, return false.

  return user; // If the password matches, return the user object.
});

const User = model("User", userSchema);

module.exports = User;

const { body, query } = require("express-validator");

exports.validateRegistration = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("phoneNo")
    .notEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Phone number must be a number"),

  body("emailAddress")
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("location.fullAddress")
    .notEmpty()
    .withMessage("Full address is required")
    .isString()
    .withMessage("Full address must be a string"),

  body("location.city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string"),

  body("location.pincode")
    .notEmpty()
    .withMessage("Pincode is required")
    .isString()
    .withMessage("Pincode must be a string"),

  body("location.country")
    .notEmpty()
    .withMessage("Country is required")
    .isString()
    .withMessage("Country must be a string"),

  body("location.colony")
    .optional()
    .isString()
    .withMessage("Colony must be a string"),

  body("role")
    .optional()
    .isIn(["admin", "provider", "user"])
    .withMessage("Role must be one of: admin, provider, user"),
];

exports.validateLogin = [
  body("email").notEmpty().withMessage("email is required").isEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.validateCheckUser = [
  body().custom((body) => {
    const keys =
      body && typeof body === "object" && !Array.isArray(body)
        ? Object.keys(body)
        : [];
    if (keys.length > 0) {
      throw new Error("No fields are allowed");
    }
    return true;
  }),
];

exports.validateDeletion = [
  body().custom((body) => {
    const keys =
      body && typeof body === "object" && !Array.isArray(body)
        ? Object.keys(body)
        : [];
    if (keys.length > 0) {
      throw new Error("No fields are allowed");
    }
    return true;
  }),
];

exports.validateUpdation = [
  body("username")
    .optional()
    .isLength({ min: 3, max: 14 })
    .withMessage("Username must be 3–14 characters"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("location")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Location must be 2-50 characters"),

  body("updatedData.username")
    .optional()
    .isLength({ min: 3, max: 14 })
    .withMessage("Username must be 3–14 characters"),

  body("updatedData.email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format"),

  body("updatedData.location")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Location must be 2-50 characters"),

  body().custom((body) => {
    const hasUpdatedData =
      body &&
      typeof body === "object" &&
      body.updatedData &&
      typeof body.updatedData === "object" &&
      !Array.isArray(body.updatedData);

    const payload = hasUpdatedData ? body.updatedData : body || {};
    const allowed = ["username", "email", "location"];
    const keys = Object.keys(payload);

    if (keys.length === 0) {
      throw new Error("At least one field is required");
    }

    const invalid = keys.filter((key) => !allowed.includes(key));
    if (invalid.length > 0) {
      throw new Error(`Invalid fields: ${invalid.join(", ")}`);
    }

    if (hasUpdatedData) {
      const rootInvalid = Object.keys(body).filter((key) => key !== "updatedData");
      if (rootInvalid.length > 0) {
        throw new Error(`Invalid fields: ${rootInvalid.join(", ")}`);
      }
    }

    return true;
  }),
];
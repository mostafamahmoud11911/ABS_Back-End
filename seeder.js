import User from "./src/database/models/userModel.js";
import connect from "./src/database/db.js";



async function seedAdmin() {

  try {

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }


    const adminUser = new User({
      name: "Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    await adminUser.save();

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();

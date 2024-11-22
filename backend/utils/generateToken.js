const jwt = require("jsonwebtoken");

exports.generateTokenAndSendResponse = (user, res, loggedUser) => {
  // console.log("Generating token for user: " + user);

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Send the token in the response body
  if (loggedUser === "employee") {
    return res.status(200).json({
      success: true,
      token: token,
      user: {
        user: loggedUser,
        name: user.name,
        email: user.email,
        mobileNo: user.mobileNo,
        department: user.department.name,
        designation: user.designation.name,
        permissions: user.designation.permissions,
        profilePic: user.profilePic,
      },
    });
  }
  res.status(200).json({
    success: true,
    token: token,
    user: { user: loggedUser, name: user.name },
  });

  // If you prefer to send the token in a header instead, you could do:
  // res.setHeader('Authorization', `Bearer ${token}`);
  // res.status(200).json({ success: true });
};

exports.resetTokenLink = (user) => {
  const secret = process.env.JWT_SECRET + user.password;
  const payload = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });

  const link = `http://localhost:3000/api/reset-password/${user._id}/${token}`;
  return link;
};

exports.verifyResetToken = (user, token) => {
  try {
    const secret = process.env.JWT_SECRET + user.password;
    const payload = jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};

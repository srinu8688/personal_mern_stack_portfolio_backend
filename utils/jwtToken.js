export const generateToken = (user, message, statusCode, res) => {
  
  const token = user.generateJsonWebToken();
  
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Only set secure and sameSite=none in production
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
    cookieOptions.sameSite = 'none';
  } else {
    // For local development
    cookieOptions.sameSite = 'lax';
  }

  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      message,
      user,
      token,
    });
};


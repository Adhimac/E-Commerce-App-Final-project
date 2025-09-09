exports.otpGenerator = function (length) {
    try {
        let otp = '';
        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp;
    } catch (error) {
        console.error("Error generating OTP:", error);
        return null;
    }
};

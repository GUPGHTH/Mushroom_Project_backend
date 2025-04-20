// import jwt from "jsonwebtoken";

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.header("Authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Access Denied: No Token Provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Verified Token Payload:", verified); // ✅ Debug ดูค่า payload

//         if (!verified.id && !verified.user_id) {
//             return res.status(403).json({ message: "Invalid Token: Missing user_id or id" });
//         }

//         req.user = verified;
//         next();
//     } catch (error) {
//         console.error("Invalid Token:", error.message);
//         res.status(403).json({ message: "Invalid or Expired Token" });
//     }
// };

// export default authenticateToken;

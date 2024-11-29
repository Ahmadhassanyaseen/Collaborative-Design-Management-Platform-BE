import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // const allowedTypes = [
  //   "image/jpeg",
  //   "image/jpg",
  //   "image/png",
  //   "audio/mp3",
  //   "audio/mpeg",
  //   "video/mp4",
  // ];
  // if (allowedTypes.includes(file.mimetype)) {
  //   return cb(null, true);
  // } else {
  //   cb(new Error("Unsupported file type"), false);
  // }
};
const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
  limits: { fileSize: 60 * 1024 * 1024 }, // 60MB limit
});
// console.log("here");

export default upload;

export default function checkImageCount(req, res, next) {
    let maxImages = 6

    if (!req.files || req.files.length > maxImages) {
      return res.status(400).json({ message: `Too many images. Maximum allowed is ${maxImages}.` });
    }
    next();
};
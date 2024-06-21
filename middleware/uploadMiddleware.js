import multer from 'multer';
import path from 'path';
import fs from 'fs';

const createDirectories = (dir) => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = file.mimetype.split('/')[0];
    let uploadPath;

    if (type === 'image') {
      uploadPath = 'uploads/avatars';
    } else if (type === 'video') {
      uploadPath = 'uploads/videos';
    } else {
      return cb({ message: 'File type not supported' }, false);
    }

    createDirectories(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const type = file.mimetype.split('/')[0];
    if (type === 'image' || type === 'video') {
      cb(null, true);
    } else {
      cb({ message: 'File type not supported' }, false);
    }
  }
});

export default upload;

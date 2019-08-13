const multer = require('multer');

module.exports = {
  filter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid image', false));
    }
  },
  products: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/img/products');
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `product-${Date.now()}.${extension}`);
    }
  })
};

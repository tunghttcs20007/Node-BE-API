const cloudinary = require('cloudinary');

/** Config Cloudinary */
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CL_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImages = async (req, res) => {
	let result = await cloudinary.uploader.upload(req.body.image, {
		public_id: `${Date.now()}`,
		resource_type: 'auto', // jpeg, png
  });
  
	res.json({
		public_id: result.public_id,
		url: result.secure_url,
	});
};

exports.removeImages = (req, res) => {
  let imageId = req.body.public_id;

  cloudinary.uploader.destroy(imageId, (error, result) => {
    if (error) return res.json({ isDeleted: false, error });
    res.status(204);
  });
};
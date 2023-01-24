// @ts-nocheck

export default function handleUpload(setImages, images) {
  var publicId;
  var myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "dl4cl39or",
      uploadPreset: "Commerce",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        const newImage = {
          url: result.info.secure_url,
          imageId: result.info.public_id,
        };
        // console.log("Done! Here is the image info: ", result.info);
        setImages([...images, newImage]);
        publicId = result.info;
      }
    }
  );
  myWidget.open();
  return publicId;
}

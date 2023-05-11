export const EditPicture = () => {
  const handleFileChange = (e) => {
    let url = URL.createObjectURL(e.target.files[0]);

    setCroppedPicture({
      ...croppedPicture,
      originalImg: url,
      cropperOpen: true,
    });
  };

  const handleSave = () => {
    const canvasScaled = editor.current.getImageScaledToCanvas();
    const croppedImg = canvasScaled.toDataURL();

    canvasScaled.toBlob((blob) => {
      const storageRef = ref(storage, `${props.loggedUser.username}.jpg`);
      uploadBytes(storageRef, blob);
    });

    setCroppedPicture({
      ...croppedPicture,
      originalImg: null,
      cropperOpen: false,
      croppedImg: croppedImg,
    });

    getProfilePicture();
  };

  const getProfilePicture = () => {
    const storageRef = ref(storage, `${props.loggedUser.username}.jpg`);
    getDownloadURL(storageRef)
      .then((url) => {
        setProfilePicture(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

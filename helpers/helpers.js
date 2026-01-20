const { initializeApp } = require('firebase/app');
const { getDownloadURL, getStorage, ref, uploadBytes } = require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyBYZ8lIRQOkonAnO96kfuTGNIOE02UIIgo",
  authDomain: "aussiehub-249f5.firebaseapp.com",
  projectId: "aussiehub-249f5",
  storageBucket: "aussiehub-249f5.firebasestorage.app",
  messagingSenderId: "71442287598",
  appId: "1:71442287598:web:f4eec0bb5d811d44171cff"
};


// const firebaseConfig = {
//   apiKey: "AIzaSyAYrEL1IPe1fpeY7qsxhIpleyYuuosPc2w",
//   authDomain: "aussieapp-76fa0.firebaseapp.com",
//   databaseURL: "https://aussieapp-76fa0.firebaseio.com",
//   projectId: "aussieapp-76fa0",
//   storageBucket: "aussieapp-76fa0.appspot.com",
//   messagingSenderId: "148032005084",
//   appId: "1:148032005084:web:674a0a1fe402d4a7c2a519",
//   measurementId: "G-96HJC35DZD"
// };

initializeApp(firebaseConfig);

uploadImage = async (file) => {
  try {
    file.originalname = `${Date.now()}.${file.mimetype}`;
    const storage = getStorage(this.app);
    console.log("🚀 ~ uploadImage= ~ storage:", storage)
    const storageRef = ref(storage, `images/${file.originalname}`);
    console.log("🚀 ~ uploadImage= ~ storageRef:", storageRef)
    const uploadedFile = await uploadBytes(storageRef, file.buffer, {
      contentType: file.mimetype,
    });
    console.log(uploadedFile)
    const downloadURL = await getDownloadURL(uploadedFile.ref);
    console.log("🚀 ~ uploadImage= ~ downloadURL:", downloadURL)
    return downloadURL;
  } catch (error) {
    console.log("🚀 ~ uploadImage= ~ error:", error)
    return false;
  }
};

module.exports = uploadImage;
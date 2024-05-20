// environment.development.ts
export const environment = {
    production: false,
    // supposing you have a backend where to send some requests
    backendUrl: "http://127.0.0.1:8000",
    // The firebase config you retrieved from the console.
    // Note that this is NOT sensitive information
    firebaseConfig:
    {
      apiKey: "AIzaSyDt30HhAfWHSgbRWhWz_Um2vMTtIXoMk9I",
      authDomain: "training10058spring.firebaseapp.com",
      databaseURL: "https://training10058spring-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "training10058spring",
      storageBucket: "training10058spring.appspot.com",
      messagingSenderId: "127505554273",
      appId: "1:127505554273:web:8729e81b60cc1684894320",
      measurementId: "G-NHC93E8GRP"
    },
  };


import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useLocalStorage = () => {
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [adminDetails, setAdminDetails] = useState<any>();

  const reduxToken = useSelector((state: any) => state?.login?.token);

  useEffect(() => {
    // -------------------- Validate Token -------------------------
    const validateToken = async () => {
      try {
        const localStorageToken = localStorage.getItem('token');
        const localStorageAdminDetails = localStorage.getItem('loginDetails');

        if (localStorageAdminDetails) {
          const adminDetails = JSON.parse(localStorageAdminDetails);
          setAdminDetails(adminDetails);
        } else {
          setAdminDetails('');
        }
        const token = reduxToken || localStorageToken;

        if (!token) {
          setIsTokenValid(false);
        } else {
          setIsTokenValid(true);
        }
      } catch (err: any) {
        console.log('Error during token validation:', err);
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [reduxToken]);

  return {
    isTokenValid,
    adminDetails,
    reduxToken,
  };
};

export default useLocalStorage;

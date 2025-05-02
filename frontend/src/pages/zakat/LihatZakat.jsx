import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { authAxios } from "../../utils/store/useAuthStore";
import useNotificationStore from "../../utils/store/useNotificationStore";

const LihatZakat = () => {
  const remarkId = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();
  const [zakatData, setZakatData] = useState({});
  const { showNotification } = useNotificationStore();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await authAxios.get(`/zakat/${remarkId}`);
        setZakatData(response.data?.payload);
      } catch (error) {
        showNotification(
          error.response?.data?.message || "Akses ditolak",
          "error"
        );
        // setTimeout(() => {
        //   navigate(-1); //kembali ke url sebelumnya
        // }, 1500);
      }
    };
    getData();
  }, [remarkId, showNotification, navigate]);
  console.log(zakatData);
  return (
    <>
      <h1>Zakat</h1>
    </>
  );
};

export default LihatZakat;

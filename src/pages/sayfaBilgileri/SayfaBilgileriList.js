import React, { useEffect, useState } from 'react';
import ListComponent from '../../components/ListComponent';
import { columns } from './shared/sayfaBilgileriEnums';
import CustomPaper from '../../components/CustomPaper';
import { getSayfaWithBolumler } from '../../api/services/sayfaEkle/sayfaGetirService';

const SayfaBilgileriList = () => {
  const [error, setError] = useState(null);
  const [staticData, setStaticData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { page, bolumler } = await getSayfaWithBolumler("jvToWvnRnQb1uc0Y2O5p");
        // staticData'yı uygun formatta güncelle
        const formattedData = bolumler.map(bolum => ({
          id: bolum.id, // id veriniz
          sayfaName: page.sayfaName, // Sayfa adınız
          bolumler: bolum.ad, // Bölüm adınız
          user: page.user, // Sayfa sahibi
        }));

        setStaticData(formattedData);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <CustomPaper title="Sayfa Bilgileri">
      <ListComponent columns={columns} staticData={staticData} />
    </CustomPaper>
  );
}

export default SayfaBilgileriList;

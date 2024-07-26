import React, { useEffect, useState } from "react";
import ListComponent from "../../components/ListComponent";
import { getColumns } from "./shared/sayfaBilgileriEnums";
import { getSayfaWithBolumler } from "../../api/services/sayfaServices/sayfaGetirService";
import SayfaBilgileriDrawer from "./SayfaBilgileriDrawer";
import { bolumSilService } from "../../api/services/bolumServices/bolumSilService";
import { Button } from "@gib-ui/core";

const SayfaBilgileriList = () => {
  const [error, setError] = useState(null);
  const [staticData, setStaticData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [bolumEkle,setBolumEkle] = useState(false);

  const handleEdit = (row) => {
    console.log(row, "edit");
    setDrawerOpen(true);
    setSelectedRow(row);
  };
  const handleDelete = (row) => {
    console.log(row, "delete");
    bolumSilService("B6DFm8z8GqCjG32lkXP6", "WN2mVvvS1pkb3gaxymYO");
  };
  const columns = getColumns(handleEdit, handleDelete);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { page, bolumler } = await getSayfaWithBolumler(
          "B6DFm8z8GqCjG32lkXP6"
        );
        const deneme = await getSayfaWithBolumler(
          "B6DFm8z8GqCjG32lkXP6"
        );
        console.log("denemeeee",deneme)
        // staticData'yı uygun formatta güncelle
        const formattedData = bolumler.map((bolum) => ({
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
    <>
      <ListComponent
        columns={columns}
        staticData={staticData}
        title="Sayfa Bilgileri"
      />
      <Button buttontype="primary" type="submit"sx={{float:"right",marginTop:2}} onClick={()=>{setDrawerOpen(true);setBolumEkle(true)}} >
        Bölüm Ekle
      </Button>
      {drawerOpen && (
        <SayfaBilgileriDrawer
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          selectedRow={selectedRow}
          setSelectedRow={selectedRow}
          bolumEkle={bolumEkle}
        />
      )}
    </>
  );
};

export default SayfaBilgileriList;

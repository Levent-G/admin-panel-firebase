import React, { useCallback, useEffect, useState } from "react";
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
  const [bolumEkle, setBolumEkle] = useState(false);
  const pageToken = localStorage.getItem("pageToken");

  const handleEdit = (row) => {
    setDrawerOpen(true);
    setSelectedRow(row);
    setBolumEkle(false);
  };

  const handleDelete = async (row) => {
    await bolumSilService(row.sayfaId, row.id);
    fetchData();
  };

  const columns = getColumns(handleEdit, handleDelete);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { page, bolumler } = await getSayfaWithBolumler(pageToken);
      const formattedData = bolumler.map((bolum,index) => ({
        id: index,
        sayfaName: page.sayfaName,
        sayfaId: page.id,
        bolumler: bolum.ad,
        user: page.user,
      }));
      setStaticData(formattedData);
    } catch (error) {
      setError("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  }, [pageToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Button
        buttontype="primary"
        sx={{ float: "right", marginRight: 2, marginTop: 2 }}
        onClick={() => {
          setDrawerOpen(true);
          setBolumEkle(true);
          setSelectedRow({});
        }}
      >
        Bölüm Ekle
      </Button>
      <ListComponent columns={columns} staticData={staticData} title="Sayfa Bilgileri" />
      <SayfaBilgileriDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        bolumEkle={bolumEkle}
        onComplete={fetchData}
      />
    </>
  );
};

export default SayfaBilgileriList;

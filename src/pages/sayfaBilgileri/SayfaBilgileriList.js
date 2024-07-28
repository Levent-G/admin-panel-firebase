import React, { useCallback, useEffect, useState } from "react";
import ListComponent from "../../components/ListComponent";
import { getColumns } from "./shared/sayfaBilgileriEnums";
import { getSayfaWithBolumler } from "../../api/services/sayfaServices/sayfaGetirService";
import SayfaBilgileriDrawer from "./SayfaBilgileriDrawer";
import { bolumSilService } from "../../api/services/bolumServices/bolumSilService";
import { Button } from "@gib-ui/core";

const SayfaBilgileriList = () => {
  const [staticData, setStaticData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const pageToken = localStorage.getItem("pageToken");

  const handleEdit = (row) => {
    setDrawerOpen(true);
    setSelectedRow(row);
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
      const formattedData = bolumler.map((bolum, index) => ({
        id: index,
        sayfaName: page.sayfaName,
        sayfaId: page.id,
        bolumler: bolum.ad,
        user: page.user,
      }));
      setStaticData(formattedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [pageToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Button
        buttontype="primary"
        sx={{ float: "right", marginRight: 2, marginTop: 2 }}
        onClick={() => {
          setDrawerOpen(true);
          setSelectedRow({});
        }}
      >
        Bölüm Ekle
      </Button>
      <ListComponent
        columns={columns}
        staticData={staticData}
        title="Sayfa Bilgileri"
      />
      <SayfaBilgileriDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        onComplete={fetchData}
      />
    </>
  );
};

export default SayfaBilgileriList;

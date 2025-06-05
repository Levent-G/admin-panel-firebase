import React, { useState } from "react";

import {
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DuzenleModal from "./DuzenleModal";

const IcerikDetayList = ({ fields, setFields, selectedFieldId, pageName }) => {
  // Modal state: hangi alan (key) düzenleniyor, ve yeni değer
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editKey, setEditKey] = useState("");
  const [editValue, setEditValue] = useState("");

  const navigate = useNavigate();

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  // Düzenle butonuna basılınca modal açılır, sadece ilgili key'nin değerini set et
  const handleOpenEditModal = (key) => {
    if (!selectedField) return;

    setEditKey(key);
    setEditValue(selectedField[key] || "");
    setEditModalOpen(true);
  };
  return (
    <>
      {selectedField && (
        <Paper elevation={3} sx={{ mt: 2, p: 4, borderRadius: 8 }}>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() =>
              navigate(`/sayfa/${pageName}/alan/${selectedField.id}`)
            }
            sx={{ float: "right", mb: 3 }}
          >
            YENİ İÇERİK EKLE
          </Button>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            {selectedField.id} İÇERİĞİ
          </Typography>

          <Table size="small">
            <TableBody>
              {Object.entries(selectedField)
                .filter(
                  ([key]) =>
                    key !== "id" && key !== "createdAt" && key !== "updatedAt"
                )
                .map(([key, value]) => (
                  <TableRow
                    key={key}
                    sx={{
                      "& > td": {
                        paddingTop: 1.5,
                        paddingBottom: 1.5,
                        borderBottom: "1px solid #e0e0e0", // daha yumuşak bir alt çizgi
                      },
                    }}
                  >
                    <TableCell>
                      <strong>{key}</strong>
                    </TableCell>

                    <TableCell>
                      {Array.isArray(value)
                        ? value.map((item, idx) => (
                            <div key={idx}>
                              <strong>{item.title || "-"}</strong>:{" "}
                              {item.value || "-"}
                            </div>
                          ))
                        : typeof value === "object" && value !== null
                        ? `${value.title || "-"}: ${value.value || "-"}`
                        : value?.toString() || "-"}
                    </TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleOpenEditModal(key)}
                        sx={{ float: "right" }}
                      >
                        Düzenle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      )}
      <DuzenleModal
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        editKey={editKey}
        setEditKey={setEditKey}
        editValue={editValue}
        setEditValue={setEditValue}
        selectedField={selectedField}
        pageName={pageName}
        setFields={setFields}
      />
    </>
  );
};

export default IcerikDetayList;

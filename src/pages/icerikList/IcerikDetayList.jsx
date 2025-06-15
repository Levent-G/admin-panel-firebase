import React, { useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DuzenleModal from "./DuzenleModal";

const IcerikDetayList = ({ fields, setFields, selectedFieldId, pageName }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editKey, setEditKey] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editContext, setEditContext] = useState(null);

  const navigate = useNavigate();
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const handleOpenEditModal = (fieldName, currentValue, itemIndex, key) => {
    setEditKey(key);
    setEditValue(currentValue);
    setEditModalOpen(true);
    setEditContext({
      fieldName,
      itemIndex,
      key,
    });
  };

  const renderTableRows = () => {
    return Object.entries(selectedField || {})
      .filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key))
      .map(([key, value]) => {
        // Diziyse (örneğin bloglar)
        if (Array.isArray(value)) {
          return (
            <TableRow key={key}>
              <TableCell sx={{ verticalAlign: "top", width: "200px" }}>
                <Typography fontWeight="bold">{key}:</Typography>
              </TableCell>
              <TableCell>
                {value.length === 0 ? (
                  <Typography>-</Typography>
                ) : (
                  value.map((item, idx) => (
                    <Box key={`${key}-${idx}`} sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        sx={{ color: "primary.main", mb: 1 }}
                      >
                        {idx +1} Eleman
                      </Typography>

                      {typeof item === "object" && item !== null ? (
                        Object.entries(item).map(([subKey, subValue]) => (
                          <Box
                            key={subKey}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              pl: 2,
                              mb: 1,
                            }}
                          >
                            <Box sx={{ flex: 1 }}>
                              <strong>{subKey}:</strong>{" "}
                              {subKey === "blogIcerik" ? (
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: subValue,
                                  }}
                                />
                              ) : (
                                subValue?.toString() || "-"
                              )}
                            </Box>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() =>
                                handleOpenEditModal(key, subValue, idx, subKey)
                              }
                            >
                              Düzenle
                            </Button>
                          </Box>
                        ))
                      ) : (
                        <Box sx={{ pl: 2 }}>{item?.toString() || "-"}</Box>
                      )}
                      <Divider sx={{ my: 1 }} />
                    </Box>
                  ))
                )}
              </TableCell>
            </TableRow>
          );
        }

        // Dizi değilse (normal alan)
        return (
          <TableRow key={key}>
            <TableCell sx={{ width: "200px" }}>
              <Typography fontWeight="bold">{key}:</Typography>
            </TableCell>
            <TableCell>
              {typeof value === "object" && value !== null ? (
                value.title || value.value ? (
                  `${value.title || "-"}: ${value.value || "-"}`
                ) : (
                  JSON.stringify(value)
                )
              ) : (
                value?.toString() || "-"
              )}
            </TableCell>
            <TableCell align="right" sx={{ width: "120px" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleOpenEditModal(key, value, null, key)}
              >
                Düzenle
              </Button>
            </TableCell>
          </TableRow>
        );
      });
  };

  return (
    <>
      {selectedField && (
        <Paper elevation={3} sx={{ mt: 2, p: 4, borderRadius: 3 }}>
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
            <TableBody>{renderTableRows()}</TableBody>
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
        editContext={editContext}
      />
    </>
  );
};

export default IcerikDetayList;

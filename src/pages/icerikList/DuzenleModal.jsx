import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  IconButton,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { notify } from "../../utils/notify";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  maxHeight: "80vh",
  overflow: "auto",
};

const DuzenleModal = ({
  editModalOpen,
  setEditModalOpen,
  editKey,
  setEditKey,
  editValue,
  setEditValue,
  selectedField,
  pageName,
  setFields,
  editContext, // { fieldName, blogIndex, key }
}) => {
  const [localData, setLocalData] = useState(editValue);
  const [useJsonEditor, setUseJsonEditor] = useState(false);
  const [jsonEdit, setJsonEdit] = useState("");

  // Veri tipini güncelle
  useEffect(() => {
    setLocalData(editValue);
    setUseJsonEditor(
      typeof editValue === "object" && editValue !== null ? true : false
    );
    setJsonEdit(
      typeof editValue === "object" && editValue !== null
        ? JSON.stringify(editValue, null, 2)
        : ""
    );
  }, [editValue]);

  // Kapatma işlemi
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditKey("");
    setEditValue("");
    setLocalData(null);
    setUseJsonEditor(false);
    setJsonEdit("");
  };

  // JSON textarea değişimi
  const handleJsonChange = (value) => {
    setJsonEdit(value);
    try {
      const parsed = JSON.parse(value);
      setLocalData(parsed);
    } catch {
      // Parse hatası yoksa localData değiştirme
    }
  };

  // Array ise item değişimi (yalnızca useJsonEditor false ise gösterilir)
  const handleArrayItemChange = (index, field, value) => {
    const updated = [...localData];
    updated[index] = { ...updated[index], [field]: value };
    setLocalData(updated);
  };

  // Array item ekle
  const handleAddArrayItem = () => {
    if (Array.isArray(localData)) {
      setLocalData([...localData, { title: "", value: "" }]);
    }
  };

  // Array item sil
  const handleDeleteArrayItem = (index) => {
    if (Array.isArray(localData)) {
      const updated = [...localData];
      updated.splice(index, 1);
      setLocalData(updated);
    }
  };

  const handleSave = async () => {
    if (!selectedField || !editKey) return;
  
    try {
      const fieldDocRef = doc(db, "pages", pageName, "fields", selectedField.id);
  
      let updatedData = {};
  
      if (editContext?.fieldName && Array.isArray(selectedField[editContext.fieldName])) {
        // İç içe dizi güncellemesi (örneğin bloglar)
        const updatedArray = [...selectedField[editContext.fieldName]];
        // editContext.blogIndex: güncellenen elemanın indexi
        updatedArray[editContext.blogIndex] = {
          ...updatedArray[editContext.blogIndex],
          [editKey]: localData,
        };
  
        updatedData = {
          [editContext.fieldName]: updatedArray,
          updatedAt: new Date(),
        };
      } else {
        // Normal alan güncellemesi
        updatedData = {
          [editKey]: localData,
          updatedAt: new Date(),
        };
      }
  
      await updateDoc(fieldDocRef, updatedData);
  
      // Fields'leri tekrar çek ve state güncelle
      const fieldsSnapshot = await getDocs(
        collection(db, "pages", pageName, "fields")
      );
      const fieldsData = fieldsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFields(fieldsData);
  
      notify("Güncelleme işlemi başarılı.", "success");
      handleCloseEditModal();
    } catch (error) {
      notify("Güncelleme sırasında hata oluştu.", "error");
    }
  };

  // Render alanı
  const renderContent = () => {
    if (useJsonEditor) {
      return (
        <>
          <TextField
            label="JSON Düzenleyici"
            multiline
            minRows={8}
            fullWidth
            value={jsonEdit}
            onChange={(e) => handleJsonChange(e.target.value)}
            sx={{ fontFamily: "monospace", mb: 2 }}
          />
          {/* Eğer array ise ve JSON editor kapatılabilir */}
          {Array.isArray(localData) && (
            <FormControlLabel
              control={
                <Switch
                  checked={useJsonEditor}
                  onChange={() => setUseJsonEditor(false)}
                  color="primary"
                />
              }
              label="Array Düzenleyici'ye geç"
              sx={{ mb: 2 }}
            />
          )}
        </>
      );
    } else if (Array.isArray(localData)) {
      // Array editörü (title,value)
      return (
        <>
          {localData.map((item, idx) => (
            <Stack key={idx} direction="row" spacing={1} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Title"
                value={item.title}
                onChange={(e) =>
                  handleArrayItemChange(idx, "title", e.target.value)
                }
              />
              <TextField
                fullWidth
                label="Value"
                value={item.value}
                onChange={(e) =>
                  handleArrayItemChange(idx, "value", e.target.value)
                }
              />
              <IconButton
                onClick={() => handleDeleteArrayItem(idx)}
                color="error"
              >
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Button
            onClick={handleAddArrayItem}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            + Yeni Ekle
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={useJsonEditor}
                onChange={() => setUseJsonEditor(true)}
                color="primary"
              />
            }
            label="JSON Düzenleyici'ye geç"
            sx={{ mb: 2 }}
          />
        </>
      );
    } else if (
      typeof localData === "string" ||
      typeof localData === "number" ||
      typeof localData === "boolean" ||
      localData === null
    ) {
      // Primitive tipi, normal TextField
      return (
        <TextField
          fullWidth
          label={editKey}
          value={localData}
          onChange={(e) => setLocalData(e.target.value)}
          sx={{ mb: 2 }}
        />
      );
    } else {
      // Nesne ise JSON textarea
      return (
        <>
          <TextField
            label="JSON Düzenleyici"
            multiline
            minRows={8}
            fullWidth
            value={jsonEdit}
            onChange={(e) => handleJsonChange(e.target.value)}
            sx={{ fontFamily: "monospace", mb: 2 }}
          />
        </>
      );
    }
  };

  return (
    <Modal open={editModalOpen} onClose={handleCloseEditModal}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textTransform: "uppercase", fontWeight: "bold", mb: 3 }}
        >
          {selectedField?.id} - {editKey} Düzenle
        </Typography>

        {renderContent()}

        <Box sx={{ textAlign: "right" }}>
          <Button onClick={handleCloseEditModal} sx={{ mr: 1 }}>
            İptal
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Kaydet
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DuzenleModal;

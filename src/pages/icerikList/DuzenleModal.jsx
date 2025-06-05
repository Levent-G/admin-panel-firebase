import {
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { notify } from "../../utils/notify";
import { useEffect, useState } from "react";

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
}) => {
  const [localArray, setLocalArray] = useState([]);
  const [localString, setLocalString] = useState("");

  const isArray = Array.isArray(editValue);

  useEffect(() => {
    if (isArray) {
      setLocalArray(editValue);
    } else {
      setLocalString(editValue || "");
    }
  }, [editValue, isArray]);

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditKey("");
    setEditValue("");
    setLocalArray([]);
    setLocalString("");
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...localArray];
    updated[index][field] = value;
    setLocalArray(updated);
  };

  const handleAddItem = () => {
    setLocalArray([...localArray, { title: "", value: "" }]);
  };

  const handleDeleteItem = (index) => {
    const updated = [...localArray];
    updated.splice(index, 1);
    setLocalArray(updated);
  };

  const handleSave = async () => {
    if (!selectedField || !editKey) return;

    try {
      const fieldDocRef = doc(
        db,
        "pages",
        pageName,
        "fields",
        selectedField.id
      );

      await updateDoc(fieldDocRef, {
        [editKey]: isArray ? localArray : localString,
        updatedAt: new Date(),
      });

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

  return (
    <Modal open={editModalOpen} onClose={handleCloseEditModal}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textTransform: "uppercase", fontWeight: "bold",mb:3 }}
        >
          {selectedField?.id} - {editKey} Düzenle
        </Typography>

        {isArray ? (
          <>
            {localArray.map((item, idx) => (
              <Stack key={idx} direction="row" spacing={1} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={item.title}
                  onChange={(e) =>
                    handleItemChange(idx, "title", e.target.value)
                  }
                />
                <TextField
                  fullWidth
                  label="Value"
                  value={item.value}
                  onChange={(e) =>
                    handleItemChange(idx, "value", e.target.value)
                  }
                />
                <IconButton onClick={() => handleDeleteItem(idx)} color="error">
                  <Delete />
                </IconButton>
              </Stack>
            ))}
            <Button
              onClick={handleAddItem}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            >
              + Yeni Ekle
            </Button>
          </>
        ) : (
          <TextField
            fullWidth
            label={editKey}
            value={localString}
            onChange={(e) => setLocalString(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}

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

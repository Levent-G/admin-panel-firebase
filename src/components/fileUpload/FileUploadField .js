import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  IconButton,
  Tooltip,
  Stack,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import UploadIcon from "@mui/icons-material/Upload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/firebase";

export const FileUploadField = ({ name, label, accept = "*/*" }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const theme = useTheme();
  const watchedFiles = useWatch({ control, name }) || [];

  const [uploading, setUploading] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);

  useEffect(() => {
    if (duplicateError) {
      const timer = setTimeout(() => setDuplicateError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [duplicateError]);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    const currentValues = Array.isArray(watchedFiles) ? watchedFiles : [];
    const currentFileNames = currentValues
      .filter((item) => typeof item === "string")
      .map((url) => url.split("?")[0].split("/").pop());

    const newValidFiles = selectedFiles.filter((file) => {
      if (currentFileNames.includes(file.name)) {
        setDuplicateError(true);
        return false;
      }
      return true;
    });

    if (newValidFiles.length === 0) return;

    setUploading(true);
    try {
      const uploadedURLs = await Promise.all(
        newValidFiles.map(async (file) => {
          const fileRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
          await uploadBytes(fileRef, file);
          return await getDownloadURL(fileRef);
        })
      );

      setValue(name, [...currentValues, ...uploadedURLs], { shouldValidate: true });
    } catch (error) {
      console.error("Dosya yükleme hatası:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index) => {
    const updated = [...watchedFiles];
    updated.splice(index, 1);
    setValue(name, updated, { shouldValidate: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={() => (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            {label}
          </Typography>

          <Card
            variant="outlined"
            component="label"
            sx={{
              border: "2px dashed",
              borderColor: theme.palette.divider,
              borderRadius: 2,
              cursor: "pointer",
              bgcolor: "#fafafa",
              transition: "0.2s",
              "&:hover": { backgroundColor: "#f5f5f5" },
              textAlign: "center",
              p: 4,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 160,
              overflow: "hidden",
            }}
          >
            <input type="file" hidden accept={accept} multiple onChange={handleFileChange} />
            <UploadIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="body1" color="primary.main">
              Dosya Yükle
            </Typography>
            {uploading && <CircularProgress size={20} sx={{ mt: 1 }} />}
          </Card>

          {duplicateError && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 1, fontWeight: "bold", textAlign: "center" }}
            >
              Aynı dosyalar yüklenemez!
            </Typography>
          )}

          <Stack spacing={1}>
            {watchedFiles.map((urlOrFile, index) => {
              const isUrl = typeof urlOrFile === "string";
              const fileName = isUrl
                ? decodeURIComponent(urlOrFile.split("?")[0].split("/").pop())
                : urlOrFile.name;

              return (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <InsertDriveFileIcon sx={{ fontSize: 28, color: "primary.main" }} />
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {fileName}
                      </Typography>
                    </Box>
                  </Box>
                  <Tooltip title="Sil">
                    <IconButton
                      onClick={() => handleRemove(index)}
                      size="small"
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Card>
              );
            })}
          </Stack>

          {errors[name] && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors[name].message}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

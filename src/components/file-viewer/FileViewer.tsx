import BackupIcon from "@mui/icons-material/Backup";
import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";

type FileViewerProps = {
  file: File | null;
  onFileDrop: (file: File) => void;
};

export const FileViewer: React.FC<FileViewerProps> = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => props.onFileDrop(acceptedFiles[0]),
  });

  return props.file ? (
    props.file.type === "application/pdf" ? (
      <iframe
        data-testid="pdf-iframe"
        src={URL.createObjectURL(props.file)}
        width="100%"
        height="90%"
      />
    ) : (
      <img
        data-testid="image"
        src={URL.createObjectURL(props.file)}
        alt="Uploaded file"
        width="100%"
      />
    )
  ) : (
    <Box
      {...getRootProps()}
      display="flex"
      flexDirection="column"
      rowGap="1rem"
      justifyContent="center"
      alignItems="center"
      border="2px dashed gray"
      padding="2rem"
    >
      <input
        data-testid="drag-and-drop-input"
        {...getInputProps()}
        accept=".jpg,.jpeg,.png,.pdf"
      />
      <p data-testid="drag-and-drop">
        Drag 'n' drop some files here, or click to select file
      </p>
      <BackupIcon />
    </Box>
  );
};

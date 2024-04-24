import { useState } from "react";
import {
  AnnotationForm,
  AnnotationFormData,
} from "./components/annotations-form/AnnotationForm";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import FileDownload from "react-file-download";
import { FileViewer } from "./components/file-viewer/FileViewer";

export const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (data: AnnotationFormData) => {
    const json = JSON.stringify(data);
    FileDownload(
      json,
      `${file!.name.substr(0, file!.name.lastIndexOf("."))}.json`,
    );
  };

  const handleFileDrop = (file: File) => {
    setFile(file);
  };

  return (
    <CssBaseline>
      <AppBar position="sticky" style={{ padding: "1rem" }}>
        VML
      </AppBar>
      <Box width="100%" height="100%" display="flex" flexDirection="column">
        <Typography
          variant="h4"
          width="100vw"
          gutterBottom
          paddingBlock="2rem"
          borderBottom="2px solid gray"
          textAlign="center"
        >
          Try Smartscan API
        </Typography>
        <Container maxWidth="lg" style={{ display: "flex", height: "100%" }}>
          <Box width={file ? "50%" : "100%"}>
            <FileViewer file={file} onFileDrop={handleFileDrop} />
          </Box>

          {file && (
            <Box
              width="50%"
              display="flex"
              flexDirection="column"
              rowGap="1rem"
              justifyContent="flex_start"
              alignItems="stretch"
              padding="3rem"
            >
              <AnnotationForm onSubmitSuccessful={handleSubmit} />
              <Button
                type="button"
                variant="outlined"
                color="warning"
                onClick={() => setFile(null)}
              >
                New Document
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </CssBaseline>
  );
};

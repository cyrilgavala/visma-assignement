import { render, screen } from "@testing-library/react";
import { FileViewer } from "./FileViewer";
import { describe, it, vi } from "vitest";

describe("<FileViewer />", () => {
  it("renders PDF file correctly", () => {
    window.URL.createObjectURL = function (): string {
      return "test.pdf";
    };
    const file = new File(["PDF content"], "test.pdf", {
      type: "application/pdf",
    });

    render(<FileViewer file={file} onFileDrop={vi.fn()} />);
    const pdfElement = screen.getByTestId("pdf-iframe");

    expect(pdfElement.tagName).toBe("IFRAME");
  });

  it("renders image file correctly", () => {
    window.URL.createObjectURL = function (): string {
      return "test.jpg";
    };
    const file = new File(["Image content"], "test.jpg", {
      type: "image/jpg",
    });

    render(<FileViewer file={file} onFileDrop={vi.fn()} />);
    const imageElement = screen.getByTestId("image");

    expect(imageElement.tagName).toBe("IMG");
  });

  it("renders dropzone when no file is present", () => {
    render(<FileViewer file={null} onFileDrop={vi.fn()} />);

    const dropzoneText = screen.getByTestId("drag-and-drop");

    expect(dropzoneText).toBeInTheDocument();
  });

  test("accepts specified file types in dropzone", () => {
    render(<FileViewer file={null} onFileDrop={vi.fn()} />);
    const dropzoneInput = screen.getByTestId("drag-and-drop-input");

    expect(dropzoneInput).toHaveAttribute("accept", ".jpg,.jpeg,.png,.pdf");
  });
});

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AnnotationForm, AnnotationFormData } from "./AnnotationForm";
import { format } from "date-fns";

describe("<AnnotationForm />", () => {
  it("renders form with all fields and submit button", () => {
    render(<AnnotationForm onSubmitSuccessful={vi.fn()} />);

    expect(screen.getByTestId("annotation-form")).toBeInTheDocument();
    expect(screen.getByTestId("supplier-name")).toBeInTheDocument();
    expect(screen.getByTestId("date-of-purchase")).toBeInTheDocument();
    expect(screen.getByTestId("total-amount")).toBeInTheDocument();
    expect(screen.getByTestId("currency")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("error messages show up when submut empty form", async () => {
    render(<AnnotationForm onSubmitSuccessful={vi.fn()} />);
    const submitButton = screen.getByTestId("submit-button");
    await act(async () => {
      await userEvent.click(submitButton);
    });

    const errorMessages = screen.getAllByTestId("error-message");
    expect(errorMessages.length).toBe(3);
  });

  it("successful submit with correct data", async () => {
    const data: AnnotationFormData = {
      supplierName: "Supplier",
      dateOfPurchase: new Date(Date.UTC(2024, 3, 23)),
      totalAmount: 3445.43,
      currency: "EUR",
    };
    const onSubmitSuccessful = vi.fn();
    render(<AnnotationForm onSubmitSuccessful={onSubmitSuccessful} />);

    const supplierNameInput = screen.getByTestId("supplier-name");
    const dateOfPurchaseInput = screen.getByTestId("date-of-purchase");
    const totalAmountInput = screen.getByTestId("total-amount");

    await act(async () => {
      await userEvent.type(supplierNameInput, data.supplierName);
      await userEvent.type(
        dateOfPurchaseInput,
        format(data.dateOfPurchase, "yyyy-MM-dd"),
      );
      await userEvent.type(totalAmountInput, String(data.totalAmount));
    });

    const submitButton = screen.getByTestId("submit-button");
    await act(async () => {
      await userEvent.click(submitButton);
    });

    const errorMessages = screen.queryAllByTestId("error-message");
    expect(errorMessages?.length).toBe(0);

    expect(onSubmitSuccessful).toBeCalledWith(data);
  });
});

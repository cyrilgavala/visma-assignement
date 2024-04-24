import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputLabel,
  Input,
  FormControl,
  Select,
  Box,
  Button,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SupportedCurrencies = ["EUR", "NOK", "SEK", "DKK"] as const;

const schema = z.object({
  supplierName: z.string().min(1, { message: "Insert a supplier" }),
  dateOfPurchase: z.coerce.date({ message: "Select a date" }),
  totalAmount: z.coerce
    .number()
    .positive({ message: "Insert a total amount" })
    .multipleOf(0.01, "Invalid format"),
  currency: z.enum(SupportedCurrencies, { message: "Select a currency" }),
});

export type AnnotationFormData = z.infer<typeof schema>;

type AnnotationFormProps = {
  onSubmitSuccessful: (data: AnnotationFormData) => void;
};

export const AnnotationForm: React.FC<AnnotationFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnnotationFormData>({
    defaultValues: {
      supplierName: undefined,
      dateOfPurchase: undefined,
      totalAmount: undefined,
      currency: SupportedCurrencies[0],
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: AnnotationFormData) => props.onSubmitSuccessful(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="annotation-form">
      <Box width="100%" display="flex" flexDirection="column" rowGap="3rem">
        <FormControl fullWidth error={!!errors.supplierName}>
          <InputLabel htmlFor="supplier-name">Supplier Name:</InputLabel>
          <Input
            id="supplier-name"
            type="text"
            {...register("supplierName")}
            data-testid="supplier-name"
          />
          {errors.supplierName && (
            <FormHelperText
              data-testid="error-message"
              error={errors.supplierName !== undefined}
              color="warning"
            >
              {errors.supplierName.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth error={!!errors.dateOfPurchase}>
          <Input
            id="date-of-purchase"
            type="date"
            {...register("dateOfPurchase")}
            data-testid="date-of-purchase"
          />
          {errors.dateOfPurchase && (
            <FormHelperText
              data-testid="error-message"
              error={errors.dateOfPurchase !== undefined}
              color="warning"
            >
              {errors.dateOfPurchase.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth error={!!errors.totalAmount}>
          <InputLabel htmlFor="total-amount">Total Amount:</InputLabel>
          <Input
            id="total-amount"
            type="text"
            {...register("totalAmount")}
            data-testid="total-amount"
          />
          {errors.totalAmount && (
            <FormHelperText
              data-testid="error-message"
              error={errors.totalAmount !== undefined}
              color="warning"
            >
              {errors.totalAmount.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth error={!!errors.currency}>
          <InputLabel htmlFor="currency">Currency:</InputLabel>
          <Select
            variant="standard"
            native
            id="currency"
            {...register("currency")}
            data-testid="currency"
          >
            {SupportedCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </Select>
          {errors.currency && (
            <FormHelperText
              data-testid="error-message"
              error={errors.currency !== undefined}
              color="warning"
            >
              {errors.currency.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit" variant="contained" data-testid="submit-button">
          Save Annotations
        </Button>
      </Box>
    </form>
  );
};

import { z } from "zod";

export const PackageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Invalid image URL"),
  price: z.number().min(1, "Price must be positive"),
  cookingTime: z.number().min(1, "Cooking time must be positive"),
  ingredientsQuantity: z
    .number()
    .min(1, "Ingredients quantity must be positive"),
  peoplesQuantity: z.number().min(1, "Peoples quantity must be positive"),
});

export type PackageFormData = z.infer<typeof PackageSchema>;

-- Add new columns for apartment parameters
ALTER TABLE public.apartments
ADD COLUMN bathrooms integer,
ADD COLUMN bedrooms integer,
ADD COLUMN living_area numeric,
ADD COLUMN balcony_area numeric;
-- Add JSON columns for multiple bathroom and bedroom areas
ALTER TABLE public.apartments 
ADD COLUMN IF NOT EXISTS bathroom_areas jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS bedroom_areas jsonb DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN public.apartments.bathroom_areas IS 'Array of bathroom areas in m², e.g. [4.5, 5.2]';
COMMENT ON COLUMN public.apartments.bedroom_areas IS 'Array of bedroom areas in m², e.g. [16.5, 11.9]';
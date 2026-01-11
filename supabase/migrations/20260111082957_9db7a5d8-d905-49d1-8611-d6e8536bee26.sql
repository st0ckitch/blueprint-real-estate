-- Add company_address to site_settings if not exists
INSERT INTO public.site_settings (key, value, label_ka, label_en)
VALUES ('company_address', 'პ.ასლანიდის 9, Tbilisi, Georgia', 'მისამართი', 'Address')
ON CONFLICT (key) DO NOTHING;
-- Reset mockup URLs for design #1102 (DURGA_USA-IND_FULL)
-- so Bipasha regenerates both male and female mockups on next run.
-- Run in Supabase SQL editor, then trigger Bipasha from CreativeOS admin.

UPDATE assets
SET
  mockup_male_url   = NULL,
  mockup_female_url = NULL
WHERE design_number = 1102;

-- Verify: should return 1 row with both URLs now NULL
SELECT design_number, name, mockup_male_url, mockup_female_url
FROM assets
WHERE design_number = 1102;

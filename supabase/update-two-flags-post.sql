-- Update the 'two-flags-one-identity' blog post with the full rewrite.
-- Run this in the Supabase SQL editor if this post already exists in blog_posts.

UPDATE blog_posts
SET
  title          = 'Two Flags, One Identity: Why We Refuse to Choose',
  excerpt        = 'Most countries ask you to pick a side. Your heritage or your home. Hindu diaspora communities have been refusing that choice for generations — and wearing both flags is how we say so.',
  cover_image    = 'https://images.unsplash.com/photo-1569388037243-dfa034be5ee9?w=1200&q=80&fit=crop',
  reading_minutes = 6,
  body_md        = '<p>There''s a question every second-generation Hindu immigrant has been asked, usually at an airport, sometimes at a family reunion, occasionally by a well-meaning coworker: <em>So where are you really from?</em></p>

<p>The question assumes there''s one true answer. A single flag. A single origin story. It assumes that identity is a zero-sum game — that loving one country means diminishing another.</p>

<p>The Hindu diaspora has been quietly disproving this for over two centuries.</p>

<h2>One shirt. Two flags. No apology.</h2>

<p>Every HinduTee design carries two national flags alongside a Hindu deity. Not one flag. Two. That''s not a compromise — it''s the whole point.</p>

<p>The Indian flag represents where your family''s faith was forged, where your grandparents lit diyas, where the temples are ancient and the festivals fill entire cities. The second flag — USA, Canada, UK, Australia, Trinidad, Guyana, Fiji — represents where your family chose to build a life. Where you were born, or raised, or where you planted your own roots.</p>

<p>These are not competing loyalties. They are two chapters of the same story.</p>

<h2>The diaspora that never chose one home</h2>

<p>Indo-Caribbean Hindus — the descendants of the 500,000 indentured labourers brought to Trinidad, Guyana, Suriname, Jamaica, and Fiji between 1838 and 1917 — have been navigating double identity longer than most. They weren''t immigrants in the traditional sense. They were transported. Their connection to India was severed by colonial design.</p>

<p>And yet they kept the faith. They kept the deities. They kept the rituals. In villages without a single Hindi speaker remaining, they still recited Sanskrit prayers passed down through generations.</p>

<p>When a Guyanese Hindu family migrated again to New York in the 1970s or 80s, their identity became three-layered: Indian roots, Guyanese childhood, American present. A shirt with the Indian and Guyanese flags isn''t a simplification of that story. It''s an acknowledgment of it.</p>

<h2>What your flag combination says</h2>

<p><strong>India + USA:</strong> The most common combination in our collection. Four million people of Indian descent live in the United States. This shirt says: <em>we came for opportunity, we stayed for community, and we brought our gods with us.</em></p>

<p><strong>India + Canada:</strong> The Indo-Canadian community — particularly in the Greater Toronto Area and Metro Vancouver — has built one of the most visible Hindu diasporas outside South Asia. Wearing this combination is a statement of roots and of belonging, simultaneously.</p>

<p><strong>India + Trinidad &amp; Tobago:</strong> Trinidad''s Hindu community is descended from the original indentured labour wave. They have kept festivals alive that have faded in India itself. Diwali Nagar in Chaguanas is the largest Diwali celebration outside of India. This flag combination honors 175 years of unbroken faith.</p>

<p><strong>India + Fiji:</strong> Fijian Hindus carried their traditions across the Pacific — and then many of them carried them again to Australia and New Zealand after the coups of 1987 and 2000. If you wear a Fiji–Australia shirt, you are acknowledging a migration story that happened twice.</p>

<p><strong>India + UK:</strong> The British Indian community built the foundation for South Asian culture in the West. Leicester''s Golden Mile, Wembley, Southall — these are not immigrant enclaves. They are permanent cultural institutions. Wearing this combination acknowledges that permanence.</p>

<h2>The real reason we wear both</h2>

<p>There''s a version of diaspora life that is always slightly apologetic. Always slightly deferential. Always explaining itself to someone — to the country you came from, or to the country you live in, or to family members who think you''ve strayed too far in either direction.</p>

<p>Wearing two flags side by side is a refusal of that apology.</p>

<p>It says: I know exactly where I come from. I know exactly where I am. And I don''t owe either place an explanation for how much I love the other.</p>

<p>The deity you choose tells the world what you believe. The flags tell the world who you are. Together, they tell the full story — and the full story is the only one worth wearing.</p>',
  updated_at = now()
WHERE slug = 'two-flags-one-identity';

-- If it doesn't exist yet, insert it:
INSERT INTO blog_posts (slug, title, excerpt, cover_image, published_at, reading_minutes, category, body_md, published)
SELECT
  'two-flags-one-identity',
  'Two Flags, One Identity: Why We Refuse to Choose',
  'Most countries ask you to pick a side. Your heritage or your home. Hindu diaspora communities have been refusing that choice for generations — and wearing both flags is how we say so.',
  'https://images.unsplash.com/photo-1569388037243-dfa034be5ee9?w=1200&q=80&fit=crop',
  '2026-10-14',
  6,
  'Identity',
  '<p>...</p>',  -- full body already set in UPDATE above; this INSERT is only if row was missing
  true
WHERE NOT EXISTS (SELECT 1 FROM blog_posts WHERE slug = 'two-flags-one-identity');

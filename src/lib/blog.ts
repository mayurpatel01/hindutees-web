import { createClient } from '@/lib/supabase/server'

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  coverImage: string | null
  publishedAt: string   // ISO date string
  readingMinutes: number
  category: string
  body: string          // Markdown string — rendered server-side
}

// ---------------------------------------------------------------------------
// Supabase source (written by Aisha agent)
// ---------------------------------------------------------------------------

async function getPostsFromSupabase(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, cover_image, published_at, reading_minutes, category, body_md')
      .order('published_at', { ascending: false })

    if (error || !data?.length) return []

    return data.map(row => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt ?? '',
      coverImage: row.cover_image ?? null,
      publishedAt: row.published_at,
      readingMinutes: row.reading_minutes ?? 4,
      category: row.category ?? 'Culture',
      body: row.body_md ?? '',
    }))
  } catch {
    return []
  }
}

// ---------------------------------------------------------------------------
// Static fallback (shown until Aisha has run at least once)
// ---------------------------------------------------------------------------

const STATIC_POSTS: BlogPost[] = [
  {
    slug: 'meaning-of-ganesh-for-diaspora',
    title: 'Why Ganesh Travels Everywhere We Do',
    excerpt:
      "The remover of obstacles follows the Hindu diaspora across oceans and generations. Here's what his image means when you're far from home.",
    coverImage: null,
    publishedAt: '2026-10-01',
    readingMinutes: 4,
    category: 'Culture',
    body: `
<p>Of all the deities in the Hindu pantheon, none travels quite like Ganesh. From the clay idols packed into suitcases by Gujarati families emigrating to East Africa in the 1900s, to the small brass murti on the dashboards of taxi drivers in New York and Toronto — Ganesha goes where we go.</p>

<p>He is Vighneshvara, the lord of obstacles. Not just the remover of them, but their master — which means he can also place them in your path when you need redirection. For a community always negotiating two cultures, two languages, two versions of home, that duality resonates deeply.</p>

<h2>The original diaspora god</h2>
<p>Historians of religion have noted that Ganesha's iconography is unusually portable. Unlike temple deities who require elaborate ritual maintenance, a small Ganesh idol demands little. He fits on a shelf, a windowsill, a desk. He asks for nothing more than a stick of incense and a moment of attention.</p>

<p>When Indian indentured labourers were transported to Fiji, Guyana, Trinidad, Mauritius and South Africa in the 19th century, they brought almost nothing — but they brought their gods. Ganesha arrived first.</p>

<h2>Two flags, one deity</h2>
<p>At HinduTee, every design pairs a deity with the flags of two countries: the land of your ancestors and the land you call home today. When we design a Ganesh shirt for the Guyanese Hindu community, we're saying something true: Ganesha arrived in Guyana in 1838, his image has been woven into the fabric of that nation for nearly two centuries, and wearing him alongside the Guyanese flag is an act of cultural claim.</p>

<h2>Wearing the remover of obstacles</h2>
<p>There's a particular kind of courage in being visibly Hindu in a country where it marks you as other. A Ganesh tee is not just clothing. It's a small assertion: I am here, I have always been here, and I am not going anywhere.</p>
    `.trim(),
  },
  {
    slug: 'diwali-across-the-diaspora',
    title: 'Diwali Across the Diaspora: One Festival, Ten Countries',
    excerpt:
      'Diwali looks different in Trinidad than it does in Fiji, and different again in Leicester or Queens. A look at how the festival of lights travels.',
    coverImage: null,
    publishedAt: '2026-10-08',
    readingMinutes: 5,
    category: 'Festival',
    body: `
<p>Diwali is the most widely celebrated Hindu festival in the world — and nowhere is that clearer than in the diaspora, where the festival has taken root in soil its founders never imagined.</p>

<h2>Trinidad: the biggest Diwali outside India</h2>
<p>Trinidad and Tobago hosts what is widely considered the largest Diwali celebration outside of India. Diwali Nagar in Chaguanas draws hundreds of thousands of visitors each year. The Indo-Trinidadian community — descendants of indentured labourers brought from Bihar and Uttar Pradesh — has kept the festival alive for over 175 years.</p>

<h2>Fiji: devotion on the Pacific</h2>
<p>Fiji's Hindu community celebrates Diwali with a particular intensity. Cut off from India for generations, Indo-Fijians have preserved traditions that have faded in India itself. Diwali in Suva or Lautoka feels like a time capsule — the prayers, the clay diyas, the family rituals unchanged across a century of Pacific life.</p>

<h2>Leicester and the UK's Diwali capital</h2>
<p>Leicester's Golden Mile hosts Europe's largest Diwali celebration outside India. The lights go up along Belgrave Road every October and attract visitors from across the country.</p>

<h2>Wear the festival</h2>
<p>This Diwali, wear your two flags with pride. The festival is yours — it always has been.</p>
    `.trim(),
  },
  {
    slug: 'two-flags-one-identity',
    title: 'Two Flags, One Identity: What Your Combination Says',
    excerpt:
      "India–USA. Guyana–Canada. Fiji–Australia. Each diaspora combination carries a distinct migration story. Here's what yours might be.",
    coverImage: null,
    publishedAt: '2026-10-14',
    readingMinutes: 4,
    category: 'Identity',
    body: `
<p>Every HinduTee design tells two stories simultaneously. The deity tells the spiritual story. The flag combination tells the migration story. These are not the same story, but they belong together.</p>

<h2>The Indian–American combination</h2>
<p>The most common combination in our collection. Roughly four million people of Indian descent live in the United States. The India–USA shirt says: my family came from there, I was built here, and I hold both.</p>

<h2>The Guyanese combination</h2>
<p>The Guyanese Hindu community is descended from indentured labourers brought to British Guiana from the 1830s onward. They were already a diaspora within a diaspora before they migrated again to New York, Toronto, or London. Wearing Ganesh with both flags acknowledges the full arc of that journey.</p>

<h2>The Fijian combination</h2>
<p>Fijian Hindus have one of the most layered diaspora stories of all — from India to Fiji to Australia or New Zealand after the coups of 1987 and 2000. A Fiji–Australia shirt carries all of that history in two rectangles of color.</p>

<h2>Wear the whole story</h2>
<p>The flag combination you choose is a small act of historical precision — a way of saying exactly where your family came from and where they built their lives.</p>
    `.trim(),
  },
]

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabasePosts = await getPostsFromSupabase()
  // Prefer Supabase; fall back to static only when Aisha hasn't run yet
  return supabasePosts.length > 0 ? supabasePosts : STATIC_POSTS
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(p => p.slug === slug) ?? null
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

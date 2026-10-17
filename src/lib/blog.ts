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
      .eq('published', true)
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
    coverImage: 'https://images.unsplash.com/photo-1612431264326-c8b1dc84e6f8?w=1200&q=80&fit=crop',
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
    coverImage: 'https://images.unsplash.com/photo-1574769461037-9f8df9c2e2b1?w=1200&q=80&fit=crop',
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
    title: 'Two Flags, One Identity: Why We Refuse to Choose',
    excerpt:
      "Most countries ask you to pick a side. Your heritage or your home. Hindu diaspora communities have been refusing that choice for generations — and wearing both flags is how we say so.",
    coverImage: 'https://images.unsplash.com/photo-1569388037243-dfa034be5ee9?w=1200&q=80&fit=crop',
    publishedAt: '2026-10-14',
    readingMinutes: 6,
    category: 'Identity',
    body: `
<p>There's a question every second-generation Hindu immigrant has been asked, usually at an airport, sometimes at a family reunion, occasionally by a well-meaning coworker: <em>So where are you really from?</em></p>

<p>The question assumes there's one true answer. A single flag. A single origin story. It assumes that identity is a zero-sum game — that loving one country means diminishing another.</p>

<p>The Hindu diaspora has been quietly disproving this for over two centuries.</p>

<h2>One shirt. Two flags. No apology.</h2>

<p>Every HinduTee design carries two national flags alongside a Hindu deity. Not one flag. Two. That's not a compromise — it's the whole point.</p>

<p>The Indian flag represents where your family's faith was forged, where your grandparents lit diyas, where the temples are ancient and the festivals fill entire cities. The second flag — USA, Canada, UK, Australia, Trinidad, Guyana, Fiji — represents where your family chose to build a life. Where you were born, or raised, or where you planted your own roots.</p>

<p>These are not competing loyalties. They are two chapters of the same story.</p>

<h2>The diaspora that never chose one home</h2>

<p>Indo-Caribbean Hindus — the descendants of the 500,000 indentured labourers brought to Trinidad, Guyana, Suriname, Jamaica, and Fiji between 1838 and 1917 — have been navigating double identity longer than most. They weren't immigrants in the traditional sense. They were transported. Their connection to India was severed by colonial design.</p>

<p>And yet they kept the faith. They kept the deities. They kept the rituals. In villages without a single Hindi speaker remaining, they still recited Sanskrit prayers passed down through generations.</p>

<p>When a Guyanese Hindu family migrated again to New York in the 1970s or 80s, their identity became three-layered: Indian roots, Guyanese childhood, American present. A shirt with the Indian and Guyanese flags isn't a simplification of that story. It's an acknowledgment of it.</p>

<h2>What your flag combination says</h2>

<p><strong>India + USA:</strong> The most common combination in our collection. Four million people of Indian descent live in the United States. This shirt says: <em>we came for opportunity, we stayed for community, and we brought our gods with us.</em></p>

<p><strong>India + Canada:</strong> The Indo-Canadian community — particularly in the Greater Toronto Area and Metro Vancouver — has built one of the most visible Hindu diasporas outside South Asia. Wearing this combination is a statement of roots and of belonging, simultaneously.</p>

<p><strong>India + Trinidad & Tobago:</strong> Trinidad's Hindu community is descended from the original indentured labour wave. They have kept festivals alive that have faded in India itself. Diwali Nagar in Chaguanas is the largest Diwali celebration outside of India. This flag combination honors 175 years of unbroken faith.</p>

<p><strong>India + Fiji:</strong> Fijian Hindus carried their traditions across the Pacific — and then many of them carried them again to Australia and New Zealand after the coups of 1987 and 2000. If you wear a Fiji–Australia shirt, you are acknowledging a migration story that happened twice.</p>

<p><strong>India + UK:</strong> The British Indian community built the foundation for South Asian culture in the West. Leicester's Golden Mile, Wembley, Southall — these are not immigrant enclaves. They are permanent cultural institutions. Wearing this combination acknowledges that permanence.</p>

<h2>The real reason we wear both</h2>

<p>There's a version of diaspora life that is always slightly apologetic. Always slightly deferential. Always explaining itself to someone — to the country you came from, or to the country you live in, or to family members who think you've strayed too far in either direction.</p>

<p>Wearing two flags side by side is a refusal of that apology.</p>

<p>It says: I know exactly where I come from. I know exactly where I am. And I don't owe either place an explanation for how much I love the other.</p>

<p>The deity you choose tells the world what you believe. The flags tell the world who you are. Together, they tell the full story — and the full story is the only one worth wearing.</p>
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

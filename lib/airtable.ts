import Airtable from 'airtable';

// Check if the required environment variables are set
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

// Debug log for development (will only show in server logs)
console.log('Airtable Config:', {
  apiKeyExists: !!apiKey,
  baseIdExists: !!baseId,
  apiKeyLength: apiKey ? apiKey.length : 0,
  baseIdLength: baseId ? baseId.length : 0,
});

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string | null;
  registrationLink: string | null;
  category?: string;
  isPast?: boolean;
}

// Sample fallback events to use when Airtable credentials are not available
const FALLBACK_EVENTS: Event[] = [
  {
    id: 'fallback-1',
    title: 'Night Sky Photography Workshop',
    date: '2025-05-15',
    time: '7:00 PM - 10:00 PM',
    location: 'Nairobi National Park',
    description: 'Join us for an evening of night sky photography in Nairobi National Park. Learn techniques for capturing stunning images of stars, planets, and the Milky Way. Bring your camera and tripod. We\'ll provide guidance on camera settings, composition, and post-processing.\n\nThis workshop is suitable for beginners and intermediate photographers.',
    imageUrl: null,
    registrationLink: 'https://example.com/register',
    category: 'Workshop',
    isPast: false
  },
  {
    id: 'fallback-2',
    title: 'Star Party at Mount Kenya',
    date: '2025-06-20',
    time: '6:30 PM - 11:00 PM',
    location: 'Mount Kenya National Park',
    description: 'Experience the magnificent dark skies of Mount Kenya at our community star party. We\'ll have telescopes set up for viewing planets, star clusters, and deep-sky objects. Astronomers will be on hand to guide your exploration of the night sky.\n\nHot drinks and light refreshments will be provided. Please bring warm clothing as temperatures drop significantly after sunset.',
    imageUrl: null,
    registrationLink: 'https://example.com/register',
    category: 'Stargazing',
    isPast: false
  },
  {
    id: 'fallback-3',
    title: 'Light Pollution Awareness Seminar',
    date: '2025-07-10',
    time: '2:00 PM - 5:00 PM',
    location: 'University of Nairobi',
    description: 'This educational seminar focuses on the impact of light pollution on wildlife, human health, and astronomy. Learn about practical solutions for reducing light pollution in urban and rural areas.\n\nSpeakers include experts in astronomy, conservation, and public policy. The seminar will conclude with a panel discussion and Q&A session.',
    imageUrl: null,
    registrationLink: 'https://example.com/register',
    category: 'Educational',
    isPast: false
  },
  // Past events
  {
    id: 'fallback-4',
    title: 'Astronomy for Beginners Workshop',
    date: '2024-12-15',
    time: '4:00 PM - 7:00 PM',
    location: 'Nairobi Planetarium',
    description: 'This introductory workshop covered the basics of astronomy and stargazing for beginners. Participants learned about constellations, how to use a star chart, and basic telescope operation.\n\nThe workshop concluded with a guided stargazing session where participants put their new skills into practice.',
    imageUrl: null,
    registrationLink: null,
    category: 'Workshop',
    isPast: true
  },
  {
    id: 'fallback-5',
    title: 'Dark Sky Photography Exhibition',
    date: '2025-01-20',
    time: '10:00 AM - 6:00 PM',
    location: 'Nairobi National Museum',
    description: 'This exhibition showcased stunning astrophotography from across Kenya\'s dark sky sites. Visitors explored the beauty of the night sky through the lens of talented Kenyan photographers and learned about the importance of preserving our dark skies.\n\nThe exhibition included interactive displays on light pollution and its effects on wildlife and human health.',
    imageUrl: null,
    registrationLink: null,
    category: 'Exhibition',
    isPast: true
  },
  {
    id: 'fallback-6',
    title: 'Community Light Audit Project',
    date: '2025-02-10',
    time: '5:00 PM - 9:00 PM',
    location: 'Karen Suburb, Nairobi',
    description: 'Volunteers participated in our first community light audit, mapping light pollution sources in the Karen suburb of Nairobi. Teams collected data on street lighting, security lights, and commercial lighting to identify opportunities for improvement.\n\nThe data collected will be used to develop recommendations for light pollution reduction in urban areas.',
    imageUrl: null,
    registrationLink: null,
    category: 'Community Project',
    isPast: true
  }
];

export async function getEvents(): Promise<{ upcoming: Event[], past: Event[] }> {
  // If API key or base ID is missing, return fallback events
  if (!apiKey || !baseId) {
    console.warn('Airtable credentials not found. Using fallback events data.');
    return {
      upcoming: FALLBACK_EVENTS.filter(event => !event.isPast),
      past: FALLBACK_EVENTS.filter(event => event.isPast)
    };
  }

  try {
    // Initialize Airtable only if credentials are available
    Airtable.configure({ apiKey });
    const base = Airtable.base(baseId);
    const eventsTable = base('Events');
    
    console.log('Attempting to fetch events from Airtable...');
    
    // Get upcoming events
    const upcomingRecords = await eventsTable.select({
      sort: [{ field: 'Date', direction: 'asc' }],
      filterByFormula: 'AND({Published} = TRUE(), IS_AFTER({Date}, TODAY()))',
    }).all();
    
    // Get past events
    const pastRecords = await eventsTable.select({
      sort: [{ field: 'Date', direction: 'desc' }], // Most recent first
      filterByFormula: 'AND({Published} = TRUE(), IS_BEFORE({Date}, TODAY()))',
      maxRecords: 6 // Limit to a reasonable number
    }).all();
    
    console.log(`Successfully fetched ${upcomingRecords.length} upcoming events and ${pastRecords.length} past events from Airtable`);
    
    const mapRecord = (record: any, isPast: boolean): Event => ({
      id: record.id,
      title: record.get('Title') as string,
      date: record.get('Date') as string,
      time: record.get('Time') as string,
      location: record.get('Location') as string,
      description: record.get('Description') as string,
      imageUrl: record.get('Image')?.[0]?.url || null,
      registrationLink: record.get('RegistrationLink') as string || null,
      category: record.get('Category') as string || undefined,
      isPast
    });
    
    return {
      upcoming: upcomingRecords.map(record => mapRecord(record, false)),
      past: pastRecords.map(record => mapRecord(record, true))
    };
  } catch (error) {
    console.error('Error fetching events from Airtable:', error);
    return {
      upcoming: FALLBACK_EVENTS.filter(event => !event.isPast),
      past: FALLBACK_EVENTS.filter(event => event.isPast)
    };
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  // If credentials are missing or ID is a fallback ID, check fallback events
  if (!apiKey || !baseId || id.startsWith('fallback-')) {
    const fallbackEvent = FALLBACK_EVENTS.find(event => event.id === id);
    return fallbackEvent || null;
  }

  try {
    // Initialize Airtable only if credentials are available
    Airtable.configure({ apiKey });
    const base = Airtable.base(baseId);
    const eventsTable = base('Events');
    
    console.log(`Attempting to fetch event with ID ${id} from Airtable...`);
    
    const record = await eventsTable.find(id);
    const eventDate = new Date(record.get('Date') as string);
    const isPast = eventDate < new Date();
    
    console.log(`Successfully fetched event with ID ${id} from Airtable`);
    
    return {
      id: record.id,
      title: record.get('Title') as string,
      date: record.get('Date') as string,
      time: record.get('Time') as string,
      location: record.get('Location') as string,
      description: record.get('Description') as string,
      imageUrl: record.get('Image')?.[0]?.url || null,
      registrationLink: record.get('RegistrationLink') as string || null,
      category: record.get('Category') as string || undefined,
      isPast
    };
  } catch (error) {
    console.error(`Error fetching event with ID ${id} from Airtable:`, error);
    
    // Check if the ID matches a fallback event as a last resort
    const fallbackEvent = FALLBACK_EVENTS.find(event => event.id === id);
    return fallbackEvent || null;
  }
}

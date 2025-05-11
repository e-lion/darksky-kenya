import { getEventById, getEvents } from '@/lib/airtable';
import { format } from 'date-fns';
import { Calendar, MapPin, Clock, Info, ArrowLeft, User, Users, Camera, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ShareButtonWrapper from '@/components/events/share-button-wrapper';

export const revalidate = 3600; // Revalidate at most once per hour

interface EventPageProps {
  params: {
    id: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEventById(params.id);
  
  if (!event) {
    return {
      title: 'Event Not Found | DarkSky Kenya',
    };
  }
  
  return {
    title: `${event.title} | DarkSky Kenya Events`,
    description: event.description.slice(0, 160),
  };
}

// Generate static paths for events
export async function generateStaticParams() {
  const { upcoming, past } = await getEvents();
  const allEvents = [...upcoming, ...past];
  
  return allEvents.map((event) => ({
    id: event.id,
  }));
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id);
  
  if (!event) {
    notFound();
  }
  
  const formattedDate = format(new Date(event.date), 'MMMM d, yyyy');
  const isFallbackEvent = event.id.startsWith('fallback-');
  const isPastEvent = event.isPast || new Date(event.date) < new Date();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/events" className="inline-flex items-center mb-8 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Events
      </Link>
      
      {isFallbackEvent && (
        <Alert className="mb-6 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <AlertTitle>Demo Event</AlertTitle>
          <AlertDescription className="text-amber-800 dark:text-amber-300">
            This is a sample event. Connect your Airtable account to manage real events.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative">
            {isPastEvent && (
              <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-75 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                Past Event
              </div>
            )}
            
            {event.imageUrl ? (
              <div className="relative h-80 w-full mb-6">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className={`object-cover rounded-lg ${isPastEvent ? 'grayscale-[30%]' : ''}`}
                />
              </div>
            ) : (
              <div className={`h-80 w-full mb-6 rounded-lg flex items-center justify-center ${
                isPastEvent
                  ? 'bg-gray-200 dark:bg-gray-800'
                  : 'bg-gradient-to-r from-indigo-800 to-purple-700 dark:from-indigo-900 dark:to-purple-800'
              }`}>
                <div className="text-center">
                  {event.category === 'Workshop' && <Camera className="h-16 w-16 mx-auto text-white opacity-75 mb-3" />}
                  {event.category === 'Stargazing' && <Calendar className="h-16 w-16 mx-auto text-white opacity-75 mb-3" />}
                  {event.category === 'Educational' && <Users className="h-16 w-16 mx-auto text-white opacity-75 mb-3" />}
                  {!event.category && <Calendar className="h-16 w-16 mx-auto text-white opacity-75 mb-3" />}
                  <span className="text-xl font-medium text-white">{event.category || 'Event'}</span>
                </div>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          
          {event.category && (
            <div className="mb-6">
              <span className={`category-badge category-badge-${event.category?.toLowerCase().replace(/\s+/g, '')}`}>
                {event.category}
              </span>
            </div>
          )}
          
          <div className="prose dark:prose-invert max-w-none">
            {event.description.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          {isPastEvent && (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Event Summary</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This event has already taken place. Thank you to everyone who attended and made it a success!
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Users className="h-4 w-4" />
                <span>Approximately 25-30 attendees</span>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <div className={`p-6 rounded-lg ${
            isPastEvent
              ? 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              : 'bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800'
          }`}>
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className={`h-5 w-5 mt-0.5 ${isPastEvent ? 'text-gray-500 dark:text-gray-400' : 'text-purple-600 dark:text-purple-400'}`} />
                <div>
                  <h3 className="font-medium">Date</h3>
                  <p>{formattedDate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className={`h-5 w-5 mt-0.5 ${isPastEvent ? 'text-gray-500 dark:text-gray-400' : 'text-purple-600 dark:text-purple-400'}`} />
                <div>
                  <h3 className="font-medium">Time</h3>
                  <p>{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className={`h-5 w-5 mt-0.5 ${isPastEvent ? 'text-gray-500 dark:text-gray-400' : 'text-purple-600 dark:text-purple-400'}`} />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p>{event.location}</p>
                </div>
              </div>
            </div>
            
            {!isPastEvent && event.registrationLink && event.registrationLink.trim() !== '' && (
              <a 
                href={event.registrationLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex w-full items-center justify-center gap-1 rounded-md px-4 py-2 mt-6 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Register for this Event <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            )}
            
            {isPastEvent && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  This event has already taken place
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/events?tab=upcoming">
                    Browse Upcoming Events
                  </Link>
                </Button>
              </div>
            )}
          </div>
          
          {!isPastEvent && (
            <ShareButtonWrapper title={event.title} />
          )}
        </div>
      </div>
    </div>
  );
}

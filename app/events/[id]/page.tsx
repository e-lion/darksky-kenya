import { getEventById, getEvents } from '@/lib/airtable';
import { format } from 'date-fns';
import { Calendar, MapPin, Clock, Info, ArrowLeft, User, Users, Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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
            
            {!isPastEvent && event.registrationLink && (
              <Button className="w-full mt-6" asChild>
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                  Register for this Event
                </a>
              </Button>
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
            <div className="mt-6 p-6 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
              <h3 className="font-semibold mb-3">Share this Event</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                  Tweet
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  Share
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

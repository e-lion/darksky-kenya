import { getEvents } from '@/lib/airtable';
import EventCard from '@/components/events/event-card';
import { Metadata } from 'next';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Calendar, Stars, Archive } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: 'Events | DarkSky Kenya',
  description: 'Join us for upcoming stargazing events, workshops, and educational programs about preserving Kenya\'s night skies.',
};

export const revalidate = 3600; // Revalidate at most once per hour

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();
  
  // Check if we're using fallback data
  const isFallbackData = [...upcoming, ...past].some(event => event.id.startsWith('fallback-'));
  
  return (
    <div className="min-h-screen">
      {/* Page header with stars background */}
      <div className="relative bg-gradient-to-b from-indigo-900 to-indigo-950 py-16 px-4 mb-10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Events & Gatherings</h1>
          <p className="text-indigo-200 max-w-2xl text-lg md:text-xl">
            Join us for stargazing, educational workshops, and community events focused on
            preserving Kenya's magnificent night skies.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16">
        {isFallbackData && (
          <Alert className="mb-8 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <AlertTitle>Demo Mode</AlertTitle>
            <AlertDescription className="text-amber-800 dark:text-amber-300">
              Currently displaying sample events. To see real events, connect your Airtable account in the environment variables.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex items-center justify-between flex-wrap mb-8">
            <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Archive className="h-4 w-4 mr-2" />
                Past Events
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="upcoming" className="pt-2">
            {upcoming.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                <Stars className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                  No upcoming events scheduled at this time.
                </p>
                <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                  Check back soon for new events or subscribe to our newsletter to stay updated on our upcoming stargazing events and workshops.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="pt-2">
            {past.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800">
                <Archive className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">
                  No past events to display.
                </p>
                <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                  Once we've hosted events, they'll appear here as a record of our activities.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {past.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

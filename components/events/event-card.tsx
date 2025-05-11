"use client"

import { format } from 'date-fns';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Event } from '@/lib/airtable';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = format(new Date(event.date), 'MMMM d, yyyy');
  const isPastEvent = event.isPast || new Date(event.date) < new Date();
  
  return (
    <Card className={`h-full flex flex-col overflow-hidden transition-all duration-300 border ${
      isPastEvent ? "border-gray-200 dark:border-gray-800 opacity-80 hover:opacity-100" : "border-purple-200 dark:border-purple-900 hover:border-purple-400 dark:hover:border-purple-700"
    }`}>
      {event.imageUrl ? (
        <div className="relative h-48 w-full">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className={`object-cover ${isPastEvent ? 'grayscale-[30%]' : ''}`}
          />
          {isPastEvent && (
            <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-80 text-white px-2 py-1 text-xs rounded">
              Past Event
            </div>
          )}
        </div>
      ) : (
        <div className={`h-48 w-full ${isPastEvent ? 'bg-gray-200 dark:bg-gray-800' : 'bg-purple-100 dark:bg-purple-900'} flex items-center justify-center relative`}>
          <Calendar className={`h-12 w-12 ${isPastEvent ? 'text-gray-400' : 'text-purple-600 dark:text-purple-400'}`} />
          {isPastEvent && (
            <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-80 text-white px-2 py-1 text-xs rounded">
              Past Event
            </div>
          )}
          {event.category && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded">
              {event.category}
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className={`h-4 w-4 ${isPastEvent ? 'text-gray-500 dark:text-gray-400' : 'text-purple-600 dark:text-purple-400'}`} />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${isPastEvent ? 'text-gray-500 dark:text-gray-400' : 'text-purple-600 dark:text-purple-400'}`} />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className={`h-4 w-4 ${isPastEvent ? 'text-gray-500 dark:text-gray-400' : 'text-purple-600 dark:text-purple-400'}`} />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">
          {event.description.split('\n')[0]}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/events/${event.id}`}>
            {isPastEvent ? 'View Summary' : 'View Details'}
          </Link>
        </Button>
        
        {!isPastEvent && event.registrationLink && event.registrationLink.trim() !== '' && (
          <a 
            href={event.registrationLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Register <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        )}
      </CardFooter>
    </Card>
  );
}

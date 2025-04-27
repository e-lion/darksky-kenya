import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EventNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-6">Event Not Found</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
        We couldn't find the event you're looking for. It may have been removed or the URL might be incorrect.
      </p>
      <Button asChild>
        <Link href="/events">View All Events</Link>
      </Button>
    </div>
  );
}

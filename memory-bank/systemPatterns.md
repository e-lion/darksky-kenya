# DarkSky Kenya System Patterns

## Architecture Overview

The DarkSky Kenya application follows a modular, component-based architecture using Next.js with React and TypeScript. The system is structured to enable progressive enhancement and feature additions while maintaining a clean separation of concerns.

```
┌─ App
│  ├─ Layout Component (Shell)
│  │  ├─ Header
│  │  ├─ Main Content Area
│  │  └─ Footer
│  │
│  ├─ Page Components
│  │  ├─ Home Page
│  │  ├─ Mission Page
│  │  ├─ Our Work Page
│  │  └─ Events Page
│  │
│  └─ Feature Components
│     ├─ Light Pollution Maps
│     ├─ Resource Library
│     ├─ Event Calendar
│     └─ Community Forum (future)
```

## Core Design Patterns

### Component Composition Pattern

Components are built following a composition pattern, with smaller, focused components combined to create more complex interfaces:

```tsx
// Example of component composition
<Card>
  <CardHeader>
    <CardTitle>Light Pollution Effects</CardTitle>
    <CardDescription>Impact on wildlife and ecosystems</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content about light pollution effects...</p>
  </CardContent>
  <CardFooter>
    <Button>Learn more</Button>
  </CardFooter>
</Card>
```

Benefits:
- Improved reusability
- Easier testing
- More flexible UI composition
- Clear responsibility boundaries

### UI Component Patterns

#### Atomic Design Methodology

The UI components follow atomic design principles:

1. **Atoms**: Basic UI elements (buttons, inputs, icons)
2. **Molecules**: Simple component combinations (search bars, form fields with labels)
3. **Organisms**: Complex UI sections (navigation bars, hero sections)
4. **Templates**: Page layouts without specific content
5. **Pages**: Complete views with real content

#### Component Organization

```
components/
├─ ui/                 # Base UI components (shadcn/ui)
├─ layout/             # Layout components (header, footer, etc.)
├─ features/           # Feature-specific components
│  ├─ maps/            # Light pollution mapping components
│  ├─ resources/       # Resource library components
│  └─ events/          # Event-related components
├─ shared/             # Shared utility components
└─ [page-name]/        # Page-specific components
```

### Data Flow Patterns

#### Server Components First

Next.js server components are used by default to:
- Reduce client-side JavaScript
- Improve performance
- Enable server-side data fetching
- Improve SEO

```tsx
// Server component example
export default async function ResourceLibrary() {
  const resources = await getResources();
  
  return (
    <div>
      {resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
```

#### Client Components When Needed

Client components are used when interactivity is required:

```tsx
"use client"

import { useState } from "react";

export default function FilterableResourceList({ resources }) {
  const [filter, setFilter] = useState("");
  
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div>
      <input 
        type="text" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        placeholder="Filter resources..." 
      />
      <ResourceList resources={filteredResources} />
    </div>
  );
}
```

### State Management Patterns

#### Hierarchical State Management

- **Component-level state**: React `useState` for local component state
- **Feature-level state**: React Context for state shared across related components
- **Application-level state**: Custom hooks with Context for global state

#### Form State Management

Forms use React Hook Form for validation and state management:

```tsx
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10),
});

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  
  function onSubmit(values) {
    // Submit form data
  }
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Rendering Patterns

### Static-First Approach

- Default to Static Site Generation (SSG) for content-focused pages
- Use Incremental Static Regeneration (ISR) for semi-dynamic content
- Server-Side Rendering (SSR) for fully dynamic content

### Progressive Enhancement

Features are implemented with progressive enhancement in mind:
1. Base functionality works without JavaScript
2. Enhanced features added when JavaScript is available
3. Advanced features leverage modern browser capabilities (with fallbacks)

## Responsive Design Patterns

### Mobile-First Implementation

All components are designed mobile-first using Tailwind's responsive classes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Adaptive Layout Patterns

- Stacking layouts on mobile
- Side-by-side layouts on larger screens
- Hidden/revealed content based on screen size
- Touch-friendly tap targets on mobile

## Performance Patterns

### Lazy Loading

Components and images use lazy loading:

```tsx
// For components
const LazyMapComponent = dynamic(() => import('@/components/features/maps/MapComponent'), {
  loading: () => <p>Loading map...</p>,
  ssr: false
});

// For images
<Image 
  src="/images/night-sky.jpg"
  alt="Night sky in Kenya"
  width={800}
  height={600}
  loading="lazy"
/>
```

### Code Splitting

- Route-based code splitting (automatic with Next.js)
- Component-level code splitting with `dynamic` imports
- Critical CSS inlining

## Accessibility Patterns

### Semantic HTML

Using proper semantic HTML elements:

```tsx
<article>
  <header>
    <h2>Article Title</h2>
  </header>
  <p>Article content...</p>
  <footer>
    <p>Article metadata</p>
  </footer>
</article>
```

### Keyboard Navigation

- Focus management for interactive elements
- Skip links for keyboard users
- Tab order consideration

### Screen Reader Support

- ARIA attributes where appropriate
- Alt text for images
- Form labels and descriptions

## Error Handling Patterns

### Graceful Degradation

- Fallback UI for failed data fetching
- Error boundaries for component errors
- Default values for missing data

### User Feedback

- Toast notifications for transient messages
- Form validation messages
- Loading indicators for asynchronous operations

## Testing Patterns

### Component Testing

- Unit tests for utility functions
- Component tests for UI components
- Integration tests for feature flows

### Accessibility Testing

- Automated a11y testing with axe
- Manual testing with screen readers
- Keyboard navigation testing

## Security Patterns

### Input Validation

- Server-side validation with Zod
- Client-side validation with React Hook Form + Zod
- Sanitization of user inputs

### Content Security

- Strict CSP headers
- External link protection
- Safe image handling

## Deployment Pipeline

### Continuous Integration

- Automated testing on pull requests
- Linting and type checking
- Bundle size monitoring

### Preview Deployments

- Vercel preview deployments for PRs
- Automated checks before merging

## Documentation Patterns

### Code Documentation

- JSDoc comments for functions and components
- Inline comments for complex logic
- README files for each directory

### Memory Bank Documentation

- Comprehensive project documentation
- Architectural decision records
- Pattern documentation
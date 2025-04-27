# DarkSky Kenya Technical Context

## Technology Stack

### Frontend Framework
- **Next.js 15.2.4**: Server components, app router, and other modern React patterns
- **React 19**: For component-based UI development with latest features
- **TypeScript**: For type safety and improved developer experience

### UI Framework & Components
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI primitives
- **Lucide Icons**: For consistent iconography throughout the application
- **Responsive Design**: Mobile-first approach using Tailwind's responsive utilities

### State Management
- **React Context API**: For global state where needed
- **React Hooks**: For component-level state management
- **React Hook Form**: For form state management and validation

### Data Visualization
- **Recharts**: For charts and data visualization components
- **Custom SVG maps**: For light pollution mapping

### Performance Optimization
- **Next.js Image Optimization**: For responsive and optimized images
- **Dynamic Imports**: For code splitting
- **Intersection Observer**: For lazy loading components
- **Static Site Generation**: For performance and SEO benefits

### Accessibility
- **ARIA attributes**: Throughout component library
- **Keyboard navigation**: Fully implemented
- **Screen reader support**: With appropriate semantic HTML
- **Color contrast compliance**: WCAG AA standard minimum

### Theme & Styling
- **TailwindCSS with JIT compilation**: For efficient styling
- **next-themes**: For theme management (light/dark mode)
- **CSS Variables**: For theming consistency

### Development Tooling
- **ESLint**: For code quality and consistency
- **Prettier**: For code formatting
- **pnpm**: For package management
- **TypeScript**: For static type checking

## Development Environment

### Local Setup
- Node.js v20.x+
- pnpm for package management
- VS Code with recommended extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript support

### Build & Deployment Processes
- Development server: `pnpm dev`
- Production build: `pnpm build`
- Linting: `pnpm lint`
- Static export capability for specific deployment scenarios

### Version Control
- Git with GitHub repository
- Branch strategy:
  - `main`: Production-ready code
  - `develop`: Integration branch
  - Feature branches: For specific features/fixes

## Technical Constraints

### Bandwidth Considerations
- Target payload size < 500KB initial load
- Aggressive image optimization for rural connectivity
- Progressive loading patterns implemented
- Offline functionality for key information (future implementation)

### Browser Support
- Modern browsers (last 2 versions)
- Safari on iOS 14+
- Chrome on Android 8+
- Special considerations for Opera Mini (popular in Kenya)

### Performance Targets
- First Contentful Paint < 1.5s on 3G
- Time to Interactive < 3s on 3G
- Lighthouse score > 90 on all categories

### Accessibility Requirements
- WCAG 2.1 Level AA compliance
- Keyboard navigation for all interactions
- Screen reader testing with NVDA and VoiceOver
- High contrast mode support

## Technical Debt & Known Issues

### Current Limitations
- Image optimization pipeline needs refinement
- Some components lack full responsive behavior
- Form validation needs enhancement
- SEO optimization incomplete

### Planned Technical Improvements
- Server-side rendering optimization
- Implement service worker for offline capabilities
- Improve build pipeline for better CI/CD integration
- Enhance analytics implementation

## Third-Party Integrations

### Current Integrations
- None implemented yet

### Planned Integrations
- **Mapbox API**: For light pollution mapping (Phase 2)
- **Calendar API**: For event management (Phase 2)
- **Weather API**: For stargazing conditions (Phase 3)
- **Social Media APIs**: For community engagement (Phase 3)

## Security Considerations

### Data Protection
- No PII collection in initial phases
- HTTPS enforced throughout
- Content security policy implementation

### Authentication (Future)
- Planned for Phase 3 with community features
- Will implement OAuth with major providers
- Role-based access control for administrators

## Monitoring & Analytics

### Performance Monitoring
- Implemented with Next.js Analytics (basic)
- Real User Monitoring to be added in Phase 2

### Usage Analytics
- Privacy-focused analytics to be implemented
- Custom event tracking for key user journeys

## Infrastructure (Future)

### Hosting
- Currently development only
- Plan to use Vercel for production deployment
- Considering AWS amplify as alternative

### CDN
- Vercel Edge Network
- Consideration for additional CDN in Kenya for performance

### Database (Phase 2+)
- Initial phases are static content only
- Plan to implement Supabase for database needs
- Consider PlanetScale for relational data

## Development Workflow

### Task Management
- GitHub issues for tracking
- Structured PR templates
- Conventional commits standard

### QA Process
- Component-level testing with Storybook (planned)
- E2E testing with Playwright (planned)
- Manual testing with documented test cases
- Accessibility testing with axe DevTools

### Documentation
- Inline code documentation
- Component documentation via Storybook (planned)
- Technical architecture documentation
- Memory Bank pattern for knowledge transfer